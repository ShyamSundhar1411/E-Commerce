import {createStore,combineReducers,applyMiddleware} from 'redux'
import thunk from 'redux-thunk'
import {composeWithDevTools} from 'redux-devtools-extension'
import {productListReducer,productDetailsReducer} from './reducers/productReducers'
import {cartReducer} from './reducers/cartReducers'
const reducer = combineReducers({
  productList:productListReducer,
  productDetails : productDetailsReducer,
  cart: cartReducer
})
const cartDataFromStorage = localStorage.getItem('cartItems') ?
  JSON.parse(localStorage.getItem('cartItems')) : []

const middleware = [thunk]
const initialstate = {
  cart:{cartItems: cartDataFromStorage}
}
const store = createStore(reducer,initialstate,composeWithDevTools(applyMiddleware(...middleware)))
export default store
