import { useLazyQuery } from '@apollo/client';
import React, { useEffect } from 'react';
import { Text, Image, StyleSheet, Pressable, View, ImageBackground } from 'react-native';
import { roomConnectingToOther } from '../../graphql/query';
import Toast from 'react-native-toast-message';

const CallingPage = ({ navigation, route }: any) => {
    let { firstParticipantToken } = route.params
    const [room_Connecting_To_Other] = useLazyQuery(roomConnectingToOther);

    async function findAnotherUser() {
        // fetch(`http://192.168.0.103:3000/connectingToOther/${firstParticipantToken}`)
        //     .then(response => response.json())
        //     .then(json => {
        //         if (json.data.joinRoom.secondParticipantToken != null) {
        //             navigation.push('RoomPage', { url: 'wss://audio-chat-nextjs-eqg35w5o.livekit.cloud/' + json.data.joinRoom.roomName, token: json.data.joinRoom.secondParticipantToken });
        //         } else {
        //             navigation.push('RoomPage', { url: 'wss://audio-chat-nextjs-eqg35w5o.livekit.cloud/' + json.data.joinRoom.roomName, token: json.data.joinRoom.firstParticipantToken });
        //         }
        //     })
        //     .catch(error => console.error(error))
        await room_Connecting_To_Other({
            variables: {
                joinRoomArgs: {
                    myToken: firstParticipantToken,
                },
            },
        })
            .then(async (res: any) => {
                if (res.data.joinRoom.secondParticipantToken != null) {
                    navigation.push('RoomPage', { url: 'wss://audio-chat-nextjs-eqg35w5o.livekit.cloud/' + res.data.joinRoom.roomName, token: res.data.joinRoom.secondParticipantToken });
                } else {
                    navigation.push('RoomPage', { url: 'wss://audio-chat-nextjs-eqg35w5o.livekit.cloud/' + res.data.joinRoom.roomName, token: res.data.joinRoom.firstParticipantToken });
                }
            })
            .catch(error => {
                Toast.show(error?.message);
            });
    }
    useEffect(() => {
        findAnotherUser();
    });

    return (
        <View>
            <ImageBackground style={{ height: '100%' }} source={{ uri: 'https://w0.peakpx.com/wallpaper/925/686/HD-wallpaper-whatsapp-background-patterns-texture.jpg' }} resizeMode="cover">
                <View style={{ width: '100%' }}>
                    <Image
                        style={styles.userIcon}
                        source={{ uri: 'https://sbcf.fr/wp-content/uploads/2018/03/sbcf-default-avatar.png' }}
                    />
                </View>
                <Text style={{ color: 'white', fontSize: 24, textAlign: 'center', marginTop: 15 }}>Connecting User...</Text>

                <View style={styles.container}>
                    <Pressable>
                        <View style={{ borderRadius: 100, padding: 7 }}>
                            <Image style={styles.iconOption} source={require('./icons/speaker.png')} />
                        </View>
                    </Pressable>
                    <Pressable>
                        <View style={{ borderRadius: 100, padding: 7 }}>
                            <Image style={styles.iconOption} source={require('./icons/baseline_videocam_white_24dp.png')} />
                        </View>
                    </Pressable>
                    <Pressable>
                        <View style={{ borderRadius: 100, padding: 7 }}>
                            <Image style={styles.iconOption} source={require('./icons/baseline_mic_white_24dp.png')} />
                        </View>
                    </Pressable>
                    <Pressable>
                        <View style={{ borderRadius: 100, backgroundColor: 'white' }}>
                            <Image
                                style={{ width: 40, height: 40 }}
                                source={{ uri: 'https://img.freepik.com/free-icons/call_318-350612.jpg?w=2000' }}
                            />
                        </View>
                    </Pressable>
                </View>
            </ImageBackground>
        </View>
    )
};

const styles = StyleSheet.create({
    userIcon: {
        width: 100,
        height: 100,
        marginTop: 50,
        alignSelf: 'center',
        borderRadius: 100,
    },

    container: {
        width: '100%',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-evenly',
        paddingVertical: 10,
        backgroundColor: '#222C35',
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
    },
    iconOption: {
        width: 30,
        height: 30,
    },
});


export default CallingPage;


