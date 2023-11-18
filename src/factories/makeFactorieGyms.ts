import { prismaGymsRepository } from "../repository/prismaRepository/prismaGymsRepository";
import { GymsNearbyService } from "../services/gymsNearbyService";
import { GymsRegisterService } from "../services/gymsRegisterService";
import { GymsSearchService } from "../services/gymsSearchService";

export function makeRegisterGymsServices() {
  const gymsRepository = new prismaGymsRepository();
  const gymsRegisterService = new GymsRegisterService(gymsRepository);

  return gymsRegisterService;
}

export function makeSearchGymsServices() {
  const gymsRepository = new prismaGymsRepository();
  const gymsSearchService = new GymsSearchService(gymsRepository);

  return gymsSearchService;
}

export function makeNearbyGymsServices() {
  const gymsRepository = new prismaGymsRepository();
  const gymsNearbyService = new GymsNearbyService(gymsRepository);

  return gymsNearbyService;
}
