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

const ParticipantPage = ({ createRoomHandler }) => {
  const [name, setName] = useState('');
  const [isMultiple, setIsMultiple] = useState(false);
  const toggleSwitch = () => setIsMultiple((previousState) => !previousState);
  const [noOfGroup, setNoOfGroup] = useState(0);

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
    <ScrollView>
      <View>
        <TextInput
          placeholder="Add Your Name..."
          style={styles.input}
          onChangeText={(text) => setName(text)}
          value={name}
        />
      </View>
      <View style={{ marginLeft: 15 }}>
        <Text>IsMultiple?</Text>
        <Switch
          trackColor={{ false: '#767577', true: '#81b0ff' }}
          thumbColor={isMultiple ? '#f5dd4b' : '#f4f3f4'}
          style={styles.checkbox}
          ios_backgroundColor="#3e3e3e"
          onValueChange={toggleSwitch}
          value={isMultiple}
        />
      </View>
      {isMultiple && (
        <View>
          <TextInput
            placeholder="No of Groups"
            onChangeText={(text) => setNoOfGroup(text)}
            style={styles.input}
            keyboardType="number-pad"
            value={noOfGroup}
          />
        </View>
      )}
      <TouchableOpacity
        style={styles.btn}
        onPress={() => {
          sendCreateRoomApi();
        }}
      >
        <Text style={styles.btnText}>Create Room</Text>
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
