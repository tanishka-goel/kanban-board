import React from "react";
import "../css/features.css";

const Features = (
  {textLeft = false,
  heading,
  subtextone,
  subtexttwo,
  imgPath,}
) => {
  return (
    <>
      {textLeft ? (
        <div className="feature-div">
          <div className="text-content">
            <h1 className="feature-heading"> {heading}</h1>
            <p  className="subtext">
               {subtextone}
            </p>
            <p  className="subtext">{subtexttwo}</p>
          </div>
          <div className="image-content">
            <img src={`${imgPath}`} alt="" />
            
          </div>
          
        </div>
      ) : (
        <div className="feature-div">
             <div className="image-content">
            <img src={`${imgPath}`} alt="" />
          </div>
          <div className="text-content">
            <h1 className="feature-heading"> {heading}</h1>
           <p className="subtext">
               {subtextone}
            </p>
            <p  className="subtext">{subtexttwo}</p>
          </div>

         
        </div>
      )}
    </>
  );
};

export default Features;
