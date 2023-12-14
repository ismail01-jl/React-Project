// ListCard.js

import axios from "axios";
import { useEffect, useState } from "react";
import Card from "./Card";
import "./main.css";

function ListCard() {
  const [cards, setCards] = useState([]);
  const [search, setSearch] = useState("");

  useEffect(() => {
    axios
      .get("http://localhost:3002/novels")
      .then((response) => {
        if (Array.isArray(response.data)) {
          setCards(response.data);
        }
      })
      .catch((error) => {
        console.error("Error", error);
      });
  }, []);

  const deleteProd = async (id) => {
    if (!window.confirm("Are you sure you want to delete")) {
      return;
    }

    axios
      .delete("http://localhost:3002/novels/" + id)
      .then(() => {
        console.log("successfully deleted!");
        setCards((prevNovels) => prevNovels.filter((card) => card.id !== id));
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const handleSearch = (e) => {
    setSearch(e.target.value);
  };

  const cardsF = cards.filter((card) =>
    card.title.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="listCards">
        <input
          className="input1"
          type="text"
          value={search}
          placeholder="Search"
          onChange={handleSearch}/>
      <div className="cards">
        <Card cards={cardsF} deleteProd={deleteProd} />
      </div>
    </div>
  );
}

export default ListCard;
