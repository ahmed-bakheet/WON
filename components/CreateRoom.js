import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  ScrollView
} from 'react-native';

const CreateRoom = () => {
  return (
    <ScrollView>
      <View>
        <TextInput
          placeholder="Add Name..."
          style={styles.input}
          onChangeText={onChange}
          value={text}
        />
      </View>
    </ScrollView>
  )
};