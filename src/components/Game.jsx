import ProgressDisplay from './ProgressDisplay'
import Clock from './Clock'
import Typer from './Typer'

export default function Game({paragraph,setParagraph,wordP,setWordP,charP,setCharP,charCount,setCharCount,correctCount,setCorrectCount,time,sendProgress,playersProgress,user,setDisplayLB}){
    if(time>130){
        setDisplayLB(true)
    }
    return(
        <div id='gameContainer'>
        <Clock time={time}/>
            <ProgressDisplay
                wordP={wordP}
                charCount={charCount}
                correctCount={correctCount}
                time={time}
                sendProgress={sendProgress}
                playersProgress={playersProgress}
                user={user}
            />
            {time>=0&&<Typer
                paragraph={paragraph}
                setParagraph={setParagraph}
                wordP={wordP}
                setWordP={setWordP}
                charP={charP}
                setCharP={setCharP}
                charCount={charCount}
                setCharCount={setCharCount}
                correctCount={correctCount}
                setCorrectCount={setCorrectCount}
                setDisplayLB={setDisplayLB}
            />}
        </div>
    )
}