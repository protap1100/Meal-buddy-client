const SectionTitle = ({heading,subHeading}) => {
    return (
        <div className="w-96 mx-auto">
            <h1 className="mt-5 text-3xl text-center divide-y divide-blue-200">{heading}</h1>
            <div className="divider divider-neutral"></div>
            <h1 className="text-xl text-center">{subHeading}</h1>
        </div>
    );
};

export default SectionTitle;