import { api } from '../../lib/axios';
import { ICreateHabitParams, ICreateHabitResponse } from './types';

const createANewHabit = async ({
  title,
  weekDays,
}: ICreateHabitParams): Promise<ICreateHabitResponse> => {
  const response = await api
    .post('/habits', {
      title, weekDays
    })
    .then((res) => res)
    .catch((err) => err.response);

  return response.data;
};

export { createANewHabit };
