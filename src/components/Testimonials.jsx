import React, { useContext } from "react";
import { ThemeContext } from "../ThemeProvider";
import Title from "./Title";

const Testimonials = () => {
    const { isDarkMode } = useContext(ThemeContext)
    const testimonials = [
        {
            id: 1,
            name: "Ali Reza",
            feedback: "This platform helped me connect with amazing tutors. The user interface is so easy to use!",
            image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTe_ys7H5iGkuOPLwBIjnjqRVg6Ga_q91bjWA&s",
        },
        {
            id: 2,
            name: "Firoz khan",
            feedback: "I found the perfect tutor for learning French. Highly recommended!",
            image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTO6cNkiJMNHtX6b6ZFFp5c6_sA2icz4o5UNQ&s",
        },
        {
            id: 3,
            name: "Mohammad Rizwan",
            feedback: "A fantastic experience! The tutors are professional and the platform is very reliable.",
            image: "https://files.trackie.com/uploads/admin/2024-07-16-15-43-12.jpg",
        },
    ];

    return (
        <section className=" py-12 px-4 my-[100px]">
            <Title title="What Our Student Say" />
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
                {testimonials.map((testimonial) => (
                    <div key={testimonial.id} className="bg-white border p-6 rounded-lg shadow-lg text-center">
                        <img
                            data-aos="fade-up"
                            src={testimonial.image}
                            alt={testimonial.name}
                            className="w-24 h-24 object-cover border-[2px] border-tc  rounded-full mx-auto mb-4"
                        />
                        <h3 className="text-xl font-semibold text-gray-800" data-aos="fade-down">{testimonial.name}</h3>
                        <p className="text-gray-600 mt-4" data-aos="fade-up">{testimonial.feedback}</p>
                    </div>
                ))}
            </div>
        </section>
    );
};

export default Testimonials;
