
import React from "react";
import { useNavigate, useParams } from "react-router-dom";
import Title from "./Title";


const TutorComponent = ({ uniqueTutor }) => {
    console.log(uniqueTutor)

    const navigate = useNavigate();

    const handleRedirect = (item) => {
        navigate(`/find-tutors/${item?.language}`)
    }

    return (
        <div className="p-6 my-[100px] w-full">
            <Title title="Our Tutors category"/>
            <div className="my-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 w-full md:w-[90%] lg:w-[90%]  mx-auto  ">

                {uniqueTutor?.map((tutor,index) => (
                    <div className="border rounded-lg  shadow-lg flex justify-between items-center flex-col" data-aos={`${index % 2 === 0 ? "fade-up" : "fade-down"}`}>
                        <img
                            src={tutor.image}
                            alt={tutor.name}
                            className="w-full h-[250px] object-cover  mb-4"
                            
                        />
                        <div className=" w-full">
                          <div className="p-2">
                                <h2 className="text-xl  "><span >Tutor</span> <span className="text-teal">{tutor?.name}</span></h2>
                                {tutor?.review > 5 && <p className="text-pink-300">Senior </p>}
                                <p  className="text-gray-600"><span className="text-red-400">{tutor?.language} </span></p>
                          </div>
                          <div className="flex justify-start items-center gap-4 px-2">
                                <p  className="text-white bg-teal w-max rounded-full px-3">${tutor?.price}</p>
                                <p className="text-red-400 w-max "> {tutor?.review}★★★</p>
                          </div>
                            <button className="mt-4  border w-full text-teal px-4 py-2 " onClick={() => handleRedirect(tutor)}>
                                Book Trial Lesson
                            </button>
                        </div>
                    </div>
                ))
                }
            </div>

        </div>
    );
};

export default TutorComponent;