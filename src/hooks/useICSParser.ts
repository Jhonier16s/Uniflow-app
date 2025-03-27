import { useState } from 'react';
import ICAL from 'ical.js';

interface Event {
  summary: string;
  start: string;
  end: string;
}

export default function useICSParser() {
  const [events, setEvents] = useState<Event[]>([]);

  const parseICS = (icsData: string) => {
    try {
      const jcalData = ICAL.parse(icsData);
      const comp = new ICAL.Component(jcalData);
      const vevents = comp.getAllSubcomponents('vevent');

      const parsedEvents: Event[] = vevents.map((event) => {
        const eventObj = new ICAL.Event(event);
        return {
          summary: eventObj.summary,
          start: eventObj.startDate.toString(),
          end: eventObj.endDate.toString(),
        };
      });

      setEvents(parsedEvents);
    } catch (error) {
      console.error('Error parsing .ics file:', error);
    }
  };

  return { events, parseICS };
}