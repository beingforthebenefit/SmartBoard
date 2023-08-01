import React, { useEffect, useState } from 'react';
import { Calendar as BigCalendar, momentLocalizer } from 'react-big-calendar';
import moment from 'moment';
import ICAL from 'ical.js';
import 'react-big-calendar/lib/css/react-big-calendar.css';

type Event = { start: Date; end: Date; title: string; allDay: boolean; resource: { color: string; }; }

// Setup the localizer by providing the moment Object
const localizer = momentLocalizer(moment);

const Calendar = ({ icsUrls }) => {
  const [events, setEvents] = useState<Event[]>([]);

  useEffect(() => {
    Promise.all(
      icsUrls.map(url =>
        fetch(`https://cors-anywhere.herokuapp.com/${url}`)
          .then(response => response.text())
      )
    )
    .then(responses => {
      let allEvents: Event[] = [];

      responses.forEach((response, idx) => {
        const jcalData = ICAL.parse(response);
        const comp = new ICAL.Component(jcalData);
        const vevents = comp.getAllSubcomponents('vevent');

        vevents.forEach((vevent) => {
          const event = new ICAL.Event(vevent);

          if(event.startDate && event.endDate) {
            allEvents.push({
              start: event.startDate.toJSDate(),
              end: event.endDate.toJSDate(),
              title: event.summary,
              allDay: event.startDate.icaltype === 'date',
              // resource: { color: getColorByIndex(idx) }, // assume there is a getColorByIndex function to get color
              resource: { color: 'red' },
            });
          }
        });
      });

      setEvents(allEvents);
    })
    .catch(err => console.error(err));
  }, [icsUrls]);

  const minTime = new Date();
  minTime.setHours(8, 0, 0);

  const maxTime = new Date();
  maxTime.setHours(20, 0, 0);

  return (
    <div style={{ height: '560px' }}>
      <BigCalendar
        localizer={localizer}
        defaultDate={new Date()}
        defaultView="week"
        events={events}
        timeslots={1}
        showMultiDayTimes
        min={minTime}
        max={maxTime}
        startAccessor="start"
        endAccessor="end"
        style={{ height: 560 }}
        step={60}
        toolbar={false}
        eventPropGetter={event => ({
          style: {
            backgroundColor: event.resource.color,
          },
        })}
      />
    </div>
  );
};

export default Calendar;
