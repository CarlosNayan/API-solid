import { ICheckInsRepository } from "../repository/checkinsRepository";

interface IGetUserMetricsRequest {
  id_user: string;
}

export class CheckinCountHistoryService {
  constructor(private checkInsRepository: ICheckInsRepository) {}

  async CountByUserId({ id_user }: IGetUserMetricsRequest): Promise<number> {
    const checkinsMetric = await this.checkInsRepository.CountByUserId(id_user);

    return checkinsMetric;
  }
}
