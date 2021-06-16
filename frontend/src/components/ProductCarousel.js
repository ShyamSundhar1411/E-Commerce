import React, {useEffect} from 'react'
import { useDispatch,useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { Carousel,Image } from 'react-bootstrap'
import Loader from './Loader'
import Message from './Message'
import { listTopProducts } from '../actions/productAction'

function ProductCarousel() {
  const dispatch = useDispatch()
  const topProducts = useSelector(state => state.topProducts)
  const {loading,error,products} = topProducts
  useEffect(() => {
    dispatch(listTopProducts())
  },[dispatch])
    return (
      loading ? <Loader/>
      : error ? <Message variant = "danger">{error}</Message>
       :
       <Carousel pause = 'hover' className = 'bg-dark' fade>
       {products.map(product => (
         <Carousel.Item key = {product._id}>
         <Link to = {`/products/${product._id}`}>
           <Image
             src={product.image}
             alt={product.name}
           />
           </Link>
           <Carousel.Caption>
              {product.name} ${product.price}
           </Carousel.Caption>
         </Carousel.Item>
       ))}

</Carousel>
    )
}

export default ProductCarousel
