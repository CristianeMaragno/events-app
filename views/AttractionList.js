import React, {useState, useEffect} from 'react';
import { Text, View, StyleSheet, Button, ActivityIndicator, ScrollView, FlatList, TouchableOpacity } from 'react-native';

export default function AttractionListScreen({ navigation }) {
  const [loading,setLoading] = useState(true);
  const [data,setData] = useState({});

  useEffect(() => {
    
  }, []);


  return(
    <ScrollView style={styles.container}>
    {loading ? (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    ) : (
      <View>
      <FlatList
        data={data}
        renderItem={({item}) =>
        <TouchableOpacity onPress={ () => navigation.navigate('ContactDetails', {contact: item})}>
          <View>
            <Text style={styles.contact}>{item.name}</Text>
          </View>
        </TouchableOpacity>}
      />
      <Button title="Voltar" onPress={() => navigation.navigate('Home')} />
      </View>
    )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
   padding: 15
  },
  contact: {
    fontSize: 18,
    height: 44,
  }
})