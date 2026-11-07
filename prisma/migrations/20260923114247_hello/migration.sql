-- CreateTable
CREATE TABLE "Shows" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT,
    "posterUrl" TEXT NOT NULL,
    "releaseYear" INTEGER NOT NULL,
    "totalSeasons" INTEGER NOT NULL,
    "rating" DOUBLE PRECISION NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Shows_pkey" PRIMARY KEY ("id")
);
