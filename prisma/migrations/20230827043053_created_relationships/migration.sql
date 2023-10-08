-- AlterTable
ALTER TABLE "checkins" ADD COLUMN     "id_gym" TEXT NOT NULL,
ADD COLUMN     "id_user" TEXT NOT NULL;

-- AddForeignKey
ALTER TABLE "checkins" ADD CONSTRAINT "checkins_id_user_fkey" FOREIGN KEY ("id_user") REFERENCES "users"("id_user") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "checkins" ADD CONSTRAINT "checkins_id_gym_fkey" FOREIGN KEY ("id_gym") REFERENCES "gym"("id_gym") ON DELETE RESTRICT ON UPDATE CASCADE;
