/*
  Warnings:

  - The values [USER_PROMPT,SYSTEM_PROMPT] on the enum `PromptType` will be removed. If these variants are still used in the database, this will fail.

*/
-- AlterEnum
BEGIN;
CREATE TYPE "PromptType_new" AS ENUM ('USER', 'SYSTEM');
ALTER TABLE "Prompt" ALTER COLUMN "type" TYPE "PromptType_new" USING ("type"::text::"PromptType_new");
ALTER TYPE "PromptType" RENAME TO "PromptType_old";
ALTER TYPE "PromptType_new" RENAME TO "PromptType";
DROP TYPE "PromptType_old";
COMMIT;

-- CreateTable
CREATE TABLE "Action" (
    "id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "content" TEXT NOT NULL,
    "projectId" TEXT NOT NULL,

    CONSTRAINT "Action_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Action" ADD CONSTRAINT "Action_projectId_fkey" FOREIGN KEY ("projectId") REFERENCES "Project"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
