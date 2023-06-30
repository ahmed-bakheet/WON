import React, { useState, useEffect } from 'react';
import { View, StyleSheet, FlatList, Alert, Button, TouchableOpacity, Text } from 'react-native';
import Header from '../components/Header';
import ListItem from '../components/ListItem';
import AddItem from '../components/AddItem';
import Result from '../components/Result';
import { createStackNavigator } from '@react-navigation/stack';

const List = ({ room }) => {
  const [items, setItems] = useState([]);
  const [choises, setChoises] = useState([]);
  const getItems = () => {
    fetch(`https://wheel-of-names.onrender.com/rooms/${room.id}`)
      .then((response) => response.json())
      .then((json) => {
        console.log('good', json.items);
        setItems(json.items);
      })
      .catch((error) => console.error(error));
  };
  const createItem = (text) => {
    fetch(`https://wheel-of-names.onrender.com/items?room_code=${room.code}&item[name]=${text}`, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
    })
      .then((response) => response.json())
      .then((res) => {
        getItems();
      })
      .catch((error) => console.error(error));
  };
  const spin = () => {
    fetch(`https://wheel-of-names.onrender.com/rooms/${room.id}/result`)
      .then((response) => response.json())
      .then((json) => {
        setChoises(json.choices);
      })
      .catch((error) => console.error(error));
  };

  useEffect(() => {
    getItems();
  }, []);
  // Flag true if user is currently editing an item
  const [editStatus, editStatusChange] = useState(false);

  // State to capture information about the item being edited
  const [editItemDetail, editItemDetailChange] = useState({
    id: null,
    text: null,
  });

  const [checkedItems, checkedItemChange] = useState([]);

  const deleteItem = (id) => {
    setItems((prevItems) => {
      return prevItems.filter((item) => item.id !== id);
    });
  };

  // Submit the users edits to the overall items state
  const saveEditItem = (id, text) => {
    setItems((prevItems) => {
      return prevItems.map((item) =>
        item.id === editItemDetail.id ? { id, text: editItemDetail.text } : item
      );
    });
    // Flip edit status back to false
    editStatusChange(!editStatus);
  };

  // Event handler to capture users text input as they edit an item
  const handleEditChange = (text) => {
    editItemDetailChange({ id: editItemDetail.id, text });
  };

  const addItem = (text) => {
    if (!text) {
      Alert.alert(
        'No item entered',
        'Please enter an item when adding to a name',
        [
          {
            text: 'Understood',
            style: 'cancel',
          },
        ],
        { cancelable: true }
      );
    } else {
      createItem(text);
      // setItems(prevItems => {
      //   return [{id: items[items.length-1]&&items[items.length-1].id?items[items.length-1].id+1:1, name:text}, ...prevItems];
      // });
    }
  };

  // capture old items ID and text when user clicks edit
  const editItem = (id, text) => {
    editItemDetailChange({
      id,
      text,
    });
    return editStatusChange(!editStatus);
  };

  const itemChecked = (id, text) => {
    const isChecked = checkedItems.filter((checkedItem) => checkedItem.id === id);
    isChecked.length
      ? // remove item from checked items state (uncheck)
        checkedItemChange((prevItems) => {
          return [...prevItems.filter((item) => item.id !== id)];
        })
      : // Add item to checked items state
        checkedItemChange((prevItems) => {
          return [...prevItems.filter((item) => item.id !== id), { id, text }];
        });
  };

  const socket = () => {
    const cableUrl = 'ws://wheel-of-names.onrender.com/cable'; // Replace with your Action Cable URL
    const channelName = 'RoomChannel'; // Replace with your channel name
    // Create a new WebSocket connection
    const socket = new WebSocket(cableUrl);

    // Event handler for when the WebSocket connection is established
    socket.onopen = function (event) {
      console.log('WebSocket connection established');

      // Subscribe to your channel
      const subscribeCommand = {
        command: 'subscribe',
        identifier: JSON.stringify({ channel: channelName, room_code: room.code }),
      };

      socket.send(JSON.stringify(subscribeCommand));
    };

    // Event handler for receiving WebSocket messages
    socket.onmessage = function (event) {
      const data = JSON.parse(event.data);
      const { identifier, message } = data;

      if (identifier && message) {
        console.log(`Received message from ${identifier}: ${message}`);
        console.log('message', message);
        setItems(...items, message[0]);
        // Handle the received message as needed
      }
    };

    // Event handler for WebSocket errors
    socket.onerror = function (error) {
      console.error('WebSocket error:', error);
    };
    // Event handler for WebSocket connection closure
    socket.onclose = function (event) {
      console.log('WebSocket connection closed');
    };
  };

  useEffect(() => {
    socket();
  }, [room, room.code]);

  return (
    // <>
    //   <NavigationContainer>
    //   <Stack.Navigator>
    //     <Stack.Screen name="admin" component={AdminScreen} />
    //     <Stack.Screen name="customer" component={CustomerScreen} />
    //   </Stack.Navigator>
    // </NavigationContainer>
    // </>

    <View style={styles.container}>
      <Header title={'List of names for ' + room.name} />
      <AddItem addItem={addItem} />
      <FlatList
        data={items}
        renderItem={({ item }) => (
          <ListItem
            item={item}
            deleteItem={deleteItem}
            editItem={editItem}
            isEditing={editStatus}
            editItemDetail={editItemDetail}
            saveEditItem={saveEditItem}
            handleEditChange={handleEditChange}
            itemChecked={itemChecked}
            checkedItems={checkedItems}
          />
        )}
      />
      <TouchableOpacity
        style={styles.button}
        onPress={() => {
          spin();
        }}
      ></TouchableOpacity>

      {choises.map((choice) => {
        return <Result items={choice} />;
      })}
    </View>
  );
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

export default List;
