import express from "express"
import ENVIROMENT from "./src/config/enviroment.js"
import cors from "cors"
import mongoose from "./src/config/mongoDB.config.js"
import authRouter from "./src/routes/products.router.js"
import authRoutes from "./src/routes/authRoutes.js"

const app = express()
app.use(cors())
app.use(express.json())


app.use('/api/products', authRouter)
app.use("/api/auth", authRoutes)


app.listen(ENVIROMENT.PORT, ()=>{
    console.log(`el servidor se escucha en http://localhost:${ENVIROMENT.PORT}`)
})