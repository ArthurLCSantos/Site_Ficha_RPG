-- DropForeignKey
ALTER TABLE "Personagem" DROP CONSTRAINT "Personagem_usuarioId_fkey";

-- AlterTable
ALTER TABLE "Personagem" ADD COLUMN     "habilidades" TEXT NOT NULL DEFAULT '';

-- CreateTable
CREATE TABLE "Personarma" (
    "id" TEXT NOT NULL,
    "nome" TEXT NOT NULL,
    "objeto" TEXT NOT NULL,
    "nivel" INTEGER NOT NULL,
    "atributos" JSONB NOT NULL,
    "habilidades" TEXT NOT NULL,
    "imagem" TEXT,
    "usuarioId" TEXT NOT NULL,

    CONSTRAINT "Personarma_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Personagem" ADD CONSTRAINT "Personagem_usuarioId_fkey" FOREIGN KEY ("usuarioId") REFERENCES "Usuario"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Personarma" ADD CONSTRAINT "Personarma_usuarioId_fkey" FOREIGN KEY ("usuarioId") REFERENCES "Usuario"("id") ON DELETE CASCADE ON UPDATE CASCADE;
