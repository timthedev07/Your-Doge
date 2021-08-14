import React, { useState } from "react";
import { YoutubeVideoProps } from "../types/props";
import ContentLoader from "react-content-loader";

export const YoutubeVideo: React.FC<YoutubeVideoProps> = ({
  style,
  videoId,
  className,
}) => {
  const [loading, setLoading] = useState<boolean>(true);
  return (
    <div className={className} style={{ ...style, overflow: "hidden" }}>
      {loading ? (
        <ContentLoader
          foregroundColor="#555555"
          backgroundColor="#505050"
          height={"100%"}
          width={"100%"}
        >
          <rect x="10" y="15" rx="5" ry="5" width="100%" height="100%" />
        </ContentLoader>
      ) : null}
      <iframe
        src={`https://www.youtube.com/embed/${videoId}`}
        onLoad={() => setLoading(false)}
        onError={() => setLoading(false)}
        style={{ width: "100%", height: "100%" }}
      ></iframe>
    </div>
  );
};
