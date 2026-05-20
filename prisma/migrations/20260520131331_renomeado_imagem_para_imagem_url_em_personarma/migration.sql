/*
  Warnings:

  - You are about to drop the column `imagem` on the `Personagem` table. All the data in the column will be lost.
  - You are about to drop the column `imagem` on the `Personarma` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Personagem" DROP COLUMN "imagem",
ADD COLUMN     "imagem_url" TEXT;

-- AlterTable
ALTER TABLE "Personarma" DROP COLUMN "imagem",
ADD COLUMN     "imagem_url" TEXT;
