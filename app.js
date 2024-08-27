/*

TODO:

[ ] Replace Model with your own Mongoose model in ./models/model.js
[ ] Replace all 'Model' name references
[ ] Replace model parameters
[ ] Find all {} instances in urls and change to your preferred endpoint

*/

const express = require('express')
const morgan = require('morgan')
const util = require('util')
const app = express()

morgan.token('body', (req, res) => {
    return util.inspect(req.body)
})
app.use(morgan(':method :url :status :res[content-length] - :response-time ms :body'))

const Model = require('./models/model')

app.use(express.json())
app.use(express.static('dist'))

app.get('/api/{}', (req, resp, next) => {
    Model
        .find({})
        .then(r => {
            resp.json(n)
        })
        .catch(err => {
            next(err)
        })
})

app.get('/api/{}/:id', (req, resp, next) => {
    Model
        .findById(req.params.id)
        .then(r => {
            resp.json(r)
        })
        .catch(err => {
            next(err)
        })
})

app.post('/api/{}', (req, resp, next) => {
    const n = new Model({
        test: req.body.test,
    })
    n
        .save()
        .then(r => {
            resp.json(r)
        })
        .catch(err => {
            next(err)
        })
})

app.put('/api/{}/:id', (req, resp, next) => {
    const n = new Model({
        test: req.body.test,
    })
    Model
        .findByIdAndUpdate(req.params.id, n, {new: true, runValidators: true, context: 'query'})
        .then(r => {
            resp.json(r)
        })
        .catch(err => {
            next(err)
        })
})

app.delete('/api/{}/:id', (req, resp) => {
    Model
        .findByIdAndDelete(req.params.id)
        .then(r => {
            resp.status(204).end()
        })
        .catch(err => {
            next(err)
        })
})

const errorHandler = (err, req, resp, next) => {
    console.error(err.message)
    if (err.name === 'CastError') {
        return resp.status(400).send({error: 'malformatted id'})
    } else if (err.name === 'ValidationError') {
        return resp.status(400).json({error: err.message})
    }
    next(err)
}

app.use(errorHandler)
module.exports = app
