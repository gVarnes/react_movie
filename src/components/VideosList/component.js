import React, { useEffect, useState, useRef } from 'react';
import './index.scss';

import { useParams } from 'react-router-dom';
import { VolumeDownOutlined } from '@mui/icons-material';

const VideosList = () => {
  const [videos, setVideos] = useState([]);
  const { id } = useParams();

  useEffect(() => {
    fetch(
      `https://api.themoviedb.org/3/movie/${id}/videos?api_key=3796f44e00425ed7f9ce24e5c32086ef&language=en-US`
    )
      .then((data) => data.json())
      .then((res) => setVideos(res.results.slice(0, 4)));
  }, []);

  useEffect(() => {
    console.log(videos);
  }, [videos]);

  return (
    <>
      {videos.length &&
        videos.map((video, i) => <Video item={video} key={video.id}></Video>)}
    </>
  );
};

const Video = ({ item }) => {
  console.log(item);
  const iframeRef = useRef(null);
  useEffect(() => {
    const height = (iframeRef.current.offsetWidth * 9) / 16 + 'px';
    iframeRef.current.setAttribute('height', height);
  }, []);

  return (
    <div className="video">
      <div className="video__title">
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

export default VideosList;
