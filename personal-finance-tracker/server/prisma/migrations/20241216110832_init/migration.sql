-- DropIndex
DROP INDEX `Expense_date_idx` ON `Expense`;

-- DropIndex
DROP INDEX `Income_date_idx` ON `Income`;

-- CreateIndex
CREATE INDEX `Expense_date_idx` ON `Expense`(`date` DESC);

-- CreateIndex
CREATE INDEX `Income_date_idx` ON `Income`(`date` DESC);
