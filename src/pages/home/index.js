import { useMemo, useRef } from "react";
import Stepbody from "../../components/Stepbody";
import StepNavigation from "../../components/StepNavigation";
import PersonalInformation from "../../components/PersonalInformation";
import Education from "../../components/Education";
import './index.css'
import WorkExp from "../../components/WorkExp";
import UserProfile from "../../components/UserProfile";

const Home = () => {
    const stepOptions = useMemo(() =>
        [{
            title: "Personal Information",
            description: "Enter your personal information to get closer to companies.",
            value: 1,
        }, {
            title: "Education",
            description: "Get to know better by adding your diploma, certificate and education life.",
            value: 2
        }, {
            title: "Work Experiences",
            description: "Help companies get to know you better by telling them about your past experiences.",
            value: 3
        }, {
            title: "User Photo",
            description: "Add your profile picture and let companies find you fast.",
            value: 4
        }], []);

    const uniqueKeyRef = useRef("homepage/signup")
    const uniqueKeyManagementRef = useRef('homepage/management')

    return <><section className="home-page">
        <StepNavigation uniqueKey={uniqueKeyRef.current} options={stepOptions} />
        <Stepbody uniqueKey={uniqueKeyRef.current} className="step-body">
            <PersonalInformation />
            <Education />
            <WorkExp />
            <UserProfile />
        </Stepbody>
    </section>

        <div className="home-page">
        <StepNavigation uniqueKey={uniqueKeyManagementRef.current} options={stepOptions} />
        <Stepbody uniqueKey={uniqueKeyManagementRef.current} className="step-body">
            <PersonalInformation />
            <Education />
            <WorkExp />
            <UserProfile />
        </Stepbody>
        </div>
    </>
}


export default Home;