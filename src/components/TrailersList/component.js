import React, { useEffect, useState, useRef } from 'react';
import './index.scss';

import { useParams } from 'react-router-dom';

const TrailersList = () => {
  const [videos, setVideos] = useState([]);
  const { id } = useParams();

  useEffect(() => {
    fetch(
      `https://api.themoviedb.org/3/movie/${id}/videos?api_key=3796f44e00425ed7f9ce24e5c32086ef&language=en-US`
    )
      .then((data) => data.json())
      .then((res) => setVideos(res.results.slice(0, 4)));
  }, []);

  return (
    <div className="movie-trailers container mb-3">
      {videos &&
        videos.map((video, i) => <Video item={video} key={video.id}></Video>)}
    </div>
  );
};

const Video = ({ item }) => {
  const iframeRef = useRef(null);
  useEffect(() => {
    const height = (iframeRef.current.offsetWidth * 9) / 16 + 'px';
    iframeRef.current.setAttribute('height', height);
  }, []);

  return (
    <div className="movie-trailers__video">
      <div className="movie-trailers__title">
        <h2>{item.name}</h2>
      </div>
      <iframe
        src={`https://www.youtube.com/embed/${item.key}`}
        ref={iframeRef}
        width="100%"
        title="video"
      ></iframe>
    </div>
  );
};

export default TrailersList;
