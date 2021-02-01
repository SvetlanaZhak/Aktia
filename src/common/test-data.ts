import {
  Agreement,
  AgreementType,
  Customer,
  Service,
  ServiceType,
} from "./api-types";

export const testCustomers: Customer[] = [
  {
    id: 1,
    name: "Lana",
    identificationNumber: "121189",
    agreements: [],
  },
  {
    id: 2,
    name: "Juho",
    identificationNumber: "123",
    agreements: [],
  },
  {
    id: 3,
    name: "Fred",
    identificationNumber: "45243",
    agreements: [],
  },
  {
    id: 4,
    name: "Tom",
    identificationNumber: "76",
    agreements: [],
  },
  {
    id: 5,
    name: "Pekka",
    identificationNumber: "5555",
    agreements: [],
  },
];

export const testAgreements: Agreement[] = [
  {
    id: 1,
    type: AgreementType.BUSINESS,
    customerId: 1,
    start: new Date("2020-01-01"),
    services: [],
  },
  {
    id: 2,
    type: AgreementType.INDIVIDUAL,
    customerId: 1,
    start: new Date("2020-01-01"),
    services: [],
  },
  {
    id: 3,
    type: AgreementType.LEGACY,
    customerId: 1,
    start: new Date("1999-01-01"),
    end: new Date("2010-01-01"),
    services: [],
  },
  {
    id: 4,
    type: AgreementType.INDIVIDUAL,
    customerId: 2,
    start: new Date("2019-01-01"),
    end: new Date("2020-01-01"),
    services: [],
  },
  {
    id: 5,
    type: AgreementType.LEGACY,
    customerId: 2,
    start: new Date("1980-01-01"),
    end: new Date("2019-01-01"),
    services: [],
  },
];

export const testServices: Service[] = [
  {
    id: 1,
    type: ServiceType.BANK_ACCOUNT,
    agreementId: 1,
    fee: 1000,
  },
  {
    id: 2,
    type: ServiceType.CREDIT_CARD,
    agreementId: 2,
    fee: 10,
  },
  {
    id: 3,
    type: ServiceType.MORTAGE,
    agreementId: 2,
    fee: 10,
  },
];
