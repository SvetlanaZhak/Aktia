import { badData, notFound } from "@hapi/boom";
import { ResponseToolkit, Request } from "@hapi/hapi";
import { Customer } from "../../../../common/api-types";
import CustomerModel from "../../../db/models/customer-model";

export async function handlePutCustomer(
  request: Request,
  _rt: ResponseToolkit
): Promise<Customer> {
  const id = parseInt(request.params.id, 10) as number;
  const customerData = request.payload as Customer;
  if (!id || id !== customerData.id) {
    throw badData();
  }

  const [numUpdated, customers] = await CustomerModel.update(customerData, {
    where: { id },
    returning: true,
  });
  if (!numUpdated) {
    throw notFound();
  }
  return customers[0];
}
