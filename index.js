const express = require("express")
const { agregarPost, obtenerPosts, borrarPost, darLike} = require('./consultas')
const app = express();
const cors = require("cors")

app.listen(3000, console.log("servidor encendido"))

app.use(cors());

app.use(express.json())

app.get("/posts", async (req, res) => {
    const posts = await obtenerPosts()
    res.json(posts)
})

app.post("/posts", async (req, res) => {
    const { titulo, img, descripcion } = req.body
    await agregarPost(titulo, img, descripcion)
    res.send("Post agregado con exito")
})

app.delete("/posts/:id", async (req, res) => {
    const { id } = req.params
    await borrarPost(id)
    res.send("Post eliminado con exito")
})

app.put("/posts/like/:id", async (req, res) => {
    const { id } = req.params
    await darLike(id)
    res.send("Post Likeado con exito")
})
