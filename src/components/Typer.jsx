export default function Typer(props){
    const wordArr = props.paragraph.map(word=>(word.split('')))
    let wordP=0
    let letterP=0
    const track=(event)=>{
        if(event.key===' '){
            wordP++
            letterP=0
            event.target.value=null
        }else{
            if(event.key===wordArr[wordP][letterP]){
                console.log('correct')
            }else if(event.key==='Backspace'){
                letterP--
            }
            letterP++
        }
        console.log(`this char: ${wordArr[wordP][letterP]}, key pressed:${event.key}`)
        console.log(`letterP: ${letterP}, wordP:${wordP}`)
        console.log(`value:${event.target.value}`)
    }
    return(
        <div>
            <input onKeyDown={track}/>
            {props.paragraph.join(' ')}
        </div>
    )
}