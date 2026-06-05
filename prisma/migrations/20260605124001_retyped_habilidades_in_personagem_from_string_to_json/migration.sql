/*
  Warnings:

  - The `habilidades` column on the `Personagem` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- AlterTable
ALTER TABLE "Personagem" DROP COLUMN "habilidades",
ADD COLUMN     "habilidades" JSONB NOT NULL DEFAULT '[]';
