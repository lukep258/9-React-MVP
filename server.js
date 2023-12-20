import express from 'express'
import dotenv from 'dotenv'
import pg from 'pg'
import http from 'http'
import { Server } from 'socket.io'
import randomText from './prideandprejudice.js'

dotenv.config()
const app=express()
const port=process.env.PORT
const server=http.createServer(app)
const io=new Server(server)

app.use(express.json())
app.use(express.static('dist'))

const currLobbys=[
    {
        pCount:2,
        players:{'guest3425':0,'guest6345':0},
        inSession:true
    },
    {
        pCount:0,
        players:{},
        inSession:true
    }
]

const init=()=>{
    socketEvents()

    userIP()

    server.listen(port,()=>{console.log(`listening on ${port}`)})
}

const userIP=()=>{
    app.get('/players',(req,res)=>{
        pool.query('select * from players')
        .then(result=>{
            const pIPObj={}
            for(let player of result.rows){
                pIPObj[player.ip]=player.username
            }
            res.send(pIPObj)}
        )
    })
}

const socketEvents=()=>{
    io.on('connection',async(socket)=>{
        const clientIP = socket.handshake.address
        let room
        let dataInterval

        //checking for existing username with IP
        const username = await checkIP(clientIP)
        socket.emit('ipCheck',username)
        if(username!==null){
            room = joinLobby(username,socket)
            dataInterval = setInterval(()=>{
                io.to(room).emit('progress',currLobbys[room].players)
            },2000)
        }

        //creating a new user in database
        socket.once('newUser',(username)=>{
            createUser(username,clientIP)
            room = joinLobby(username,socket)
            dataInterval = setInterval(()=>{
                io.to(room).emit('progress',currLobbys[room].players)
            },2000)
        })

        // updating players on other players' progress
        socket.on('progress',(data)=>{
            currLobbys[data[0]].players[data[1]]=data[2]
        })

        socket.on('finished',(user)=>{
            console.log(user)
            clearInterval(dataInterval)
            pool.query(`update players set wpm=${currLobbys[room].players[user]} where username='${user}'`)
            .then(pool.query(`select username,wpm from players order by wpm desc`)
                .then(result=>(socket.emit('ranks',result.rows)))
            )
        })

        socket.on('playAgain',(user)=>{
            delete currLobbys[room].players[user]
            socket.leave(room)
            room = joinLobby(user,socket)
            dataInterval = setInterval(()=>{
                io.to(room).emit('progress',currLobbys[room].players)
            },2000)
        })

        // disconnect closure
        socket.on('disconnect',()=>{
            pool.query(`select username from players where IP='${clientIP}'`)
            .then(result=>{
                if(room){
                    delete currLobbys[room].players[result.rows[0].username]
                    console.log(`removing ${result.rows[0].username} from lobby ${room}`)
                }
            })
            
        })
    })
}

const checkIP=async(IP)=>{
    let user
    await pool.query(`select * from players where IP='${IP}'`)
    .then(result=>{
        if(result.rows.length===0){
            user=null
        }else{
            user=result.rows[0].username
        }
    })
    return user
}

const findLobby=()=>{
    let freeLobby=null
    let lobbyI=0
    while(freeLobby===null){
        if(currLobbys[lobbyI]===undefined){
            freeLobby=lobbyI
            currLobbys.push({pCount:0,players:{},inSession:false})
        }else{
            if(currLobbys[lobbyI].inSession===false){
                freeLobby=lobbyI
            }
        }
        lobbyI++
    }
    return freeLobby
}

const createUser=(username,IP)=>{
    pool.query(`insert into players (username,wpm,IP) values ('${username}',0,'${IP}')`)
    console.log(`new player user:${username}, IP:${IP}`)
}

const joinLobby=(username,socket)=>{
    const joiningLobby=findLobby()
    currLobbys[joiningLobby].players[username]=0
    currLobbys[joiningLobby].pCount++
    socket.join(joiningLobby)

    const send = [joiningLobby,randomText()]
    socket.emit('lobbyJoin',send)
    console.log(`${username} joining lobby ${joiningLobby}`)

    if(currLobbys[joiningLobby].pCount>1){
        io.to(joiningLobby).emit('startGame')
        setTimeout(()=>{currLobbys[joiningLobby].inSession=true},4000)
        console.log(`starting game in lobby ${joiningLobby} in 5s`)
    }

    return joiningLobby
}

const newPool=()=>{
    const connectionString=process.env.DATABASE_URL||{
        user: process.env.DB_USER,
        host: process.env.DB_HOST,
        database: process.env.DB_NAME,
        password: process.env.DB_PASSWORD,
        port: process.env.DB_PORT
    }

    const pool=new pg.Pool({connectionString})
    return pool
}

const pool = newPool()
init()