import dotenv from "dotenv"

dotenv.config()

const ENVIROMENT = {
    PORT: process.env.PORT,
    URL_BACKEND: process.env.URL_BACKEND,
    MONGO_DB_URL: process.env.MONGO_DB_URL,
    JWT_SECRET: process.env.JWT_SECRET
}

export default ENVIROMENT