import React from 'react';
import {View, Text} from 'react-native';

const Result = ({items}) => {
  return (
    <View >
    {
      items.map(item=>{
        return(
          <Text>{item}</Text>
        )
      })
    }
    <Text>...</Text>
    </View>
  );
};





export default Result;
