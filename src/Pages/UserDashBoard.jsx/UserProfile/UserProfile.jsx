import SectionTitle from "../../../Components/Shared/SectionTitle";

const UserProfile = () => {

    const name = 'Protap Biswas'

    return (
        <div>
            <SectionTitle heading={`Hello ${name}`} subHeading="Here is all your information about profile"></SectionTitle>
        </div>
    );
};

export default UserProfile;