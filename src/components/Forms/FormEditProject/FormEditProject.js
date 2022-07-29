import React, {useEffect } from 'react'
import { Editor } from '@tinymce/tinymce-react';
import { useDispatch, useSelector } from 'react-redux/es/exports';
import { connect } from 'react-redux'
import { withFormik } from 'formik';
import * as Yup from 'yup'
import { GET_ALL_PROJECT_CATEGORY_SAGA, UPDATE_PROJECT_SAGA } from '../../../redux/constants/CyberBugs/CyberBugs';




function FormEditProject(props) {
    const arrProjectCategory = useSelector(state => state.ProjectCategoryReducer.arrProjectCategory);
    const dispatch = useDispatch();
    const { values,
        handleChange,
        handleSubmit,
        setFieldValue
    } = props;

    useEffect(() => {
        dispatch({
            type: GET_ALL_PROJECT_CATEGORY_SAGA
        });
        dispatch({
            type: 'SET_SUBMIT_EDIT_PROJECT',
            submitFunction: handleSubmit
        })
    }, [])


    const handleEditorChange = (content, editor) => {
        setFieldValue('description', content)
    }

    return (

        <form className='container-fluid'>
            <div className='row'>
                <div className='col-2'>
                    <div className='form-group'>
                        <p className='font-weight-bold'>Project id</p>
                        <input value={values.id} disabled className='form-control' name='id' />
                    </div>
                </div>
                <div className='col-5'>
                    <div className='form-group'>
                        <p className='font-weight-bold'>Project name</p>
                        <input value={values.projectName} className='form-control' name='projectName' onChange={handleChange} />
                    </div>
                </div>
                <div className='col-5'>
                    <div className='form-group'>
                        <p className='font-weight-bold'>Project category</p>
                        <select name='categoryId' value={values.categoryId} onChange={handleChange}>
                            {arrProjectCategory?.map((item, index) => {
                                return <option value={item.id} key={index}>{item.projectCategoryName}</option>
                            })}
                        </select>
                    </div>
                </div>
                <div className='col-12'>
                    <div className='form-group'>
                        <p>Description</p>
                        <Editor name='description'
                            value={values.description}
                            init={{
                                height: 500,
                                menubar: false,
                                plugins: [
                                    'advlist', 'autolink', 'lists', 'link', 'image', 'charmap',
                                    'anchor', 'searchreplace', 'visualblocks', 'code', 'fullscreen',
                                    'insertdatetime', 'media', 'table', 'preview', 'help', 'wordcount'
                                ],
                                toolbar: 'undo redo | blocks | ' +
                                    'bold italic forecolor | alignleft aligncenter ' +
                                    'alignright alignjustify | bullist numlist outdent indent | ' +
                                    'removeformat | help',
                                content_style: 'body { font-family:Helvetica,Arial,sans-serif; font-size:14px }'
                            }}
                            onEditorChange={handleEditorChange}
                        />
                    </div>
                </div>
            </div>
        </form>
    )
}

const editProjectForm = withFormik({
    enableReinitialize: true,
    mapPropsToValues: (props) => {
        const { projectEdit } = props;
        return {
            id: projectEdit?.id,
            projectName: projectEdit.projectName,
            description: projectEdit.description,
            categoryId: projectEdit.categoryId
        }
    },

    validationSchema: Yup.object().shape({

    }),
    handleSubmit: (values, { props, setSubmitSetting }) => {
        props.dispatch({
            type: UPDATE_PROJECT_SAGA,
            projectUpdate: values
        })
    },
    displayName: 'Edit Project'
})(FormEditProject);

const mapStateToProps = (state) => ({
    projectEdit: state.ProjectReducer.projectEdit
})


export default connect(mapStateToProps)(editProjectForm)
