import "dotenv/config" //process env state
// our server config
import express from "express" //import express
import cors from "cors"
const app = express() // express instane, can define routes, middleware, etc
const port  = 3001
const apiKey = process.env.API_KEY
app.use(cors())
// one of the http verbs , fetching data from our resource
app.get("/", (req, res) => {
    res.send("movie app is running")
})


app.get("/getMovies/:searchQuery", async (req, res) => {
    const searchQuery = req.params.searchQuery
    const response = await fetch(`http://www.omdbapi.com/?apikey=${apiKey}&s=${searchQuery}`)
    const data = await response.json()
    console.log(data)
    res.send(data)
})


app.listen(port, () => {
    console.log("Movie app is listening on port 3001. Access on http://localhost:3001")
})