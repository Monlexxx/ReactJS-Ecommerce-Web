import { useState, useEffect } from "react";
import Product from "./Product";

const Products = () => {
  const [products, setProducts] = useState([]);

  // Fetch api để lấy data sản phẩm
  const fetchProductsHandler = async () => {
    const res = await fetch(
      `https://firebasestorage.googleapis.com/v0/b/funix-subtitle.appspot.com/o/Boutique_products.json?alt=media&token=dc67a5ea-e3e0-479e-9eaf-5e01bcd09c74`
    );
    const data = await res.json();

    const products = [];
    for (const key in data) {
      products.push({
        // id: data._id.$oid,
        name: data[key].name,
        price: data[key].price,
        category: data[key].category,
        shortDesc: data[key].short_desc,
        longDesc: data[key].long_desc,
        image: data[key].img1,
      });
    }
    //  Lưu data vào state
    setProducts(products);
  };
  // Dùng useEffect để thực hiện hành động fetch api mỗi khi ứng dụng được load lại
  useEffect(() => {
    fetchProductsHandler();
  }, []);

  return (
    <div className="container pt-5 pb-5">
      <p
        style={{
          color: "var(--color-button-dark-100)",
          fontStyle: "italic",
          fontWeight: "500",
        }}
      >
        MADE THE HARD WAY
      </p>
      <p
        style={{
          color: "var(--color-button-dark)",
          fontStyle: "italic",
          fontWeight: "500",
        }}
      >
        TOP TRENDING PRODUCTS
      </p>
      {/* Truyền sản phẩm vừa fetch được qua component Product để xử lý */}
      <Product products={products} />
    </div>
  );
};

export default Products;
