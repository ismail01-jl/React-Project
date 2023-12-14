import React from "react";
import { useShoppingCart } from "use-shopping-cart";
import { IoAddCircle } from "react-icons/io5";
import { BsWrenchAdjustableCircleFill } from "react-icons/bs";
import { MdDelete } from "react-icons/md";
import { Link } from "react-router-dom";
import Modif from "./Modif";

function Card({ cards, deleteProd }) {
  const { cartCount, addItem } = useShoppingCart();

  const addToCart = (product) => {
    const target = {
      id: product.id,
      nom_cours: product.title,
      synopsis: product.synopsis,
      author: product.author,
      cover: product.cover,
      pub_year: parseInt(product.pub_year),
      pages: parseInt(product.pages),
      cost: parseFloat(product.cost),
      quantity: 1,
    };
    addItem(target);
    console.log("zekhaziuaezhuaez", target);
  };

  return (
    <>
      {cards &&
        cards.map((card) => {
          return (
            <div className="card" key={card.id}>
              <div className="info">
                <p className="title">{card.title}</p>
                <div className="lineCard">
                  <p>{card.pub_year}</p>
                  <p>{card.cost}$</p>
                </div>
                <p className="plot">{card.synopsis}</p>
              </div>
              <div className="img">
                <img src={card.cover} alt={card.title} />
              </div>
              <div className="btns">
                <button onClick={() => addItem(card)}>
                  <IoAddCircle size={20} />
                </button>
                <button>
                  <Link exact to={`/Modif/${card.id}`} className="link">
                    <BsWrenchAdjustableCircleFill size={20} />
                  </Link>
                </button>
                <button>
                  <MdDelete
                    onClick={() => {
                      deleteProd(card.id);
                    }}
                    size={20}
                  />
                </button>
              </div>
            </div>
          );
        })}
    </>
  );
}

export default Card;
