import React, { useCallback, useEffect } from "react";
import { connect } from "react-redux";
import { useNavigate } from "react-router-dom";
import { actions as StepsActions } from "../../redux/stepsReducer";
import Input from "../Input";
import './index.css';


const Stepbody = ({ uniqueKey, value, data, validations, children, className, handleNext, handlePrevious, initialize, showErrors }) => {
        
        const navigate = useNavigate();

        useEffect(() => {
                initialize();
        }, [initialize]);


        useEffect(() => {
                if(value > children.length)
                        navigate('/thankyou');

        }, [value, navigate, children])
 
        const handleValidation = useCallback(() => {
                // just check if all the fields in the validations are giving valid: true or not
                return !Object.values(validations).find(validityState => validityState.valid === false) ? true: false

        }, [validations]);


        const _handleNext = useCallback(() => {
                if(handleValidation())
                        handleNext()
                else 
                        showErrors()
        },[handleNext, handleValidation, showErrors]);

        const _handlePrevious = useCallback(() => {
                if(handleValidation())
                        handlePrevious()
                else 
                        showErrors()

        }, [handlePrevious, handleValidation, showErrors ]);


        if(!uniqueKey) return null;
        return <section className={`stepbody ${className}`}>
                {children.map((child, index) => index + 1 === value ? React.cloneElement(child, { uniqueKey: uniqueKey, key: index + 1 }) : null)}
                <div className="btn-group">
                        <button disabled={value === 1} className="previous" onClick={_handlePrevious}>Back</button>
                        <Input label={null} className="next" type="submit" handleClick={_handleNext} value={`${value === (children.length) ? "Submit" : "Next Step" }`}/>
                </div>
        </section>
}



const mapStateToProps = (store, { uniqueKey }) => ({
        value: store.stepsReducer[uniqueKey]?.value,
        data: store.stepsReducer[uniqueKey]?.data,
        validations: store.stepsReducer[uniqueKey]?.validations
})


const mapDispatchToProps = (dispatch, props) => ({
        initialize: () => dispatch(StepsActions.initialize({ key: props.uniqueKey })),
        handleNext: () => dispatch(StepsActions.nextStep({ key: props.uniqueKey })),
        handlePrevious: () => dispatch(StepsActions.previousStep({ key: props.uniqueKey })),
        showErrors: () => dispatch(StepsActions.showErrors({ key: props.uniqueKey })) 
})

export default connect(mapStateToProps, mapDispatchToProps)(Stepbody);

