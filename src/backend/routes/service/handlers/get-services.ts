import { notFound } from "@hapi/boom";
import { ResponseToolkit, Request } from "@hapi/hapi";
import { Service } from "../../../../common/api-types";
import ServiceModel from "../../../db/models/service-model";

export async function handleGetServices(
  _r: Request,
  _rt: ResponseToolkit
): Promise<Service[]> {
  const services = await ServiceModel.findAll();
  return services;
}

export async function handleGetService(
  request: Request,
  _rt: ResponseToolkit
): Promise<Service> {
  const id = parseInt(request.params.id, 10) as number;
  const service = await ServiceModel.findOne({ where: { id } });
  if (!service) {
    throw notFound();
  }
  return service;
}
