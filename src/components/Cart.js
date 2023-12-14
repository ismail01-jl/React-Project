import React from "react";
import { useShoppingCart } from "use-shopping-cart";
import { useNavigate } from "react-router-dom";
import { FaCircleMinus } from "react-icons/fa6";
import { FaPlusCircle } from "react-icons/fa";
import { TiDelete } from "react-icons/ti";
import "./main.css";
import StripeCheckout from "react-stripe-checkout";

const Cart = () => {
  const {
    cartDetails,
    removeItem,
    clearCart,
    totalPrice,
    cartCount,
    incrementItem,
    decrementItem,
  } = useShoppingCart();
  const navigate = useNavigate();

  const [payment, setpayment] = React.useState(false);
  const more = () => {
    navigate('/');
  };
  const onToken = (token) => {
    console.log(token);
    clearCart();
    navigate("/");
  };

  const commander = async () => {
    setpayment(true);
  };

  const clear = () => {
    clearCart();
  };
  const imprimer = () => {
    navigate("/pdfCart");
  };

  if (cartCount === 0) return <h1 className="empty">(◕‿◕)</h1>;

  return (
    <div className="container">
      {payment ? (
        <StripeCheckout
          token={onToken}
          stripeKey="pk_test_51OFzOVK2Vaf4s2jR2HKTcDfihcJCXOA58RUv7GQD3yUKhjkQmguOzifMiWuOtlDLSYcVi8BLWJ47jBqoGVn7Ba7g00GNHB9hpI"
          amount={totalPrice * 100}
          currency="USD"
        />
      ) : null}

      <div className="cards2">
        <div className="card2">
          <div className="img">
            <img />
          </div>
          <h5>Title</h5>
          <h5>Cost</h5>
          <h5>Tickets</h5>
          <div className="line2"></div>
        </div>
        {cartDetails &&
          Object.values(cartDetails).map((item) => (
            <div className="card2" key={item.id}>
              <div className="img">
                <img alt={item.title} src={item.cover} style={{ margin: "0 auto", maxHeight: "100%" }} />
              </div>
              <h5>{item.title}</h5>
              <h5>{item.cost ? item.cost + " $" : "Free"}</h5>
              <h5>{item.quantity}</h5>
              <div className="line2">
                <button
                  onClick={() => {
                    incrementItem(item.id);
                  }}
                >
                  <FaPlusCircle size={15} />{" "}
                </button>
                <button onClick={() => decrementItem(item.id)}>
                  <FaCircleMinus size={15} />{" "}
                </button>

                <button onClick={() => removeItem(item.id)}>
                  <TiDelete size={23} />{" "}
                </button>
              </div>
            </div>
          ))}
      </div>
      <div className="sideBar">
        <div className="nobody">
          <h5>Total amount</h5>
          <h5>{cartCount}</h5>
          <h5>Total payments</h5>
          <h5>{totalPrice} $</h5>
        </div>
        <div className="nobody2">
          <button onClick={more}>Add More Novels</button>
          <button onClick={commander}>Order</button>
          <button onClick={clear}>Cancel</button>
          <button onClick={imprimer}>Imprimer PDF</button>
        </div>
      </div>
    </div>
  );
};
export default Cart;
