import * as React from 'react';
import { View, Text, Image, Button, StyleSheet, BackHandler } from 'react-native';

export default function HomeScreen({ navigation }) {
  return (
    <View>
      <View style={styles.container}>
        <Text style={styles.title} >Evento x</Text>
      </View>
      <View style={styles.button}>
        <Button title="Ver atrações" onPress={() => navigation.navigate('AttractionList')} />
      </View>
      <View style={styles.button}>
        <Button title="Sair" onPress={() => BackHandler.exitApp() } />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    padding: 60,
  },
  logo: {
    height: 160,
    width: 160,
  },
  title: {
    padding: 30,
    fontSize: 18,
  },
  button: {
    padding: 15
  }
});