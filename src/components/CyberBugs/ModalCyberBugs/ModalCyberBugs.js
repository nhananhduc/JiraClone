import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import parse from 'html-react-parser'
import { CHANGE_ASSIGNESS, CHANGE_TASK_MODAL, HANDLE_CHANGE_POST_API_SAGA, REMOVE_USER_ASSIGN } from '../../../redux/constants/CyberBugs/TaskConstant';
import { GET_ALL_STATUS_SAGA } from '../../../redux/constants/CyberBugs/StatusConstant';
import { GET_ALL_PRIORITY_SAGA } from '../../../redux/constants/CyberBugs/PriorityConstant';
import { GET_ALL_TASK_TYPE_SAGA } from '../../../redux/constants/CyberBugs/TaskTypeConstant';
import { Editor } from '@tinymce/tinymce-react';
import { Select } from 'antd';
import { CLOSE_EDIT_COMMENT, DELETE_COMMENT_SAGA, EDIT_COMMENT_SAGA, INSERT_COMMENT_SAGA, OPEN_EDIT_COMMENT } from '../../../redux/constants/CyberBugs/CommentConstant';

export default function ModalCyberBugs(props) {
    const { taskDetailModal } = useSelector(state => state.TaskReducer);
    const { arrStatus } = useSelector(state => state.StatusReducer);
    const { arrPriority } = useSelector(state => state.PriorityReducer);
    const { arrTaskType } = useSelector(state => state.TaskTypeReducer);
    const { arrComment } = useSelector(state => state.CommentReducer);
    const { projectDetail } = useSelector(state => state.ProjectReducer);
    const [visibleEditor, setVisibleEditor] = useState(false);
    const [visibleCommentEditor, setVisibleCommentEditor] = useState(false);
    const [historyContent, setHistoryContent] = useState(taskDetailModal.description);
    const [content, setContent] = useState(taskDetailModal.description);
    const [contentComment, setContentComment] = useState(taskDetailModal.lstComment);
    const [editContentComment, setEditContentComment] = useState('')
    const [buttonDisplay, setButtonDisplay] = useState('inline-block');

    const arrCommentReversed = [...arrComment].reverse();

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch({
            type: GET_ALL_STATUS_SAGA
        });
        dispatch({
            type: GET_ALL_PRIORITY_SAGA
        });
        dispatch({
            type: GET_ALL_TASK_TYPE_SAGA
        });
    }, [])


    const handleChange = (e) => {
        const { name, value } = e.target;
        dispatch({
            type: HANDLE_CHANGE_POST_API_SAGA,
            actionType: CHANGE_TASK_MODAL,
            name,
            value
        })
    }

    const renderEditDescription = () => {
        const jsxDescription = parse(`${taskDetailModal.description}`);
        return <div>
            {visibleEditor ? <div> <Editor name='description'
                initialValue={taskDetailModal.description}
                init={{
                    height: 200,
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
                }
                }
                onEditorChange={(content, editor) => {
                    setContent(content)
                }
                }

            />
                <button className='btn btn-primary m-2' onClick={() => {
                    dispatch({
                        type: HANDLE_CHANGE_POST_API_SAGA,
                        actionType: CHANGE_TASK_MODAL,
                        name: 'description',
                        value: content
                    })
                    setVisibleEditor(false)
                }}>Save</button>
                <button className='btn border' onClick={() => {
                    dispatch({
                        type: HANDLE_CHANGE_POST_API_SAGA,
                        actionType: CHANGE_TASK_MODAL,
                        name: 'description',
                        value: historyContent
                    })
                    setVisibleEditor(false)
                }}>Close</button>
            </div> : <div style={{ cursor: 'pointer' }} onClick={() => {
                setHistoryContent(taskDetailModal.description)
                setVisibleEditor(true)
            }}>{jsxDescription}</div>}
        </div>
    }

    const renderAddDescription = () => {
        return <div>
            {visibleEditor ? <div> <Editor name='description'
                initialValue={taskDetailModal.description}
                init={{
                    height: 200,
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
                }
                }
                onEditorChange={(content, editor) => {
                    setContent(content)
                }
                }

            />{content !== '' ?
                <button className='btn btn-primary m-2' onClick={() => {
                    dispatch({
                        type: HANDLE_CHANGE_POST_API_SAGA,
                        actionType: CHANGE_TASK_MODAL,
                        name: 'description',
                        value: content
                    })
                    setVisibleEditor(false)
                }}>Save</button> : <button disabled style={{ cursor: 'no-drop' }} className='btn btn-primary m-2'>Save</button>}
                <button className='btn border' onClick={() => {
                    setVisibleEditor(false)
                }}>Close</button>
            </div> : <input className='form-control' type="text" placeholder="Add description ..." onClick={() => { setVisibleEditor(true) }} />}
        </div>
    }

    const renderComment = () => {
        return <div>{visibleCommentEditor ? <div> <Editor name='lstComment'
            init={{
                height: 150,
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
            }
            }
            onEditorChange={(content, editor) => {
                setContentComment(content)
            }
            }
        />

            {contentComment.toString() !== '' ?
                <button className='btn btn-primary m-2' onClick={() => {
                    if (contentComment !== '') {
                        dispatch({
                            type: INSERT_COMMENT_SAGA,
                            newComment: {
                                taskId: taskDetailModal.taskId,
                                contentComment: contentComment
                            }
                        })
                        setContentComment('')
                    }

                    setVisibleCommentEditor(false)
                }}>Save</button> : <button disabled className='btn btn-primary m-2' style={{ cursor: 'no-drop' }}>Save</button>}
            <button className='btn border' onClick={() => {
                setVisibleCommentEditor(false)
            }}>Close</button>
        </div> : <input className='form-control' type="text" placeholder="Add a comment ..." onClick={() => { setVisibleCommentEditor(true) }} />}
        </div>
    }


    const renderTimeTracking = () => {
        const { timeTrackingSpent, timeTrackingRemaining } = taskDetailModal;

        const max = Number(timeTrackingSpent) + Number(timeTrackingRemaining);
        const percent = Math.round(Number(timeTrackingSpent) / max * 100);

        return <div>
            <div style={{ display: 'flex' }}>
                <i className="fa fa-clock" />
                <div style={{ width: '100%' }}>
                    <div className="progress">
                        <div className="progress-bar" role="progressbar" style={{ width: `${percent}%` }} aria-valuenow={Number(timeTrackingSpent)} aria-valuemin={Number(timeTrackingRemaining)} aria-valuemax={max} />
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                        <p className="logged">{Number(timeTrackingSpent)}h logged</p>
                        <p className="estimate-time">{Number(timeTrackingRemaining)}h estimated</p>
                    </div>
                </div>
            </div >
            <div className='row'>
                <div className="col-6">
                    <input onChange={handleChange} name='timeTrackingSpent' className='form-control' />
                </div>
                <div className='col-6'>
                    <input onChange={handleChange} name='timeTrackingRemaining' className='form-control' />

                </div>
            </div>
        </div>
    }



    return (
        <div>
            <div className="modal fade" id="infoModal" tabIndex={-1} role="dialog" aria-labelledby="infoModal" aria-hidden="true">
                <div className="modal-dialog modal-info">
                    <div className="modal-content">
                        <div className="modal-header">
                            <div className="task-title">
                                <i className="fa fa-bookmark" />
                                <select name='typeId' value={taskDetailModal.typeId} onChange={handleChange}>
                                    {arrTaskType.map((taskType, index) => {
                                        return <option key={index} value={taskType.id}>{taskType.taskType}</option>
                                    })}
                                </select>
                                <span className='font-weight-bold'>{taskDetailModal.taskName}</span>
                            </div>
                            <div style={{ display: 'flex' }} className="task-click">
                                <div>
                                    <i className="fab fa-telegram-plane" />
                                    <span style={{ paddingRight: 20 }}>Give feedback</span>
                                </div>
                                <div>
                                    <i className="fa fa-link" />
                                    <span style={{ paddingRight: 20 }}>Copy link</span>
                                </div>
                                <i className="fa fa-trash-alt" style={{ cursor: 'pointer' }} />
                                <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                    <span aria-hidden="true">×</span>
                                </button>
                            </div>
                        </div>
                        <div className="modal-body">
                            <div className="container-fluid">
                                <div className="row">
                                    <div className="col-8">
                                        <p className="issue font-weight-bold">This is an issue of type: {taskDetailModal.taskTypeDetail.taskType}</p>
                                        <div className="description">
                                            <h6 className='font-weight-bold'>Description</h6>
                                            {taskDetailModal.description !== '' ? renderEditDescription() : renderAddDescription()}
                                        </div>
                                        <div className="comment mt-3">
                                            <h6 className='font-weight-bold'>Comments</h6>
                                            <div className="block-comment" style={{ display: 'flex' }}>
                                                <div className="input-comment">
                                                    {renderComment()}
                                                </div>
                                            </div>
                                            <div className="lastest-comment mt-3">
                                                <div className="comment-item">
                                                    <div className="display-comment" style={{ display: 'flex' }}>
                                                        <div >
                                                            {arrCommentReversed.map((comment, index) => {
                                                                const jsxContentComment = parse(`${comment.contentComment}`)
                                                                return <div key={index} className='d-flex'>
                                                                    <img style={{ width: 40, height: 40, borderRadius: '50%', marginRight: 10 }} src={comment.user?.avatar} alt={comment.user?.avatar} />
                                                                    <div className='border mb-1 p-2 bg-light'>
                                                                        {arrCommentReversed[index].visibleCommentEditor ?
                                                                            <div>
                                                                                <Editor name='lstComment'
                                                                                    initialValue={comment.contentComment}
                                                                                    init={{
                                                                                        height: 150,
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
                                                                                    }
                                                                                    }
                                                                                    onEditorChange={(content, editor) => {
                                                                                        setEditContentComment(content)
                                                                                    }
                                                                                    } />
                                                                                {editContentComment !== '' ? <button style={{ fontSize: '10px' }} className='btn btn-success p-1 mr-1 mt-1' onClick={() => {
                                                                                    dispatch({
                                                                                        type: EDIT_COMMENT_SAGA,
                                                                                        id: comment.id,
                                                                                        taskId: taskDetailModal.taskId,
                                                                                        contentComment: editContentComment
                                                                                    });
                                                                                    setButtonDisplay('inline-block')
                                                                                }}>save</button> : <button disabled style={{ fontSize: '10px', cursor: 'no-drop' }} className='btn btn-success p-1 mr-1 mt-1'>save</button>}

                                                                                <button style={{ fontSize: '10px' }} className='btn btn-secondary p-1 mt-1' onClick={() => {
                                                                                    dispatch({
                                                                                        type: CLOSE_EDIT_COMMENT,
                                                                                        id: comment.id,
                                                                                    });
                                                                                    setButtonDisplay('inline-block')
                                                                                }}>close</button>
                                                                            </div>
                                                                            : jsxContentComment}
                                                                        <div className='mt-2'>
                                                                            <button className='btn btn-light p-0 mr-1' style={{ fontSize: 10, display: `${buttonDisplay}` }} onClick={() => {
                                                                                dispatch({
                                                                                    type: OPEN_EDIT_COMMENT,
                                                                                    id: comment.id,
                                                                                })
                                                                                setButtonDisplay('none')
                                                                            }}>Edit</button>
                                                                            <button className='btn btn-light p-0' style={{ fontSize: 10, display: `${buttonDisplay}` }} onClick={() => {
                                                                                dispatch({
                                                                                    type: DELETE_COMMENT_SAGA,
                                                                                    idComment: comment.id,
                                                                                    taskId: taskDetailModal.taskId
                                                                                })
                                                                            }}>Delete</button>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            })}
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-4">
                                        <div className="status">
                                            <h6 className='font-weight-bold'>STATUS</h6>
                                            <select name='statusId' className="custom-select" value={taskDetailModal.statusId} onChange={(e) => {
                                                handleChange(e)
                                            }}>
                                                {arrStatus.map((status, index) => {
                                                    return <option value={status.statusId} key={index}>{status.statusName}</option>
                                                })}
                                            </select>
                                        </div>
                                        <div className="assignees">
                                            <h6 className='font-weight-bold'>ASSIGNEES</h6>
                                            <div className='row'>
                                                {taskDetailModal.assigness.map((user, index) => {
                                                    return <div className='col-6 mt-2 mb-2' key={index}>
                                                        <div style={{ display: 'flex' }} className="item">

                                                            <div className="avatar">
                                                                <img src={user.avatar} alt={user.avatar} />
                                                            </div>
                                                            <p className="name mt-1 ml-1">
                                                                {user.name}
                                                                <i className="fa fa-times" style={{ marginLeft: 5, cursor: 'pointer' }} onClick={() => {
                                                                    dispatch({
                                                                        type: HANDLE_CHANGE_POST_API_SAGA,
                                                                        actionType: REMOVE_USER_ASSIGN,
                                                                        userId: user.id
                                                                    })
                                                                }} />
                                                            </p>
                                                        </div>
                                                    </div>
                                                })}

                                                <div className='col-6 mt-2 mb-2'>
                                                    <Select
                                                        options={projectDetail.members?.filter(mem => {
                                                            let index = taskDetailModal.assigness?.findIndex(us => us.id === mem.userId);
                                                            if (index !== -1) {
                                                                return false;
                                                            } return true;
                                                        }).map((mem, index) => {
                                                            return { value: mem.userId, label: mem.name }
                                                        })}
                                                        optionFilterProp='label'
                                                        style={{ width: '100%' }}
                                                        name='lstUser'
                                                        value='Add more'
                                                        className='form-control'
                                                        onSelect={(value) => {
                                                            if (value === '0') {
                                                                return
                                                            }
                                                            let userSelected = projectDetail.members?.find(mem => mem.userId === value);
                                                            userSelected = { ...userSelected, id: userSelected.userId };
                                                            dispatch({
                                                                type: HANDLE_CHANGE_POST_API_SAGA,
                                                                actionType: CHANGE_ASSIGNESS,
                                                                userSelected
                                                            })
                                                        }}>
                                                    </Select>
                                                </div>
                                            </div>
                                        </div>

                                        <div className="priority" style={{ marginBottom: 20 }}>
                                            <h6 className='font-weight-bold'>PRIORITY</h6>

                                            <select name='priorityId' onChange={(e) => { handleChange(e) }} className='form-control' value={taskDetailModal.priorityId}>
                                                {arrPriority.map((item, index) => {
                                                    return <option key={index} value={item.priorityId}>{item.priority}</option>
                                                })}
                                            </select>
                                        </div>
                                        <div className="estimate">
                                            <h6 className='font-weight-bold'>ORIGINAL ESTIMATE (HOURS)</h6>
                                            <input name='originalEstimate' type="text" className="estimate-hours" value={taskDetailModal.originalEstimate} onChange={(e) => { handleChange(e) }} />
                                        </div>
                                        <div className="time-tracking">
                                            <h6 className='font-weight-bold'>TIME TRACKING</h6>
                                            {renderTimeTracking()}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
