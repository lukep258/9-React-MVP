export default function UsernameInput(props){
    let defaultUser = ''
    const randomGuest=()=>{
        let roll10k = Math.floor(Math.random()*(10000))
        while(props.playerList[`guest${roll10k}`]){
            roll10k = Math.floor(Math.random()*(10000))
        }
        const guest=`guest${roll10k}`
        defaultUser=guest
        return defaultUser
    }
    const submitUser=(event)=>{
        if(event.key==='Enter'){
            let user
            event.target.value===''?
                user = defaultUser:
                user = event.target.value
            props.setUser(user)
            console.log(user)
            props.sendNewUser(user)
        }
    }
    return(
        <div>
            <input type="text" 
            placeholder={randomGuest()}
            onKeyUp={submitUser}/>
        </div>
    )
}
