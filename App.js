import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { PaperProvider } from 'react-native-paper';

import AttractionListScreen from './views/AttractionList';
import AttractionDetailsScreen from './views/AttractionDetails';
import AttractionsLikedScreen from './views/AttractionsLiked';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <PaperProvider>
      <NavigationContainer>
        <Stack.Navigator initialRouteName="AttractionList">
          <Stack.Screen name="AttractionList" options={{ title: 'Atrações' }} component={AttractionListScreen} />
          <Stack.Screen name="AttractionDetails" options={{ title: 'Detalhes' }} component={AttractionDetailsScreen} />
          <Stack.Screen name="AttractionsLiked" options={{ title: 'Favoritos' }} component={AttractionsLikedScreen} />
        </Stack.Navigator>
      </NavigationContainer>
    </PaperProvider>
  );
}
