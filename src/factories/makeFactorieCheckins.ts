import { prismaCheckinsRepository } from "../repository/prismaRepository/prismaCheckinsRepository";
import { prismaGymsRepository } from "../repository/prismaRepository/prismaGymsRepository";
import { CheckinCountHistoryService } from "../services/checkinCountHistoryService";
import { CheckinListHistoryService } from "../services/checkinListHistoryService";
import { CheckinUserService } from "../services/checkinUserService";
import { CheckinUserValidateService } from "../services/checkinUserValidate";

export function makeCreateCheckinsServices() {
  const checkinsRepository = new prismaCheckinsRepository();
  const gymsRepository = new prismaGymsRepository();
  const checkinsRegisterService = new CheckinUserService(
    checkinsRepository,
    gymsRepository
  );

  return checkinsRegisterService;
}

export function makeCountHistoryCheckinsServices() {
  const checkinsRepository = new prismaCheckinsRepository();
  const checkinCountHistoryService = new CheckinCountHistoryService(
    checkinsRepository
  );

  return checkinCountHistoryService;
}

export function makeListHistoryCheckinsServices() {
  const checkinsRepository = new prismaCheckinsRepository();
  const checkinListHistoryService = new CheckinListHistoryService(
    checkinsRepository
  );

  return checkinListHistoryService;
}

export function makeValidateCheckinsServices() {
  const checkinsRepository = new prismaCheckinsRepository();
  const checkinUserValidateService = new CheckinUserValidateService(
    checkinsRepository
  );

  return checkinUserValidateService;
}
