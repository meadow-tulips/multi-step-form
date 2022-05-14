import { connect } from 'react-redux';
import './index.css'

const StepNavigation = ({ options = [], className = '', value }) => {
    if(!value || value > options.length) return null;
    return <section className={`step-navigation ${className}`}>
        <h1>Step {value}</h1>
        <p>{options[value - 1].description}</p>
        {(options || []).map(option => {
            return <div key={option.value} className={`container ${option.value <= value ? 'completed' : ''}`}>
                <span className='value '>{option.value}</span>
                <div className='title'>{option.title}</div>
            </div>
        })}
    </section>
}


const mapStateToProps = (store, { uniqueKey }) => ({
    value: store.stepsReducer[uniqueKey]?.value
})


export default connect(mapStateToProps)(StepNavigation);