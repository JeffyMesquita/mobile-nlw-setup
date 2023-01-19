import { useState } from 'react';
import {
  ScrollView,
  View,
  Text,
  TextInput,
  KeyboardAvoidingView,
  TouchableOpacity,
} from 'react-native';
import { BackButton } from '../../components/BackButton';
import { Checkbox } from '../../components/Checkbox';
import { Feather } from '@expo/vector-icons'
import colors from 'tailwindcss/colors';

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
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: 100}}>
        <BackButton />

        <Text className="mt-6 text-white font-extrabold text-3xl">
          Criar Hábito
        </Text>

        <Text className="mt-6 text-white font-semibold text-base">
          Qual seu comprometimento?
        </Text>

        <TextInput className="h-12 pl-4 rounded-lg mt-3 bg-zinc-900 text-white border-2 border-zinc-400 focus:border-green-600" placeholder='Exercícios, dormir bem, etc...' placeholderTextColor={colors.zinc[400]} />

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

        <TouchableOpacity className='w-full h-14 flex-row items-center justify-center bg-green-600 rounded-md mt-6' activeOpacity={0.7}>
          <Feather name="check" size={20} color={colors.white} />
          <Text className='font-semibold text-base text-white ml-2'>
            Confirmar
          </Text>
        </TouchableOpacity>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}
