import ProgressDisplay from './ProgressDisplay'
import Clock from './Clock'
import Typer from './Typer'

export default function Game({paragraph,setParagraph,wordP,setWordP,charP,setCharP,charCount,setCharCount,correctCount,setCorrectCount,time,sendProgress,playersProgress}){
    return(
        <div>
            <ProgressDisplay
                wordP={wordP}
                charCount={charCount}
                correctCount={correctCount}
                time={time}
                sendProgress={sendProgress}
                playersProgress={playersProgress}
            />
            <Clock time={time}/>
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
            />}
        </div>
    )
}