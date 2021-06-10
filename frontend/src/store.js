import {createStore,combineReducers,applyMiddleware} from 'redux'
import thunk from 'redux-thunk'
import {composeWithDevTools} from 'redux-devtools-extension'
import {productListReducer} from './reducers/productReducers'

const reducer = combineReducers({
  productList:productListReducer,
})
const middleware = [thunk]
const initialstate = {}
const store = createStore(reducer,initialstate,composeWithDevTools(applyMiddleware(...middleware)))
export default store
