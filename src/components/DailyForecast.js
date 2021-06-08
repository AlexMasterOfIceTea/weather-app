import Overview from './Overview'
import {toRoundC, getIconUrl, getHours} from '../utils'

export const getOverview = (json)=>{
    const view = [];
    for(let data of json){
        const title = getHours(data.dt);
        view.push(
        <Overview
            title={title}
            max={toRoundC(data.temp)}
            icon={getIconUrl(data.weather[0].icon, 2)}
        />);
    }
    return view;
} 

export default function DailyForecast({json}){  
    return(
        <div id="dailyForecast">
            {getOverview(json)}
        </div>
    );
}