-- DropIndex
DROP INDEX `Expense_date_idx` ON `expense`;

-- DropIndex
DROP INDEX `Income_date_idx` ON `income`;

-- CreateTable
CREATE TABLE `Goal` (
    `goal_id` INTEGER NOT NULL AUTO_INCREMENT,
    `user_id` INTEGER NOT NULL,
    `name` VARCHAR(191) NOT NULL,
    `description` VARCHAR(191) NULL,
    `target_amount` DECIMAL(10, 2) NOT NULL,
    `current_amount` DECIMAL(10, 2) NOT NULL,
    `deadline` DATETIME(3) NULL,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    INDEX `Goal_deadline_idx`(`deadline`),
    PRIMARY KEY (`goal_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateIndex
CREATE INDEX `Expense_date_idx` ON `Expense`(`date` DESC);

-- CreateIndex
CREATE INDEX `Income_date_idx` ON `Income`(`date` DESC);

-- AddForeignKey
ALTER TABLE `Goal` ADD CONSTRAINT `Goal_user_id_fkey` FOREIGN KEY (`user_id`) REFERENCES `User`(`user_id`) ON DELETE RESTRICT ON UPDATE CASCADE;
