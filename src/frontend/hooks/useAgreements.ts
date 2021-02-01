import useAxios, { ResponseValues } from "axios-hooks";
import { AxiosPromise } from "axios";
import { Agreement } from "../../common/api-types";

export function useAgreements(): [
  ResponseValues<Agreement[] | undefined, any>,
  () => AxiosPromise<Agreement[] | undefined>
] {
  const [responseValues, getAgreements] = useAxios<Agreement[] | undefined>({
    url: `http://localhost:3001/api/agreements`,
    method: "GET",
  });
  return [responseValues, getAgreements];
}
