import { Injectable } from "@nestjs/common";
import { Prisma } from "@prisma/client";
import { PrismaService } from "src/config/lib/prisma/prisma.service";
import { ICheckInsRepository } from "./ICheckinsRepository";
import moment from "src/config/utils/moment";

@Injectable()
export class CheckinsPrismaRepository implements ICheckInsRepository {
	constructor(private prisma: PrismaService) {}

	async CreateCheckin(data: Prisma.checkinsUncheckedCreateInput) {
		const checkin = await this.prisma.checkins.create({
			data,
		});

		return checkin;
	}

	async FindCheckinByIdOnDate(id_user: string, created_at: Date) {
		const startOfday = new moment(created_at).startOf("day").toDate();
		const endOfday = new moment(created_at).endOf("day").toDate();

		const checkin = await this.prisma.checkins.findFirst({
			where: {
				id_user,
				created_at: {
					gte: startOfday,
					lte: endOfday,
				},
			},
		});

		return checkin;
	}

	async FindCheckinById(id_checkin: string) {
		const checkin = await this.prisma.checkins.findUnique({
			where: {
				id_checkin,
			},
		});

		return checkin;
	}

	async UpdateCheckin(data: {
		id_checkin: string;
		created_at: Date;
		validated_at: Date | null;
		id_user: string;
		id_gym: string;
	}) {
		const updatedCheckin = this.prisma.checkins.update({
			where: {
				id_checkin: data.id_checkin,
			},
			data,
		});

		return updatedCheckin;
	}

	async CountByUserId(id_user: string) {
		const countCheckins = await this.prisma.checkins.count({
			where: {
				id_user,
			},
		});

		return countCheckins;
	}

	async ListAllCheckinsHistoryOfUser(id_user: string, page: number) {
		const checkins = await this.prisma.checkins.findMany({
			where: {
				id_user,
			},
			take: 20,
			skip: (page - 1) * 20,
		});

		return checkins;
	}
}
