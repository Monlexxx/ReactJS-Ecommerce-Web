import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";

import classes from "./CartPage.module.css";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faArrowLeftLong,
  faTrashCan,
  faCaretLeft,
  faCaretRight,
  faGift,
  faArrowRightLong,
} from "@fortawesome/free-solid-svg-icons";

import { useEffect, useState } from "react";
import { cartActions } from "../store";

const Cart = () => {
  const [cartItems, setCartItems] = useState([]);
  const [activeUser, setActiveUser] = useState({});
  const [quantity, setQuantity] = useState(1);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  function formatPrice(price) {
    return price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
  }
  // Hàm tính tổng bill khách phải trả
  const total = () => {
    const activeUserItems = cartItems.filter(
      (item) => item.activeUser.email === activeUser.email
    );
    let total = 0;
    activeUserItems.forEach((item) => {
      const totalPrice = item.selectedProduct.price * item.quantity;
      total += totalPrice;
    });
    return total;
  };

  const updatedCartItems = [...cartItems];
  // Click vào mũi tên giảm, tìm sản phẩm tương ứng trong giỏ hàng và giảm số lượng đi 1
  const decreaseQuant = (product) => {
    if (product.quantity > 1) {
      const index = cartItems.findIndex(
        (item) =>
          item.selectedProduct.id === product.selectedProduct.id &&
          item.activeUser.email === activeUser.email
      );
      updatedCartItems[index].quantity -= quantity;
      localStorage.setItem("cart", JSON.stringify(updatedCartItems));
      dispatch(cartActions.updateCart(updatedCartItems));
    }
  };

  // Khi click vào mũi tên tăng, tìm sản phẩm trong giỏ tương ứng với activeUser và cộng số lượng thêm 1
  const increaseQuant = (product) => {
    const index = cartItems.findIndex(
      (item) =>
        item.selectedProduct.id === product.selectedProduct.id &&
        item.activeUser.email === activeUser.email
    );

    updatedCartItems[index].quantity += quantity;
    localStorage.setItem("cart", JSON.stringify(updatedCartItems));
    dispatch(cartActions.updateCart(updatedCartItems));
  };
  // Xử lý khi click vào hính thùng rác để xóa sản phẩm khỏi giỏ hàng, tìm kiểm sản phẩm được chọn trong giỏ ứng với activeUser hiện tại
  // Lọc ra những sản phẩm không trùng index sẽ là sản phẩm không xóa sau đó lưu lại vào local
  const deleteCart = (product) => {
    const index = cartItems.findIndex(
      (item) => item.selectedProduct.id === product.selectedProduct.id
    );
    const notDeletedItems = cartItems.filter((product, idx) => index !== idx);
    localStorage.setItem("cart", JSON.stringify(notDeletedItems));
    dispatch(cartActions.updateCart(notDeletedItems));
  };
  useEffect(() => {
    const storedCartItems = JSON.parse(localStorage.getItem("cart")) || [];
    setCartItems(storedCartItems);
  }, [updatedCartItems]);
  useEffect(() => {
    const activeUser = JSON.parse(localStorage.getItem("activeUser")) || {};
    setActiveUser(activeUser);
  }, []);
  return (
    <div style={{ fontStyle: "italic" }}>
      <div className="container-fluid background">
        <div className="row" style={{ padding: "100px", fontSize: "30px" }}>
          <span className="col-lg-6" style={{ padding: "100x" }}>
            SHOP
          </span>
          <span className="col-lg-6" style={{ padding: "100x" }}>
            shop
          </span>
        </div>
      </div>
      <div className="container pt-5">
        <h3 className="mb-3">SHOPPING CART</h3>
        <div className="row mb-3">
          <div className="col-lg-8">
            <table>
              <thead className={classes.thead}>
                <tr style={{ margin: "20px" }}>
                  <th>IMAGE</th>
                  <th>PRODUCT</th>
                  <th>PRICE</th>
                  <th>QUANTITY</th>
                  <th>TOTAL</th>
                  <th>REMOVE</th>
                </tr>
              </thead>
              {activeUser && (
                <tbody className={classes.tbody}>
                  {cartItems
                    .filter(
                      (item) => item.activeUser.email === activeUser.email
                    )
                    .map((item) => (
                      <tr key={item.selectedProduct.id}>
                        <th>
                          <img
                            alt={item.selectedProduct.name}
                            src={item.selectedProduct.image}
                            style={{ maxWidth: "100px" }}
                          />
                        </th>
                        <th className={classes.product}>
                          {item.selectedProduct.name}
                        </th>
                        <th>{formatPrice(item.selectedProduct.price)} VND</th>
                        <th>
                          <FontAwesomeIcon
                            style={{ padding: "0 6px" }}
                            icon={faCaretLeft}
                            onClick={() => decreaseQuant(item)}
                          />
                          {item.quantity}
                          <FontAwesomeIcon
                            style={{ padding: "0 6px" }}
                            icon={faCaretRight}
                            onClick={() => increaseQuant(item)}
                          />
                        </th>
                        <th>
                          {formatPrice(
                            item.quantity * item.selectedProduct.price
                          )}{" "}
                          VND
                        </th>
                        <th>
                          <FontAwesomeIcon
                            style={{ padding: "0 15px" }}
                            icon={faTrashCan}
                            onClick={() => deleteCart(item)}
                          />
                        </th>
                      </tr>
                    ))}
                </tbody>
              )}
            </table>
          </div>
          <div
            className="col-lg-4 p-3"
            style={{ backgroundColor: "var(--color-background)" }}
          >
            <h3>CART TOTAL</h3>
            <div
              className="flex"
              style={{
                borderBottom: "1px solid var( --color-primary-grey)",
              }}
            >
              <p>SUBTOTAL</p>
              <p>{formatPrice(total())} VND</p>
            </div>
            <div
              className="flex"
              style={{
                borderBottom: "1px solid var( --color-primary-grey)",
              }}
            >
              <p>TOTAL</p>
              <p>{formatPrice(total())} VND</p>
            </div>
            <div>
              <input
                placeholder="Enter your coupon"
                style={{ width: "100%" }}
              />
            </div>
            <div>
              <button
                className="button-dark button-outline"
                style={{ width: "100%" }}
              >
                <FontAwesomeIcon
                  icon={faGift}
                  style={{ marginRight: "10px" }}
                />
                Apply coupon
              </button>
            </div>
          </div>
        </div>
        <div className="row">
          <div
            className={`${classes[`button-group`]} col-lg-8 flex`}
            style={{ backgroundColor: "var(--color-background)" }}
          >
            <button
              className="button-transparent"
              onClick={() => {
                navigate("/shop");
              }}
            >
              <FontAwesomeIcon
                icon={faArrowLeftLong}
                style={{ marginRight: "10px" }}
              />
              Continue shopping
            </button>
            <button
              className={classes.checkout}
              onClick={() => {
                navigate("/checkout");
              }}
            >
              Proceed to check out
              <FontAwesomeIcon
                icon={faArrowRightLong}
                style={{ marginLeft: "10px" }}
              />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;
