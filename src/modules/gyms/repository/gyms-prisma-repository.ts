import { Injectable } from "@nestjs/common";
import { Prisma, gym } from "@prisma/client";
import { PrismaService } from "src/config/lib/prisma/prisma.service";
import { IGymsRepository } from "./IGymRepository";

@Injectable()
export class GymsPrismaRepository implements IGymsRepository {
	constructor(private prisma: PrismaService) {}

	async CreateGym(data: Prisma.gymCreateInput) {
		const gym = this.prisma.gym.create({
			data,
		});

		return gym;
	}

	async SearchGymsNearby(user_latitude: number, user_longitude: number) {
		const nearbyGyms = this.prisma.$queryRaw<gym[]>`
		SELECT * from gym
		WHERE ( 6371 * acos( cos( radians(${user_latitude}) ) 
		* cos( radians( latitude ) ) 
		* cos( radians( longitude ) - radians(${user_longitude}) ) + sin( radians(${user_latitude}) ) 
		* sin( radians( latitude ) ) ) ) <= 10
		`;

		return nearbyGyms;
	}

	async SearchGym(query: string, page: number) {
		const gym = this.prisma.gym.findMany({
			where: {
				gym_name: {
					contains: query,
				},
			},
			take: 20,
			skip: (page - 1) * 20,
		});
		return gym;
	}

	async FindGymById(id_gym: string) {
		const gym = this.prisma.gym.findUnique({
			where: {
				id_gym,
			},
		});

		return gym;
	}
}
