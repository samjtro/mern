const app = require('./app')

const PORT = process.env.PORT

app.listen(PORT, () => {
    console.log(`[log] running on port:${PORT}`)
})
