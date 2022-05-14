import { useCallback } from 'react';
import { connect } from 'react-redux';
import { actions } from '../../redux/stepsReducer';
import Input from '../Input';
import './index.css';

const WorkExp = ({ update, data }) => {

    const handleClick = useCallback((event) => {
        event.preventDefault();
        const uniqueKey = new Date().toISOString();
        update({ 'work': { ...data.work, [uniqueKey]: { company: "", designation: "" } } })
    }, [data, update])

    const handleChange = useCallback((name, property, value) => {
        if (name)
            update({
                'work': {
                    ...data.work,
                    [name]: {
                        ...data.work[name],
                        [property]: value
                    }
                }
            });
    }, [update, data]);


    const handleDesignationChange = useCallback((event) => {
        const { name, value } = event.target || {};
        handleChange(name, 'designation', value);
    }, [handleChange]);

    const handleCompanyChange = useCallback((event) => {
        const { name, value } = event.target || {};
        handleChange(name, 'company', value);
    }, [handleChange]);

    const handleDelete = useCallback((name) => {
        if (name) {
            const { work } = data || {};
            const { [name]: _, ...rest } = work || {};
            update({ 'work': rest })
        }

    }, [update, data])

    return <div className="work-exp">
        <h2> Work Experiences </h2>
        <p className="description">Can you talk about your past work experience.</p>
        {Object.keys(data['work'] || {}).map(item => {
            return <div key={item}>
                <div className='work-input' key={item}>
                    <Input name={item} label={"Company"} type="text" value={data['work']?.[item]?.company} onChange={handleCompanyChange} />
                    <Input name={item} label={"Designation"} type="text" value={data['work']?.[item]?.designation} onChange={handleDesignationChange} />
                </div>
                <div className='delete'><span onClick={() => handleDelete(item)}>Remove</span></div>
            </div>
        })}
        <Input className='add-new-exp' label="Experience" type="submit" value="Add New Experience" handleClick={handleClick} />
    </div>
}

const mapStateToProps = (store, props) => ({
    data: store.stepsReducer?.[props.uniqueKey]?.data
})

const mapDispatchToProps = (dispatch, ownProps) => ({
    update: (values) => dispatch(actions.update({ key: ownProps.uniqueKey, ...values }))
})

export default connect(mapStateToProps, mapDispatchToProps)(WorkExp);
