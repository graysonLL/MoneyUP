-- DropIndex
DROP INDEX `Expense_date_idx` ON `expense`;

-- DropIndex
DROP INDEX `Income_date_idx` ON `income`;

-- AlterTable
ALTER TABLE `goal` ADD COLUMN `achieved` BOOLEAN NOT NULL DEFAULT false;

-- CreateIndex
CREATE INDEX `Expense_date_idx` ON `Expense`(`date` DESC);

-- CreateIndex
CREATE INDEX `Income_date_idx` ON `Income`(`date` DESC);
