import classes from "./CheckoutPage.module.css";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";

const Checkout = () => {
  const [activeUser, setActiveUser] = useState({});
  const [cartItems, setCartItems] = useState([]);

  const items = useSelector((state) => state.cart.items);

  function formatPrice(price) {
    return price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
  }
  // Lọc sản phẩm mà activeUser hiện tại đã thêm vào giỏ để render theo activeUser hiện tại và để tính total bên dưới
  const activeUserItems = cartItems.filter(
    (item) => item.activeUser.email === activeUser.email
  );
  // Tính toán bill tổng khách phải trả
  const total = () => {
    let total = 0;
    activeUserItems.forEach((item) => {
      const totalPrice = item.selectedProduct.price * item.quantity;
      total += totalPrice;
    });
    return total;
  };

  useEffect(() => {
    const storedCartItems = JSON.parse(localStorage.getItem("cart")) || [];
    setCartItems(storedCartItems);
    const activeUser = JSON.parse(localStorage.getItem("activeUser")) || {};
    setActiveUser(activeUser);
  }, []);
  return (
    <div style={{ fontStyle: "italic" }}>
      <div className="container-fluid background">
        <div className="row" style={{ padding: "100px", fontSize: "30px" }}>
          <span className="col-lg-6" style={{ padding: "100x" }}>
            CHECKOUT
          </span>
          <span className="col-lg-6" style={{ padding: "100x" }}>
            HOME/CART/CHECKOUT
          </span>
        </div>
      </div>
      {activeUser && (
        <div className="container pt-5">
          <h3>BILLING DETAILS</h3>
          <div className="row">
            <div className="col-lg-8">
              <div className="mt-3">
                <p>FULLNAME</p>
                <input
                  placeholder="Enter your fullname here!"
                  className={classes.input}
                />
              </div>
              <div className="mt-3">
                <p>EMAIL</p>
                <input
                  placeholder="Enter your email here!"
                  className={classes.input}
                />
              </div>
              <div className="mt-3">
                <p>PHONE NUMBER</p>
                <input
                  placeholder="Enter your Phone Number here!"
                  className={classes.input}
                />
              </div>
              <div className="mt-3">
                <p>ADDRESS</p>
                <input
                  placeholder="Enter your address here!"
                  className={classes.input}
                />
              </div>
            </div>
            <div className={`${classes.background} col-lg-4 p-3`}>
              <h3>YOUR ORDER</h3>
              {activeUserItems.map((item) => (
                <div
                  className="flex"
                  style={{
                    borderBottom: "1px solid var( --color-primary-grey)",
                  }}
                >
                  <p
                    style={{
                      fontWeight: "500",
                      width: "200px",
                      fontSize: "14px",
                    }}
                  >
                    {item.selectedProduct.name}
                  </p>
                  <p
                    style={{
                      fontWeight: "200",
                      fontSize: "14px",
                    }}
                  >
                    {formatPrice(item.selectedProduct.price)} VND
                  </p>
                  <p
                    style={{
                      fontWeight: "500",
                      fontSize: "14px",
                    }}
                  >
                    {" "}
                    x {item.quantity}
                  </p>
                </div>
              ))}
              <div className="flex">
                <p
                  style={{
                    fontWeight: "500",
                  }}
                >
                  TOTAL
                </p>
                <p>{formatPrice(total())} VND</p>
              </div>
            </div>
          </div>
          <div className="row">
            <div className="col-lg-8 flex mt-3 mb-3">
              <button className="button-dark">Place order</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Checkout;
