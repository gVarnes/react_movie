import React, { useEffect, useState, useRef } from 'react';
import './index.scss';

import { useParams } from 'react-router-dom';
import api, { category } from '../../api/api';

const TrailersList = () => {
  const [videos, setVideos] = useState([]);
  const { id } = useParams();

  useEffect(() => {
    api
      .getVideos(category.movie, id)
      .then((response) => setVideos(response.results.slice(0, 4)));
  }, []);

  return (
    <div className="movie-trailers container mb-3">
      {videos &&
        videos.map((video) => <Video item={video} key={video.id}></Video>)}
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
