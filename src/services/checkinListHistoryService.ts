import { checkins } from "@prisma/client";
import { ICheckInsRepository } from "../repository/checkinsRepository";

interface ICheckinUserHistoryRequest {
  id_user: string;
  page?: number;
}

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
