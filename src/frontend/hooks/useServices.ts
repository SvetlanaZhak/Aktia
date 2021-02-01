import useAxios, { ResponseValues } from "axios-hooks";
import { AxiosPromise } from "axios";
import { Service } from "../../common/api-types";

export function useServices(): [
  ResponseValues<Service[] | undefined, any>,
  () => AxiosPromise<Service[] | undefined>
] {
  const [responseValues, getServices] = useAxios<Service[] | undefined>({
    url: `http://localhost:3001/api/services`,
    method: "GET",
  });
  return [responseValues, getServices];
}
