import { AutoComplete, Button, Input, Popconfirm, Space, Table } from 'antd';
import { EditOutlined, DeleteOutlined, SearchOutlined } from '@ant-design/icons';
import React, { useEffect, useRef, useState } from 'react'
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import { DELETE_USER_SAGA, EDIT_USER, GET_USER_API } from '../../../redux/constants/CyberBugs/CyberBugs';
import FormEditUser from '../../../components/Forms/FormEditUser/FormEditUser';

export default function UserManagement() {
  const { userSearch } = useSelector(state => state.UserCyberBugsReducer);
  const [value, setValue] = useState('');
  const searchRef = useRef(null);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch({
      type: GET_USER_API,
      keyword: ''
    })
  }, [])

  const [state, setState] = useState({
    filteredInfo: null,
    sortedInfo: null,
  });

  const handleChange = (pagination, filters, sorter) => {
    setState({
      filteredInfo: filters,
      sortedInfo: sorter,
    });
  };

  const columns = [
    {
      title: 'Id',
      dataIndex: 'userId',
      key: 'userId',
      sorter: (item2, item1) => {
        return item2.userId - item1.userId;
      },
      sortDirections: ['descend']
    },
    {
      title: 'User Name',
      dataIndex: 'name',
      key: 'name',
      sorter: (item2, item1) => {
        let userName1 = item1.name?.trim().toLowerCase();
        let userName2 = item2.name?.trim().toLowerCase();
        if (userName2 < userName1) {
          return -1;
        } return 1;
      },
    },
    {
      title: 'Email',
      dataIndex: 'email',
      key: 'email',
    },
    {
      title: 'Phone number',
      dataIndex: 'phoneNumber',
      key: 'phoneNumber',
    },
    {
      title: 'Action',
      dataIndex: 'action',
      key: 'action',
      render: (text, record, index) => (
        <Space size="middle">
          <Button type='primary' shape='round' onClick={() => {
            dispatch({
              type: 'OPEN_FORM_EDIT_USER',
              Component: <FormEditUser />,
              title: "Edit User"
            })
            dispatch({
              type: EDIT_USER,
              userEdit: record
            })
          }}><EditOutlined /></Button>
          <Popconfirm
            title="Are you sure to delete this user?"
            onConfirm={() => {
              dispatch({
                type: DELETE_USER_SAGA,
                userId: record.userId
              })
            }}
            okText="Yes"
            cancelText="No"
          >
            <Button type='primary' danger shape='round'><DeleteOutlined /></Button>
          </Popconfirm>
        </Space>
      )
    },

  ];

  return (
    <div className='container-fluid mt-5'>
      <h3>User Management</h3>
      <AutoComplete
        value={value}
        onChange={(text) => {
          setValue(text)
        }}
        style={{
          width: 400,
          marginBottom: 10
        }}
        options={userSearch?.map((user, index) => {
          return { label: user.name, value: user.userId.toString() }
        })}
        onSelect={(value, option) => {
          setValue(option.label);
        }}
        onSearch={(value) => {
          setValue(value)
          if (searchRef.current) {
            clearTimeout(searchRef.current)
          }
          searchRef.current = setTimeout(() => {
            dispatch({
              type: GET_USER_API,
              keyword: value
            })
          }, 300)
        }}
      >
        <Input size="large" placeholder="Search user..." suffix={<SearchOutlined />} />

      </AutoComplete>
      <Table rowKey={"userId"} columns={columns} dataSource={userSearch} onChange={handleChange} />
    </div>
  )
}
