import React from "react";

interface PricingProps {}

const Pricing: React.FC<PricingProps> = ({}) => {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <h1 style={{ textAlign: "center" }}>IT&apos;S FREE</h1>
    </div>
  );
};

export default Pricing;
