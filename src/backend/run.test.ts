import { Server } from "@hapi/hapi";
import { run } from "./run";
import fetch from "node-fetch";
import { sequelize } from "./db";
import CustomerModel from "./db/models/customer-model";
import { Agreement, Customer } from "../common/api-types";
import AgreementModel from "./db/models/agreement-model";
import { fetchJson } from "./utils";
import {
  testCustomers,
  testAgreements,
  testServices,
} from "../common/test-data";
import ServiceModel from "./db/models/service-model";

const apiUrl = "http://localhost:3001/api";

describe("Test main server functionality", () => {
  let server: Server;
  beforeAll(async () => {
    server = await run();
    await initTestData();
  });

  // TODO: test all CRUD functionalities for all tables
  // TODO: split tests of each endpoint into their own files

  it("Should get the right number of customers", async () => {
    const response = await fetch(apiUrl + "/customers");
    expect(response.status).toEqual(200);
    const data = (await response.json()) as Customer[];
    expect(data.length).toEqual(testCustomers.length);
  });

  it("Should get the right number of agreements", async () => {
    const response = await fetch(apiUrl + "/agreements");
    expect(response.status).toEqual(200);
    const data = (await response.json()) as Agreement[];
    expect(data.length).toEqual(testAgreements.length);
  });

  it("Should be able to update customer", async () => {
    const name = "Lana Zhak";
    const id = 1;
    const newData = { id, name };
    const response = await fetchJson(
      apiUrl + `/customer/${id}`,
      "PUT",
      newData
    );
    expect(response.status).toEqual(200);
    const data = (await response.json()) as Customer;
    expect(data.name).toEqual(name);
  });

  it("Should be able to update agreement", async () => {
    const agreement = testAgreements[0];
    const end = "2021-01-01T00:00:00.000Z";
    const response = await fetchJson(
      apiUrl + `/agreement/${agreement.id}`,
      "PUT",
      { ...agreement, end }
    );

    expect(response.status).toEqual(200);
    const data = (await response.json()) as Agreement;
    expect(data.end).toEqual(end);
  });

  it("Should be able to delete agreement", async () => {
    const agreement = testAgreements[3];
    const response = await fetchJson(
      apiUrl + `/agreement/${agreement.id}`,
      "DELETE"
    );
    expect(response.status).toEqual(204);
    const deletedAgreement = await AgreementModel.findOne({
      where: { id: agreement.id },
    });
    expect(deletedAgreement).toEqual(null);
  });

  afterAll(async () => {
    if (server) {
      await server.stop();
    }
    await sequelize.close();
  });
});

async function initTestData() {
  await CustomerModel.bulkCreate(testCustomers);
  await AgreementModel.bulkCreate(testAgreements);
  await ServiceModel.bulkCreate(testServices);
}
