import React from "react";
import Title from "./Title";

const Services = () => {

    const services = [
        {
            id: 1,
            title: "One-on-One Language Exchange",
            description:
                "Connect with native speakers for personalized language practice sessions to improve your fluency.",
            icon: "🌐",
        },
        {
            id: 2,
            title: "Group Conversations",
            description:
                "Join group discussions with speakers from around the world to enhance your speaking and listening skills.",
            icon: "👥",
        },
        {
            id: 3,
            title: "Language Learning Resources",
            description:
                "Access curated learning materials, including grammar guides, vocabulary lists, and audio lessons.",
            icon: "📚",
        },
        {
            id: 4,
            title: "Cultural Exchange Activities",
            description:
                "Participate in cultural events and workshops to better understand the traditions and customs of your target language.",
            icon: "🎭",
        },
        {
            id: 5,
            title: "Interactive Quizzes",
            description:
                "Test your knowledge and track your progress with fun, interactive quizzes and challenges.",
            icon: "📝",
        },
        {
            id: 6,
            title: "Language Tutors",
            description:
                "Get guidance from professional tutors to help you master the nuances of your target language.",
            icon: "🎓",
        },
    ];

  

  return (
    <section className="py-10 text-bgcolor">
      <div className="max-w-7xl mx-auto px-6">
              <Title title="Our Services"/>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((service,index) => (
            <div
                  data-aos={`${index % 2 === 0 ? "zoom-in-up" : "zoom-in-down"}`}
              key={service.id}
              className="p-6 bg-white rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300"
            >
              <div className="text-4xl mb-4 text-blue-500">{service.icon}</div>
              <h3 className="text-xl font-semibold mb-2">{service.title}</h3>
              <p className="text-gray-600">{service.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Services;
