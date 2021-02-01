import { notFound } from "@hapi/boom";
import { ResponseToolkit, Request } from "@hapi/hapi";
import CustomerModel from "../../../db/models/customer-model";

export async function handleDeleteCustomer(
  request: Request,
  _rt: ResponseToolkit
): Promise<null> {
  const id = parseInt(request.params.id, 10) as number;
  const customer = await CustomerModel.findOne({ where: { id } });
  if (!customer) {
    throw notFound();
  }
  await customer.destroy();
  return null;
}

// Client unit testing
// React unit testing
// Customers view
// Agreements view
// Services view
// Adding / updating services
// Updating services
