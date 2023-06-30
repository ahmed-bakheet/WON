import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  ScrollView,
  Switch,
} from 'react-native';

const ChooseUserRole = ({ chooseMode }) => {
  const sendCreateRoomApi = () => {
    fetch('https://wheel-of-names.onrender.com/rooms', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },

      body: JSON.stringify({
        room: {
          name: name,
          multiple: isMultiple,
          no_of_group: noOfGroup,
        },
      }),
    })
      .then((response) => response.json())
      .then((res) => {
        createRoomHandler(res.room);
      })
      .catch((error) => console.error(error));
  };

  return (
    <ScrollView style={{ flex: 1, width: '100%', textAlign: 'left' }}>
      <Text style={styles.btnText}>choose your mode</Text>

      <TouchableOpacity
        style={styles.btn}
        onPress={() => {
          chooseMode('admin');
        }}
      >
        <Text style={styles.btnText}>ADMIN</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.btn}
        onPress={() => {
          chooseMode('Participant');
        }}
      >
        <Text style={styles.btnText}>Participant</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  input: {
    height: 60,
    padding: 8,
    margin: 5,
  },
  checkbox: {
    margin: 5,
  },
  btn: {
    backgroundColor: '#c2bad8',
    padding: 9,
    margin: 5,
  },
  btnText: {
    color: 'darkslateblue',
    fontSize: 20,
    textAlign: 'center',
  },
});

export default ChooseUserRole;
