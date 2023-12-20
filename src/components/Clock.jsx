import '../App.css'

export default function Clock({time}){
    return(
        <div id="clock">
            {
                time>-10?
                    time<0?
                        <p id='time'>starting in: {time*(-1)}s</p>:
                        <p id='time'>{120-time}s</p>:
                    <p id='time'>waiting on players</p>
            }
        </div>
    )
}