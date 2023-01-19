import { TouchableOpacity, Dimensions } from 'react-native';

const weekDays = 7;
const screenHorizontalPadding = (32 * 2) / 5;

export const dayMarginBetween = 8;
export const daySize =
  Dimensions.get('screen').width / weekDays - (screenHorizontalPadding + 5);

export function HabitDay() {
  return (
    <TouchableOpacity
      className="bg-zinc-800 rounded-lg border-2 m-1 border-zinc-700"
      style={{
        width: daySize,
        height: daySize,
      }}
      activeOpacity={0.7}
    />
  );
}
