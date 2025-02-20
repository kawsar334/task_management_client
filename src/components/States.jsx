import React, { useContext, useEffect, useState } from "react";
import useFetch from "../data/UseFetch";
import { ThemeContext } from "../ThemeProvider";
import Title from "./Title";

const Stats = ({ LanguagesOffered }) => {

    const [rev, setRev] = useState(0)
    const { data, loading, error } = useFetch(`https://languageexchange-one.vercel.app/stats`);

    const {isDarkMode}= useContext(ThemeContext)

    const statsData = [
        { id: 1, label: "Total Tutors", value: data?.data?.tutor?.length, img:"https://gaviaspreview.com/landingpage/zilom/images/icons/elementor.png", },
        { id: 2, label: "Languages Offered", value: LanguagesOffered, img:"https://gaviaspreview.com/landingpage/zilom/images/icons/owl.png",},
        { id: 3, label: "Total Users", value: data?.data?.user?.length, img:"https://gaviaspreview.com/landingpage/zilom/images/icons/event.png", },
        { id: 4, label: "Total Reviews ★", value: rev, img:"https://gaviaspreview.com/landingpage/zilom/images/icons/woo.png", },
    ];

    useEffect(() => {
        if (data?.data?.tutor) {
            const totalReviews = data.data.tutor.reduce((acc, item) => {
                return acc + (item.review || 0); 
            }, 0);
            setRev(totalReviews); 
        }
    }, [data?.data?.tutor]);

    return (
        <div className={`my-10 w-[90%] m-auto ${isDarkMode ? "bg-transparent py-12" : " py-12"}`}>
            <div className="container mx-auto text-center ">
                <Title title="Our Statistics"/>
                <div className="grid grid-cols-1  sm:grid-cols-2 md:grid-cols-4 gap-2 w-[80%] md:w-full mx-auto">
                    {statsData.map((stat,index) => (
                        <div
                            data-aos={`${index % 2 === 0 ? "zoom-in-up" : "zoom-in-down"}`}
                            key={stat?.id}
                            className=" text-white  flex justify-start md:justify-center items-center md:flex-col gap-3  shadow-md rounded-lg p-6 hover:shadow-lg transition-shadow duration-300 flex-row bg-teal"
                        >
                            <img src={stat?.img} alt="" className="w-20 object-cover h-20 rounded" />
                            <h3 className="text-3xl font-extrabold text-textcolor cursor-pointer" >
                                {stat?.value} <i className="fa-solid fa-plus"></i>
                            </h3>
                            <p className="text-lg font-medium text-gray-600 mt-2" >
                                {stat?.label}
                            </p>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Stats;
