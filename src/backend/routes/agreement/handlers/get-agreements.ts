import { notFound } from "@hapi/boom";
import { ResponseToolkit, Request } from "@hapi/hapi";
import { Agreement } from "../../../../common/api-types";
import AgreementModel from "../../../db/models/agreement-model";

export async function handleGetAgreements(
  _r: Request,
  _rt: ResponseToolkit
): Promise<Agreement[]> {
  const agreements = await AgreementModel.scope("full").findAll();
  return agreements;
}

export async function handleGetAgreement(
  request: Request,
  _rt: ResponseToolkit
): Promise<Agreement> {
  const id = parseInt(request.params.id, 10) as number;
  const agreement = await AgreementModel.scope("full").findOne({
    where: { id },
  });
  if (!agreement) {
    throw notFound();
  }
  return agreement;
}
