import React, { useContext, useEffect, useState } from "react";
import { ShopContext } from "../context/ShopContext";
import Title from "../components/Title";
import ProductItem from "../components/ProductItem";

const Collection = () => {
  const { products, search, showSearch } = useContext(ShopContext);
  const [filterProducts, setFilterProducts] = useState([]);
  const [category, setCategory] = useState([]);
  const [subCategory, setSubCategory] = useState([]);
  const [sortType, setSortType] = useState("relevant");
  const [showFilter, setShowFilter] = useState(false);

  const toggleCategory = (val) => category.includes(val) ? setCategory((prev) => prev.filter((item) => item !== val)) : setCategory((prev) => [...prev, val]);
  const toggleSubCategory = (val) => subCategory.includes(val) ? setSubCategory((prev) => prev.filter((item) => item !== val)) : setSubCategory((prev) => [...prev, val]);
  const resetFilters = () => { setCategory([]); setSubCategory([]); };

  const applyFilter = () => {
    let productsCopy = products.slice();
    if (showSearch && search) productsCopy = productsCopy.filter((item) => item.name.toLowerCase().includes(search.toLowerCase()));
    if (category.length > 0) productsCopy = productsCopy.filter((item) => category.includes(item.category));
    if (subCategory.length > 0) productsCopy = productsCopy.filter((item) => subCategory.includes(item.subCategory));
    setFilterProducts(productsCopy);
  };

  const sortProduct = () => {
    let fpCopy = [...filterProducts];
    switch (sortType) {
      case "low-high": setFilterProducts(fpCopy.sort((a, b) => a.price - b.price)); break;
      case "high-low": setFilterProducts(fpCopy.sort((a, b) => b.price - a.price)); break;
      default: applyFilter();
    }
  };

  useEffect(() => { applyFilter(); }, [category, subCategory, search, showSearch,products]);
  useEffect(() => { sortProduct(); }, [sortType]);
  useEffect(() => { const handleResize = () => { if (window.innerWidth >= 640) setShowFilter(false); }; window.addEventListener("resize", handleResize); return () => window.removeEventListener("resize", handleResize); }, []);

  return (
    <>
      <button onClick={() => setShowFilter((prev) => !prev)} className="sm:hidden fixed bottom-0 left-0 right-0 bg-[#A293AE] text-white py-3 text-center font-semibold z-50">{showFilter ? "Hide Filters" : "Show Filters"}</button>

      <div className="flex flex-col sm:flex-row gap-1 sm:gap-10 pt-6">
        <div className={`bg-gray-50 border border-gray-200 rounded-md p-4 sm:sticky sm:top-20 sm:self-start sm:h-fit sm:w-50 ${showFilter ? "fixed bottom-12 left-0 right-0 z-40 max-h-[60vh] overflow-auto" : "hidden sm:block"}`} style={{ maxWidth: "400px" }}>
           <h3 className="text-lg font-bold text-gray-800 mb-3">FILTERS</h3>
          <div className="mb-6">
            <p className="mb-2 text-sm font-bold tracking-wide text-gray-800">Category</p>
            <div className="flex flex-col gap-2 text-gray-700">
              {["Men", "Women", "Kids"].map((item) => (
                <label key={item} className="flex items-center gap-2 cursor-pointer select-none">
                  <input type="checkbox" checked={category.includes(item)} onChange={() => toggleCategory(item)} className="accent-[#A293AE] w-4 h-4" />
                  {item}
                </label>
              ))}
            </div>
          </div>

          <div className="mb-6">
            <p className="mb-2 text-sm font-bold tracking-wide text-gray-800">Type</p>
            <div className="flex flex-col gap-2 text-gray-700">
              {["Topwear", "Bottomwear", "Winterwear"].map((sub) => (
                <label key={sub} className="flex items-center gap-2 cursor-pointer select-none">
                  <input type="checkbox" checked={subCategory.includes(sub)} onChange={() => toggleSubCategory(sub)} className="accent-[#A293AE] w-4 h-4" />
                  {sub}
                </label>
              ))}
            </div>
          </div>

          <button onClick={resetFilters} className="w-full mt-4 py-2 bg-[#A293AE] text-white rounded text-sm font-medium">Reset Filters</button>
        </div>

        <div className="flex-1">
          <div className="flex justify-between items-center mb-4 gap-4 text-base sm:text-2xl">
            <Title text1={"ALL"} text2={"COLLECTIONS"} />
            <select value={sortType} onChange={(e) => setSortType(e.target.value)} className="border-2 border-gray-300 px-2 py-1 text-sm rounded text-gray-700 cursor-pointer" style={{ minWidth: "180px" }}>
              <option value="relevant">Sort by : Relevant</option>
              <option value="low-high">Sort by : Low to High</option>
              <option value="high-low">Sort by : High to Low</option>
            </select>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 gap-y-6">
            {filterProducts.map((item, index) => (
              <ProductItem key={index} name={item.name} id={item._id} price={item.price} image={item.image} />
            ))}
          </div>
        </div>
      </div>

      <style>{`select option:hover { background-color: #4D3B4C; color: white; }`}</style>
    </>
  );
};

export default Collection;
