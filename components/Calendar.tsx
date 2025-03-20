import React, { useState } from "react";
import { View } from "react-native";
import { Calendar as RNCCalendar, DateData } from "react-native-calendars";
import { AgendaItem } from "../types";

interface CalendarProps {
  items: Record<string, AgendaItem[]>;
  onDayPress?: (day: string) => void;
}

const Calendar: React.FC<CalendarProps> = ({ items, onDayPress }) => {
  const [selectedDate, setSelectedDate] = useState<string | null>(null);

  // Transformamos `items` en `markedDates`
  const markedDates = Object.keys(items).reduce((acc, date) => {
    acc[date] = { marked: true };
    return acc;
  }, {} as Record<string, { marked: boolean }>);

  const handleDayPress = (day: DateData) => {
    setSelectedDate(day.dateString);
    if (onDayPress) {
      onDayPress(day.dateString);
    }
  };

  return (
    <View style={{ flex: 1 }}>
      <RNCCalendar
        onDayPress={handleDayPress}
        markedDates={{
          ...markedDates,
          ...(selectedDate ? { [selectedDate]: { selected: true } } : {}),
        }}
      />
    </View>
  );
};

export default Calendar;

