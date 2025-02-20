


import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { ThemeContext } from "../ThemeProvider";
import img1 from "../assets/1.png";
import img2 from "../assets/2.png";
import img3 from "../assets/3.png";
import img4 from "../assets/4.png";
import img5 from "../assets/5.png";
import img6 from "../assets/6.png";
import Title from "./Title";
const LanguageCategory = ({ categories }) => {

    const images = [img1, img2, img3, img4, img5, img6].reverse();

    const { isDarkMode } = useContext(ThemeContext)
    const navigate = useNavigate();
    return (
        <div id="category" data-aos="fade-up" className={`${isDarkMode ? "py-5 text-tc   w-full md:w-[90%] m-auto  my-[100px] " : "py-10  w-full md:w-[90%] m-auto  my-[100px] "}`}>
            {/* <h2 className="text-3xl font-bold text-center mb-8">Language Categories</h2> */}
            <Title title="Language Categories"/>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2  lg:grid-cols-4  gap-4 px-4">
                {categories?.slice(0,6).map((category,index) => (                   
                    <div
                        key={category}
                        onClick={() => navigate(`/find-tutors/${category}`)}
                        className="bg-white mt-8 border shadow-lg rounded-lg   cursor-pointer hover:shadow-xl transition duration-300 flex items-center justify-between flex-col  px-5 py-3" data-aos="fade-down">
                       
                        <div className="w-full h-full"> 
                              <img src={images[index]} alt="" className="w-full h-[170px] object-cover" />
                              </div>
                      <div className="flex justify-start items-center  w-full gap-3 ">
                                <i className={`fas fa-globe text-4xl`} />
                            <div className="">


                                <h3 className="mt- text-xl font-semibold text-gray-800">{category} Tutors</h3>
                                <p className="text-[gray]">{index + 1}0 Teachers</p>
                            </div>
                        {/* <span className="text-4xl ">{">"}</span>     */}
                      </div>
                        {/* <i className="fas fa-arrow-right text-xl text-gray-500" /> */}
                    
                    </div>

                ))}
            </div>
        </div>
    );
};

export default LanguageCategory;
