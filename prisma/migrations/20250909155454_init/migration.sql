/*
  Warnings:

  - You are about to drop the column `name` on the `Panel` table. All the data in the column will be lost.
  - Added the required column `panel_id` to the `Panel` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "public"."Panel" DROP COLUMN "name",
ADD COLUMN     "current" DOUBLE PRECISION NOT NULL DEFAULT 0.0,
ADD COLUMN     "dust" DOUBLE PRECISION NOT NULL DEFAULT 0.0,
ADD COLUMN     "panel_id" TEXT NOT NULL,
ADD COLUMN     "power" DOUBLE PRECISION NOT NULL DEFAULT 0.0,
ADD COLUMN     "pump_status" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "voltage" DOUBLE PRECISION NOT NULL DEFAULT 0.0,
ADD COLUMN     "wiper_status" BOOLEAN NOT NULL DEFAULT false;

-- AlterTable
ALTER TABLE "public"."Unit" ADD COLUMN     "current" DOUBLE PRECISION NOT NULL DEFAULT 0.0,
ADD COLUMN     "dust" DOUBLE PRECISION NOT NULL DEFAULT 0.0,
ADD COLUMN     "power" DOUBLE PRECISION NOT NULL DEFAULT 0.0,
ADD COLUMN     "voltage" DOUBLE PRECISION NOT NULL DEFAULT 0.0;
