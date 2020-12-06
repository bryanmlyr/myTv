import React from 'react';
import ReactPlayer from 'react-player';
import { useLocation } from 'react-router-dom';

const Player = () => {
  const { state } = useLocation();

  return (
    <div className="bg-black w-screen h-screen">
      <ReactPlayer playing url={state?.data?.url} controls={true} width='100%' height='100%' />
    </div>
  )
};

export default Player;