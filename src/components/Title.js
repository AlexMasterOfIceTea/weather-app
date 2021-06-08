export default function Title(props){
    const {city, country, description, icon} = props;

    return (
        <div id="title-container">
            <img className="big-icon" src={icon}/>
            <div className="city-container">
                <h1 id="city">{`${city},${country}`}</h1>
                <p id="description">{description}</p>
            </div>  
        </div>
    )
}