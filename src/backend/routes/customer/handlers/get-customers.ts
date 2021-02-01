import { notFound } from "@hapi/boom";
import { ResponseToolkit, Request } from "@hapi/hapi";
import { Customer } from "../../../../common/api-types";
import CustomerModel from "../../../db/models/customer-model";

export async function handleGetCustomers(
  _r: Request,
  _rt: ResponseToolkit
): Promise<Customer[]> {
  const customers = await CustomerModel.scope("full").findAll();
  return customers;
}

export async function handleGetCustomer(
  request: Request,
  _rt: ResponseToolkit
): Promise<Customer> {
  const id = parseInt(request.params.id, 10) as number;
  const customer = await CustomerModel.scope("full").findOne({ where: { id } });
  if (!customer) {
    throw notFound();
  }
  return customer;
}
