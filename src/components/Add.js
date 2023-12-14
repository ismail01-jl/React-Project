import React, { useState } from "react";
import axios from "axios";
import "./add.css";

function Add() {
  const [title, setTitle] = useState("");
  const [synopsis, setSynopsis] = useState("");
  const [author, setAuthor] = useState("");
  const [pub_year, setPub_year] = useState("");
  const [pages, setPages] = useState("");
  const [cover, setCover] = useState("");
  const [cost, setCost] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    const newNovel = {
      title: title,
      synopsis: synopsis,
      author: author,
      pub_year: parseInt(pub_year),
      pages: parseInt(pages),
      cover: cover,
      cost: parseFloat(cost),
    };

    axios.post("http://localhost:3002/novels", newNovel).then((res) => {
        console.log(res);
      })
      .catch((error) => {
        console.log(error);
        alert("Error !");
      });
  };

  return (
    <div className="addCtn">
      <h2>Add Manga/Comics</h2>
      <form onSubmit={handleSubmit}>
        <div className="box">
          <label>Title</label>
          <input
            className="inputAdd"
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>{" "}
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
          <label>Chapters</label>
          <input
            className="inputAdd"
            type="text"
            value={pages}
            onChange={(e) => setPages(e.target.value)}
          />
        </div>
        <div className="box">
          <label>Poster/Cover</label>
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
            Add
          </button>
        </div>
      </form>
    </div>
  );
}

export default Add;
