import actionTypes from "./actionTypes";

const initialState = {}


const stepsReducer = (state = initialState, action) => {

    const { type, payload } = action || {};
    const { key, ...rest } = payload || {};
    switch (type) {
        case actionTypes.INIT:
            return {
                ...state,
                [key]: {
                    value: 1,
                    data: {},
                    validations: {},
                    showErrors: false
                }
            }
        case actionTypes.NEXT_STEP:
            return {
                ...state,
                [key]: {
                    ...state[key],
                    value: state[key].value + 1
                }
            };
        case actionTypes.PREVIOUS_STEP:
            return {
                ...state,
                [key]: {
                    ...state[key],
                    value: state[key].value - 1
                }
            }
        case actionTypes.UPDATE:
            return {
                ...state,
                [key]: {
                    ...state[key],
                    data: {
                        ...state[key].data,
                        ...rest
                    },
                    showErrors: false
                }
            }

        case actionTypes.UPDATE_VALIDATIONS:
            return {
                ...state,
                [key]: {
                    ...state[key],
                    validations: {
                        ...state[key].validations,
                        ...rest
                    },
                }
            }

        case actionTypes.RESET_VALIDATIONS: 
            return {
                ...state,
                [key]: {
                    ...state[key],
                    validations: rest || {},
                }
            }
        case actionTypes.SHOW_ERRORS:
            return {
                ...state,
                [key]: {
                    ...state[key],
                    showErrors: true
                }
            }
        case actionTypes.HIDE_ERRORS:
            return {
                ...state,
                [key]: {
                    ...state[key],
                    showErrors: false
                }
            }
        default:
            return state;
    }
}


export default stepsReducer;