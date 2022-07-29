import React from 'react'
import { Button, Input } from 'antd'
import { UserOutlined, LockOutlined, FacebookOutlined, TwitterOutlined } from '@ant-design/icons'
import { withFormik } from 'formik'
import * as Yup from 'yup'
import { connect } from 'react-redux'
import { signinCyberBugsAction } from '../../../redux/actions/CyberBugsAction'
import { history } from '../../../util/history';
import { NavLink } from 'react-router-dom';

function LoginCyberBugs(props) {
    const {
        errors,
        handleChange,
        handleSubmit,
    } = props;

    return (
        <form onSubmit={handleSubmit} className='container'>
            <div className='px-5 d-flex flex-column justify-content-center align-items-center' style={{ height: window.innerHeight }}>
                <h3 className='text-center' style={{ fontSize: 50 }}>Login CyberBugs</h3>
                <Input onChange={handleChange} className='mt-3' name='email' size='large' placeholder='Email' prefix={<UserOutlined />} />
                <div className='text-danger text-left w-100'>{errors.email}</div>
                <Input onChange={handleChange} className='mt-3' name='password' type='password' size='large' placeholder='Password' prefix={<LockOutlined />} />
                <div className='text-danger text-left w-100'>{errors.password}</div>
                <div className='row w-100'>
                    <div className='col-6 text-right'>
                        <button type='submit' style={{ width: 100 }} className='btn btn-primary mt-3'>Login</button>
                    </div>
                    <div className='col-6 text-left'>
                        <button style={{ width: 100 }} className='btn btn-success mt-3' onClick={() => {
                            history.push('/signup')
                        }}>Sign Up</button>
                    </div>
                </div>
                <div className='social mt-5'>
                    <Button className='mr-2' type='primary' style={{ backgroundColor: 'rgb(59,89,152', border: 'none' }} shape='circle' icon={<FacebookOutlined />} size='large'></Button>
                    <Button type='primary' shape='circle' icon={<TwitterOutlined />} size='large'></Button>
                </div>
                <NavLink to='/home' className='mt-3'>Back to Home</NavLink>
            </div >
        </form >
    )
}

const LoginCyberBugsWithFormik = withFormik({
    mapPropsToValues: () => ({
        email: '',
        password: ''
    }),

    validationSchema: Yup.object().shape({
        email: Yup.string().required('Email is required!').email('Email is invalid!'),
        password: Yup.string().required('Password is required!').min(6, 'Password must have min 6 characters').max(32, 'Password must have max 32 characters')
    }),

    handleSubmit: ({ email, password }, { props, setsubmitting }) => {

        props.dispatch(signinCyberBugsAction(email, password))
    },

    displayName: 'Login CyberBugs',
})(LoginCyberBugs)

export default connect()(LoginCyberBugsWithFormik)