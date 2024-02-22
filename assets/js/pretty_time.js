const DAYS_OF_WEEK = {
    0: 'воскресенье',
    1: 'понедельник',
    2: 'вторник',
    3: 'среда',
    4: 'четверг',
    5: 'пятница',
    6: 'суббота',
}
const PRETTY_MONTHS_MOD = {
    1: 'января',
    2: 'февраля',
    3: 'марта',
    4: 'апреля',
    5: 'мая',
    6: 'июня',
    7: 'июля',
    8: 'августа',
    9: 'сентября',
    10: 'октября',
    11: 'ноября',
    12: 'декабря',
}
const PRETTY_MONTHS = {
    1: 'январь',
    2: 'февраль',
    3: 'март',
    4: 'апрель',
    5: 'май',
    6: 'июнь',
    7: 'июль',
    8: 'август',
    9: 'сентябрь',
    10: 'октябрь',
    11: 'ноябрь',
    12: 'декабрь',
}


/* FOR TITLE SLUG */
function formatAiredOn(time) {
    const date = new Date(time)

    const day = date.getDate()
    const month = PRETTY_MONTHS_MOD[date.getMonth() + 1]
    const year = date.getFullYear()

    return day + ' ' + month + ' ' + year + ' г.'
}
function formatRelatedAiredOn(time) {
    const date = new Date(time)

    const month = PRETTY_MONTHS[date.getMonth() + 1]
    const year = date.getFullYear()
    return year + ', ' + month
}



/* FOR SCHEDULE */
function formatDelayTime(time){
    const date = new Date(time)

    const DayOfWeek = DAYS_OF_WEEK[date.getDay()]
    const day = date.getDate()
    const month = PRETTY_MONTHS_MOD[date.getMonth() + 1]
    const hour = date.getHours().toString().padStart(2, '0')
    const minute = date.getMinutes().toString().padStart(2, '0')

    return day+' '+month+' ('+DayOfWeek+') '+hour+':'+minute
}






function getYear(time) {
    const dateObject = new Date(time);
    return dateObject.getFullYear()
}




function getPastTime(time) {
    const postDate = new Date(time);
    const nowUtc = new Date();
    
    const secPassed = Math.floor(Math.max(0, nowUtc - postDate) / 1000)
    
    const minPassed = Math.floor(secPassed/60)
    if (minPassed==0) {
        return 'только что'
    }
    const hoursPassed = minPassed/60
    const daysPassed = hoursPassed/24

    // let prettyPassedTime
    // for (let i=0; i<=60; i++) {
    //     prettyPassedTime = formatTime(i*60*24*12*365) //24 min
    //     console.log(i,prettyPassedTime)
    // }
    const prettyPassedTime = formatTime(minPassed)

    return prettyPassedTime + ' назад'
}




function formatTime(min) {
    if (min<60) { // min
        return `${min} минут${getEnding(min, 'minute')}`
    } else if (min<1440) { // hour
        const hours = Math.floor(min/60)
        return `${hours} час${getEnding(hours, 'hour')}`
    } else if (min<10080) { // day
        const days = Math.floor(min/1440)
        return `${days} д${getEnding(days, 'day')}`
    } else if (min<43200) { // week
        const weeks = Math.floor(min/10080)
        return `${weeks} недел${getEnding(weeks, 'week')}`
    } else if (min<525600) { // month
        const months = Math.floor(min/43200)
        return `${months} месяц${getEnding(months, 'month')}`
    } else { // year
        const years = Math.floor(min/525600)
        return `${years} ${getEnding(years, 'year')}`
    }
    return 'error'
}

