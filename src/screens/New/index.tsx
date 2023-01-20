import { useCallback, useState } from 'react';
import {
  ScrollView,
  View,
  Text,
  TextInput,
  KeyboardAvoidingView,
  TouchableOpacity,
  Alert,
} from 'react-native';
import { BackButton } from '../../components/BackButton';
import { Checkbox } from '../../components/Checkbox';
import { Feather } from '@expo/vector-icons';
import colors from 'tailwindcss/colors';
import { createANewHabit } from '../../services/Habit';
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
  const [title, setTitle] = useState<string>('');
  const [weekDays, setWeekDays] = useState<number[]>([]);

  function handleToggleWeekday(weekDayIndex: number) {
    if (weekDays.includes(weekDayIndex)) {
      setWeekDays((prevState) =>
        prevState.filter((weekDay) => weekDay !== weekDayIndex)
      );
    } else {
      setWeekDays((prevState) => [...prevState, weekDayIndex]);
    }
  }

  const postNewHabit = useCallback(
    async (sendTitle: string, sendWeekDays: number[]) => {
      const result = await createANewHabit({
        title: sendTitle,
        weekDays: sendWeekDays,
      });

      if (!result.data) {
        Alert.alert('Ops!','Houve um erro ao cadastrar o habito');
      }

      Alert.alert('Sucesso!',result.message);
    },
    []
  );

  async function handleCreateANewHabit() {
    if (!title.trim() || weekDays.length === 0) {
      Alert.alert(
        'Atenção!!',
        'É Necessário um Título e selecionar ao menos um dia da semana para criar um hábito.'
      );
    }

    postNewHabit(title, weekDays);
    setTitle('');
    setWeekDays([]);
  }

  return (
    <KeyboardAvoidingView className="flex-1 bg-background px-8 pt-16">
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 100 }}
      >
        <BackButton />

        <Text className="mt-6 text-white font-extrabold text-3xl">
          Criar Hábito
        </Text>

        <Text className="mt-6 text-white font-semibold text-base">
          Qual seu comprometimento?
        </Text>

        <TextInput
          className="h-12 pl-4 rounded-lg mt-3 bg-zinc-900 text-white border-2 border-zinc-400 focus:border-green-600"
          placeholder="Exercícios, dormir bem, etc..."
          placeholderTextColor={colors.zinc[400]}
          onChangeText={setTitle}
          value={title}
        />

        <Text className="font-semibold mt-4 text-white text-base">
          Qual a recorrência?
        </Text>

        {availableWeekDays.map((day, index) => {
          return (
            <Checkbox
              title={day}
              key={day}
              checked={weekDays.includes(index)}
              onPress={() => handleToggleWeekday(index)}
            />
          );
        })}
        <TouchableOpacity
          className="w-full h-14 flex-row items-center justify-center bg-green-600 rounded-md mt-6"
          activeOpacity={0.7}
          onPress={handleCreateANewHabit}
        >
          <Feather name="check" size={20} color={colors.white} />
          <Text className="font-semibold text-base text-white ml-2">
            Confirmar
          </Text>
        </TouchableOpacity>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}
