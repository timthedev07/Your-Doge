import React, { useState } from "react";
import { YoutubeVideoProps } from "../types/props";

export const YoutubeVideo: React.FC<YoutubeVideoProps> = ({
  style,
  videoId,
  className,
}) => {
  const [loading, setLoading] = useState<boolean>(true);
  return (
    <div className={className} style={{ ...style, overflow: "hidden" }}>
      {loading ? "loading" : null}
      <iframe
        src={`https://www.youtube.com/embed/${videoId}`}
        onLoad={() => setLoading(false)}
        onError={() => setLoading(false)}
        style={{ width: "100%", height: "100%" }}
      ></iframe>
    </div>
  );
};
