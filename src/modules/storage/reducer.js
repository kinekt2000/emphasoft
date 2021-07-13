import { SET_ME, UNSET_ME } from "./actions"

const INITIAL_STATE = {
    me: null
}

const storageReducer = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case SET_ME:
        case UNSET_ME:
            return {
                ...state,
                me: action.payload
            }

        default:
            return state
    }
}

export default storageReducer