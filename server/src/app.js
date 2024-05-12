import Express from 'express'
const app = Express()
import authRouter from './routes/auth.routes.js'
import userRouter from './routes/user.routes.js'
import bodyParser from 'body-parser'
import cors from 'cors'

app.use(cors());
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }));
app.use('/auth', authRouter)
app.use('/users', userRouter)

export default app