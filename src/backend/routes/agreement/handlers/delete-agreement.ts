import { notFound } from '@hapi/boom';
import { ResponseToolkit, Request } from '@hapi/hapi';
import AgreementModel from '../../../db/models/agreement-model';

export async function handleDeleteAgreement(request: Request, _rt: ResponseToolkit): Promise<null> {
  const id = parseInt(request.params.id, 10) as number;
  const agreement = await AgreementModel.findOne({ where: { id } });
  if (!agreement) {
    throw notFound();
  }
  await agreement.destroy();
  return null;
}
