import React, { useRef, useEffect } from 'react';
import { Editor } from '@tinymce/tinymce-react';
import { withFormik } from 'formik';
import { connect, useSelector, useDispatch } from 'react-redux'
import { CREATE_PROJECT_SAGA, GET_ALL_PROJECT_CATEGORY_SAGA } from '../../../redux/constants/CyberBugs/CyberBugs';
import * as Yup from 'yup'

function CreateProject(props) {
    const arrProjectCategory = useSelector(state => state.ProjectCategoryReducer.arrProjectCategory);
    const dispatch = useDispatch();
    const {
        handleChange,
        handleSubmit,
        setFieldValue
    } = props;
    useEffect(() => {
        dispatch({
            type: GET_ALL_PROJECT_CATEGORY_SAGA
        })
    }, [])

    const editorRef = useRef(null);
    const handleEditorChange = (content, editor) => {
        setFieldValue('description', content)
    }
    return (
        <div className='container mt-5'>
            <h3> Create Project</h3>
            <form className='container' onSubmit={handleSubmit} onChange={handleChange}>
                <div className='form-group'>
                    <p>Name</p>
                    <input className='form-control' name='projectName' />
                </div>
                <div className='form-group'>
                    <p>Description</p>
                    <Editor name='description'
                        onInit={(evt, editor) => editorRef.current = editor}
                        initialValue=""
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
                        onEditorChange = {handleEditorChange}
                    />
                </div>
                <div className='form-group'>
                    <select name='categoryId' className='form-control' onChange={handleChange}>
                        {arrProjectCategory.map((item, index) => {
                            return <option value={item.id} key={index}>{item.projectCategoryName}</option>
                        })}
                    </select>
                </div>
                <button className='btn btn-outline-primary' type='submit'>Create project</button>
            </form>
        </div>
    )
}

const createProjectForm = withFormik({
    enableReinitialize: true,
    mapPropsToValues: (props) => {
        return {
            projectName: '',
            description: '',
            categoryId: props.arrProjectCategory[0]?.id
        }
    },

    validationSchema: Yup.object().shape({

    }),
    handleSubmit: (values, { props, setSubmitSetting }) => {
        props.dispatch({
            type: CREATE_PROJECT_SAGA,
            newProject: values
        })
    },
    displayName: 'Create Project'
})(CreateProject);

const mapStateToProps = (state) => {
    return {
        arrProjectCategory: state.ProjectCategoryReducer.arrProjectCategory
    }
}

export default connect(mapStateToProps)(createProjectForm)
