import { Drawer, Button, Space } from 'antd';
import { useDispatch, useSelector } from 'react-redux';


export default function DrawerCyberBugs(props) {
    const { visible, ComponentContentDrawer, callBackSubmit, title } = useSelector(state => state.DrawerCyberBugsReducer)
    const dispatch = useDispatch();

    // const showDrawer = () => {
    //     dispatch({
    //         type: 'OPEN_DRAWER'
    //     })
    // };

    const onClose = () => {
        dispatch({
            type: 'CLOSE_DRAWER'
        })
    };

    return (
        <>
            {/* <button onClick={showDrawer}>show</button> */}
            <Drawer
                title={title}
                width={720}
                onClose={onClose}
                visible={visible}
                bodyStyle={{ paddingBottom: 80 }}
                extra={
                    <Space>
                        <Button onClick={onClose}>Cancel</Button>
                        <Button onClick={callBackSubmit} type="primary">
                            Submit
                        </Button>
                    </Space>
                }
            >
                {ComponentContentDrawer}
            </Drawer>
        </>
    )
}
