import React, { useEffect, useState } from 'react'
import { Editor } from '@tinymce/tinymce-react'
import { Select, Slider } from 'antd';
import { connect, useDispatch, useSelector } from 'react-redux';
import { GET_ALL_PROJECT_SAGA, GET_USER_API, GET_USER_BY_PROJECT_ID_SAGA } from '../../../redux/constants/CyberBugs/CyberBugs';
import { GET_ALL_TASK_TYPE_SAGA } from '../../../redux/constants/CyberBugs/TaskTypeConstant';
import { GET_ALL_PRIORITY_SAGA } from '../../../redux/constants/CyberBugs/PriorityConstant';
import { withFormik } from 'formik';
import * as Yup from 'yup'
import { CREATE_TASK_SAGA } from '../../../redux/constants/CyberBugs/TaskConstant';
import { GET_ALL_STATUS_SAGA } from '../../../redux/constants/CyberBugs/StatusConstant';




function FormCreateTask(props) {

    const { arrProject } = useSelector(state => state.ProjectCyberBugsReducer)
    const { arrTaskType } = useSelector(state => state.TaskTypeReducer)
    const { arrPriority } = useSelector(state => state.PriorityReducer)
    const { arrUser } = useSelector(state => state.UserCyberBugsReducer)
    const { arrStatus } = useSelector(state => state.StatusReducer)


    const userOptions = arrUser.map((item, index) => {
        return { value: item.userId.toString(), label: item.name }
    })

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch({
            type: GET_ALL_PROJECT_SAGA
        });
        dispatch({
            type: GET_ALL_TASK_TYPE_SAGA
        });
        dispatch({
            type: GET_ALL_PRIORITY_SAGA
        });
        dispatch({
            type: GET_USER_API,
            keyword: ''
        })
        dispatch({
            type: GET_ALL_STATUS_SAGA
        });
        dispatch({
            type:'SET_SUBMIT_CREATE_TASK',
            submitFunction: handleSubmit
        })

    }, [])

    const {
        handleChange,
        handleSubmit,
        setFieldValue
    } = props;

    const [size] = React.useState('default');

    const [timeTracking, setTimeTracking] = useState({
        timeTrackingSpent: 0,
        timeTrackingRemaining: 0
    })






    return (
        <form className='container' onSubmit={handleSubmit}>
            <div className='form-group'>
                <h6>Project</h6>
                <select className='form-control' name='projectId' onChange={(e) => {
                    let { value } = e.target;
                    dispatch({
                        type: GET_USER_BY_PROJECT_ID_SAGA,
                        idProject: value
                    })
                    setFieldValue('projectId', e.target.value)

                }}>
                    {arrProject?.map((project, index) => {
                        return <option key={index} value={project.id}>{project.projectName}</option>
                    })}
                </select>
            </div>
            <div className='form-group'>
                <h6>Task name</h6>
                <input className='form-control' onChange={handleChange} name='taskName' />
            </div>
            <div className='form-group'>
                <h6>Status </h6>
                <select className='form-control' onChange={handleChange} name='statusId'>
                    {arrStatus.map((status, index) => {
                        return <option key={index} value={status.statusId}>{status.statusName}</option>
                    })}
                </select>
            </div>
            <div className='form-group'>
                <div className='row'>
                    <div className='col-6'>
                        <h6>Priority</h6>
                        <select name='priorityId' className='form-control' onChange={handleChange}>
                            {arrPriority.map((priority, index) => {
                                return <option key={index} value={priority.priorityId}>{priority.priority}</option>
                            })}
                        </select>
                    </div>
                    <div className='col-6'>
                        <h6>Task type</h6>
                        <select className='form-control' name='typeId' onChange={handleChange}>
                            {arrTaskType.map((taskType, index) => {
                                return <option key={index} value={taskType.id}>{taskType.taskType}</option>
                            })}
                        </select>
                    </div>
                </div>

            </div>
            <div className='form-group'>
                <div className='row'>
                    <div className='col-6'>
                        <h6>Assignees</h6>
                        <Select
                            mode="tags"
                            size={size}
                            placeholder="Please select"
                            options={userOptions}
                            onChange={(values) => {
                                setFieldValue('listUserAsign', values)
                            }}
                            optionFilterProp='label'
                            style={{ width: '100%' }}
                        >
                        </Select>
                        <div className='row'>
                            <div className='col-12' style={{ marginTop: '14px' }}>
                                <h6>Original Estimate</h6>
                                <input className='form-control' type='number' min='0' name='originalEstimate' defaultValue='0' onChange={handleChange} />
                            </div>
                        </div>
                    </div>
                    <div className='col-6'>
                        <h6>Time tracking</h6>
                        <Slider defaultValue={30} value={timeTracking.timeTrackingSpent} max={Number(timeTracking.timeTrackingSpent) + Number(timeTracking.timeTrackingRemaining)} />
                        <div className='row'>
                            <div className='col-6 text-left text-info font-weight-bold'>
                                {timeTracking.timeTrackingSpent}h logged
                            </div>
                            <div className='col-6 text-right text-danger font-weight-bold'>
                                {timeTracking.timeTrackingRemaining}h logged
                            </div>
                        </div>
                        <div className='row'>
                            <div className='col-6'>
                                <h6>Time spent</h6>
                                <input onChange={(e) => {
                                    setTimeTracking({
                                        ...timeTracking,
                                        timeTrackingSpent: e.target.value
                                    });
                                    setFieldValue('timeTrackingSpent', e.target.value)
                                }} type='number' defaultValue='0' min='0' className='form-control' name='timeTrackingSpent' />
                            </div>
                            <div className='col-6'>
                                <h6>Time remaining</h6>
                                <input onChange={(e) => {
                                    setTimeTracking({
                                        ...timeTracking,
                                        timeTrackingRemaining: e.target.value
                                    });
                                    setFieldValue('timeTrackingRemaining', e.target.value)
                                }} type='number' defaultValue='0' min='0' className='form-control' name='timeTrackingRemaining' />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className='form-group'>
                <h6>Description</h6>
                <Editor name='description'
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
                    onEditorChange={(content, editor) => {
                        setFieldValue('description', content)
                    }}
                />
            </div>
            {/* <button type='submit' className='btn btn-primary'>Submit</button> */}
        </form>
    )
}

const createTaskForm = withFormik({
    enableReinitialize: true,

    mapPropsToValues: (props) => {
        const { arrPriority, arrProject, arrStatus, arrTaskType } = props;
        // if (arrProject.length > 0) {
        //     props.dispatch({
        //         type: GET_USER_BY_PROJECT_setFiel_SAGA,
        //         idProject: arrProject[0].id
        //     });
        // }
        return {
            taskName: '',
            description: '',
            statusId: arrStatus[0]?.statusId,
            originalEstimate: 0,
            timeTrackingSpent: 0,
            timeTrackingRemaining: 0,
            projectId: arrProject[0]?.id,
            typeId: arrTaskType[0]?.id,
            priorityId: arrPriority[0]?.priorityId,
            listUserAsign: []
        }
    },

    validationSchema: Yup.object().shape({

    }),
    handleSubmit: (values, { props, setSubmitSetting }) => {
        props.dispatch({
            type: CREATE_TASK_SAGA,
            taskObject: values
        })
    },
    displayName: 'Create Task'
})(FormCreateTask);

const mapStateToProps = (state) => {
    return {
        arrProject: state.ProjectCyberBugsReducer,
        arrTaskType: state.TaskTypeReducer,
        arrPriority: state.PriorityReducer,
        arrStatus: state.StatusReducer
    }
}

export default connect(mapStateToProps)(createTaskForm)
