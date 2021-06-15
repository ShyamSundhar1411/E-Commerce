import React, {useState,useEffect} from 'react'
import { Link } from 'react-router-dom'
import {Form,Button,Row,Col} from 'react-bootstrap'
import { useDispatch,useSelector } from 'react-redux'
import Loader from '../components/Loader'
import Message from '../components/Message'
import { getuserDetails,updateUserDetail } from '../actions/userAction'
import { USER_UPDATE_RESET } from '../constants/userConstants'
function ProfileScreen({location,history}) {
  const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')
    const [message, setMessage] = useState('')
    const dispatch = useDispatch()
    const userDetails = useSelector(state => state.userDetails)
    const {loading,user,error} = userDetails
    const userLogin = useSelector(state => state.userLogin)
    const {userInfo} = userLogin
    const userUpdate = useSelector(state => state.userUpdate)
    const {success} = userUpdate
  useEffect(() => {
    if (!userInfo){
      history.push('/login')
    }else{
      if(!user || !user.name || success || userInfo._id !== user._id){
        dispatch({type:USER_UPDATE_RESET})
        dispatch(getuserDetails('profile'))
      }else{
        setName(user.name)
        setEmail(user.email)
      }
    }
  },[dispatch,history,userInfo,user,success])
  const submitHandler = (e) => {
    e.preventDefault()
    if (password !== confirmPassword){
      setMessage('Passwords Do Not Match')
  }else{
      dispatch(updateUserDetail({
        'id':user._id,
        'name':name,
        'email':email,
        'password':password,
    }))
  }
}
    return (
        <Row>
          <Col md = {3}>
            <h2>User Profile</h2>
            {message && <Message variant = 'danger'>{message}</Message>}
            {error && <Message variant = 'danger'>{error}</Message>}
            {loading && <Loader/> }
            <Form onSubmit = {submitHandler}>
              <Form.Group controlId = "name">
                <Form.Label>Username</Form.Label>
                  <Form.Control required type = "username" placeholder = "Enter Name" value = {name}
                    onChange = {(e) => setName(e.target.value)}>
                    </Form.Control>
                  </Form.Group>
              <Form.Group controlId = "email">
                <Form.Label>Email Address</Form.Label>
                  <Form.Control required type = "email" placeholder = "Enter Email" value = {email}
                    onChange = {(e) => setEmail(e.target.value)}>
                  </Form.Control>
              </Form.Group>
              <Form.Group controlId = "password">
                <Form.Label>Password</Form.Label>
                  <Form.Control  type = "password" placeholder = "Enter Password" value = {password}
                    onChange = {(e) => setPassword(e.target.value)}>
                  </Form.Control>
              </Form.Group>
              <Form.Group controlId = "confirmpassword">
                <Form.Label>Confirm Password</Form.Label>
                  <Form.Control  type = "password" placeholder = "Enter Password Again" value = {confirmPassword}
                    onChange = {(e) => setConfirmPassword(e.target.value)}>
                  </Form.Control>
              </Form.Group>
              <Button type = 'submit' variant = "primary" className = 'my-3'>Update</Button>
            </Form>
          </Col>
          <Col md = {9}>
            <h2>My Orders</h2>
          </Col>
        </Row>
    )
}

export default ProfileScreen
