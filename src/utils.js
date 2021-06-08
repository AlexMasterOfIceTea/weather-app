export const kelvinToCelcius = (temp)=>temp-273.15;

export const formatTemp = (temp)=>{
    temp = Math.round(temp-273.15);
    if(temp > 0)
        return `+${temp}°C`;
    if(temp < 0)
        return `-${temp}°C`;
    return `${temp}°C`
}

export const toRoundC = (temp) => Math.round(kelvinToCelcius(temp));

export const convertAndFormat = (temp) => formatTemp(Math.round(kelvinToCelcius(temp)));

export const getIconUrl = (code, scale) => {
    if(scale)
        return `http://openweathermap.org/img/wn/${code}@${scale}x.png`;
    return `http://openweathermap.org/img/wn/${code}.png`;    
}

export const getHours = (dt)=>`${new Date(1000 * dt).getHours()}:00`;

export const getWindDir = deg => ["northerly", "easterly", "southerly", "westerly"][Math.round(deg/90) % 4];

export const getWeekday = dt => ["Monday", "Tuesday", "Wendsday", "Thursday", "Friday", "Saturday", "Sunday"][new Date(dt*1000).getDay()-1];

export const getImage = (path) => `${process.env.PUBLIC_URL}/${path}`;

export const isToday = dt => {
    const today = Date.now()/1000;
    const day = 24*60*60;
    const start = Math.floor(today/day)*day;
    return dt >= start && dt <= start+day;
}

export const isSameDay = (dt1, dt2)=> {
    const day = 24*60*60;
    const day1 = Math.floor(dt1/day)*day;
    const day2 = Math.floor(dt2/day)*day;

    return day1 === day2;
}