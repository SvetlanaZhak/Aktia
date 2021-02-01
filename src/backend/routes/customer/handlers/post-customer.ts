import { ResponseToolkit, Request } from "@hapi/hapi";
import { Customer } from "../../../../common/api-types";
import CustomerModel from "../../../db/models/customer-model";

export async function handlePostCustomer(
  request: Request,
  _rt: ResponseToolkit
): Promise<Customer> {
  const customerData = request.payload as Customer;

  const customer = await CustomerModel.create(customerData);
  return customer;
}
