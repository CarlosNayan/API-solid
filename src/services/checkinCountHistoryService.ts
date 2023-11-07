import { ICheckInsRepository } from "../types/RepositoryInterfaces/ICheckinsRepository";
import { IGetUserMetricsRequest } from "../types/ServicesInterfaces/ICheckinServices";

export class CheckinCountHistoryService {
  constructor(private checkInsRepository: ICheckInsRepository) {}

  async CountByUserId({ id_user }: IGetUserMetricsRequest): Promise<number> {
    const checkinsMetric = await this.checkInsRepository.CountByUserId(id_user);

    return checkinsMetric;
  }
}
