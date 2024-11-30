/*
  Warnings:

  - The primary key for the `category` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `id` on the `category` table. All the data in the column will be lost.
  - The primary key for the `expense` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `categoryId` on the `expense` table. All the data in the column will be lost.
  - You are about to drop the column `id` on the `expense` table. All the data in the column will be lost.
  - You are about to drop the column `userId` on the `expense` table. All the data in the column will be lost.
  - The primary key for the `income` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `categoryId` on the `income` table. All the data in the column will be lost.
  - You are about to drop the column `id` on the `income` table. All the data in the column will be lost.
  - You are about to drop the column `userId` on the `income` table. All the data in the column will be lost.
  - The primary key for the `user` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `createdAt` on the `user` table. All the data in the column will be lost.
  - You are about to drop the column `id` on the `user` table. All the data in the column will be lost.
  - You are about to drop the column `name` on the `user` table. All the data in the column will be lost.
  - You are about to drop the `balance` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `category_id` to the `Category` table without a default value. This is not possible if the table is not empty.
  - Added the required column `type` to the `Category` table without a default value. This is not possible if the table is not empty.
  - Added the required column `user_id` to the `Category` table without a default value. This is not possible if the table is not empty.
  - Added the required column `category_id` to the `Expense` table without a default value. This is not possible if the table is not empty.
  - Added the required column `expense_id` to the `Expense` table without a default value. This is not possible if the table is not empty.
  - Added the required column `user_id` to the `Expense` table without a default value. This is not possible if the table is not empty.
  - Added the required column `category_id` to the `Income` table without a default value. This is not possible if the table is not empty.
  - Added the required column `income_id` to the `Income` table without a default value. This is not possible if the table is not empty.
  - Added the required column `user_id` to the `Income` table without a default value. This is not possible if the table is not empty.
  - Added the required column `first_name` to the `User` table without a default value. This is not possible if the table is not empty.
  - Added the required column `last_name` to the `User` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updated_at` to the `User` table without a default value. This is not possible if the table is not empty.
  - Added the required column `user_id` to the `User` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `balance` DROP FOREIGN KEY `Balance_userId_fkey`;

-- DropForeignKey
ALTER TABLE `expense` DROP FOREIGN KEY `Expense_categoryId_fkey`;

-- DropForeignKey
ALTER TABLE `expense` DROP FOREIGN KEY `Expense_userId_fkey`;

-- DropForeignKey
ALTER TABLE `income` DROP FOREIGN KEY `Income_categoryId_fkey`;

-- DropForeignKey
ALTER TABLE `income` DROP FOREIGN KEY `Income_userId_fkey`;

-- AlterTable
ALTER TABLE `category` DROP PRIMARY KEY,
    DROP COLUMN `id`,
    ADD COLUMN `category_id` INTEGER NOT NULL AUTO_INCREMENT,
    ADD COLUMN `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    ADD COLUMN `type` ENUM('income', 'expense') NOT NULL,
    ADD COLUMN `user_id` INTEGER NOT NULL,
    ADD PRIMARY KEY (`category_id`);

-- AlterTable
ALTER TABLE `expense` DROP PRIMARY KEY,
    DROP COLUMN `categoryId`,
    DROP COLUMN `id`,
    DROP COLUMN `userId`,
    ADD COLUMN `category_id` INTEGER NOT NULL,
    ADD COLUMN `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    ADD COLUMN `description` VARCHAR(191) NULL,
    ADD COLUMN `expense_id` INTEGER NOT NULL AUTO_INCREMENT,
    ADD COLUMN `user_id` INTEGER NOT NULL,
    MODIFY `amount` DECIMAL(10, 2) NOT NULL,
    ADD PRIMARY KEY (`expense_id`);

-- AlterTable
ALTER TABLE `income` DROP PRIMARY KEY,
    DROP COLUMN `categoryId`,
    DROP COLUMN `id`,
    DROP COLUMN `userId`,
    ADD COLUMN `category_id` INTEGER NOT NULL,
    ADD COLUMN `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    ADD COLUMN `description` VARCHAR(191) NULL,
    ADD COLUMN `income_id` INTEGER NOT NULL AUTO_INCREMENT,
    ADD COLUMN `user_id` INTEGER NOT NULL,
    MODIFY `amount` DECIMAL(10, 2) NOT NULL,
    ADD PRIMARY KEY (`income_id`);

-- AlterTable
ALTER TABLE `user` DROP PRIMARY KEY,
    DROP COLUMN `createdAt`,
    DROP COLUMN `id`,
    DROP COLUMN `name`,
    ADD COLUMN `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    ADD COLUMN `first_name` VARCHAR(191) NOT NULL,
    ADD COLUMN `last_name` VARCHAR(191) NOT NULL,
    ADD COLUMN `updated_at` DATETIME(3) NOT NULL,
    ADD COLUMN `user_id` INTEGER NOT NULL AUTO_INCREMENT,
    ADD PRIMARY KEY (`user_id`);

-- DropTable
DROP TABLE `balance`;

-- AddForeignKey
ALTER TABLE `Income` ADD CONSTRAINT `Income_user_id_fkey` FOREIGN KEY (`user_id`) REFERENCES `User`(`user_id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Income` ADD CONSTRAINT `Income_category_id_fkey` FOREIGN KEY (`category_id`) REFERENCES `Category`(`category_id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Expense` ADD CONSTRAINT `Expense_user_id_fkey` FOREIGN KEY (`user_id`) REFERENCES `User`(`user_id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Expense` ADD CONSTRAINT `Expense_category_id_fkey` FOREIGN KEY (`category_id`) REFERENCES `Category`(`category_id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Category` ADD CONSTRAINT `Category_user_id_fkey` FOREIGN KEY (`user_id`) REFERENCES `User`(`user_id`) ON DELETE RESTRICT ON UPDATE CASCADE;
