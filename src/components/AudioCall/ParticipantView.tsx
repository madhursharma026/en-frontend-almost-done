import * as React from 'react';

import { Image, StyleSheet, ViewStyle } from 'react-native';
import type { Participant } from 'livekit-client';
import { useParticipant, VideoView } from '@livekit/react-native';
import { View, ImageBackground } from 'react-native';
import { Text } from 'react-native';
import { useTheme } from '@react-navigation/native';
export type Props = {
  participant: Participant;
  style?: ViewStyle;
  zOrder?: number;
  mirror?: boolean;
};
export const ParticipantView = ({
  style = {},
  participant,
  zOrder,
  mirror,
}: Props) => {
  const { cameraPublication, screenSharePublication } =
    useParticipant(participant);
  let videoPublication = cameraPublication ?? screenSharePublication;

  const { colors } = useTheme();
  let videoView;
  if (
    videoPublication &&
    videoPublication.isSubscribed &&
    !videoPublication.isMuted
  ) {
    videoView = (
      <VideoView
        style={styles.videoView}
        videoTrack={videoPublication?.videoTrack}
        zOrder={zOrder}
        mirror={mirror}
      />
    );
  } else {
    videoView = (
      <View style={styles.videoView}>
        <Image
          style={styles.icon}
          source={{ uri: 'https://sbcf.fr/wp-content/uploads/2018/03/sbcf-default-avatar.png' }}
        />
      </View>
    );
  }

  const displayName = participant.name
    ? participant.name
    : participant.identity;
  return (
    // <View style={[styles.container, style]}>
      <ImageBackground style={[style]} source={{uri: 'https://w0.peakpx.com/wallpaper/925/686/HD-wallpaper-whatsapp-background-patterns-texture.jpg'}} resizeMode="cover">
      {videoView}
      <Text style={{ color: 'white', fontSize: 24, textAlign: 'center', marginTop: 15 }}>{displayName}</Text>
      </ImageBackground>
    // </View>
  );
};

const styles = StyleSheet.create({
  videoView: {
    width: '100%',
  },
  icon: {
    width: 100,
    height: 100,
    marginTop: 50,
    alignSelf: 'center',
    borderRadius: 100,
  },
});
