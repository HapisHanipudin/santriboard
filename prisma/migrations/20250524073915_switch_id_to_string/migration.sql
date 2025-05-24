/*
  Warnings:

  - The primary key for the `Assessment` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `AssessmentDetail` table will be changed. If it partially fails, the table could be left without primary key constraint.

*/
-- DropForeignKey
ALTER TABLE "AssessmentDetail" DROP CONSTRAINT "AssessmentDetail_assessmentId_fkey";

-- AlterTable
ALTER TABLE "Assessment" DROP CONSTRAINT "Assessment_pkey",
ALTER COLUMN "id" DROP DEFAULT,
ALTER COLUMN "id" SET DATA TYPE TEXT,
ADD CONSTRAINT "Assessment_pkey" PRIMARY KEY ("id");
DROP SEQUENCE "Assessment_id_seq";

-- AlterTable
ALTER TABLE "AssessmentDetail" DROP CONSTRAINT "AssessmentDetail_pkey",
ALTER COLUMN "id" DROP DEFAULT,
ALTER COLUMN "id" SET DATA TYPE TEXT,
ALTER COLUMN "assessmentId" SET DATA TYPE TEXT,
ADD CONSTRAINT "AssessmentDetail_pkey" PRIMARY KEY ("id");
DROP SEQUENCE "AssessmentDetail_id_seq";

-- AddForeignKey
ALTER TABLE "AssessmentDetail" ADD CONSTRAINT "AssessmentDetail_assessmentId_fkey" FOREIGN KEY ("assessmentId") REFERENCES "Assessment"("id") ON DELETE CASCADE ON UPDATE CASCADE;