function getEnding(value, timeType='minute') {
    const allEndings = {
        'minute': {
            'accusative': 'у', // винительный падеж
            'nominative': 'ы', // именительный падеж
            'genitive': '' // родительный падеж
        },
        'hour': {
            'accusative': '', // винительный падеж
            'nominative': 'а', // именительный падеж
            'genitive': 'ов' // родительный падеж
        },
        'day': {
            'accusative': 'ень', // винительный падеж
            'nominative': 'ня', // именительный падеж
            'genitive': 'ней' // родительный падеж
        },
        'week': {
            'accusative': 'ю', // винительный падеж
            'nominative': 'и', // именительный падеж
            'genitive': 'ь' // родительный падеж
        },
        'month': {
            'accusative': '', // винительный падеж
            'nominative': 'а', // именительный падеж
            'genitive': 'ев' // родительный падеж
        },
        'year': {
            'accusative': 'год', // винительный падеж
            'nominative': 'года', // именительный падеж
            'genitive': 'лет' // родительный падеж
        },
    }

    const endings = allEndings[timeType]
    const lastDigit = value%10
    const isTeen = 10<=value%100&&value%100<=19
    if (lastDigit==1 && !isTeen) {
        return endings.accusative
    } else if (2<=lastDigit && lastDigit<=4 && !isTeen) {
        return endings.nominative
    }
    return endings.genitive
}





/* USED IN INDEX PAGE TO FETCH TITLES AIRED ON CURRENT SEASON */
function getCurrentSeasonDate() {
    const today = new Date();
    const dd = String(today.getDate()).padStart(2, '0');
    const mm = parseInt(today.getMonth() + 1); //January is 0!
    const mmIndex = mm-1
    const yyyy = today.getFullYear();

    const seasons = {
        0: 'Зима',
        1: 'Весна',
        2: 'Лето',
        3: 'Осень'
    }
    // each element in arr is month. value is appropriate season to a month
    // First element is January (index=0) 
    const monthSeasons = [0,0,1,1,1,2,2,2,3,3,3,0]
    const currentSeason = monthSeasons[mmIndex]

    // find index of first month in the season and add 1 to get actual month (e.g. for summer its 6)
    let firstMonthOfCurrentSeason = monthSeasons.findIndex((el)=> {
        return el==currentSeason
    }) + 1
    firstMonthOfCurrentSeason = String(firstMonthOfCurrentSeason).padStart(2, '0')

    const prettyCurrentSeason = seasons[currentSeason]
    const currentSeasonDate = `${yyyy}-${firstMonthOfCurrentSeason}-01`
    return {
        'name': prettyCurrentSeason,
        'date': currentSeasonDate
    }
}




function getCurrentSeasonAndShift() {
    const now = new Date();
    const month = now.getMonth() + 1; // Месяцы в JavaScript начинаются с 0
  
    if (month >= 3 && month <= 5) {
      return {
        season: 'Весна',
        shift: 0.25
      };
    } else if (month >= 6 && month <= 8) {
      return {
        season: 'Лето',
        shift: 0.5
      };
    } else if (month >= 9 && month <= 11) {
      return {
        season: 'Осень',
        shift: 0.75
      };
    } else {
      return {
        season: 'Зима',
        shift: 0
      };
    }
}


