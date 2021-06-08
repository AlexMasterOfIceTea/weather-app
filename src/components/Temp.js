import {formatTemp, toRoundC} from '../utils'

export default function Temp(props){
    let {temp, min, max} = props;
    min = toRoundC(min);
    max = toRoundC(max);
    return(
        <>
            <h1 id="temp">{formatTemp(temp)}</h1>
            <h3>{`${min}° / ${max}°`  }</h3>
        </>
    );
}