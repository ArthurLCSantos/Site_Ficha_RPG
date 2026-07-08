/*
  Warnings:

  - You are about to drop the column `nivel` on the `Personagem` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Personagem" DROP COLUMN "nivel",
ADD COLUMN     "experiencia" INTEGER NOT NULL DEFAULT 0;
