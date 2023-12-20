export default function Leaderboard({ranks,user}){
    let rank

    const mapPlayers=()=>{
        let returnArr = []
        for(let i=0;i<ranks.length;i++){
            if(ranks[i].username===user){
                rank=i
            }
            returnArr.push(<p>{i} - {ranks[i].username}</p>)
        }
        console.log(returnArr)
        return returnArr
    }

    return(
        <div className="leaderBoard">
            <h3>leaderboard:</h3>
            <p>rank, username</p>
            {mapPlayers}
            <p>{rank}th place</p>
            <button>Play Again</button>
        </div>
    )
}