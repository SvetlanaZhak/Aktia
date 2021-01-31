import { Server } from "@hapi/hapi";
import { run } from "./run";
import fetch from "node-fetch";
import { sequelize } from "./db";
import CustomerModel from "./db/models/customer-model";
import { Agreement, AgreementType, Customer } from "../common/api-types";
import AgreementModel from "./db/models/agreement-model";
import { fetchJson } from "./utils";

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
    const agreement = testAgreements[0];
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

const testCustomers: Customer[] = [
  {
    id: 1,
    name: "Lana",
    identificationNumber: "121189",
  },
  {
    id: 2,
    name: "Juho",
    identificationNumber: "123",
  },
  {
    id: 3,
    name: "Fred",
    identificationNumber: "45243",
  },
  {
    id: 4,
    name: "Tom",
    identificationNumber: "76",
  },
  {
    id: 5,
    name: "Pekka",
    identificationNumber: "5555",
  },
];

const testAgreements: Agreement[] = [
  {
    id: 1,
    type: AgreementType.BANK_ACCOUNT,
    customerId: 1,
    start: new Date("2020-01-01"),
  },
  {
    id: 2,
    type: AgreementType.CREDIT_CARD,
    customerId: 1,
    start: new Date("2020-01-01"),
  },
  {
    id: 3,
    type: AgreementType.STUDENT_LOAN,
    customerId: 1,
    start: new Date("2020-01-01"),
  },
  {
    id: 4,
    type: AgreementType.BANK_ACCOUNT,
    customerId: 2,
    start: new Date("2020-01-01"),
    end: new Date("2019-01-01"),
  },
  {
    id: 5,
    type: AgreementType.MORTAGE,
    customerId: 2,
    start: new Date("1980-01-01"),
    end: new Date("2019-01-01"),
  },
];

async function initTestData() {
  await CustomerModel.bulkCreate(testCustomers);
  await AgreementModel.bulkCreate(testAgreements);
}
