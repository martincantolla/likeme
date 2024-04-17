import axios from "axios";
import { useEffect, useState } from "react";
import Form from "./components/Form";
import Post from "./components/Post";

const urlBaseServer = "http://localhost:3000";

function App() {
  const [titulo, setTitulo] = useState("");
  const [img, setImg] = useState("");
  const [descripcion, setDescripcion] = useState("");
  const [posts, setPosts] = useState([]);

  const getPosts = async () => {
    try {
      const { data: posts } = await axios.get(urlBaseServer + "/posts");
      setPosts([...posts]);
    } catch (error) {
      console.error("error fetching posts", error.message);
    }
  };

  const agregarPost = async () => {
    const post = { titulo, img, descripcion };
    console.log("Post data:", post);
    try {
      await axios.post(urlBaseServer + "/posts", post);
      getPosts();
    } catch (error) {
      console.error("Error al agregar el post:", error.message);
    }
  };

  const like = async (id) => {
    try {
      await axios.put(`${urlBaseServer}/posts/like/${id}`);
      // Update the likes for the specific post without mutating the original array
      setPosts((prevPosts) =>
        prevPosts.map((post) =>
          post.id === id ? { ...post, likes: post.likes + 1 } : post
        )
      );
    } catch (error) {
      console.error("Error incrementing likes:", error.message);
    }
  };

  // este método se utilizará en el siguiente desafío
  const eliminarPost = async (id) => {
    await axios.delete(urlBaseServer + `/posts/${id}`);
    getPosts();
  };

  const Form = ({ setTitulo, setImg, setDescripcion, agregarPost }) => {
    const handleSubmit = async (e) => {
      e.preventDefault();
      // Call agregarPost function with form data
      agregarPost();
      // Reset form input fields
      setTitulo("");
      setImg("");
      setDescripcion("");
    };
  };

  useEffect(() => {
    getPosts();
  }, []);

  return (
    <div className="App">
      <h2 className="py-5 text-center">&#128248; Like Me &#128248;</h2>
      <div className="row m-auto px-5">
        <div className="col-12 col-sm-4">
          <Form
            onSubmit={handleSubmit}
            setTitulo={setTitulo}
            setImg={setImg}
            setDescripcion={setDescripcion}
            agregarPost={agregarPost}
          />
        </div>
        <div className="col-12 col-sm-8 px-5 row posts align-items-start">
          {posts.map((post, i) => (
            <Post key={i} post={post} like={like} eliminarPost={eliminarPost} />
          ))}
        </div>
      </div>
    </div>
  );
}

export default App;
