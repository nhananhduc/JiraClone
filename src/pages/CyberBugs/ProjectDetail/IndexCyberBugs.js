import React, { useEffect } from 'react'
import ContentMain from '../../../components/CyberBugs/Main/ContentMain'
import HeaderMain from '../../../components/CyberBugs/Main/HeaderMain'
import InfoMain from '../../../components/CyberBugs/Main/InfoMain'
import { useSelector, useDispatch } from 'react-redux'
import { GET_PROJECT_DETAIL } from '../../../redux/constants/CyberBugs/CyberBugs'

export default function IndexCyberBugs(props) {
    let { projectDetail } = useSelector(state => state.ProjectReducer);
    const dispatch = useDispatch();
    useEffect(() => {
        const { projectId } = props.match.params;
        dispatch({
            type: GET_PROJECT_DETAIL,
            projectId
        })
    }, [])
    return (
        <div className="main">
            <HeaderMain projectDetail={projectDetail} />
            <InfoMain projectDetail={projectDetail} />
            <ContentMain projectDetail={projectDetail}/>
        </div>
    )
}
