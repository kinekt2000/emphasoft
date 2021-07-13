import camelcase from "camelcase";
import { API_ACTIONS } from "./actions";
import ENDPOINTS from "./endpoints";

function initApiState() {
    return Object.keys(ENDPOINTS).reduce((acc, next) => {
        const inner = {
            data: null,
            loading: false,
            error: null
        }

        acc[camelcase(next)] = inner;

        return acc;
    }, {})
}

const INITIAL_STATE = initApiState()

const apiReducer = (state = INITIAL_STATE, action) => {
    if (action.type.startsWith(API_ACTIONS.FETCH_START)) {
        const inner = camelcase(action.type.replace(API_ACTIONS.FETCH_START, ""));

        return {
            ...state,
            [inner]: {
                ...state[inner],
                loading: true,
                error: null
            }
        }
    }

    if (action.type.startsWith(API_ACTIONS.FETCH_SUCCESS)) {
        const inner = camelcase(action.type.replace(API_ACTIONS.FETCH_SUCCESS, ""));

        return {
            ...state,
            [inner]: {
                ...state[inner],
                data: action.payload,
                loading: false,
                error: null
            }
        }
    }

    if (action.type.startsWith(API_ACTIONS.FETCH_FAILURE)) {
        const inner = camelcase(action.type.replace(API_ACTIONS.FETCH_FAILURE, ""));

        return {
            ...state,
            [inner]: {
                ...state[inner],
                loading: false,
                error: action.payload
            }
        }
    }

    if (action.type.startsWith(API_ACTIONS.FETCH_CLEAR)) {
        const inner = camelcase(action.type.replace(API_ACTIONS.FETCH_CLEAR, ""))

        return {
            ...state,
            [inner]: {
                ...state[inner],
                loading: false,
                error: null,
                data: null
            }
        }
    }

    return state;
}

export default apiReducer;