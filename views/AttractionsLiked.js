import React, {useState, useEffect, useCallback} from 'react';
import { useFocusEffect } from '@react-navigation/native';
import { Image, View, StyleSheet, ActivityIndicator, ScrollView, FlatList, TouchableOpacity } from 'react-native';
import { storeData, getData, removeData } from '../utils/Storage';
import { Button, IconButton, MD3Colors, Card, Text} from 'react-native-paper';
import { format } from "date-fns";

export default function AttractionsLikedScreen({ navigation }) {
  const [loading,setLoading] = useState(true);
  const [data, setData] = useState({});
  const [likes, setLikes] = useState({});

  useEffect(() => {
    fetchData();
  }, []);

  useFocusEffect(
    useCallback(() => {
      fetchData();
    }, [])
  );

  const fetchData = async () => {
    try {
      const response = require("../assets/content.json");
      await getData('likes').then(likesResponse => {
        setLikes(likesResponse || {});

        const filteredResponse = response.events.filter(function(item){
            return isAttractionLiked(item.id, likesResponse);
        }).sort(function(a,b){
            return new Date(a.date) - new Date(b.date);
        });

        setData(filteredResponse);
        setLoading(false);
      });
    } catch (error) {
      console.log("Erro ao carregar os dados", error);
      setLoading(false);
    }
  };

  const isAttractionLiked = (attractionId, likesResponse) => {
    return likesResponse[attractionId];
  };


  return(
    <View style={styles.container}>
    {loading ? (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    ) : (
      <View>
      <FlatList
        data={data}
        renderItem={({item}) =>
        <TouchableOpacity onPress={ () => navigation.navigate('AttractionDetails', {event: item, like: true})}>
            <Card style={styles.cardContainer}>
                <Card.Cover source={{ uri: item.imageUrl }} />
                <Card.Content>
                    <View style={{ paddingTop: 16 }}>
                        <Text tyle={styles.cardContainerTitle} variant="headlineSmall">{item.name}</Text>
                        <Text variant="bodyLarge">{format(new Date(item.date), "dd/MM/yyyy H:m")}</Text>
                        <Text variant="titleLarge">{item.price == "0" ? "Gratuito" : item.price}</Text>
                    </View>
                </Card.Content>
            </Card>
        </TouchableOpacity>}
      />
      </View>
    )}
    </View>
  );
}

const styles = StyleSheet.create({
    container: {
     padding: 15,
    },
    cardContainer: {
        marginBottom: 20
    },
    cardContainerLike:{
        flex: 1, 
        alignItems: 'flex-end'
    },
        bannerImage: {
        height: 200,
        width: '100%',
    },
        event: {
        fontSize: 18,
        height: 44,
    }
  })