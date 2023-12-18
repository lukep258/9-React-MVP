function UsernameInput(props){
    const randomGuest=()=>{
        let roll10k = Math.floor(Math.random()*(10000))
        while(props[`guest${roll10k}`]){
            roll10k = Math.floor(Math.random()*(10000))
        }
        const guest=`guest${roll10k}`
        return guest
    }
    return(
        <div>
            <input type="text" placeholder={randomGuest}/>
        </div>
    )
}

export default UsernameInput