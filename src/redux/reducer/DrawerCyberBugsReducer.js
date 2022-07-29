const initialState = {
    visible: false,
    ComponentContentDrawer: <p>Default content</p>,
    title: '',
    callBackSubmit: () => { alert('click demo!') }
}

export const DrawerCyberBugsReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'OPEN_DRAWER':
            return { ...state, visible: true }
        case 'CLOSE_DRAWER':
            return { ...state, visible: false }
        case 'OPEN_FORM_EDIT_PROJECT': {
            return { ...state, visible: true, ComponentContentDrawer: action.Component, title: action.title }
        }
        case 'SET_SUBMIT_EDIT_PROJECT': {
            state.callBackSubmit = action.submitFunction;
            return { ...state }
        }
        case 'OPEN_FORM_CREATE_TASK': {
            return { ...state, visible: true, ComponentContentDrawer: action.Component, title: action.title }
        }
        case 'SET_SUBMIT_CREATE_TASK': {
            return { ...state, callBackSubmit: action.submitFunction }
        }
        case 'OPEN_FORM_EDIT_USER': {
            return { ...state, visible: true, ComponentContentDrawer: action.Component, title: action.title }
        }
        case 'SET_SUBMIT_EDIT_USER': {
            state.callBackSubmit = action.submitFunction;
            return { ...state }
        }
        default:
            return state
    }
}
