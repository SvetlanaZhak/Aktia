export interface Customer {
  id: number;
  name: string;
  identificationNumber: string;
  agreements: Agreement[];
}

export interface Agreement {
  id: number;
  type: AgreementType;
  customerId: number;
  services: Service[];
  start: Date | string;
  end?: Date | string | null;
}

export interface Service {
  id: number;
  agreementId: number;
  type: ServiceType;
  fee: number;
}

export enum AgreementType {
  BUSINESS = 1,
  INDIVIDUAL = 2,
  LEGACY = 3,
  BANK = 4,
}
export enum ServiceType {
  BANK_ACCOUNT = 1,
  CREDIT_CARD = 2,
  MORTAGE = 3,
  STUDENT_LOAN = 4,
}
