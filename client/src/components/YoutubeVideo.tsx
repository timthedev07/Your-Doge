import React from "react";
import { YoutubeVideoProps } from "../types/props";

export const YoutubeVideo: React.FC<YoutubeVideoProps> = ({
  style,
  videoId,
  className,
}) => {
  return (
    <iframe
      src={`https://www.youtube.com/embed/${videoId}`}
      style={style}
      className={className}
    ></iframe>
  );
};
