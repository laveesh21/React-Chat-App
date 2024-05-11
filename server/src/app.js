import Express from 'express'
const app = Express()
import router from './routes/auth.routes.js'
import bodyParser from 'body-parser'

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }));
app.use('/auth', router)


export default app