/*
  Warnings:

  - The values [USER,SYSTEM] on the enum `PromptType` will be removed. If these variants are still used in the database, this will fail.
  - You are about to drop the column `createAt` on the `Prompt` table. All the data in the column will be lost.

*/
-- AlterEnum
BEGIN;
CREATE TYPE "PromptType_new" AS ENUM ('USER_PROMPT', 'SYSTEM_PROMPT');
ALTER TABLE "Prompt" ALTER COLUMN "type" TYPE "PromptType_new" USING ("type"::text::"PromptType_new");
ALTER TYPE "PromptType" RENAME TO "PromptType_old";
ALTER TYPE "PromptType_new" RENAME TO "PromptType";
DROP TYPE "PromptType_old";
COMMIT;

-- AlterTable
ALTER TABLE "Prompt" DROP COLUMN "createAt",
ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP;
