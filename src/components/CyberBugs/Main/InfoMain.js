import React from 'react'
import parse from 'html-react-parser'

export default function InfoMain(props) {
    const { projectName, members, description } = props.projectDetail
    const renderAvatar = () => {
        return members?.map((user, index) => {
            return <div className='avatar' key={index}>
                <img src={user.avatar} alt={user.avatar} />
            </div>
        })
    }
    // const parseDescription = parse(description)
    return (
        <div>
            <h3>{projectName}</h3>
            <section>
                {parse(`${description}`)}
            </section>
            <div className="info" style={{ display: 'flex' }}>

                <div className="search-block">
                    <input className="search" />
                    <i className="fa fa-search" />
                </div>
                <div className="avatar-group" style={{ display: 'flex' }}>
                    {renderAvatar()}
                </div>
                <div style={{ marginLeft: 20 }} className="text">Only My Issues</div>
                <div style={{ marginLeft: 20 }} className="text">Recently Updated</div>
            </div>
        </div>
    )
}
