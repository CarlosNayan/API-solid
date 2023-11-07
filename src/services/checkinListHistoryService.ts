import { checkins } from "@prisma/client";
import { ICheckInsRepository } from "../types/RepositoryInterfaces/ICheckinsRepository";
import { ICheckinUserHistoryRequest } from "../types/ServicesInterfaces/ICheckinServices";

export class CheckinListHistoryService {
  constructor(private checkInsRepository: ICheckInsRepository) {}

  async ListAllCheckinsHistoryOfUser({
    id_user,
    page,
  }: ICheckinUserHistoryRequest): Promise<checkins[]> {
    const checkinsHistory =
      await this.checkInsRepository.ListAllCheckinsHistoryOfUser(
        id_user,
        page ?? 1
      );

    return checkinsHistory;
  }
}