/* FORMS ARRAY OF SEASONS NEEDED ON TITLES PAGE-> FILTERS */
function getYearsAndSeasonsPeriod() {
    /* seasonArray will take form like this:
    let seasonArray = [
        {
            name: '1980е',
            date: '1980-01-01 1989-12-31'
        },
        {
            name: '2023',
            date: '2023-01-01 2023-12-31'
        },
    ]
    */

    let seasonArray = [
        {
            name: 'более старые',
            date: '1917-01-01 1979-12-31'
        }
    ]
    let arrObj = {}
    const currentDate = Date()
    const currentYear = getYear(currentDate)
    let step = 10
    let yearPointerStart = 1970 // start in result will be from 1980 !!!
    let yearPointerEnd = 1970 // end in result will be from 1989!
    yearPointerEnd += step-1
    /* 
        ADD YEARS IN RESULT ARRAY
    */
    while(yearPointerEnd < currentYear) {
        yearPointerStart += step

        // here we change steps of years cause we need
        // years with interval 1 (only one year) were no more than 3 (including current year. Not including is 2 (2/1))
        // years with interval 2 were no more than 3 (3 periods but 6 years at sum (7/2))
        // years with interval 5 were no more than 2 (10/step=5)
        // maximum years with interval 10 observing other conditions
        // it is no need to understand. All numbers and conditions taken from tests and brainstorm in excel to satisfy my need in season filter
        if (currentYear - (yearPointerEnd+1) <= 2) {
            step = 1
        }
        else if (currentYear - (yearPointerEnd+1) <= 7) {
            step = 2
        }
        else if (Math.floor(currentYear/10)*10 - (yearPointerEnd+1) <= 10) {
            step = 5
        }

        yearPointerEnd = yearPointerStart+step-1
        
        arrObj = {}

        let name = ''
        // change presentable view of years if it is XX age
        if (Math.floor(yearPointerStart/100) == 19) { 
            name = yearPointerStart+'е'
        } else { // XXI age
            if (yearPointerStart==yearPointerEnd) {
                name = String(yearPointerStart)
            } else {
                name = yearPointerStart+'-'+yearPointerEnd
            }
        }
        arrObj['name'] = name

        arrObj['date'] = yearPointerStart+'-01-'+'01' + ' ' + yearPointerEnd+'-12-'+'31'

        // arrObj['start'] = yearPointerStart
        // arrObj['end'] = yearPointerEnd
        // arrObj['date'] = {
        //     'start': yearPointerStart+'-01-'+'01',
        //     'end': yearPointerEnd+'-12-'+'31'
        // }

        seasonArray.push(arrObj)
    }


    /* 
        ADD SEASONS TO RESULT ARRAY. 4 IN SUM 
    */
    /* for 2023 year dates will be like this:
        ЗИМА
        2022-12-01 - 2023-02-28
        ВЕСНА
        2023-03-01 - 2023-05-31
        ЛЕТО
        2023-06-01 - 2023-08-31
        ОСЕНЬ
        2023-09-01 - 2023-11-30 
    */
    const seasonToDate = {
        'Зима': {
            start: (currentYear-1)+'-12-01',
            end: currentYear+'-02-28'
        },
        'Весна': {
            start: currentYear+'-03-01',
            end: currentYear+'-05-31'
        },
        'Лето': {
            start: currentYear+'-06-01',
            end: currentYear+'-08-31'
        },
        'Осень': {
            start: currentYear+'-09-01',
            end: currentYear+'-11-30'
        }
    }
    const shiftToSeason = {
        0: 'Зима',
        0.25: 'Весна',
        0.5: 'Лето',
        0.75: 'Осень'
    }
    const SeasonShift = getCurrentSeasonAndShift().shift
    // delete current year from result array if there will be only one season
    // seasonShift == 0 means there is one season in current year 
    if (SeasonShift == 0) {
        seasonArray.pop()
    }

    // currentSeasonShift show the first season that will be in result array
    // % 1 to take the fraction part. Need if SeasonShift = 0
    let currentSeasonShift = (1 - 0.75 + SeasonShift) % 1
    // if it is the last season in year isPrevYearOrCurrent will be 0 - will be current year
    // else it start by default from previous year (-1)
    let isPrevYearOrCurrent = SeasonShift==0.75 ? 0 : -1 // -1 means we will take prev year, 0 for current
    let currentSeasonYear
    let currentSeason
    // iterate 4 seasons
    for (let i=0; i<4; i++) {
        currentSeasonYear = currentYear + currentSeasonShift + isPrevYearOrCurrent
        currentSeason = shiftToSeason[currentSeasonShift]
        seasonArray.push({
            name: currentSeason + ' ' + Math.floor(currentSeasonYear),
            date: seasonToDate[currentSeason].start + ' ' + seasonToDate[currentSeason].end
            // start: currentSeasonYear,
            // end: currentSeasonYear,
            // date: {
            //     start: seasonToDate[currentSeason].start,
            //     end: seasonToDate[currentSeason].end
            // },
        })
        currentSeasonShift += 0.25 // move to one season forward
        currentSeasonShift %= 1 // take only the fraction part
        if (currentSeasonShift==0) isPrevYearOrCurrent=0
    }

    // console.log(seasonArray)
    // for (let obj of seasonArray) {
    //     console.log(obj)
    // }

    return seasonArray.reverse()
}









export {
    getPastTime, getYear, 
    getCurrentSeasonDate, getYearsAndSeasonsPeriod, 
    formatDelayTime, formatAiredOn, formatRelatedAiredOn
};