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
import ChooseUserRole from './pages/ChooseUserRole';
import ParticipantPage from './pages/ParticipantPage';
import ResultSubscription from './pages/ResultSubscription';
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
  const [page, setPage] = useState('startPage');

  const createRoomHandler = (room) => {
    setIsRoom(true);
    setRoom(room);
  };
  const chooseMode = (role) => {
    console.log(role);
    setPage(role);
  };
  const pageHandler = () => {
    console.log(page);
    // page = 'resultSubscriptionPage';
    switch (page) {
      case 'startPage':
        return <ChooseUserRole chooseMode={chooseMode} />;
        break;
      case 'admin':
        return <CreateRoom createRoomHandler={createRoomHandler} />;
        break;
      case 'Participant':
        return <ParticipantPage createRoomHandler={createRoomHandler} />;
        break;
      case 'listPage':
        return <ListItems room={room} />;
        break;
      case 'resultSubscriptionPage':
        return <ResultSubscription room={room} />;
        break;
      default:
        break;
    }
  };
  if (!isLoadingComplete) {
    return null;
  } else {
    return (
      <SafeAreaProvider>
        {/* <Navigation colorScheme={colorScheme} isRoom={isRoom} /> */}
        {/* <StatusBar /> */}
        <Section title="See Your Changes">
          {pageHandler()}
          {/* {isRoom ? (
            <ListItems room={room} />
          ) : (
            <CreateRoom createRoomHandler={createRoomHandler} />
          )} */}
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
