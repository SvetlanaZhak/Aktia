export interface Customer {
  id: number;
  name: string;
  identificationNumber: string;
}

export interface Agreement {
  id: number;
  type: AgreementType;
  customerId: number;
  start: Date | string;
  end?: Date | string | null;
}

export enum AgreementType {
  BANK_ACCOUNT = 1,
  CREDIT_CARD = 2,
  MORTAGE = 3,
  STUDENT_LOAN = 4,
}
