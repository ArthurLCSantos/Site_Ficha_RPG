-- AlterTable
ALTER TABLE "Personagem" ADD COLUMN     "ca" INTEGER NOT NULL DEFAULT 1,
ADD COLUMN     "defeitos" TEXT NOT NULL DEFAULT '',
ADD COLUMN     "estamina" JSONB NOT NULL DEFAULT '{"atual":10,"maximo":10}',
ADD COLUMN     "historia" TEXT NOT NULL DEFAULT '',
ADD COLUMN     "ideais" TEXT NOT NULL DEFAULT '',
ADD COLUMN     "inventario" JSONB NOT NULL DEFAULT '[]',
ADD COLUMN     "vida" JSONB NOT NULL DEFAULT '{"atual":10,"maximo":10}';
