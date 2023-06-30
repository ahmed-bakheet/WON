import React, { useState } from 'react';
import 'react-native-gesture-handler';

import { SafeAreaView, ScrollView, StyleSheet, Text, View } from 'react-native';

import { StatusBar } from 'expo-status-bar';

import { SafeAreaProvider } from 'react-native-safe-area-context';

import { useLoadedAssets } from './hooks/useLoadedAssets';
import Navigation from './navigation';
import { useColorScheme } from 'react-native';
import ListItems from './pages/list';
import CreateRoom from './pages/createRoom';
import {
  Colors,
  DebugInstructions,
  Header,
  LearnMoreLinks,
  ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';

function Section({ children, title }) {
  const isDarkMode = useColorScheme() === 'dark';
  return (
    <View style={styles.sectionContainer}>
      <Text
        style={[
          styles.sectionTitle,
          {
            color: isDarkMode ? Colors.white : Colors.black,
          },
        ]}
      >
        {title}
      </Text>
      <Text
        style={[
          styles.sectionDescription,
          {
            color: isDarkMode ? Colors.light : Colors.dark,
          },
        ]}
      >
        {children}
      </Text>
    </View>
  );
}

export default function App() {
  const isLoadingComplete = useLoadedAssets();
  const colorScheme = useColorScheme();
  const [isRoom, setIsRoom] = useState(false);
  const [room, setRoom] = useState(false);
  const createRoomHandler = (room) => {
    setIsRoom(true);
    setRoom(room);
  };
  if (!isLoadingComplete) {
    return null;
  } else {
    return (
      <SafeAreaProvider>
        <Section title="See Your Changes">
          {isRoom ? (
            <ListItems room={room} />
          ) : (
            <CreateRoom createRoomHandler={createRoomHandler} />
          )}
        </Section>
      </SafeAreaProvider>
    );
  }
}

const styles = StyleSheet.create({
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
  },
  highlight: {
    fontWeight: '700',
  },
});
