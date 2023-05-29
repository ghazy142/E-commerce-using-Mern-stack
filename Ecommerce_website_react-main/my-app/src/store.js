import { createStore, combineReducers, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import { productListReducer, productDetailsReducer } from './reducers/productReducer'
import { userLoginReducer, userRegisterReducer, userDetailsReducer, userUpdateProfileReducer, userListReducer, userDeleteReducer } from './reducers/userReducers'
import { cartReducer } from './reducers/cartReducers'
import { composeWithDevTools } from 'redux-devtools-extension'
import { orderCreateReducer, orderDetailsReducer, orderPayReducer, listMyOrdersReducer } from './reducers/orderReducers'




// The reducer function is created using the combineReducers() function to combine all the reducers from the productReducer, 
// userReducers, and cartReducers files. The initialState object contains the initial state of the application, 
// which includes the cartItems and shippingAddress from local storage, and the userInfo from local storage.
const reducer = combineReducers({
    productList: productListReducer,
    productDetails: productDetailsReducer,
    cart: cartReducer,
    userLogin: userLoginReducer,
    userRegister: userRegisterReducer,
    userDetails: userDetailsReducer,
    userUpdateProfile: userUpdateProfileReducer,
    userList: userListReducer,
    userDelete: userDeleteReducer,
    orderCreate: orderCreateReducer,
    orderDetails: orderDetailsReducer,
    orderPay: orderPayReducer,
    listMyOrders: listMyOrdersReducer
  })
  
  const cartItemsFromStorage = localStorage.getItem('cartItems')
    ? JSON.parse(localStorage.getItem('cartItems'))
    : []
  
  const userInfoFromStorage = localStorage.getItem('userInfo')
    ? JSON.parse(localStorage.getItem('userInfo'))
    : null

    const shippingAddressFromStorage = localStorage.getItem('shippingAddress')
    ? JSON.parse(localStorage.getItem('shippingAddress'))
    : {}


  const initialState = {
    cart: { cartItems: cartItemsFromStorage ,
            shippingAddress: shippingAddressFromStorage},
    userLogin: { userInfo: userInfoFromStorage }
  }
  
  const middleware = [thunk]
  
  const store = createStore(
    reducer,
    initialState,
    composeWithDevTools(applyMiddleware(...middleware))
  )
  
  export default store



  // Overall, Redux helps to simplify the management of application state, making it easier to debug, test,
  //  and maintain complex applications.