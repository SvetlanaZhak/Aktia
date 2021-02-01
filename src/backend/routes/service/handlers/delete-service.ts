import { notFound } from "@hapi/boom";
import { ResponseToolkit, Request } from "@hapi/hapi";
import ServiceModel from "../../../db/models/service-model";

export async function handleDeleteService(
  request: Request,
  _rt: ResponseToolkit
): Promise<null> {
  const id = parseInt(request.params.id, 10) as number;
  const service = await ServiceModel.findOne({ where: { id } });
  if (!service) {
    throw notFound();
  }
  await service.destroy();
  return null;
}
