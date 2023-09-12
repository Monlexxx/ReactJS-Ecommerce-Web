import { useSelector, useDispatch } from "react-redux";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCaretLeft } from "@fortawesome/free-solid-svg-icons";
import { faCaretRight } from "@fortawesome/free-solid-svg-icons";

import { cartActions } from "../store";

const Detail = () => {
  const [cartItems, setCartItems] = useState([]);
  const [activeUser, setActiveUser] = useState({});
  const [quantity, setQuantity] = useState(1);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  function formatPrice(price) {
    return price?.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
  }
  // Hàm xử lý xuống dòng khi gặp ký tự \n trong long description của api
  function desc(desc) {
    const lines = desc?.split("\n");
    return lines?.map((line, index) => <p key={index}>{line}</p>);
  }
  // Sử dụng useSelector để lấy giữ liệu trong redux
  const selectedProduct = useSelector(
    (state) => state.productDetails.selectedProduct
  );
  const relatedProducts = useSelector(
    (state) => state.productDetails.relatedProducts
  );

  // Xàm xử lý khi nhấn ADD TO CART
  const addToCartHandler = () => {
    // Kiểm tra sản phẩm vừa chọn có trong giỏ hàng của activeUser chưa
    const index = cartItems.findIndex(
      (item) =>
        item.selectedProduct?.id === selectedProduct?.id &&
        item.activeUser.email === activeUser.email
    );
    // Nếu đã tồn tại thì chỉ update số lượng
    if (index !== -1) {
      const updatedCartItems = [...cartItems];
      updatedCartItems[index].quantity += quantity;
      localStorage.setItem("cart", JSON.stringify(updatedCartItems));
      dispatch(cartActions.updateCart(updatedCartItems));
      navigate("/cart");
    } else {
      // Nếu chưa tồn tại thì thêm mới vào giỏ, lưu sản phẩm cùng với activeUser
      const newCartItems = { selectedProduct, quantity, activeUser };
      cartItems.push(newCartItems);
      dispatch(cartActions.addCart(cartItems));
      localStorage.setItem("cart", JSON.stringify(cartItems));
      navigate("/cart");
    }
  };
  // Hàm xử lý khi nhấn mũi tên giảm, kiểm tra chỉ cho giảm với step = 1 khi số lượng >1 để không hiển thị âm
  const decreaseQuant = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  };
  // Hàm xử lý khi nhấn mũi tên tăng
  const increaseQuant = () => {
    setQuantity(quantity + 1);
  };

  // useEffect(() => {
  //   const storedCartItems = JSON.parse(localStorage.getItem("cart")) || [];
  //   setCartItems(storedCartItems);
  // }, [cartItems]);
  useEffect(() => {
    const storedCartItems = JSON.parse(localStorage.getItem("cart")) || [];
    setCartItems(storedCartItems);
    const activeUser = JSON.parse(localStorage.getItem("activeUser")) || {};
    setActiveUser(activeUser);
  }, []);
  return (
    <i>
      <div className="container pt-5">
        <div className="row">
          <div className="col-lg-6">
            <img
              src={selectedProduct?.image}
              alt={selectedProduct?.name}
              style={{ maxWidth: "100%" }}
            />
          </div>
          <div className="col-lg-6 p-5">
            <h3>{selectedProduct?.name}</h3>
            <p>{formatPrice(selectedProduct?.price)} VNĐ</p>
            <p>{selectedProduct?.shortDesc}</p>
            <p>
              <strong>CATEGORY:</strong> {selectedProduct?.category}
            </p>
            <div className="flex" style={{ justifyContent: "flex-start" }}>
              <div
                className="flex button-outline"
                style={{ padding: "10px 0" }}
              >
                <span style={{ margin: "0px 30px 0px 10px" }}>QUANTITY</span>
                <div>
                  <FontAwesomeIcon
                    style={{ padding: "0 15px" }}
                    icon={faCaretLeft}
                    onClick={decreaseQuant}
                  />
                  {quantity}
                  <FontAwesomeIcon
                    style={{ padding: "0 15px" }}
                    icon={faCaretRight}
                    onClick={increaseQuant}
                  />
                </div>
              </div>
              <button
                className="button-dark button-outline"
                onClick={addToCartHandler}
              >
                <i>ADD TO CART</i>
              </button>
            </div>
          </div>
        </div>
        <button
          className="button-dark button-outline"
          style={{ margin: "2rem 0" }}
        >
          DESCRIPTION
        </button>
        <div className="row">
          <h4 className="pt-4">PRODUCT DESCRIPTION</h4>
          <p className="pt-4">{desc(selectedProduct?.longDesc)}</p>
        </div>
        <div className="pt-5">
          <h4>RELATED PRODUCTS</h4>
          <div className="row mb-3">
            {relatedProducts?.map((product) => (
              <div className="col-lg-3" key={product.id}>
                <img
                  src={product.image}
                  alt={product.name}
                  style={{ maxWidth: "100%" }}
                />
                <h6 style={{ textAlign: "center" }}>{product.name}</h6>
                <p style={{ textAlign: "center" }}>
                  {formatPrice(product.price)} VND
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </i>
  );
};

export default Detail;
