import SectionTitle from '../../Components/Shared/SectionTitle';
import faq from '../../assets/home/faq.png'

const Faq = () => {
    return (
        <div>
            <SectionTitle heading='Frequently Asked Question' subHeading='What Users says about us ' ></SectionTitle>
            <div className="lg:flex border border-solid border-[#1313181A]  rounded-2xl mt-12 p-8 lg:space-y-0 space-y-8 gap-10 ">
                <div className="lg:flex-grow-0 ">
                    <img src={faq} alt="Meal Ordering"/>
                </div>
                <div className="lg:flex-grow">
                    <div className="collapse collapse-plus bg-base-200">
                        <input type="radio" name="my-accordion-6" />
                        <div className="collapse-title md:w-auto w-auto max-width text-xl font-bold">
                            How to Order
                        </div>
                        <div className="collapse-content md:w-auto lg:w-3/5 ">
                            <p>Follow our simple steps to place your order. Choose your meal, add to cart, and checkout.</p>
                        </div>
                    </div>
                    <div className="collapse collapse-plus bg-base-200">
                        <input type="radio" name="my-accordion-6" />
                        <div className="collapse-title md:w-auto w-auto max-width text-xl font-bold">
                            Meal Options
                        </div>
                        <div className="collapse-content md:w-auto lg:w-3/5 ">
                            <p>Explore a variety of meal options including vegetarian, vegan, gluten-free, and more.</p>
                        </div>
                    </div>
                    <div className="collapse collapse-plus bg-base-200">
                        <input type="radio" name="my-accordion-6" />
                        <div className="collapse-title md:w-auto w-auto max-width text-xl font-bold">
                            Payment Methods
                        </div>
                        <div className="collapse-content md:w-auto lg:w-3/5 ">
                            <p>We accept multiple payment methods including credit/debit cards, and digital wallets.</p>
                        </div>
                    </div>
                    <div className="collapse collapse-plus bg-base-200">
                        <input type="radio" name="my-accordion-6" />
                        <div className="collapse-title md:w-auto w-auto max-width text-xl font-bold">
                            Delivery Information
                        </div>
                        <div className="collapse-content md:w-auto lg:w-3/5 ">
                            <p>Get your meals delivered quickly and efficiently to your dorm or preferred location on campus.</p>
                        </div>
                    </div>
                    <div className="collapse collapse-plus bg-base-200">
                        <input type="radio" name="my-accordion-6" />
                        <div className="collapse-title md:w-auto w-auto max-width text-xl font-bold">
                            Special Offers
                        </div>
                        <div className="collapse-content md:w-auto lg:w-3/5 ">
                            <p>Take advantage of our student discounts and special offers to save on your meals.</p>
                        </div>
                    </div>
                    <div className="collapse collapse-plus bg-base-200">
                        <input type="radio" name="my-accordion-6" />
                        <div className="collapse-title md:w-auto w-auto max-width text-xl font-bold">
                            Nutrition Information
                        </div>
                        <div className="collapse-content md:w-auto lg:w-3/5 ">
                            <p>Check the nutrition information of our meals to make healthy and informed choices.</p>
                        </div>
                    </div>
                    <div className="collapse collapse-plus bg-base-200">
                        <input type="radio" name="my-accordion-6" />
                        <div className="collapse-title md:w-auto w-auto max-width text-xl font-bold">
                            Customer Support
                        </div>
                        <div className="collapse-content md:w-auto lg:w-3/5 ">
                            <p>Contact our customer support for any inquiries or assistance with your orders.</p>
                        </div>
                    </div>
                    <div className="collapse collapse-plus bg-base-200">
                        <input type="radio" name="my-accordion-6" />
                        <div className="collapse-title md:w-auto w-auto max-width text-xl font-bold">
                            Feedback
                        </div>
                        <div className="collapse-content md:w-auto lg:w-3/5 ">
                            <p>We value your feedback. Let us know how we can improve your experience.</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Faq;
