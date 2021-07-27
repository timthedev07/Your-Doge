import React from "react";

interface PricingProps {}

const Pricing: React.FC<PricingProps> = ({}) => {
  return (
    <>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "60vh",
        }}
      >
        <h1 style={{ textAlign: "center" }}>IT&apos;S FREE</h1>
      </div>
      <img
        src="https://i.pinimg.com/originals/62/9b/06/629b065f07bd59226785164e6a2310f1.gif"
        alt="doge dancing"
      />
      <img
        src="https://media1.giphy.com/media/9C1nyePnovqlpEYFMD/giphy.gif"
        alt="doge"
      />
    </>
  );
};

export default Pricing;
