export default function Actionbar(props){
    return (
        <form 
            onSubmit={(e)=>{
                e.preventDefault();
                props.callback(e.target[0].value);
            }}>
            <input type="text" placeholder="Search..."></input>
        </form>
    );
}