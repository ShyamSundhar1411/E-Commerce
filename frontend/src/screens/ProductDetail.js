import React, {useEffect,useState} from 'react'
import {Col,Row,ListGroup,Form,Image,Button,Card} from 'react-bootstrap'
import {Link} from 'react-router-dom'
import Rating from '../components/Rating'
import Loader from '../components/Loader'
import Message from '../components/Message'
import {useDispatch,useSelector} from 'react-redux'
import {listProductDetails} from '../actions/productAction'
function ProductDetail({ match,history }) {
    const dispatch = useDispatch()
    const [qty,setQty] = useState(1)
    const productDetails = useSelector(state => state.productDetails)
    const {loading,error,productdetail} = productDetails
    useEffect(() => {
        dispatch(listProductDetails(match.params.id))
    }, [dispatch])
    const addtoCartFunction = () => {
      history.push(`/Cart/${match.params.id}?qty=${qty}`)

    }
    return (
        <div>
            <Link to='/' className="btn btn-light my-3">Go Back</Link>
            {loading ? <Loader/>
              : error ? <Message variant = 'danger'>{error}</Message>
                :<Row>
                    <Col md = {6}>
                        <Image src ={productdetail.image} alt = {productdetail.name} fluid />
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
                                        <Col>Status:</Col>
                                        <Col>{productdetail.countInStock > 0 ? "In Stock": "Out Of Stock"} </Col>
                                    </Row>
                                </ListGroup.Item>
                                {productdetail.countInStock > 0 &&(
                                  <ListGroup.Item>
                                    <Row>
                                        <Col>Qty</Col>
                                        <Col xs = 'auto' className = 'my-1'>
                                          <Form.Control as = 'select' value = {qty}
                                          onChange = {(e) => setQty(e.target.value)}>

                                          {
                                            [...Array(productdetail.countInStock).keys()].map((x) => (
                                              <option key = {x+1} value = {x+1}>
                                                {x+1}
                                              </option>
                                            ))
                                          }
                                          </Form.Control>
                                        </Col>



                                    </Row>
                                  </ListGroup.Item>
                                )}
                                <ListGroup.Item>
                                    <Button disabled = {productdetail.countInStock == 0} className = "btn-block" id = "addtocart" type = "button"
                                    onClick = {addtoCartFunction}>
                                    Add To Cart</Button>
                                </ListGroup.Item>
                            </ListGroup>
                        </Card>

                    </Col>
                </Row>}

        </div>
    )
}

export default ProductDetail
