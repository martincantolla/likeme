const { Pool } = require('pg')
const pool = new Pool({
    host: 'localhost',
    user: 'postgres',
    password: 'postgres',
    database: 'likeme',
    port: 5432,
    allowExitOnIdle: true
})

const obtenerPosts = async () => {
    const { rows } = await pool.query("SELECT * FROM posts")
    console.log(rows)
    return rows
}

const agregarPost = async (titulo, img, descripcion) => {
    const consulta = "INSERT INTO posts VALUES (DEFAULT, $1, $2, $3)"
    const values = [titulo, img, descripcion];

    try {
    const result = await pool.query(consulta, values)
    console.log("post agregado");
    } catch (error) {
        console.error("Error al agregar el post:", error.message);
        throw error; // Optional: rethrow the error for better error handling
      }
}

const borrarPost = async (id) => {
    const consulta = "DELETE FROM posts WHERE ID = $1";
    const values = [id];

    try {
        const result = await pool.query(consulta, values);
        console.log("Post eliminado con exito")
    } catch(error) {
        console.error("Error al eliminar el post:", error.message);
    }
}

const darLike = async (id) => {

        const consulta = "UPDATE posts SET likes = likes + 1 WHERE id = $1";
        const values = [id];
      
        try {
          const result = await pool.query(consulta, values);
          console.log(`Likes incremented for post with ID ${id}`);
        } catch (error) {
          console.error("Error incrementing likes:", error.message);
          throw error; // Optional: rethrow the error for better error handling
        }
      };
      




module.exports = { agregarPost, obtenerPosts, borrarPost, darLike }