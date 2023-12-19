import ProgressDisplay from './ProgressDisplay'
import Clock from './Clock'
import Typer from './Typer'

export default function Game(){
    return(
        <div>
            <ProgressDisplay/>
            <Clock/>
            <Typer/>
        </div>
    )
}