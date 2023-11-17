// src/tests/helpers/setup.ts

import { beforeEach } from "vitest";
import resetDb from "./resetDb";

if (!process.env.DATABASE_URL) {
  throw new Error("Please, provide a DATABASE_URL enviroment");
}

beforeEach(async () => {
  await resetDb();
});
