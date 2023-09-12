// Sử dụng redux toolkit để tạo store và sử lý các actions
import { configureStore, createSlice } from "@reduxjs/toolkit";

// Xử lý việc pop up  cửa sổ modal khi click váo sản phẩm trên trang homepage
// Khởi tạo giá trị ban đầu
const showPopupInitialState = { popupVisible: false, selectedProduct: null };
const showPopupSlice = createSlice({
  name: "popup",
  initialState: showPopupInitialState,
  reducers: {
    // Khi có sản phẩm bị click, chuyển popupVisible thành true để popup màn hình modal,
    //  đồng thời đẩy dữ liệu sản phẩm được chọn thông ua payload
    showPopup(state, action) {
      state.popupVisible = true;
      state.selectedProduct = action.payload;
    },
    // Khi  action hidePopup được dispatch, chuyển popupVisible về false để không hiển thị màn hình modal
    hidePopup(state) {
      state.popupVisible = false;
    },
  },
});

// Xử lý hiển thị chi tiết sản phẩm khi sản phẩm được chọn ở trang ShopPage
// Khởi tạo giá trị ban đầu
const productDetailsInitialState = {
  selectedProduct: null,
  relatedProducts: [],
};
const productDetailsSlice = createSlice({
  name: "productDetails",
  initialState: productDetailsInitialState,
  reducers: {
    // Khi action setRelatedProducts được dispatch, tìm và lưu giá trị của related products thông qua payload
    setRelatedProducts(state, action) {
      state.relatedProducts = action.payload;
    },
    // Khi action setSelectedProduct được dispatch, lưu giá trị sản phẩm vừa được click thông qua payload
    setSelectedProduct(state, action) {
      state.selectedProduct = action.payload;
    },
  },
});

// Sử lý đăng nhập, đăng ký
// Khởi tạo giá trị ban đầu là false
const isSignedInInitialState = {
  isSignedIn: false,
};
const signedInSlice = createSlice({
  name: "isSignedIn",
  initialState: isSignedInInitialState,
  reducers: {
    // Khi isSignedIn được dispatch, giá trị khởi tạo ban đầu chuyển thành true
    isSignedIn(state) {
      state.isSignedIn = true;
    },
    // Khi isSignedOut được dispatch, giá trị khởi tạo ban đầu chuyển thành false
    isSignedOut(state) {
      state.isSignedIn = false;
    },
  },
});

// Xử lý giỏ hàng
// Khởi tạo giỏ hàng ban đầu là mảng trống
const cartInitialState = {
  items: [],
};
const cartSlice = createSlice({
  name: "cart",
  initialState: cartInitialState,
  reducers: {
    // Khi addCart được dispatch, đẩy sản phẩm được thêm vào giỏ hàng vào
    addCart(state, action) {
      state.items.push(action.payload);
    },
    // Khi updateCart được dispatch, thay đổi quantity của sản phẩm đã tồn tại trong giỏ thông ua payload
    updateCart(state, action) {
      state.items = action.payload;
    },
    // Khi deleteCart được dispatch, xóa sản phẩm trong giỏ hàng
    deleteCart(state, action) {
      state.items = action.payload;
    },
  },
});

// Tạo action cho các trưởng hợp trên
export const showPopupActions = showPopupSlice.actions;
export const productDetailsActions = productDetailsSlice.actions;
export const signedInActions = signedInSlice.actions;
export const cartActions = cartSlice.actions;

// Tạo store thông ua configureStore
const store = configureStore({
  reducer: {
    showPopup: showPopupSlice.reducer,
    productDetails: productDetailsSlice.reducer,
    signIn: signedInSlice.reducer,
    cart: cartSlice.reducer,
  },
});

export default store;
