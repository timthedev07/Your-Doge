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
      <div
        style={{
          width: "100%",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        {["dancin.gif", "dancinWithDrumstick.gif", "lala.gif"].map((each) => {
          return (
            <img
              key={each}
              src={`https://raw.githubusercontent.com/timthedev07/Your-Doge/assets-server/gif/${each}`}
              alt="doge dancing"
              style={{ height: "200px", borderRadius: "5px", margin: "5px" }}
            />
          );
        })}
      </div>
    </>
  );
};

export default Pricing;
