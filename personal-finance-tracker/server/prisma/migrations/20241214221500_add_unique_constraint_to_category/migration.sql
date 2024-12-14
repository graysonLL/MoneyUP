/*
  Warnings:

  - A unique constraint covering the columns `[user_id,name,type]` on the table `Category` will be added. If there are existing duplicate values, this will fail.

*/
-- DropIndex
DROP INDEX `Expense_date_idx` ON `expense`;

-- DropIndex
DROP INDEX `Income_date_idx` ON `income`;

-- CreateIndex
CREATE UNIQUE INDEX `Category_user_id_name_type_key` ON `Category`(`user_id`, `name`, `type`);

-- CreateIndex
CREATE INDEX `Expense_date_idx` ON `Expense`(`date` DESC);

-- CreateIndex
CREATE INDEX `Income_date_idx` ON `Income`(`date` DESC);
