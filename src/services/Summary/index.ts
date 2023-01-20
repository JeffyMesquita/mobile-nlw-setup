import { api } from "../../lib/axios";
import { IGetSummaryResponse } from './types'

const getSummary = async (): Promise<IGetSummaryResponse> => {
  const response = await api
    .get('/summary')
    .then((response) => response)
    .catch((error) => error.response)

  return response?.data;
};

export {
  getSummary
}