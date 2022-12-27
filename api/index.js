require('dotenv').config()
require('./mongo')

const Sentry = require('@sentry/node')
const Tracing = require('@sentry/tracing')
const express = require('express')
const app = express()
const cors = require('cors')

const notFound = require('./middleware/notFound.js')
const handleErrors = require('./middleware/handleErrors.js')

const usersRouter = require('./controllers/users')
const loginRouter = require('./controllers/login')
const notesRouter = require('./controllers/notes')

app.use(cors())
app.use(express.json())
app.use(express.static('../app/build')) // Path to React app

Sentry.init({
    dsn: 'https://59e8d8a601c9425b9e46d880b42ef8f3@o4504386325512192.ingest.sentry.io/4504386328592384',
    integrations: [
        // enable HTTP calls tracing
        new Sentry.Integrations.Http({ tracing: true }),
        // enable Express.js middleware tracing
        new Tracing.Integrations.Express({ app })
    ],
    // Set tracesSampleRate to 1.0 to capture 100%
    // of transactions for performance monitoring.
    // We recommend adjusting this value in production
    tracesSampleRate: 1.0
})
// RequestHandler creates a separate execution context using domains, so that every
// transaction/span/breadcrumb is attached to its own Hub instance
app.use(Sentry.Handlers.requestHandler())
// TracingHandler creates a trace for every incoming request
app.use(Sentry.Handlers.tracingHandler())

app.use('/api/users', usersRouter)
app.use('/api/login', loginRouter)
app.use('/api/notes', notesRouter)
if (process.env.NODE_ENV === 'test') {
    const testingRouter = require('./controllers/testing')
    app.use('/api/testing', testingRouter)
}
app.use(notFound)

app.use(Sentry.Handlers.errorHandler())
app.use(handleErrors)

const PORT = process.env.PORT || 3001
const server = app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})

module.exports = { app, server }
