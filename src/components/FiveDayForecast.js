import Overview from "./Overview";
import {getIconUrl, getWeekday, toRoundC, isToday, getImage, isSameDay} from '../utils';
import {useState} from "react";
import ThreeHourForecast from './ThreeHourForecast';

const getHeader = (data, day, setDay)=>{
    let list = [];
    for(let i=0; i<5; i++){
        let title = "Today";
        if(i == 1)
            title = "Tomorrow";
        else if(i > 1)
            title = getWeekday(data[i].dt);

        list.push(
            <div 
                onClick={()=>setDay(i)}
                className={i == day ? 'highlight' : 'wrapper'}>
                <Overview
                    title={title}
                    min={toRoundC(data[i].temp.min)}
                    max={toRoundC(data[i].temp.max)}
                    icon={getIconUrl(data[i].weather[0].icon, 2)}/>     
            </div>
        );
    }
    return (
        <div id="forecast-header">
            {list}
        </div>
    )
}

const getDividerWithSun = (time, icon) => {
    const d = new Date(time*1000);
    return (
        <div className="divider">
            <div className="divider-short"></div>
            <div className="rise">
                <img className="very-small-icon" src={getImage(icon)}></img>
                <p>{`${d.getHours()}:${d.getMinutes()}`}</p>
            </div>
            <div className="divider-short"></div>
        </div>
    )
}

const getDivider = (data, dt)=>{
    let i=0;
    while(i<data.length && !isSameDay(data[i].dt, dt))
        i++;
    const {sunrise, sunset} = data[i];
    const threeH = 3*60*60;
    console.log(dt, sunrise, sunset);
    if(sunrise >= dt && sunrise < dt+threeH)
        return getDividerWithSun(sunrise, "sunrise.svg");
    if(sunset >= dt && sunset < dt+threeH)
        return getDividerWithSun(sunset, "sunset.svg");
    return <div className="divider-long"></div>
}

const getContent = (daily, hourly, day)=>{
    const list = [];
    for(let data of hourly.list){
        if(!isToday(data.dt-(day*24*60*60)))
            continue;
        list.push(<ThreeHourForecast data={data}/>);
        list.push(getDivider(daily, data.dt));
    }
    return (
        <div id="forecast-content">
            {list}
        </div>
    )
}

export default function FiveDayForecast(props){
    const {hourly, daily} = props;
    const [day, setDay] = useState(0);

    return(
        <div id="fiveDayForecast">
            {getHeader(daily, day, setDay)}
            {getContent(daily, hourly, day)}
        </div>
    );
}