import { AgreementType, ServiceType } from "../common/api-types";

export function friendlyServiceType(type: ServiceType | undefined) {
  switch (type) {
    case ServiceType.BANK_ACCOUNT:
      return "Bank account";
    case ServiceType.CREDIT_CARD:
      return "Credit card";
    case ServiceType.MORTAGE:
      return "Mortage";
    case ServiceType.STUDENT_LOAN:
      return "Student loan";
  }
  return "";
}

export function friendlyAgreementType(type: AgreementType) {
  switch (type) {
    case AgreementType.BUSINESS:
      return "Business";
    case AgreementType.INDIVIDUAL:
      return "Individual";
    case AgreementType.LEGACY:
      return "Legacy";
    case AgreementType.BANK:
      return "Bank";
  }
}
