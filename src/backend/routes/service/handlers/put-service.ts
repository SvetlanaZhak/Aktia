import { badData, notFound } from "@hapi/boom";
import { ResponseToolkit, Request } from "@hapi/hapi";
import { Service } from "../../../../common/api-types";
import ServiceModel from "../../../db/models/service-model";

export async function handlePutService(
  request: Request,
  _rt: ResponseToolkit
): Promise<Service> {
  const id = parseInt(request.params.id, 10) as number;
  const serviceData = request.payload as Service;
  if (!id || id !== serviceData.id) {
    throw badData();
  }

  const [numUpdated, services] = await ServiceModel.update(serviceData, {
    where: { id },
    returning: true,
  });
  if (!numUpdated) {
    throw notFound();
  }
  return services[0];
}
