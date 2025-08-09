import React from "react";

const Title = ({ text1, text2 }) => {
  return (
    <div className="inline-flex flex-col gap-2 items-center mb-3">
      <p className="text-[#A293AE]">
        {text1}
        <span className="text-[#4D3B4C] font-medium shimmer"> {text2}</span>
      </p>
    </div>
  );
};

export default Title;
