import dotenv from 'dotenv'
import { connectDB } from './src/config/db.js'
import app from './app.js'

dotenv.config()

const PORT = process.env.PORT || 3000

app.listen(PORT, () => {
    connectDB()
    console.log('Server is running on http://localhost:' + PORT)
})