const SectionTitle = ({heading,subHeading}) => {
    return (
        <div className="lg:w-1/3 w-full mx-auto">
            <h1 className="mt-5 text-orange-600 text-3xl text-center divide-y divide-blue-200">{heading}</h1>
            <div className="divider divider-warning"></div>
            <h1 className="text-xl text-orange-600 text-center">{subHeading}</h1>
        </div>
    );
};

export default SectionTitle;