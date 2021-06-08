import {toRoundC, getIconUrl, getHours, getWindDir, getImage} from '../utils';

//  Layout:

//  time&desc     icon    temp    prop w rain icon    windIcon    speed&dir
//  -----------------------------------------------------------------------

export default function ThreeHourForecast(props){
    const {data} = props;
    console.log("!!!", data);
    const deg = data.wind.deg;
    return(
        <div className="threeHourForecast">
            <div className="time">
                <h2>{getHours(data.dt)}</h2>
                <p>{data.weather[0].main}</p>
            </div>
            <img className="medium-icon" src={getIconUrl(data.weather[0].icon, 4)}/>
            <h2>{toRoundC(data.main.temp)+"°C"}</h2>
            <div className="percipitation">
                <p>{Math.round(data.pop*100) + "%"}</p>
                <img className="small-icon" src={getImage("raindrops.svg")}></img>
            </div>
            <div className="wind">
                <img className="small-icon" src={getImage("wind.svg")}></img>
                <div>
                    <p>{getWindDir(deg)}</p>
                    <p>{`${data.wind.speed}m/s`}</p>
                </div>
            </div>
        </div>
    )
}