export default function Typer(props){
    const wordArr = props.paragraph.map(word=>(word.split('')))
    let wordP=0
    let letterP=0
    const track=(event)=>{
        if(event.key===wordArr[wordP][letterP]){
            console.log('good test')
        }
    }
    return(
        <div>
            <input onKeyDown={track}/>
            {props.paragraph.join(' ')}
        </div>
    )
}