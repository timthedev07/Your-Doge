import React from "react";
import { useHistory } from "react-router-dom";
import Background from "../assets/images/404.jpg";
import Yelling from "../assets/images/yellingDoge0.png";

export const NotFound: React.FC = () => {
  const history = useHistory();

  return (
    <div id="not-found-page" className="page-content">
      <div className="not-found-content">
        <h1>
          4<img src={Yelling} alt=" . " />4
        </h1>
        <h3>The page you were looking for was not found.</h3>
        <button
          onClick={() => {
            history.goBack();
          }}
          className="animated-btn"
        >
          Go Back
        </button>
      </div>
      <img
        id="not-found-bg"
        alt="404bg"
        src={
          1 > 2
            ? "https://c4.wallpaperflare.com/wallpaper/770/738/448/doge-wallpaper-thumb.jpg"
            : Background
        }
      />
    </div>
  );
};
