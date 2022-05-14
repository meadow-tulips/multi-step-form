const getValidityState = (validity) => {
    const validityState = {}
    if (!validity) return validityState;
    for (let key in validity) {
        validityState[key] = validity[key]
    }
    return validityState
}


const getAppropriateValidationMessage = (validityState) => {
    if (validityState['valid']) return "";
    for (let key in validityState) {
        if (key !== 'valid' && validityState[key])
            switch (key) {
                case 'valueMissing':
                    return "Missing Required field";
                case 'typeMismatch':
                case 'patternMismatch':
                case "badInput":
                    return "Invalid input";
                case 'tooLong':
                    return "Input is too long."
                case 'tooShort':
                    return "Input is too short."
                case 'rangeUnderflow':
                    return "Input is less than than minimum value"
                case 'customError':
                    return "Custom Error"
                default:
                    return ""
            }
    }
}

export {
    getValidityState,
    getAppropriateValidationMessage
}