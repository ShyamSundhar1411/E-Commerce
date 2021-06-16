import React, {useEffect,useState} from 'react'
import {Col,Row,ListGroup,Form,Image,Button,Card} from 'react-bootstrap'
import {Link} from 'react-router-dom'
import Rating from '../components/Rating'
import Loader from '../components/Loader'
import Message from '../components/Message'
import {useDispatch,useSelector} from 'react-redux'
import {listProductDetails,createproductReviewAction} from '../actions/productAction'
import { PRODUCT_REVIEW_RESET } from '../constants/productConstants'
function ProductDetail({ match,history }) {
    const dispatch = useDispatch()
    const [qty,setQty] = useState(1)
    const [rating,setRating] = useState(0)
    const [comment,setComment] = useState('')
    const productDetails = useSelector(state => state.productDetails)
    const {loading,error,productdetail} = productDetails
    const userLogin = useSelector(state => state.userLogin)
    const {userInfo} = userLogin
    const reviewDetails = useSelector(state => state.productCreateReview)
    const {success:successReview,loading:loadingReview,error:errorReview} = reviewDetails

    useEffect(() => {
        if (successReview){
          setRating(0)
          setComment('')
          dispatch({type:PRODUCT_REVIEW_RESET})
        }
        dispatch(listProductDetails(match.params.id))
    }, [dispatch,match,successReview])
    const addtoCartFunction = () => {
      history.push(`/Cart/${match.params.id}?qty=${qty}`)

    }
    const submitHandler = (e) => {
      e.preventDefault()
      dispatch(createproductReviewAction(match.params.id,{
        rating,comment
      }))

    }
    return (
        <div>
            <Link to='/' className="btn btn-light my-3">Go Back</Link>
            {loading ? <Loader/>
              : error ? <Message variant = 'danger'>{error}</Message>
                :
              <div>
                <Row>
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
                </Row>
                <Row>
                  <Col md = {6}>
                    <h4>Reviews</h4>
                    {productdetail.reviews.length === 0 && <Message variant = "info">No Reviews</Message>}
                    <ListGroup variant = 'flush'>
                      {productdetail.reviews.map((review) => (
                        <ListGroup.Item key = {review._id}>
                          <strong>{review.name}</strong>
                          <Rating value = {review.rating} color = {"#f8e825"} />
                          <p>{review.createdAt.substring(0,10)}</p>
                          <p>{review.comment}</p>
                        </ListGroup.Item>
                      ))}
                        <ListGroup.Item>
                          <h4>Write a Review</h4>
                          {loadingReview && <Loader/>}
                          {successReview && <Message variant = "success">Review Submitted</Message>}
                          {errorReview && <Message variant = "danger">{errorReview}</Message>}
                          {userInfo ?
                            <Form onSubmit={submitHandler}>
                              <Form.Group controlId = "rating">
                                <Form.Label>Rating</Form.Label>
                                <Form.Control as = "select" id = "custom"
                                value = {rating}
                                onChange = {(e) => setRating(e.target.value)}>
                                <option value = ''>Select...</option>
                                <option value = '1'>1 - Poor</option>
                                <option value = '2'>2 - Not Bad</option>
                                <option value = '3'>3 - Good</option>
                                <option value = '4'>4 - Very Good</option>
                                <option value = '5'>5 - Excellent</option>
                                </Form.Control>
                              </Form.Group>
                              <Form.Group controlId = "control">
                                <Form.Label>Comment</Form.Label>
                                <Form.Control
                                as = "textarea"
                                row = '5'
                                value = {comment}
                                onChange = {(e) => setComment(e.target.value)}
                                >
                                </Form.Control>
                              </Form.Group>
                              <Button
                              disabled = {loadingReview}
                              type = "submit"
                              variant = "primary"
                              className = "my-2"
                              >Submit</Button>
                            </Form>
                          :
                          <Message variant = "info"><Link to = {'/login'}>Sign In</Link> to write a Review</Message>
                        }
                        </ListGroup.Item>
                    </ListGroup>
                  </Col>
                </Row>
              </div>}
        </div>
    )
}

export default ProductDetail
