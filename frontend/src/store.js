import {createStore,combineReducers,applyMiddleware} from 'redux'
import thunk from 'redux-thunk'
import {composeWithDevTools} from 'redux-devtools-extension'
import {productListReducer,
  productDetailsReducer,
  productDeleteReducer,
  productCreateReducer,
  productUpdateReducer,
  productReviewCreateReducer,
  productTopReducer,
} from './reducers/productReducers'
import {cartReducer} from './reducers/cartReducers'
import { userLoginReducer,
  userRegisterReducer,
  userDetailsReducer,
  userUpdateReducer,
  userListReducer,
  userDeleteReducer,
  userAdminUpdateReducer } from './reducers/userReducers'
const reducer = combineReducers({
  productList:productListReducer,
  productDetails : productDetailsReducer,
  productDelete : productDeleteReducer,
  productCreate :  productCreateReducer,
  productUpdate : productUpdateReducer,
  productCreateReview : productReviewCreateReducer,
  topProducts : productTopReducer,
  cart: cartReducer,
  userLogin : userLoginReducer,
  userRegister : userRegisterReducer,
  userDetails: userDetailsReducer,
  userUpdate: userUpdateReducer,
  userList: userListReducer,
  userDelete: userDeleteReducer,
  userAdminUpdate : userAdminUpdateReducer
})
const cartDataFromStorage = localStorage.getItem('cartItems') ?
  JSON.parse(localStorage.getItem('cartItems')) : []
  const userDataFromStorage = localStorage.getItem('userInfo') ?
    JSON.parse(localStorage.getItem('userInfo')) : null
const middleware = [thunk]
const initialstate = {
  cart:{cartItems: cartDataFromStorage},
  userLogin: {userInfo: userDataFromStorage}
}
const store = createStore(reducer,initialstate,composeWithDevTools(applyMiddleware(...middleware)))
export default store
