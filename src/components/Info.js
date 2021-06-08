export default function Info({wind, pressure, humidity}){
    return (
        <div id="info">
            <div style={{display: "flex", flexDirection: "column"}}>
                <h3>Wind</h3>
                <p>{`${wind}m/s`}</p>
            </div>
            <div style={{display: "flex", flexDirection: "column"}}>
                <h3>Humidity</h3>
                <p>{`${humidity}%`}</p>
            </div>
            <div style={{display: "flex", flexDirection: "column"}}>
                <h3>Pressure</h3>
                <p>{`${pressure}hPa`}</p>
            </div>
        </div>
    )
}