import { Request, ResponseToolkit } from "@hapi/hapi";
import { Service } from "../../../../common/api-types";
import ServiceModel from "../../../db/models/service-model";

export async function handlePostService(
  request: Request,
  _rt: ResponseToolkit
): Promise<Service> {
  const serviceData = request.payload as Service;
  const service = await ServiceModel.create(serviceData);
  return service;
}
