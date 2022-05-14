import { useCallback, useMemo } from 'react';
import { connect } from 'react-redux';
import { actions as stepActions } from '../../redux/stepsReducer';
import Input from '../Input';
import './index.css';

const UserProfile = ({ update, data }) => {

    const handleChange = useCallback((event) => {
        var file = event.target.files[0]
        let reader = new FileReader()
        reader.readAsDataURL(file)
        reader.onload = () => {
            update({ profile: reader.result })
        };
        reader.onerror = function (error) {
            console.log('Error: ', error);
        }

    }, [update])

    const profilePic = useMemo(() => data['profile'], [data])
    const profilePicElement = useMemo(() => profilePic ? <img className='profile-image' alt='profile' src={profilePic} /> : null, [profilePic])

    return <div className="user-profile">
        <h2> User Profile </h2>
        <p className="description">Upload your profile picture and show yourself.</p>
        <div className='profile-container'>
            <div className='emptydiv'></div>
            <Input name="profile" className='profile-pic-input' label={profilePicElement} type="file" onChange={handleChange} />
            <div className='name-location'>
                <h2 className='name'>{data.firstName} {data.lastName}</h2>
                <h5 className='location'>{data.city}{data.city && data.country && ','} {data.country} </h5>
            </div>
        </div>
    </div>
}


const mapStateToProps = (store, props) => ({
    data: store.stepsReducer?.[props.uniqueKey]?.data
})

const mapDispatchToProps = (dispatch, ownProps) => ({
    update: (values) => dispatch(stepActions.update({ key: ownProps.uniqueKey, ...values }))
})

export default connect(mapStateToProps, mapDispatchToProps)(UserProfile);