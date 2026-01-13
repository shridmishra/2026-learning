import express from "express"
import {serve} from "inngest/express"
import { inngest } from "./inngest/client"

const app = express()
const port = 3000

app.use(express.json({limit:'4mb'}))
app.use((req,res,next)=>{
    console.log(`${req.method} ${req.path}`)
    next()
})

app.use("/api/inngest",serve({
    client:inngest,
    functions: []
}))

app.get("/",(req,res)=>{
    res.json({
        status: "healthy",
        message: "Express + inngest server running",
        endpoint: {
            inngest: "/api/inngest",
            test: "/test",
            testmulti:"/test-multi"
        }
    })
})

app.listen(port,()=>{
    console.log(`server: http://localhost:${port}`);
    
})