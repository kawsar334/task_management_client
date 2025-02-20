
import React, { useContext, useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import { Fade } from "react-awesome-reveal";
import { Tooltip as ReactTooltip } from "react-tooltip";
import App from "../Sidebar";
import { ThemeContext } from "../../ThemeProvider";

const ProductSection = () => {
  const { isDarkMode } = useContext(ThemeContext);
  const [equipmentList, setEquipmentList] = useState([]);
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [loading, setLoading] = useState(true);
  const [isAscending, setIsAscending] = useState(true);

  useEffect(() => {
    const fetchEquipment = async () => {
      try {
        const response = await fetch("https://languageexchange-one.vercel.app/products");
        const data = await response.json();


        setEquipmentList(data);
        const uniqueCategories = Array.from(new Set(data.map(item => item.categoryName)));
        setCategories(["All", ...uniqueCategories]); // Include "All" for default view
        setLoading(false);
      } catch (error) {
        console.error("Error fetching equipment data:", error);
      }
    };

    fetchEquipment();
  }, []);

  const handleCategoryChange = (category) => {
    console.log(categories)
    setSelectedCategory(category);
  };

  const filteredEquipmentList =
    selectedCategory === "All"
      ? equipmentList
      : equipmentList.filter(item => item.categoryName === selectedCategory);

      console.log(equipmentList)
  const handleSort = () => {
    const sortedList = [...equipmentList].sort((a, b) => {
      const priceA = a.price;
      const priceB = b.price;

      return isAscending ? priceA - priceB : priceB - priceA;
    });

    setEquipmentList(sortedList);
    setIsAscending(!isAscending);
  };

  if (loading) {
    return (
      <div className="w-full h-[60vh] flex justify-center items-center">
        <App />
      </div>
    );
  }

  return (
    <section
      className={`${isDarkMode ? "w-full p-2 md:p-5 bg-bgcolor text-white" : "w-full p-2 md:p-5 bg-white text-bgcolor"}`}
      id="product"
    >
      <Fade>
        <div className="flex justify-between items-center w-full flex-col md:flex-row lg:w-[50%] m-auto mb-6 py-4 px-3 rounded-full gap-3">
          <h2 className="text-3xl font-bold text-center">Featured Products</h2>
          <button
            className="border py-1 px-3 rounded-full bg-blue text-bgcolor "
            onClick={handleSort}
          >
            {isAscending ? "Sort by Price (High to Low)" : "Sort by Price (Low to High)"}
          </button>
        </div>
      </Fade>

      <div className="flex justify-start items-start w-[98%] mx-auto py-10 gap-3 flex-col lg:flex-row">
        <ul className="w-full lg:w-[20%] flex justify-start items-start gap-3 flex-row lg:flex-col flex-wrap lg:flex-nowrap p-3   h-max lg:h-[600px] lg:overflow-y-auto">
          {categories.map((category, index) => (
            <li
              key={index}
              className={`border py-1 px-3 rounded-full cursor-pointer ${selectedCategory === category ? "bg-blue text-bgcolor" : ""
                }`}
              onClick={() => handleCategoryChange(category)}
            >
              <Fade>{category}</Fade>
            </li>
          ))}
        </ul>
        <div className="flex justify-center items-center gap-5 flex-wrap w-full md:w-[95%] lg:w-[75%]">
          {filteredEquipmentList?.slice(0, 6).map(product => (
            <div
              key={product._id}
              className={`${isDarkMode
                  ? "card bg-white shadow-xl w-[97%] md:w-[45%] lg:w-[30%] text-bgcolor p-3 cursor-pointer  "
                  : "card bg-base-200 shadow-xl w-[97%] md:w-[45%] lg:w-[30%] p-3 cursor-pointer "
                }`}
              data-tooltip-id={"product" + product?._id}
              data-tooltip-content={product?.description}
            >
              <ReactTooltip id={"product" + product?._id} className="z-20" />
              <Fade>
                <img
                  src={product.image}
                  alt={product.itemName}
                  className="w-full h-48 object-cover rounded"
                />
              </Fade>
              <div className="p-4">
                <h3 className="text-xl font-semibold">
                  <Fade>{product.itemName}</Fade>
                </h3>
                <Fade>
                  <p className="text-gray-600">${product.price}</p>
                </Fade>
                <Fade>
                  <p className="text-gray-700">{product?.description.slice(0, 40)}...</p>
                </Fade>
                <Fade>
                  <div className="my-3">
                    <NavLink
                      to={`/details/${product._id}`}
                      className="py-1 px-3 bg-blue text-bgcolor rounded-full"
                    >
                      View Details
                    </NavLink>
                  </div>
                </Fade>
              </div>
            </div>
          ))}
          {filteredEquipmentList.length === 0 && (
            <p className="text-center text-gray-500">
              <Fade>No products found in this category.</Fade>
            </p>
          )}
        </div>
      </div>
    </section>
  );
};

export default ProductSection;
