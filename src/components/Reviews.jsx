import React from "react";
import { Fade } from "react-awesome-reveal";
import Title from "./Title";
const ReviewsSection = () => {
    const reviews = [
        { id: 1, name: "John Doe", review: "Great products and amazing quality!" },
        { id: 2, name: "Jane Smith", review: "Quick delivery and fantastic support." },
        { id: 3, name: "Sam Wilson", review: "Highly recommend for all sports needs!" },
    ];

    return (
        <section className="my-10 w-[90%]  mx-auto p-5">
            <Title title="What Our Customers Say"/>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {reviews.map((review) => (
                    <div key={review.id} className="card bg-base-100 shadow-xl p-4">
                        <h3 className="text-lg font-bold"><Fade>{review.name}</Fade></h3>
                        <p className="mt-2 text-gray-600"><Fade>{review.review}</Fade></p>
                    </div>
                ))}
            </div>
        </section>
    );
};

export default ReviewsSection;
