import { AppResponse } from '../../AppResponse';

interface ISummary {
  id: string;
  date: string;
  completed: number;
  amount: number;
}

interface IGetSummaryResponse extends AppResponse {
  data?: ISummary[];
}

export type { IGetSummaryResponse, ISummary };
