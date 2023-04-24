import React from "react";

const Video = ({ videoId }) => {
    function extractVideoId(link) {
        const regex = /(?:youtube(?:-nocookie)?\.com\/(?:[^\/\n\s]+\/\S+\/|(?:v|vi|e(?:mbed)?)\/|\S*?[?&]v=)|youtu\.be\/)([\w-]{11})/gi;
        const match = regex.exec(link);
        return match ? match[1] : null;
      }
      const videoLink = videoId;
      videoId = extractVideoId(videoLink);
  return (
    <div>
      <iframe className="videoClass"
        src={`https://www.youtube.com/embed/${videoId}`}
        title="YouTube video player"
        frameborder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowfullscreen
      ></iframe>
    </div>
  );
};

export default Video;
