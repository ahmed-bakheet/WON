import React, { useState, useEffect } from 'react';
import { View, StyleSheet, FlatList, Alert, Button, TouchableOpacity, Text } from 'react-native';
import Header from '../components/Header';
import ListItem from '../components/ListItem';
import AddItem from '../components/AddItem';
import Result from '../components/Result';
import { createStackNavigator } from '@react-navigation/stack';

const ResultSubscription = ({ room }) => {
  return <View style={styles.container}></View>;
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  button: {
    position: 'absolute',
    bottom: 20,
    right: 20,
    width: 60,
    height: 60,
    backgroundColor: '#2196F3',
    borderRadius: 30,
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 8,
  },
  buttonIcon: {
    fontSize: 30,
    color: '#fff',
  },
});

export default ResultSubscription;
