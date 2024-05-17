-- CreateEnum
CREATE TYPE "Role" AS ENUM ('USER_ROLE', 'ADMIN_ROLE');

-- AlterTable
ALTER TABLE "users" ADD COLUMN     "roles" "Role"[];
