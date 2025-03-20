import React from "react";
import { View, Text } from "tamagui";
import { Agenda } from "./Agenda";
import { AgendaItem } from "../types";
import Calendar from "./Calendar";

interface EventsContainerProps {
  items: Record<string, AgendaItem[]>;
}

const EventsContainer: React.FC<EventsContainerProps> = ({ items }) => {
  return (
    <View style={{ flex: 1 }}>
      <Agenda items={items} />
      <Calendar items={items}/>
    </View>
  );
};

export default EventsContainer;
