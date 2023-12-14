import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";

function Modif() {
  const navigate = useNavigate();

  const [title, setTitle] = useState("");
  const [synopsis, setSynopsis] = useState("");
  const [author, setAuthor] = useState("");
  const [pub_year, setPub_year] = useState("");
  const [pages, setPages] = useState("");
  const [cover, setCover] = useState("");
  const [cost, setCost] = useState("");

  const { id } = useParams();

  useEffect(() => {
    axios.get("http://localhost:3002/novels/" + id).then((res) => {
      setTitle(res.data.title);
      setSynopsis(res.data.synopsis);
      setAuthor(res.data.author);
      setPub_year(res.data.pub_year);
      setPages(res.data.pages);
      setCover(res.data.cover);
      setCost(res.data.cost);
    })
  }, [id]);

  const handleSubmit = (e) => {
    e.preventDefault();

    const newNovel = {
      id: id,
      title: title,
      synopsis: synopsis,
      author: author,
      pub_year: parseInt(pub_year),
      pages: parseInt(pages),
      cover: cover,
      cost: parseFloat(cost),
    }

    axios.put(`http://localhost:3002/novels/${id}`, newNovel).then((res) => {
      console.log(res);
      navigate("/");
    })
      .catch((error) => {
        console.log(error);
        alert("Error ! Modification non effectuée");
      })
  }

  return (
    <>
      <div className="addCtn">
        <h2>Modify {title}</h2>
        <form onSubmit={handleSubmit}>
          <div className="box">
            <label>Title</label>
            <input
              className="inputAdd"
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </div>
          <div className="box">
            <label>Synopsis</label>
            <input
              className="inputAdd"
              type="text"
              value={synopsis}
              onChange={(e) => setSynopsis(e.target.value)}
            />
          </div>{" "}
          <div className="box">
            <label>Author</label>
            <input
              className="inputAdd"
              type="text"
              value={author}
              onChange={(e) => setAuthor(e.target.value)}
            />
          </div>
          <div className="box">
            <label>Published Year</label>
            <input
              className="inputAdd"
              type="text"
              value={pub_year}
              onChange={(e) => setPub_year(e.target.value)}
            />
          </div>{" "}
          <div className="box">
            <label>Pages</label>
            <input
              className="inputAdd"
              type="text"
              value={pages}
              onChange={(e) => setPages(e.target.value)}
            />
          </div>
          <div className="box">
            <label>Cover</label>
            <input
              className="inputAdd"
              type="text"
              value={cover}
              onChange={(e) => setCover(e.target.value)}
            />
          </div>
          <div className="box box2">
            {cover ? (
              <div className="imgCtn">
                {" "}
                <img
                  src={"images/" + cover.split(" ").join("_")}
                  alt=""
                />{" "}
              </div>
            ) : null}
          </div>
          <div>
            <div className="box">
              <label>Cost</label>
              <input
                className="inputAdd"
                type="text"
                value={cost}
                onChange={(e) => setCost(e.target.value)}
              />
            </div>
            <button className="submit" type="submit">
              Modify {title}
            </button>
          </div>
        </form>
      </div>
    </>
  );
}

export default Modif;