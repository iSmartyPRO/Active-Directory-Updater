const express = require("express")
const morgan = require("morgan")
const exphbs = require("express-handlebars")
const path = require("path")

const app = express()
const apiRoutes = require("./routes/api")
const { static } = require('express')

const hbs = exphbs.create({
    defaultLayout: 'main',
    extname: 'hbs',
})

app.engine('hbs', hbs.engine)
app.set('view engine', 'hbs')
app.set('views', 'views')

app.use(express.urlencoded({extended: true}))
app.use(express.json())
app.use(express.static('public'))
app.use('/public/uikit', express.static(path.join(__dirname, 'node_modules','uikit','dist')))
app.use(morgan('combined'))
app.use("/api", apiRoutes)

module.exports = app