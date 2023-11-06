import { ICheckInsRepository } from "../repository/prismaRepository/prismaCheckinsRepository";

interface ICheckinUserHistoryRequest {
  id_user: string;
  page?: number;
}

interface GetUserMetricsRequest {
  id_user: string;
}

export class CheckinListHistoryService {
  constructor(private checkInsRepository: ICheckInsRepository) {}

  async ListAllCheckinsHistoryOfUser({
    id_user,
    page,
  }: ICheckinUserHistoryRequest) {
    const checkinsHistory =
      await this.checkInsRepository.ListAllCheckinsHistoryOfUser(
        id_user,
        page ?? 1
      );

    return checkinsHistory;
  }

  async CountByUserId({ id_user }: GetUserMetricsRequest) {
    const checkinsMetric = await this.checkInsRepository.CountByUserId(id_user);

    return checkinsMetric;
  }
}
