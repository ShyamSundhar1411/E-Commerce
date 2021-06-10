import React, {useEffect,useState} from 'react'
import {Col,Row,ListGroup,Image,Button,Card} from 'react-bootstrap'
import {Link} from 'react-router-dom'
import Rating from '../components/Rating'
import axios from 'axios'
function ProductDetail({ match }) {
    const [productdetail, setProduct] = useState([])
    useEffect(() =>{
      async function fetchProduct(){
        const { data } = await axios.get(`/api/products/${match.params.id}`)
        setProduct(data)
      }
      fetchProduct()
    },[])
    return (
        <div>
            <Link to='/' className="btn btn-light my-3">Go Back</Link>
            <Row>
                <Col md = {6}>
                    < Image src ={productdetail.image} alt = {productdetail.name} fluid />
                </Col>
                <Col md = {3}>
                    <ListGroup variant = 'flush'>
                        <ListGroup.Item>
                            <h3>{productdetail.name}</h3>
                        </ListGroup.Item>
                        <ListGroup.Item>
                            <Rating value = {productdetail.rating} text = {`${productdetail.numReviews} reviews`} color = {"#f8e825"} />
                        </ListGroup.Item>
                        <ListGroup.Item>
                            Price : ${productdetail.price}
                        </ListGroup.Item>
                        <ListGroup.Item>
                            Description: {productdetail.description}
                        </ListGroup.Item>
                    </ListGroup>
                </Col>
                <Col md= {3}>
                    <Card>
                        <ListGroup variant = 'flush'>
                            <ListGroup.Item>
                                <Row>
                                    <Col>Price:</Col>
                                    <Col>${productdetail.price}</Col>
                                </Row>
                            </ListGroup.Item>
                            <ListGroup.Item>
                                <Row>
                                    <Col>Stock:</Col>
                                    <Col>{productdetail.countInStock > 0 ? "In Stock": "Out Of Stock"} </Col>
                                </Row>
                            </ListGroup.Item>
                            <ListGroup.Item>
                                <Button className = "btn-block" id = "addtocart" type = "button" disabled = {productdetail.countInstock==0}>Add To Cart</Button>
                            </ListGroup.Item>
                        </ListGroup>
                    </Card>

                </Col>
            </Row>
        </div>
    )
}

export default ProductDetail
