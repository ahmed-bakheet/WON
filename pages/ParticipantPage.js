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

const ParticipantPage = ({ room }) => {
  const [name, setName] = useState('');
  const [shortCode, setShortCode] = useState('');
  const createItem = (text) => {
    fetch(`https://wheel-of-names.onrender.com/items?room_code=${shortCode}&item[name]=${name}`, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
    })
      .then((response) => response.json())
      .then((res) => {
        console.log('ss', res);
      })
      .catch((error) => console.error(error));
  };

  return (
    <ScrollView>
      <View>
        <TextInput
          placeholder="group shortCode ..."
          style={styles.input}
          onChangeText={(text) => setShortCode(text)}
          value={shortCode}
        />
      </View>
      <View>
        <TextInput
          placeholder="Your Name..."
          style={styles.input}
          onChangeText={(text) => setName(text)}
          value={name}
        />
      </View>
      <TouchableOpacity
        style={styles.btn}
        onPress={() => {
          createItem();
        }}
      >
        <Text style={styles.btnText}>Subscripe</Text>
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

export default ParticipantPage;
