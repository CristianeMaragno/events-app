import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import HomeScreen from './views/Home';
import AttractionListScreen from './views/AttractionList';
import AttractionDetailsScreen from './views/AttractionDetails'

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="AttractionList" component={AttractionListScreen} />
        <Stack.Screen name="AttractionDetails" component={AttractionDetailsScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
