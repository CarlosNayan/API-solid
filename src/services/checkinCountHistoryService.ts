import { ICheckInsRepository } from "../repository/prismaRepository/prismaCheckinsRepository";

interface GetUserMetricsRequest {
  id_user: string;
}

export class CheckinCountHistoryService {
  constructor(private checkInsRepository: ICheckInsRepository) {}

  async CountByUserId({ id_user }: GetUserMetricsRequest) {
    const checkinsMetric = await this.checkInsRepository.CountByUserId(id_user);

    return checkinsMetric;
  }
}
