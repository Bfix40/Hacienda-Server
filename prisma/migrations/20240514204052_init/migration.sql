/*
  Warnings:

  - You are about to drop the column `available` on the `products` table. All the data in the column will be lost.
  - You are about to drop the column `name` on the `products` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[handle]` on the table `products` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `SKU` to the `products` table without a default value. This is not possible if the table is not empty.
  - Added the required column `barcode` to the `products` table without a default value. This is not possible if the table is not empty.
  - Added the required column `comparePrice` to the `products` table without a default value. This is not possible if the table is not empty.
  - Added the required column `grams` to the `products` table without a default value. This is not possible if the table is not empty.
  - Added the required column `handle` to the `products` table without a default value. This is not possible if the table is not empty.
  - Added the required column `stock` to the `products` table without a default value. This is not possible if the table is not empty.
  - Added the required column `title` to the `products` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX "products_name_key";

-- AlterTable
ALTER TABLE "products" DROP COLUMN "available",
DROP COLUMN "name",
ADD COLUMN     "SKU" TEXT NOT NULL,
ADD COLUMN     "barcode" TEXT NOT NULL,
ADD COLUMN     "comparePrice" DOUBLE PRECISION NOT NULL,
ADD COLUMN     "grams" DOUBLE PRECISION NOT NULL,
ADD COLUMN     "handle" TEXT NOT NULL,
ADD COLUMN     "stock" INTEGER NOT NULL,
ADD COLUMN     "title" TEXT NOT NULL,
ALTER COLUMN "price" DROP DEFAULT;

-- CreateIndex
CREATE UNIQUE INDEX "products_handle_key" ON "products"("handle");
