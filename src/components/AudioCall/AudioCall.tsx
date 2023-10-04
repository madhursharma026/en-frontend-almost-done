import { Dispatch } from 'redux';
import { connect } from 'react-redux';
import React, { useState } from 'react';
import COLORS from '../../themes/colors';
import Button from '../../components/Button';
import { RootState } from '../../redux/store';
import { Header } from '../../components/Header';
import { scale } from '../../utils/scalingUtils';
import { View, StyleSheet, SafeAreaView, Text, TextInput, Alert } from 'react-native';
import { JoinRoomMutation } from '../../graphql/mutations';
import { useLazyQuery, useMutation } from '@apollo/client';
import Toast from 'react-native-toast-message';
import { roomConnectingToOther } from '../../graphql/query';

const AudioCall = ({ navigation, colors, isDark, }: { route: any; navigation: any; colors: any; isDark: boolean; }) => {
  const [username, setUsername] = useState('');

  const [Join_Room_Mutation] = useMutation(JoinRoomMutation);


  const [room_Connecting_To_Other] = useLazyQuery(roomConnectingToOther);

  async function joinRoom() {
    // fetch(`http://192.168.0.103:3000/join/${username}`)
    //   .then(response => response.json())
    //   .then(json => (
    //     fetch(`http://192.168.0.103:3000/connectingToOther/${json.data.joinRoom.firstParticipantToken}`)
    //       .then(response => response.json())
    //       .then(json => {
    //           navigation.push('CallingPage', {firstParticipantToken: json.data.joinRoom.firstParticipantToken});
    //       })
    //       .catch(error => console.error(error))
    //   ))
    //   .catch(error => console.error(error));
    await Join_Room_Mutation({
      variables: {
        joinRoomArgs: {
          username: username,
        },
      },
    })
      .then(async (res: any) => {
        await room_Connecting_To_Other({
          variables: {
            joinRoomArgs: {
              myToken: res.data.joinRoom.firstParticipantToken,
            },
          },
        })
          .then(async (res: any) => {
            navigation.push('CallingPage', { firstParticipantToken: res.data.joinRoom.firstParticipantToken });
          })
          .catch(error => {
            Toast.show(error?.message);
          });
      })
      .catch(error => {
        Toast.show(error?.message);
      });
  }

  return (
    <View
      style={[styles.container, { backgroundColor: colors.ONBOARDING_BG_COLOR }]}>
      <SafeAreaView style={{ flex: 1 }}>
        <Header title='Find Random Partner' navigation={navigation} isLeftView={true} colors={colors} isDark={isDark} />
        <View style={{ marginHorizontal: 10, marginTop: 15 }}>
          <Text style={{ color: colors.text }}>Your Username</Text>
          <TextInput style={{ color: colors.text, borderColor: colors.border, ...styles.input, }} onChangeText={setUsername} value={username} />
          <Button title={'Make A Call'} wrapperStyle={styles.loginBtnViewStyle} onClick={() => joinRoom()} />
        </View>
        <View style={{ alignItems: 'center' }}>
        </View>
      </SafeAreaView>
    </View>
  );
};

const mapStateToProps = (state: RootState) => {
  const { themeReducer } = state;
  const { themeMode, isDark, colors } = themeReducer;
  return { themeMode, isDark, colors, };
};

const mapDispatchToProps = (dispatch: Dispatch) => { return {}; };
export default connect(mapStateToProps, mapDispatchToProps)(AudioCall);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.WHITE,
  },
  loginBtnViewStyle: {
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
    height: scale(40),
    backgroundColor: COLORS.BLUE_STONE,
  },
  input: {
    height: 35,
    padding: 5,
    width: '100%',
    borderWidth: 0.5,
    marginVertical: 8,
  },
});

