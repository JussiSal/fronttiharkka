import React, { useState, useEffect, createRef } from 'react'
import FullCalendar from '@fullcalendar/react'
import dayGridPlugin from '@fullcalendar/daygrid'
import timeGridPlugin from '@fullcalendar/timegrid'
import interactionPlugin from '@fullcalendar/interaction' 
import './calendar.scss'

export default function Kalenteri() {

    let calendarComponentRef = createRef();

    const [calendarEvents, setCalendarEvents] = useState([{title: '', start: '', end:''}]);
    
    useEffect(() => {
        getTrainings();

    }, [])

    const getTrainings = () => {
        fetch('https://customerrest.herokuapp.com/gettrainings')
            .then(response => response.json())
            .then(
                data => {
                    let data2 = data;
                    newEvent(data2)
                })
            .catch(err => console.error(err))
    }

    function newEvent(data)
    {
        let events = Array();
        data.map((data2, index) => {
            let uusiDate = new Date(data2.date); // taas tulee ongelmia ajan kanssa ilman tätä
            uusiDate.setMinutes(uusiDate.getMinutes() + data2.duration)
            events.push({title: data2.activity + " - " + data2.customer.lastname, start: data2.date, end: uusiDate})
        })
        setCalendarEvents(events);
    }

    return (
            <div>
                <FullCalendar
                    defaultView="dayGridMonth"
                    header={{
                        left: 'prev,next today',
                        center: 'title',
                        right: 'dayGridMonth,timeGridWeek,timeGridDay,listWeek'
                    }}
                    plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
                    ref={calendarComponentRef}
                    events={calendarEvents}
                />
            </div>
    )
}