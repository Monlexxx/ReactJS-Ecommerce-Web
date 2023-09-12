import { useState, useEffect } from "react";
import ProductList from "../components/ProductList";

const ShopPage = () => {
  const [products, setProducts] = useState([]);
  const [category, setCategory] = useState(null);
  const [clickedProducts, setClickedProducts] = useState([]);
  const [searchKeyword, setSearchKeyword] = useState([]);

  // Fetch api để lấy data
  const fetchProductsHandler = async () => {
    const res = await fetch(
      `https://firebasestorage.googleapis.com/v0/b/funix-subtitle.appspot.com/o/Boutique_products.json?alt=media&token=dc67a5ea-e3e0-479e-9eaf-5e01bcd09c74`
    );
    const data = await res.json();

    const products = [];
    for (const key in data) {
      products.push({
        id: data[key]._id.$oid,
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

  const categoryClickHandler = (category) => {
    // Lưu category được truyển vào
    setCategory(category);
    // Nếu tham số được truyền vào là all, set sản phẩm sẽ được render về sau là tất cả sản phẩm
    if (category === "all") {
      setClickedProducts(products);
    } else {
      // Nếu tham số được truyền vào là các trường hợp khác, lọc ra những sản phẩm có cùng category
      const clickedProducts = products.filter(
        (product) => product.category === category
      );
      // Lưu vào để render về sau
      setClickedProducts(clickedProducts);
    }
  };

  // Hàm xử lý hành động search bằng keyword và nhấn enter sau khi gõ xong
  const handleKeyPress = (event) => {
    if (event.key === "Enter") {
      // Lọc các sản phẩm được search theo keyword
      const searchProducts = products.filter(
        (product) =>
          product.name.toLowerCase().includes(searchKeyword.toLowerCase()) ||
          product.category.toLowerCase().includes(searchKeyword.toLowerCase())
      );
      // Lưu những sản phẩm lọc được vào để render về sau
      setClickedProducts(searchProducts);
    }
  };

  return (
    <>
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
        <div className="row">
          <div className="col-lg-3">
            <h2>CATEGORIES</h2>
            <h3>APPLE</h3>
            <p onClick={() => categoryClickHandler(`all`)}>All</p>
            <h3>IPHONE & MAC</h3>
            <p onClick={() => categoryClickHandler(`iphone`)}>iphone</p>
            <p onClick={() => categoryClickHandler(`ipad`)}>ipad</p>
            <p onClick={() => categoryClickHandler(`macbook`)}>Macbook</p>
            <h3>WIRELESS</h3>
            <p onClick={() => categoryClickHandler(`airpod`)}>Airpod</p>
            <p onClick={() => categoryClickHandler(`watch`)}>Watch</p>
            <h3>OTHER</h3>
            <p onClick={() => categoryClickHandler(`mouse`)}>Mouse</p>
            <p onClick={() => categoryClickHandler(`keyboard`)}>Keyboard</p>
            <p onClick={() => categoryClickHandler(`other`)}>Other</p>
          </div>
          <div className="col-lg-9">
            <input
              className="mb-3"
              placeholder="Enter Search here"
              type="text"
              value={searchKeyword}
              onKeyDown={handleKeyPress}
              onChange={(event) => setSearchKeyword(event.target.value)}
            />
            <ProductList
              // Truyền dữ liệu về component ProductList,
              // allProducts đại điện cho toàn độ sản phẩm, được sử dụng khi không tìm thấy category (nghĩa là không có sản phẩm nào được click
              // products đại diện cho sản phẩm được lọc khi click vào hoặc sản phẩm được lọc ra khi search
              category={category}
              allProducts={products}
              products={clickedProducts}
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default ShopPage;
