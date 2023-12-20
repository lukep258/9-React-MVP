import '../App.css'

export default function Leaderboard({ranks,user,playAgain}){
    let rank

    const mapPlayers=()=>{
        let returnArr = []
        for(let i=0;i<ranks.length;i++){
            if(ranks[i].username===user){
                rank=i
            }
            returnArr.push([i,ranks[i].username,ranks[i].wpm])
        }
        returnArr = returnArr.map(arr=>(
            <p className='lbPlayers'>{arr[0]} - {arr[1]} - {arr[2]}wpm</p>
        ))
        return returnArr
    }
    return(
        <div id='leaderboard'>
            <h3 id='leaderboardTitle'>leaderboard</h3>
            <button onClick={playAgain} id='playAgainBTN'>Play Again</button>
            {mapPlayers()}
        </div>
    )
}