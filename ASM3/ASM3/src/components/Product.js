import { useSelector, useDispatch } from "react-redux";
import { showPopupActions } from "../store";

import Popup from "./Popup";
import classes from "./Product.module.css";

const Product = (props) => {
  const dispatch = useDispatch();
  // Sử dụng useSelector để lấy ra giá trị của popupVisible và selectedProduct
  const popupVisible = useSelector((state) => state.showPopup.popupVisible);
  const selectedProduct = useSelector(
    (state) => state.showPopup.selectedProduct
  );

  const showPopupHandler = (product) => {
    // Khi hàm showPopupHandler được kích hoạt, truyển product được chọn làm payload và kích hoạt action showPopup
    dispatch(showPopupActions.showPopup(product));
  };

  const hidePopupHandler = () => {
    // Khi hàm hidePopupHandler được kích hoạt, thực hiển action hidePopup
    dispatch(showPopupActions.hidePopup());
  };

  // Hàm cho thêm dấu chấm vào giữa mỗi 3 số của giá
  function formatPrice(price) {
    return price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
  }

  // Cắt mảng chỉ còn 8 phần tử trước khi render
  const eightSlicedProducts = props.products.slice(0, 8);

  return (
    <div className="container">
      <div className="row">
        {/* Render mảng sản phẩm bằng map */}
        {eightSlicedProducts.map((product, idx) => (
          <div
            className="col-lg-3"
            key={idx}
            onClick={() => showPopupHandler(product)}
          >
            <div className={classes.imageContainer}>
              <img
                className={classes.img}
                src={product.image}
                alt={product.id}
              ></img>
              <div className={classes.transition}></div>
            </div>
            <p
              style={{
                color: "var(--color-button-dark)",
                fontStyle: "italic",
                textAlign: "center",
                fontWeight: "500",
              }}
            >
              {product.name}
            </p>
            <p
              style={{
                color: "var(--color-button-dark-100)",
                fontStyle: "italic",
                textAlign: "center",
              }}
            >
              {/* Sử dụng hàm formatPrice để thêm dấu chấm vào giá */}
              {formatPrice(product.price)} VND
            </p>
          </div>
        ))}
      </div>

      {/* Kiểm tra nếu trạng thái của popVisible là true thì render màn hình popup tương ứng với sản phẩm được chọn */}
      {popupVisible && (
        <Popup
          show={popupVisible}
          name={selectedProduct.name}
          shortDesc={selectedProduct.shortDesc}
          image={selectedProduct.image}
          price={selectedProduct.price}
          hidePopupHandler={hidePopupHandler}
        ></Popup>
      )}
    </div>
  );
};

export default Product;
