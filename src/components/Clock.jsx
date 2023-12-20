export default function Clock({time}){
    return(
        <div>
            {
                time>-5?
                    time<0?
                        <div>{time*(-1)}</div>:
                        <div>{120-time}s</div>:
                    <div>0</div>
            }
        </div>
    )
}