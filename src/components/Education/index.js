import { useCallback, useEffect, useRef, useMemo } from 'react';
import { connect } from 'react-redux';
import { actions } from '../../redux/stepsReducer';
import { getValidityState, getAppropriateValidationMessage } from '../../utils';
import Input from '../Input';
import './index.css';

const Education = ({ update, data, updateValidations, resetValidations, showErrors, validations }) => {

    const educationInputRefs = useRef({});

    const handleClick = useCallback((event) => {
        event.preventDefault();
        const uniqueKey = new Date().toISOString();
        update({ 'education': { ...data.education, [uniqueKey]: "" } })
    }, [data, update])

    const handleChange = useCallback((event) => {
        const { name, value } = event.target || {};
        if (name)
            update({ 'education': { ...data.education, [name]: value } });
    }, [update, data]);

    console.log(educationInputRefs.current);

    const handleDelete = useCallback((name) => {
        if (name) {
            const { education } = data || {};
            const { [name]: _, ...rest } = education || {};
            educationInputRefs.current = []
            update({ 'education': rest })
        }

    }, [update, data]);

    useEffect(() => {
        if (data.education && educationInputRefs.current) {
            Object.keys(educationInputRefs.current).forEach(name => {
                updateValidations({ [name]: getValidityState(educationInputRefs.current[name]?.validity) })
            })
        }

    }, [data?.education, updateValidations, educationInputRefs])

    useEffect(() => {
        resetValidations()
        return () => {
            resetValidations()
        }
    }, [resetValidations])


    const validationErrors = useMemo(() => Object.keys(validations || {})
        .reduce((acc, name) => {
            acc[name] = getAppropriateValidationMessage(validations[name]);
            return acc;
        }, {}), [validations]);

    const formErrors = useMemo(() => showErrors ? validationErrors : {}, [validationErrors, showErrors])

    return <div className="education">
        <h2> Education </h2>
        <p className="description">Inform companies about your education life.</p>
        {Object.keys(data['education'] || {}).map(item => {
            return <div className='education-input' key={item}>
                <Input ref={ref => { educationInputRefs.current[item] = ref }} required name={item} label={"School"} type="text" value={data['education']?.[item]} onChange={handleChange} error={formErrors[item]} />
                <div className='delete'><span onClick={() => handleDelete(item)}>Remove</span></div>
            </div>
        })}
        <Input className='add-new-school' label="School" type="submit" value="Add New School" handleClick={handleClick} />
    </div>
}

const mapStateToProps = (store, props) => ({
    data: store.stepsReducer?.[props.uniqueKey]?.data,
    validations: store.stepsReducer?.[props.uniqueKey]?.validations,
    showErrors: store.stepsReducer?.[props.uniqueKey]?.showErrors
})

const mapDispatchToProps = (dispatch, ownProps) => ({
    update: (values) => dispatch(actions.update({ key: ownProps.uniqueKey, ...values })),
    updateValidations: (values) => dispatch(actions.updateValidations({ key: ownProps.uniqueKey, ...values })),
    resetValidations: (values) => dispatch(actions.resetValidations({ key: ownProps.uniqueKey, ...values }))
})

export default connect(mapStateToProps, mapDispatchToProps)(Education);