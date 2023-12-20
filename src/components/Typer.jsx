import '../App.css'

export default function Typer({paragraph,setParagraph,wordP,setWordP,charP,setCharP,charCount,setCharCount,correctCount,setCorrectCount,setDisplayLB}){
    let textManip=[...paragraph]
    const type=(event)=>{
        if(event.key.length>1&&event.key!=='Backspace'){
            return
        }
        if(event.key===' '){
            setWordP(wordP+1)
            setCharP(0)
            event.target.value=''
            console.log(`wordP: ${wordP}, paragraph.length: ${paragraph.length}`)
            if(wordP===paragraph.length){
                setDisplayLB(true)
            }
            if(charP<paragraph[wordP].length){
                setCharCount(charCount+(paragraph[wordP].length-charP))
            }
        }else if(paragraph[wordP][charP]&&event.key===paragraph[wordP][charP][0]){
            textManip[wordP][charP][1]=true
            setParagraph(textManip)
            setCharP(charP+1)
            setCharCount(charCount+1)
            setCorrectCount(correctCount+1)
        }else if(event.key==='Backspace'){
            if(charP>0){
                if(textManip[wordP][charP-1]){
                    textManip[wordP][charP-1][1]=null
                    setParagraph(textManip)
                }
                setCharP(charP-1)
                setCharCount(charCount-1)
            }
        }else{
            if(paragraph[wordP][charP]){
                textManip[wordP][charP][1]=false
                setParagraph(textManip)
                setCharCount(charCount+1)
            }
            setCharP(charP+1)
        }
    }

    return(
        <div>
            <input placeholder='TYPE HERE' onKeyDown={type} id='textInput' autoFocus/>
            <div id="text">
                {/* past words */}
                {
                    textManip.slice(0,wordP).length>0?
                        textManip.slice(0,wordP).map(wordArr=>{
                            wordArr=wordArr.map(charArr=>(
                                charArr[1]===true?
                                    <span className="correctChar">{charArr[0]}</span>:
                                    <span className="wrongChar">{charArr[0]}</span>
                            ))
                            return (<span className="textBlock">{wordArr} </span>)
                        }):
                        console.log('')
                }
                {/* current word */}
                {
                    textManip.slice(wordP,wordP+1).map(wordArr=>(
                        wordArr=wordArr.map(charArr=>(
                            charArr[1]===null?
                                <strong>{charArr[0]}</strong>:
                                charArr[1]===true?
                                    <strong className="correctChar">{charArr[0]}</strong>:
                                    <strong className="wrongChar">{charArr[0]}</strong>
                        ))
                    ))
                }
                {' '}
                {/* incoming words */}
                {
                    textManip.slice(wordP+1,textManip.length).map(wordArr=>{
                            wordArr=wordArr.map(charArr=>(
                            charArr[0]
                        ))
                        return wordArr.join('')
                    }).join(' ')
                }
            </div>
        </div>
    )
}
