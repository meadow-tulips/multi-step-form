import { useCallback, useEffect, useMemo, useRef } from "react";
import { connect } from "react-redux";
import { getAppropriateValidationMessage, getValidityState } from "../../utils"
import { actions } from "../../redux/stepsReducer";
import Input from "../Input";
import Select from "../Select";
import './index.css';

const countryOptions = [
    {
        label: "australia",
        value: "australia"
    }, {
        label: "india",
        value: "india"
    }, {
        label: "germany",
        value: "germany"
    }, {
        label: "france",
        value: "france"
    }, {
        label: "Russia",
        value: "russia"
    }
]

const cityOptions = [{
    label: "delhi",
    value: "delhi"
}, {
    label: "caneberra",
    value: "caneberra"
}, {
    label: "melbourne",
    value: "melbourne"
}, {
    label: "bangalore",
    value: "bangalore"
}, {
    label: "munich",
    value: "munich"
}, {
    label: "frankfurt",
    value: "frankfurt"
}]

const PersonalInformation = ({ update, data, resetValidations, updateValidations, validations, showErrors }) => {

    const inputRefs = useRef({});

    useEffect(() => {
        resetValidations({
            firstName: getValidityState(inputRefs.current['firstName'].validity),
            lastName: getValidityState(inputRefs.current['lastName'].validity),
            phoneNumber: getValidityState(inputRefs.current['phoneNumber'].validity),
            email: getValidityState(inputRefs.current['email'].validity),
            country: getValidityState(inputRefs.current['country'].validity),
            city: getValidityState(inputRefs.current['city'].validity)
        })
        return () => {
            resetValidations({});
        }
    }, [resetValidations])

    const onChange = useCallback((event) => {
        const { name, value } = event && event.target;
        update({ [name]: value })
        updateValidations({ [name]: getValidityState(event.target.validity)})
    }, [update, updateValidations]);


    const validationErrors = useMemo(() => Object.keys(validations || {})
    .reduce((acc, name) => {
        acc[name] = getAppropriateValidationMessage(validations[name]);
        return acc;
    }, {}), [validations]);

    const formErrors = useMemo(() => showErrors ? validationErrors : {}, [validationErrors, showErrors])
    

    return <div className="personal-info">
        <h2>Your Personal Information </h2>
        <p className="description">Enter your personal information to get closer to companies.</p>
        <form className="form" noValidate>
            <Input ref={ref => inputRefs.current['firstName'] = ref} required name="firstName" label="First name" type="text" value={data['firstName']} onChange={onChange} error={formErrors['firstName']} />
            <Input ref={ref => inputRefs.current['lastName'] = ref} required name="lastName" label="Last name" type="text" value={data['lastName']} onChange={onChange} error={formErrors['lastName']} />
            <Input pattern='^[0-9]{10}$' ref={ref => inputRefs.current['phoneNumber'] = ref} required name="phoneNumber" label="phone number" type="tel" value={data['phoneNumber']} onChange={onChange} error={formErrors['phoneNumber']} />
            <Input pattern='[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+[.]{1}[a-zA-Z]{2,}$' ref={ref => inputRefs.current['email'] = ref} required name="email" label="e-mail address" type="email" value={data['email']} onChange={onChange} error={formErrors['email']} />
            <Select required ref={ref => inputRefs.current['country'] = ref} name="country" className="country-select" label="country" options={countryOptions} value={data['country']} onChange={onChange} error={formErrors['country']} />
            <Select required ref={ref => inputRefs.current['city'] = ref} name="city" className="city-select" label="city" options={cityOptions} value={data['city']} onChange={onChange} error={formErrors['city']} />
        </form>
    </div>
}

const mapStateToProps = (store, props) => ({
    validations: store.stepsReducer?.[props.uniqueKey]?.validations,
    data: store.stepsReducer?.[props.uniqueKey]?.data,
    showErrors: store?.stepsReducer?.[props.uniqueKey]?.showErrors
})

const mapDispatchToProps = (dispatch, ownProps) => ({
    update: (values) => dispatch(actions.update({ key: ownProps.uniqueKey, ...values })),
    updateValidations: (values) => dispatch(actions.updateValidations({ key: ownProps.uniqueKey, ...values })),
    resetValidations: (values) => dispatch(actions.resetValidations({ key: ownProps.uniqueKey, ...values}))
})

export default connect(mapStateToProps, mapDispatchToProps)(PersonalInformation);