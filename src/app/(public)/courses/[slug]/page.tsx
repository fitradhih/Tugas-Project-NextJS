export default async function CourseDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  return (
    <div>
      <h1 className="text-2xl font-bold capitalize">
        Detail Kursus: {slug.replace('-', ' ')}
      </h1>
      <p className="text-gray-600 mt-2">Slug URL saat ini: {slug}</p>
    </div>
  );
}