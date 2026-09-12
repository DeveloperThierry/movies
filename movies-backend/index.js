// our server config
import express from "express" //import express
const app = express() // express instane, can define routes, middleware, etc

const port  = 3001

// one of the http verbs , fetching data from our resource
app.get("/", (req, res) => {
    res.send("movie app is running")
})

app.get("/getMovies", (req, res) => {
    res.send("Hey going to fetch movies for you")
})

app.listen(port, () => {
    console.log("Movie app is listening on port 3001. Access on http://localhost:3001")
})