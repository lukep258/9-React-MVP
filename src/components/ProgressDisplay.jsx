import "../App.css"

export default function ProgressDisplay({wordP,charCount,correctCount,time,sendProgress,playersProgress,user}){
    let accuracy = correctCount/charCount||0
    let wpm = Math.ceil((wordP*accuracy/time)*60)||0
    if(time%2){sendProgress(wpm)}

    const mapPlayers=()=>{
        let returnArr = []
        for(let key in playersProgress){
            if(key!==user){
                returnArr.push([key,playersProgress[key]])
            }
        }
        returnArr = returnArr.map(player=>(
            <p className="gameWPM">{player[0]}: {player[1]} wpm</p>
        ))
        return returnArr
    }

    return(
        <div>
            <p className="gameWPM">you: {wpm} wpm</p>
            {mapPlayers()}
            {wordP>0&&<em id='accuracy'>accuracy: {Math.round(accuracy*10000)/100}%</em>}
        </div>
    )
}