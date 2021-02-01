import useAxios, { ResponseValues } from "axios-hooks";
import { AxiosPromise, AxiosRequestConfig } from "axios";
import { Customer, Service } from "../../common/api-types";

const apiUrl = "http://localhost:3001/api";

export function useCustomers(): [
  ResponseValues<Customer[] | undefined, any>,
  () => AxiosPromise<Customer[] | undefined>
] {
  const [responseValues, getData] = useAxios<Customer[] | undefined>({
    url: `${apiUrl}/customers`,
    method: "GET",
  });
  return [responseValues, getData];
}

export function useEditServiceFee(
  id: number | undefined
): [
  ResponseValues<Service | undefined, any>,
  (config?: AxiosRequestConfig) => AxiosPromise<Service | undefined>
] {
  const [responseValues, putData] = useAxios<Service | undefined>(
    {
      url: `${apiUrl}/service/${id}`,
      method: "PUT",
    },
    { manual: true }
  );
  return [responseValues, putData];
}
