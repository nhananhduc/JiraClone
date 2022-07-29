import { CLOSE_EDIT_COMMENT, GET_ALL_COMMENT, OPEN_EDIT_COMMENT } from "../constants/CyberBugs/CommentConstant"

const initialState = {
    arrComment: [{ visibleCommentEditor: false }]
}

export const CommentReducer = (state = initialState, action) => {
    switch (action.type) {
        case GET_ALL_COMMENT:
            return { ...state, arrComment: action.arrComment }
        case OPEN_EDIT_COMMENT:
            let indexOpen = state.arrComment.findIndex(comment => comment.id === action.id);
            if (indexOpen !== -1) {
                state.arrComment[indexOpen].visibleCommentEditor = true
            }
            return { ...state }
        case CLOSE_EDIT_COMMENT:
            let indexClose = state.arrComment.findIndex(comment => comment.id === action.id);
            if (indexClose !== -1) {
                state.arrComment[indexClose].visibleCommentEditor = false
            }
            return { ...state }
        default:
            return state
    }
}
