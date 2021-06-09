import Actionbar from "./Actionbar";

export default function DeniedPage(props){
    return (
        <div id="denied" style={{display: "flex", flexDirection: "column", alignContent: "center"}}>
            <h1>Denied Location request</h1>
            <p>Please Enter your city manually</p>
            <Actionbar callback={props.callback}/>
        </div>
    )
}