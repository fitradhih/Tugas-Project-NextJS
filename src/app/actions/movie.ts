"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import prisma from "../../lib/prisma";
import { z } from "zod";

const moviesSchema = z.object({
  title: z.string().min(2, "Judul harus memiliki minimal 2 karakter").max(100, "Judul tidak boleh lebih dari 100 karakter"),
  description: z.string().max(200, "Deskripsi tidak boleh lebih dari 200 karakter").optional().or(z.literal("")),
  posterUrl: z.string().url("Poster URL harus berupa URL yang valid"),
  rating: z.number().min(0, "Rating harus antara 0 dan 10").max(10, "Rating harus antara 0 dan 10"),
  releaseYear: z.number().min(1888, "Tahun rilis harus setelah 1888"),
  duration: z.number().min(1, "Durasi harus lebih dari 0 menit"),
});

export async function updateMovie(formData: FormData) {
  // Ambil id dari hidden input form
  const id = Number(formData.get("id"));

  const parsedData = moviesSchema.safeParse({
    title: formData.get("title"),
    description: formData.get("description"),
    posterUrl: formData.get("posterUrl"),
    rating: Number(formData.get("rating")),
    releaseYear: Number(formData.get("releaseYear")),
    duration: Number(formData.get("duration")),
  });

  if (!parsedData.success) {
    return { error: parsedData.error.flatten().fieldErrors };
  }

  await prisma.movie.update({
    where: { id },
    data: parsedData.data,
  });

  revalidatePath("/movie");
  return { success: true, message: "Movie updated successfully!" };
}

export async function deleteMovie(id: number) {
  await prisma.movie.delete({ where: { id } });
  revalidatePath("/movie");
}

export async function createMovie(formData: FormData) {
  const parsedData = moviesSchema.safeParse({
    title: formData.get("title"),
    description: formData.get("description"),
    posterUrl: formData.get("posterUrl"),
    rating: Number(formData.get("rating")),
    releaseYear: Number(formData.get("releaseYear")),
    duration: Number(formData.get("duration")),
  });

  if (!parsedData.success) {
    return { error: parsedData.error.flatten().fieldErrors };
  }

  await prisma.movie.create({
    data: parsedData.data,
  });

  revalidatePath("/movie");
  revalidatePath("/movie/edit");

  return { success: true, message: "Movie created successfully!" };
}
