import { useState } from 'react';
import {
  ScrollView,
  View,
  Text,
  TextInput,
  KeyboardAvoidingView,
} from 'react-native';
import { BackButton } from '../../components/BackButton';
import { Checkbox } from '../../components/Checkbox';

const availableWeekDays = [
  'Domingo',
  'Segunda-Feira',
  'Terça-Feira',
  'Quarta-Feira',
  'Quinta-Feira',
  'Sexta-Feira',
  'Sábado',
];

export function New() {
  const [weekdays, setWeekDays] = useState<number[]>([]);

  function handleToggleWeekday(weekDayIndex: number) {
    if (weekdays.includes(weekDayIndex)) {
      setWeekDays((prevState) =>
        prevState.filter((weekDay) => weekDay !== weekDayIndex)
      );
    } else {
      setWeekDays((prevState) => [...prevState, weekDayIndex]);
    }
  }

  return (
    <KeyboardAvoidingView className="flex-1 bg-background px-8 pt-16">
      <ScrollView showsVerticalScrollIndicator={false}>
        <BackButton />

        <Text className="mt-6 text-white font-extrabold text-3xl">
          Criar Hábito
        </Text>

        <Text className="mt-6 text-white font-semibold text-base">
          Qual seu comprometimento?
        </Text>

        <TextInput className="h-12 pl-4 rounded-lg mt-3 bg-zinc-800 text-white focus:border-2 focus:border-green-600" />

        <Text className="font-semibold mt-4 text-white text-base">
          Qual a recorrência?
        </Text>

        {availableWeekDays.map((day, index) => {
          return (
            <Checkbox
              title={day}
              key={day}
              checked={weekdays.includes(index)}
              onPress={() => handleToggleWeekday(index)}
            />
          );
        })}
      </ScrollView>
    </KeyboardAvoidingView>
  );
}
