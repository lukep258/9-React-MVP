import express from 'express'
import dotenv from 'dotenv'
import pg from 'pg'

dotenv.config()
const app=express()
const port=process.env.PORT

app.use(express.json())
app.use(express.static('dist'))

const init=()=>{
    testGet()

    app.listen(port,()=>{console.log(`listening on ${port}`)})
}

const testGet=()=>{
    app.get('*',(req,res)=>{
        const paramsArr=req.url.split('/')
        console.log('paramsArr:',paramsArr)
        pool.query('select * from players')
        .then(result=>(res.send(result.rows)))
    })
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