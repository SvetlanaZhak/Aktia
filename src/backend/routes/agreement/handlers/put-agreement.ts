import { badData, notFound } from '@hapi/boom';
import { ResponseToolkit, Request } from '@hapi/hapi';
import { Agreement } from '../../../../common/api-types';
import AgreementModel from '../../../db/models/agreement-model';

export async function handlePutAgreement(request: Request, _rt: ResponseToolkit): Promise<Agreement> {
  const id = parseInt(request.params.id, 10) as number;
  const agreementData = request.payload as Agreement;
  if (!id || id !== agreementData.id) {
    throw badData();
  }

  const [numUpdated, agreements] = await AgreementModel.update(agreementData, { where: { id }, returning: true });
  if (!numUpdated) {
    throw notFound();
  }
  return agreements[0];
}
