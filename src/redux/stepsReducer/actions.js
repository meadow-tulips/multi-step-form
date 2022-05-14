import actionTypes from "./actionTypes"


// For Multi steps controls
const initialize = (payload) => ({ type: actionTypes.INIT, payload: payload })

const previousStep = (payload) => ({ type: actionTypes.PREVIOUS_STEP, payload: payload });

const nextStep = (payload) => ({ type: actionTypes.NEXT_STEP, payload: payload });



// For data
const update = (payload) => ({ type: actionTypes.UPDATE, payload: payload });





// For handling Validations
const updateValidations = (payload) => ({ type: actionTypes.UPDATE_VALIDATIONS, payload: payload });

const resetValidations = (payload) => ({ type: actionTypes.RESET_VALIDATIONS, payload: payload });



// For Handling showing of errors.
const showErrors = (payload) => ({
    type: actionTypes.SHOW_ERRORS,
    payload
})

const hideErrors = (payload) => ({
    type: actionTypes.HIDE_ERRORS,
    payload
})

export {
    initialize,
    previousStep,
    nextStep,
    update,
    updateValidations,
    resetValidations,
    showErrors,
    hideErrors
}