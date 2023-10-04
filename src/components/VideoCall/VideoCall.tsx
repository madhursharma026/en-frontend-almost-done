import React, { useState } from 'react';
import AgoraUIKit from 'agora-rn-uikit';

const VideoCall = ({ navigation }: any) => {
  const [videoCall, setVideoCall] = useState(true);
  const connectionData = { appId: '7df3f65858214c6797432999ac6278cb', channel: 'My New Project 8' };
  const rtcCallbacks = {
    EndCall: () => (
      setVideoCall(false),
      navigation?.goBack()
    )
  };
  return videoCall ? <AgoraUIKit styleProps={{ UIKitContainer: {height: '50%', width: '100%'}}} connectionData={connectionData} rtcCallbacks={rtcCallbacks} /> : null;
};

export default VideoCall;