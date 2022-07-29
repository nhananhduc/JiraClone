import { all } from "redux-saga/effects"
import * as CyberBugs from './CyberBugs/UserCyberBugsSaga'
import * as ProjectCategorySaga from './CyberBugs/ProjectCategorySaga'
import * as ProjectSaga from './CyberBugs/ProjectSaga'
import * as TasktypeSaga from './CyberBugs/TaskTypeSaga'
import * as PrioritySaga from './CyberBugs/PrioritySaga'
import * as TaskSaga from './CyberBugs/TaskSaga'
import * as StatusSaga from './CyberBugs/StatusSaga'
import * as CommentSaga from './CyberBugs/CommentSaga'

function* rootSaga() {
    yield all([
        CyberBugs.followSignin(),
        CyberBugs.followSignup(),
        CyberBugs.followGetUser(),
        CyberBugs.followGetAllUserSaga(),
        CyberBugs.followAssignUser(),
        CyberBugs.followDeleteUserProject(),
        CyberBugs.followDeleteUserSaga(),
        CyberBugs.followEditUserSaga(),
        CyberBugs.followGetUserByProjectId(),
        ProjectCategorySaga.followGetAllProjectCategory(),
        ProjectSaga.followCreateProjectSaga(),
        ProjectSaga.followGetListProjectSaga(),
        ProjectSaga.followUpdateProjectSaga(),
        ProjectSaga.followDeleteProjectSaga(),
        ProjectSaga.followGetProjectDetail(),
        ProjectSaga.followGetAllProjectSaga(),
        TasktypeSaga.followGetAllTaskType(),
        PrioritySaga.followGetAllPriority(),
        CommentSaga.followGetAllCommentSaga(),
        CommentSaga.followInsertCommentSaga(),
        CommentSaga.followEditCommentSaga(),
        CommentSaga.followDeleteCommentSaga(),
        TaskSaga.followCreateTaskSaga(),
        TaskSaga.followGetTaskDetailSaga(),
        TaskSaga.followUpdateTaskStatusSaga(),
        TaskSaga.followHandleChangePostApi(),
        StatusSaga.followGetAllStatusSaga()
    ])
}

export default rootSaga


