import { useCallback, useEffect, useState } from 'react';
import { View, Text, ScrollView, Alert } from 'react-native';
import { generateRangeDatesFromYearStart } from '../../utils/generateRangeBetweenDates';
import { getSummary } from '../../services/Summary';
import { ISummary } from '../../services/Summary/types';
import dayjs from 'dayjs';

import { HabitDay, daySize } from '../../components/HabitDay';
import { Header } from '../../components/Header';
import { useNavigation } from '@react-navigation/native';
import { Loading } from '../../components/Loading';

const weekDays = ['D', 'S', 'T', 'Q', 'Q', 'S', 'S'];
const datesFromYearStart = generateRangeDatesFromYearStart();
const minimumSummaryDatesSizes = 18 * 7;
const amountOfDaysToFill = minimumSummaryDatesSizes - datesFromYearStart.length;

export function Home() {
  const { navigate } = useNavigation();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [summaryData, setSummaryData] = useState<ISummary[]>([] as ISummary[]);

  const getSummaryData = useCallback(async () => {
    setIsLoading(true);
    const result = await getSummary();

    if (!result) {
      Alert.alert('Ops!', 'Error getting summary data');
      return;
    }

    if (result.data) {
      setSummaryData(result.data);
    }

    setIsLoading(false);
  }, []);

  useEffect(() => {
    getSummaryData();
  }, []);

  if (isLoading) {
    return <Loading />;
  }

  return (
    <View className="flex-1 bg-background px-8 pt-16">
      <Header />

      <View className="flex-row mt-6 mb-2">
        {weekDays.map((weekDay, i) => (
          <Text
            key={`${weekDay}-${i}`}
            className="text-zinc-400 text-xl font-bold text-center mx-1"
            style={{ width: daySize }}
          >
            {weekDay}
          </Text>
        ))}
      </View>

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{
          paddingBottom: 100,
        }}
      >
        {summaryData && (
          <View className="flex-row flex-wrap">
            {datesFromYearStart.map((date) => {
              const dayWithHabits = summaryData.find((day) => {
                return dayjs(date).isSame(day.date, 'day');
              });

              return (
                <HabitDay
                  date={date}
                  amount={dayWithHabits?.amount}
                  completed={dayWithHabits?.completed}
                  key={date.toISOString()}
                  onPress={() =>
                    navigate('habit', { date: date.toISOString() })
                  }
                />
              );
            })}
            {amountOfDaysToFill > 0 &&
              Array.from({ length: amountOfDaysToFill }).map((_, index) => (
                <View
                  key={index}
                  className="bg-zinc-800 rounded-lg border-2 m-1 border-zinc-700 opacity-40"
                  style={{ width: daySize, height: daySize }}
                />
              ))}
          </View>
        )}
      </ScrollView>
    </View>
  );
}
