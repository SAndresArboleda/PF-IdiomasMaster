import React, { useEffect, useState } from 'react'
import { Calendar, dayjsLocalizer } from 'react-big-calendar'
import dayjs from 'dayjs'
import "react-big-calendar/lib/css/react-big-calendar.css"
import { useTranslation } from 'react-i18next'
import "dayjs/locale/es"
import "dayjs/locale/fr"
import "dayjs/locale/en"
import "dayjs/locale/it"
import { useDispatch, useSelector } from 'react-redux'
import { getUserCourses } from '../../redux/action/actions'
import "./calendar.css"



export const CalendarSection = () => {

    const{ t } = useTranslation()
    const localizer = dayjsLocalizer(dayjs)
    const storedLanguage = localStorage.getItem("lang") 
    const [language, setLanguage] = useState(storedLanguage)
    const dispatch = useDispatch()
    const userCourses = useSelector((state) => state.userCourses);
    const [userLogin, setUserLogin] = useState(
      JSON.parse(localStorage.getItem("userData"))
    );
    useEffect(()=>{
      dispatch(getUserCourses(userLogin._id))
    },[])

    useEffect(() => {
      if (storedLanguage) { 
          setLanguage(storedLanguage) 
          if (storedLanguage === 'fr') {
              dayjs.locale("fr")
          }
          if (storedLanguage === 'en') {
              dayjs.locale("en")
          }
          if (storedLanguage === 'it') {
              dayjs.locale("it")
          }
          if (storedLanguage === 'es') {
              dayjs.locale("es")
          }
      }
  }, [storedLanguage])


    const messages = {
      allDay: t("TODO EL DÍA"),
      previous: t("ANTERIOR"),
      next: t("SIGUIENTE"),
      today: t("HOY"),
      month: t("MES"),
      week: t("SEMANA"),
      day: t("DIA"),
      agenda: t("AGENDA"),
      date: t("FECHA"),
      time: t("HORA"),
      event: t("EVENTO"),
      noEventsInRange: t("SIN EVENTOS"),

  };

  const events = userCourses.flatMap(c => {
    const startDate = dayjs(c.start_time).startOf('day');
    const endDate = dayjs(c.finish_time).endOf('day');
    const numberOfDays = endDate.diff(startDate, 'day') + 1;
  
    let startHour = 18; 
    let endHour = 20; 
    if (c.language === "Ingles") {
      startHour = 9; 
      endHour = 10; 
    } else if (c.language === "Frances") {
      startHour = 11; 
      endHour = 12; 
    } else if(c.language === "Aleman"){
      startHour = 13; 
      endHour = 16; 
    } else if(c.language === "Italiano"){
      startHour = 17; 
      endHour = 18; 
    } else if(c.language === "Holandes" ){
      startHour = 19; 
      endHour = 20; 
    } else if(c.language === "Portugues"){
      startHour = 21; 
      endHour = 22; 
    }
    
    const dailyEvents = [];
    for (let i = 0; i < numberOfDays; i++) {
      const currentDay = startDate.add(i, 'day');
  
      dailyEvents.push({
        start: currentDay.hour(startHour).toDate(), 
        end: currentDay.hour(endHour).toDate(), 
        title:`${t(`LANGUAGE_${c.language.toUpperCase()}`)} ${t(`NIVEL_${c.level.toUpperCase()}`)} `,
        data: {
          schedule: c.schedule
        }
      });
    }
  
    return dailyEvents;
  });
  
  
  
  const components = {
    event: props => {
      const eventSchedule = props?.event?.data?.schedule;
      const dayOfWeek = dayjs(props.event.start).day();
  
      switch (eventSchedule) {
        case "Durante la semana":
          if(!(dayOfWeek === 6 || dayOfWeek === 0)){
          return (
            <div className='bg-[#d34636] w-[100%] h-[100%] p-1 m-0'>
              {props.event.title}
            </div>
          );
          } else {
            return null;
          }
        case "Lunes, Miércoles, Viernes":
          if (dayOfWeek === 1 || dayOfWeek === 3 || dayOfWeek === 5) {
            return (
              <div className='bg-[#27a15a] w-full h-full p-1 '>
                {props.event.title}
              </div>
            );
          } else {
            return null; 
          }
        case "Martes, Jueves":
          if (dayOfWeek === 2 || dayOfWeek === 4) {
            return (
              <div className='bg-[#6C3483] w-full h-full p-1 m-0 border-'>
                {props.event.title}
              </div>
            );
          } else {
            return null; 
          }
          case "Fines de semana":
            if (dayOfWeek === 6 || dayOfWeek === 0) {
              return (
                <div className='bg-[#2b7bb1] w-full h-full p-1 m-0 border-'>
                  {props.event.title}
                </div>
              );
            } else {
              return null; 
            }
        default:
          return (
            <div className='bg-blue w-full h-full p-1 m-0 border-'>
              {props.event.title}
            </div>
          );
      }
    }
  };

  return (
    <div className='w-full h-full '>
        <Calendar
        localizer={localizer}
        messages={messages}
        events={events}
        components={components}
        />

    </div>
  )
}
