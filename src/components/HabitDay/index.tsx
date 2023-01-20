import {
  TouchableOpacity,
  Dimensions,
  TouchableOpacityProps,
} from 'react-native';
import clsx from 'clsx';
import dayjs from 'dayjs';
import { generateProgressPercentage } from '../../utils/generateProgressPercentage';
import { useNavigation } from '@react-navigation/native';

const weekDays = 7;
const screenHorizontalPadding = (32 * 2) / 5;

export const dayMarginBetween = 8;
export const daySize =
  Dimensions.get('screen').width / weekDays - (screenHorizontalPadding + 5);

interface HabitDayProps extends TouchableOpacityProps {
  date: Date;
  amount?: number;
  completed?: number;
}
export function HabitDay({
  amount = 0,
  completed = 0,
  date,
  ...rest
}: HabitDayProps) {
  const { navigate } = useNavigation();
  const amountAccomplished =
    amount > 0 ? generateProgressPercentage(amount, completed) : 0;
  const today = dayjs().startOf('day').toDate();
  const isCurrentDay = dayjs(date).isSame(today);

  return (
    <TouchableOpacity
      className={clsx('rounded-lg border-2 m-1', {
        ['bg-zinc-900 border-zinc-800']: amountAccomplished === 0,
        ['bg-violet-900 border-violet-700']: amountAccomplished >= 80,
        ['bg-violet-800 border-violet-600']:
          amountAccomplished < 80 && amountAccomplished >= 60,
        ['bg-violet-700 border-violet-500']:
          amountAccomplished < 60 && amountAccomplished >= 40,
        ['bg-violet-600 border-violet-500']:
          amountAccomplished < 40 && amountAccomplished >= 20,
        ['bg-violet-500 border-violet-400']:
          amountAccomplished < 20 && amountAccomplished > 0,
        ['border-white border-3']: isCurrentDay,
      })}
      style={{
        width: daySize,
        height: daySize,
      }}
      activeOpacity={0.7}
      onPress={() => navigate('habit', { date: date.toISOString() })}
      {...rest}
    />
  );
}
