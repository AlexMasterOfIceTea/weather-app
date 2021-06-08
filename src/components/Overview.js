export default function Overview({title, min, max, icon}){
    return (
        <div className="overview">
            <h4>{title}</h4>
            <p>{min ? `${min}°/${max}°` : `${max}°`}</p>
            <img className="small-icon" src={icon}></img>
        </div>
    );
}