import { Request, ResponseToolkit } from '@hapi/hapi';
import { Agreement } from '../../../../common/api-types';
import AgreementModel from '../../../db/models/agreement-model';

export async function handlePostAgreement(request: Request, _rt: ResponseToolkit): Promise<Agreement> {
  const agreementData = request.payload as Agreement;
  const agreement = await AgreementModel.create(agreementData);
  return agreement;
}
