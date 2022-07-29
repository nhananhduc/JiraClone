import { Input } from 'antd';
import { withFormik } from 'formik';
import { history } from '../../../util/history'
import React from 'react'
import { connect } from 'react-redux'
import * as Yup from 'yup'
import { UserOutlined, LockOutlined, PhoneOutlined, MailOutlined } from '@ant-design/icons'
import { userSignUpAction } from '../../../redux/actions/CyberBugsAction';
import { NavLink } from 'react-router-dom';

function UserSignUp(props) {
  const { errors, handleChange, handleSubmit } = props;
  return (
    <form onSubmit={handleSubmit} className='container'>
      <div className='px-5 d-flex flex-column justify-content-center align-items-center' style={{ height: window.innerHeight }}>
        <h3 className='text-center' style={{ fontSize: 50 }}>User Sign Up</h3>
        <Input onChange={handleChange} className='mt-3' name='email' size='large' placeholder='Email' prefix={<MailOutlined />} />
        <div className='text-danger text-left w-100'>{errors.email}</div>
        <Input onChange={handleChange} className='mt-3' name='password' type='password' size='large' placeholder='Password' prefix={<LockOutlined />} />
        <div className='text-danger text-left w-100'>{errors.password}</div>
        <Input onChange={handleChange} className='mt-3' name='name' type='text' size='large' placeholder='Name' prefix={<UserOutlined />} />
        <div className='text-danger text-left w-100'>{errors.name}</div>
        <Input onChange={handleChange} className='mt-3' name='phoneNumber' type='text' size='large' placeholder='Phone number' prefix={<PhoneOutlined />} />
        <div className='text-danger text-left w-100'>{errors.phoneNumber}</div>
        <div className='row w-100'>
          <div className='col-6 text-right'>
            <button type='submit' style={{ width: 100 }} className='btn btn-primary mt-3'>Sign Up</button>
          </div>
          <div className='col-6 text-left'>
            <button style={{ width: 100 }} className='btn btn-success mt-3' onClick={() => {
              history.push('/login')
            }}>Login</button>
          </div>
        </div>
        <NavLink to='/home' className='mt-3'>Back to Home</NavLink>
      </div >  
    </form >
  )
}

const phoneRegExp = /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/;

const UserSignUpWithFormik = withFormik({
  mapPropsToValues: () => ({
    email: '',
    password: '',
    name: '',
    phoneNumber: ''
  }),



  validationSchema: Yup.object().shape({
    email: Yup.string().required('Email is required!').email('Email is invalid!'),
    password: Yup.string().required('Password is required!').min(6, 'Password must have min 6 characters').max(32, 'Password must have max 32 characters'),
    name: Yup.string().required('Name is required!'),
    phoneNumber: Yup.string().required('Phone number is required!').matches(phoneRegExp, 'Phone number is invalid!')
  }),

  handleSubmit: ({ email, password, name, phoneNumber }, { props, setsubmitting }) => {
    props.dispatch(userSignUpAction(email, password, name, phoneNumber))

  },

  displayName: 'User Sign Up',
})(UserSignUp)

export default connect()(UserSignUpWithFormik)
