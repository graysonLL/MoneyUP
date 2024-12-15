/*
  Warnings:

  - You are about to drop the column `current_amount` on the `goal` table. All the data in the column will be lost.
  - You are about to drop the column `description` on the `goal` table. All the data in the column will be lost.

*/
-- DropIndex
DROP INDEX `Expense_date_idx` ON `expense`;

-- DropIndex
DROP INDEX `Income_date_idx` ON `income`;

-- AlterTable
ALTER TABLE `goal` DROP COLUMN `current_amount`,
    DROP COLUMN `description`,
    ADD COLUMN `achieved_at` DATETIME(3) NULL;

-- CreateIndex
CREATE INDEX `Expense_date_idx` ON `Expense`(`date` DESC);

-- CreateIndex
CREATE INDEX `Income_date_idx` ON `Income`(`date` DESC);
