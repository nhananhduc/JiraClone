import React, {useEffect } from 'react'
import { useDispatch} from 'react-redux/es/exports';
import { connect } from 'react-redux'
import { withFormik } from 'formik';
import * as Yup from 'yup'
import { EDIT_USER_SAGA } from '../../../redux/constants/CyberBugs/CyberBugs';




function FormEditUser(props) {
    const dispatch = useDispatch();
    const { values,
        handleChange,
        handleSubmit
    } = props;

    useEffect(() => {
        dispatch({
            type: 'SET_SUBMIT_EDIT_USER',
            submitFunction: handleSubmit
        })
    }, [])

    return (

        <form className='container-fluid'>
            <div className='row'>
                <div className='col-2'>
                    <div className='form-group'>
                        <p className='font-weight-bold'>User Id</p>
                        <input value={values.id} disabled className='form-control' name='id' />
                    </div>
                </div>
                <div className='col-5'>
                    <div className='form-group'>
                        <p className='font-weight-bold'>User name</p>
                        <input value={values.name} className='form-control' name='name' onChange={handleChange} />
                    </div>
                </div>
                <div className='col-7'>
                    <div className='form-group'>
                        <p className='font-weight-bold'>Email</p>
                        <input value={values.email} className='form-control' name='email' onChange={handleChange} />
                    </div>
                </div>
                <div className='col-7'>
                    <div className='form-group'>
                        <p className='font-weight-bold'>phoneNumber</p>
                        <input value={values.phoneNumber} className='form-control' name='phoneNumber' onChange={handleChange} />
                    </div>
                </div>
            </div>
        </form>
    )
}

const editUsertForm = withFormik({
    enableReinitialize: true,
    mapPropsToValues: (props) => {
        const { userEdit } = props;
        return {
            id: userEdit?.userId,
            name: userEdit?.name,
            email: userEdit?.email,
            phoneNumber: userEdit?.phoneNumber
        }
    },

    validationSchema: Yup.object().shape({

    }),
    handleSubmit: (values, { props, setSubmitSetting }) => {
        props.dispatch({
            type: EDIT_USER_SAGA,
            userEdit: values
        })
    },
    displayName: 'Edit User'
})(FormEditUser);

const mapStateToProps = (state) => ({
    userEdit: state.UserCyberBugsReducer.userEdit
})


export default connect(mapStateToProps)(editUsertForm)
