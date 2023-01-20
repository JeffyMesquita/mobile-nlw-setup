import { AppResponse } from '../../AppResponse';

interface ICreateHabitParams {
  title: string;
  weekDays: number[];
}

interface IHabit {
  id: string;
}

interface ICreateHabitResponse extends AppResponse {
  data?: IHabit;
}

export type { ICreateHabitParams, ICreateHabitResponse };
