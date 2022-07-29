import { combineReducers, createStore, applyMiddleware } from "redux";
import reduxThunk from 'redux-thunk'
import createMiddleWareSaga from 'redux-saga'
import rootSaga from './sagas/rootSaga'
import LoadingReducer from "./reducer/LoadingReducer";
import { ModalReducer } from './reducer/ModalReducer'
import { HistoryReducer } from "./reducer/HistoryReducer";
import { UserCyberBugsReducer } from "./reducer/UserCyberBugsReducer";
import { ProjectCategoryReducer } from "./reducer/ProjectCategoryReducer";
import { ProjectCyberBugsReducer } from "./reducer/ProjectCyberBugsReducer";
import { DrawerCyberBugsReducer } from "./reducer/DrawerCyberBugsReducer";
import { ProjectReducer } from "./reducer/ProjectReducer";
import { TaskTypeReducer } from "./reducer/TaskTypeReducer";
import { PriorityReducer } from "./reducer/PriorityReducer";
import { StatusReducer } from "./reducer/StatusReducer";
import { TaskReducer } from "./reducer/TaskReducer";
import { CommentReducer } from "./reducer/CommentReducer";

const middleWareSaga = createMiddleWareSaga();

const rootReducer = combineReducers({
    LoadingReducer,
    ModalReducer,
    HistoryReducer,
    UserCyberBugsReducer,
    ProjectCategoryReducer,
    ProjectCyberBugsReducer,
    DrawerCyberBugsReducer,
    ProjectReducer,
    TaskTypeReducer,
    PriorityReducer,
    StatusReducer,
    TaskReducer,
    CommentReducer
})

const store = createStore(rootReducer, applyMiddleware(reduxThunk, middleWareSaga));
middleWareSaga.run(rootSaga);

export default store;