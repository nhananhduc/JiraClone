import React, { useState, useEffect, useRef } from 'react'
import { Table, Button, Space, Popconfirm, Avatar, Popover, AutoComplete } from 'antd';
// import parse from 'html-react-parser'
import { EditOutlined, DeleteOutlined } from '@ant-design/icons'
import { useSelector, useDispatch } from 'react-redux';
import { ASSIGN_USER_API, DELETE_PROJECT_SAGA, DELETE_USER_API, GET_LIST_PROJECT_SAGA, GET_USER_API } from '../../../redux/constants/CyberBugs/CyberBugs';
import { Tag } from 'antd'
import FormEditProject from '../../../components/Forms/FormEditProject/FormEditProject';
import { NavLink } from 'react-router-dom';


export default function ProjectManagement(props) {
    const projectList = useSelector(state => state.ProjectCyberBugsReducer.projectList);
    const { userSearch } = useSelector(state => state.UserCyberBugsReducer);
    const [value, setValue] = useState('');
    const searchRef = useRef(null);

    const dispatch = useDispatch();
    const [state, setState] = useState({
        filteredInfo: null,
        sortedInfo: null,
    });

    useEffect(() => {
        dispatch({
            type: GET_LIST_PROJECT_SAGA
        })
    }, [])

    const handleChange = (pagination, filters, sorter) => {
        setState({
            filteredInfo: filters,
            sortedInfo: sorter,
        });
    };

    const columns = [
        {
            title: 'ID',
            dataIndex: 'id',
            key: 'id',
            sorter: (item2, item1) => {
                return item2.id - item1.id;
            },
            sortDirections: ['descend']
        },
        {
            title: 'Project Name',
            dataIndex: 'projectName',
            key: 'projectName',
            render: (text, record, index) => {
                return <NavLink to={`/projectdetail/${record.id}`} > {text}</NavLink >
            },
            sorter: (item2, item1) => {
                let projectName1 = item1.projectName?.trim().toLowerCase();
                let projectName2 = item2.projectName?.trim().toLowerCase();
                if (projectName2 < projectName1) {
                    return -1;
                } return 1;
            },
        },
        {
            title: 'Category Name',
            dataIndex: 'categoryName',
            key: 'categoryName',

            sorter: (item2, item1) => {
                let categoryName1 = item1.categoryname?.trim().toLowerCase();
                let categoryName2 = item2.categoryname?.trim().toLowerCase();
                if (categoryName2 < categoryName1) {
                    return -1;
                } return 1;
            },
        },
        {
            title: 'Creator',
            key: 'creator',
            render: (text, record, index) => {
                return <Tag color='green'>{record.creator?.name}</Tag>
            },
            sorter: (item2, item1) => {
                let creator1 = item1.creator?.name.trim().toLowerCase();
                let creator2 = item2.creator?.name.trim().toLowerCase();
                if (creator1 < creator2) {
                    return -1;
                } return 1;
            },
        },
        {
            title: 'Members',
            key: 'member',
            render: (text, record, index) => {
                return <div> {record.members?.slice(0, 3).map((member, index) => {
                    return <Popover key={index} placement='top' title={"Member"} content={() => {
                        return <table className='table'>
                            <thead>
                                <tr>
                                    <th>Id</th>
                                    <th>Avatar</th>
                                    <th>Name</th>
                                    <th></th>
                                </tr>
                            </thead>
                            <tbody>
                                {record.members?.map((item, index) => {
                                    return <tr key={index}>
                                        <td>{item.userId}</td>
                                        <td className='text-center'><img src={item.avatar} alt='avatar' style={{ borderRadius: '50%' }} width="30" height="30" /></td>
                                        <td className='text-center'>{item.name}</td>
                                        <td>
                                            <button className='btn btn-danger' onClick={() => {
                                                dispatch({
                                                    type: DELETE_USER_API,
                                                    userProject: {
                                                        userId: item.userId,
                                                        projectId: record.id
                                                    }
                                                })
                                            }}><DeleteOutlined /></button>
                                        </td>
                                    </tr>
                                })}
                            </tbody>
                        </table>
                    }}>
                        <Avatar src={member.avatar} />
                    </Popover>
                })}
                    {record.members?.length > 3 ? <Avatar>...</Avatar> : null}
                    <Popover placement="rightTop" title={"Add member"} content={() => {
                        return <AutoComplete
                            value={value}
                            options={userSearch?.map((user, index) => {
                                return { label: user.name, value: user.userId.toString() }
                            })}
                            onChange={(text) => {
                                setValue(text)
                            }}
                            onSelect={(valueSelect, option) => {
                                setValue(option.label);
                                dispatch({
                                    type: ASSIGN_USER_API,
                                    userProject: {
                                        "projectId": record.id,
                                        "userId": valueSelect
                                    }
                                })

                            }}
                            style={{ width: '100%' }} 
                            onSearch={(value) => {
                                if (searchRef.current) {
                                    clearTimeout(searchRef.current)
                                }
                                searchRef.current = setTimeout(() => {
                                    dispatch({
                                        type: GET_USER_API,
                                        keyword: value
                                    })
                                }, 300)

                            }} />
                    }} trigger="click">
                        <Button type='primary' ghost shape='circle'>+</Button>
                    </Popover>
                </div>
            }
        },
        {
            title: 'Action',
            key: 'action',
            render: (text, record, index) => (
                <Space size="middle">
                    <Button type='primary' shape='round' onClick={() => {
                        dispatch({
                            type: 'OPEN_FORM_EDIT_PROJECT',
                            Component: <FormEditProject />,
                            title: 'Edit Project'
                        })

                        dispatch({
                            type: 'EDIT_PROJECT',
                            projectEditModel: record
                        })
                    }}><EditOutlined /></Button>
                    <Popconfirm
                        title="Are you sure to delete this project?"
                        onConfirm={() => {
                            dispatch({
                                type: DELETE_PROJECT_SAGA,
                                idProject: record.id
                            })
                        }}
                        okText="Yes"
                        cancelText="No"
                    >
                        <Button type='primary' danger shape='round'><DeleteOutlined /></Button>
                    </Popconfirm>

                </Space>
            ),
        },
    ];

    return (
        <div className='container-fluid mt-5'>
            <h3>Project Management</h3>
            <Table rowKey={"id"} columns={columns} dataSource={projectList} onChange={handleChange} />
        </div>
    )
}

