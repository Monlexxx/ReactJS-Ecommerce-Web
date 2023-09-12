import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { productDetailsActions } from "../store";

const ProductList = (props) => {
  // Hàm cho thêm dấu chấm vào giữa mỗi 3 số của giá
  function formatPrice(price) {
    return price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
  }

  const dispatch = useDispatch();

  const selectProductHandler = (product) => {
    // Đẩy sản phẩm được chọn vào setSelectedProduct
    dispatch(productDetailsActions.setSelectedProduct(product));
    // Kiểm tra category sản phẩm được chọn
    const category = product.category;
    // Dùng filter để lọc các sản phẩm tương tự nếu có category trùng sản phẩm được chọn
    const relatedProducts = props.products.filter(
      (p) => p.category === category && p.id !== product.id
    );
    // Đẩy các sản phẩm tương đồng vào setRelatedProducts
    dispatch(productDetailsActions.setRelatedProducts(relatedProducts));
  };
  const category = props.category;

  return (
    <>
      {/* Nếu tìm thấy category, render sản phẩm được click hoặc sản phẩm được search */}
      {category && (
        <div className="row">
          {props.products.map((product) => (
            <div
              className="col-lg-4"
              key={product.id}
              onClick={() => {
                selectProductHandler(product);
              }}
            >
              <Link to={`/detail/${product.id}`}>
                <img
                  style={{ maxWidth: "100%" }}
                  src={product.image}
                  alt={product.id}
                ></img>

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
                  {formatPrice(product.price)}
                </p>
              </Link>
            </div>
          ))}
        </div>
      )}
      {/* Nếu category không tồn tại render tất cả sản phẩm */}
      {!category && (
        <div className="row">
          {props.allProducts.map((product) => (
            <div
              className="col-lg-4"
              key={product.id}
              onClick={() => {
                selectProductHandler(product);
              }}
            >
              <Link to={`/detail/${product.id}`}>
                <img
                  style={{ maxWidth: "100%" }}
                  src={product.image}
                  alt={product.id}
                ></img>
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
                  {formatPrice(product.price)} VND
                </p>
              </Link>
            </div>
          ))}
        </div>
      )}
    </>
  );
};

export default ProductList;
