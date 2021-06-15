import React, {useState,useEffect} from 'react'
import { Link } from 'react-router-dom'
import {Form,Button,Row,Col} from 'react-bootstrap'
import { useDispatch,useSelector } from 'react-redux'
import Loader from '../components/Loader'
import Message from '../components/Message'
import { getuserDetails,userAdminUpdateAction } from '../actions/userAction'
import { USER_ADMIN_UPDATE_RESET } from '../constants/userConstants'
import FormContainer from '../components/FormContainer'

function UserEditScreen({match,history}) {
    const userId = match.params.id
    const [name,setName] = useState('')
    const [email,setEmail] = useState('')
    const [isAdmin,setAdmin] = useState(false)
    const [message,setMessage] = useState('')
    const dispatch = useDispatch()
    const userDetails = useSelector(state => state.userDetails)
    const {loading,error,user} = userDetails
    const userUpdate = useSelector(state => state.userAdminUpdate)
    const { error: errorUpdate, loading: loadingUpdate, success: successUpdate } = userUpdate
    useEffect(() => {
      if(successUpdate){
        dispatch({type:USER_ADMIN_UPDATE_RESET})
        history.push('/admin/users')

      }else{
      if(!user.name || user._id !== Number(userId)){
        dispatch(getuserDetails(userId))
      }else{
        setName(user.name)
        setEmail(user.email)
        setAdmin(user.isAdmin)
      }
    }
  },[userId,user,history,successUpdate])
    const submitHandler = (e) => {
      e.preventDefault()
      dispatch(userAdminUpdateAction({_id:user._id,name,email,isAdmin}))
    }
    return (
      <div>
      <Link to = 'admin/users'>Go Back</Link>
      <FormContainer>
        <h1>Edit User</h1>
        {loadingUpdate && <Loader/>}
        {errorUpdate && <Message variant = "danger">{errorUpdate}</Message> }
        {loading ? <Loader/>
        : error ? <Message variant = 'danger'>{error}</Message>
        :
          <Form onSubmit = {submitHandler}>
            <Form.Group controlId = "name">
              <Form.Label>UserName</Form.Label>
                <Form.Control type = "username" placeholder = "Enter Name" value = {name}
                  onChange = {(e) => setName(e.target.value)}>
                </Form.Control>
              </Form.Group>
          <Form.Group controlId = "email">
            <Form.Label>Email Address</Form.Label>
              <Form.Control  type = "email" placeholder = "Enter Email" value = {email}
                onChange = {(e) => setEmail(e.target.value)}>
              </Form.Control>
              </Form.Group>
            <Form.Group controlId = "isAdmin" className = 'my-1'>
              <Form.Check  type = "checkbox" label="Is Admin" checked = {isAdmin}
                onChange = {(e) => setAdmin(e.target.checked)}>
                </Form.Check>
              </Form.Group>
            <Button type = 'submit' variant = "primary" className = 'my-3'>Update</Button>
          </Form>
            }
        </FormContainer>
      </div>


    )
}

export default UserEditScreen
