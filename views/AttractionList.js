import React, {useState, useEffect, useCallback} from 'react';
import { useFocusEffect } from '@react-navigation/native';
import { Image, View, StyleSheet, ActivityIndicator, ScrollView, FlatList, TouchableOpacity } from 'react-native';
import { storeData, getData, removeData } from '../utils/Storage';
import { Button, IconButton, MD3Colors, Card, Text} from 'react-native-paper';
import { format } from "date-fns";

export default function AttractionListScreen({ navigation }) {
  const [loading,setLoading] = useState(true);
  const [data,setData] = useState({});
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
      const sortedResponse = response.events.sort(function(a,b){
        return new Date(a.date) - new Date(b.date);
      });
      setData(sortedResponse);

      const likesData = await getData('likes');
      setLikes(likesData || {});

      setLoading(false);
    } catch (error) {
      console.log("Erro ao carregar os dados", error);
      setLoading(false);
    }
  };

  const saveLike = async (attractionId) => {
    const updatedLikes = { ...likes, [attractionId]: true };
    await storeData('likes', updatedLikes);
    setLikes(updatedLikes);
  };

  const removeLike = async (attractionId) => {
    const { [attractionId]: removedLike, ...restLikes } = likes;
    await storeData('likes', restLikes);
    setLikes(restLikes);
  };

  const isAttractioLiked = (attractionId) => {
    return likes[attractionId];
  };

  const toggleLike = (attractionId) => {
    if (isAttractioLiked(attractionId)) {
      removeLike(attractionId);
    } else {
      saveLike(attractionId);
    }
  };

  return(
    <View style={styles.container}>
    {loading ? (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    ) : (
      <View style={styles.containerList}>
        <View style={styles.likedButton} >
          <Button icon="heart" mode="contained" onPress={() => navigation.navigate('AttractionsLiked')}>
            Favoritos
          </Button>
        </View>
        <FlatList
          data={data}
          renderItem={({item}) =>
          <TouchableOpacity onPress={ () => navigation.navigate('AttractionDetails', {event: item, like: isAttractioLiked(item.id)})}>
            <Card style={styles.cardContainer}>
              <Card.Cover source={{ uri: item.imageUrl }} />
              <Card.Content>
                <View style={{ paddingTop: 16 }}>
                  <Text tyle={styles.cardContainerTitle} variant="headlineSmall">{item.name}</Text>
                  <Text variant="bodyLarge">{format(new Date(item.date), "dd/MM/yyyy H:m")}</Text>
                  <Text variant="titleLarge">{item.price == "0" ? "Gratuito" : item.price}</Text>
                  <View style={styles.cardContainerLike}>
                    <IconButton
                      icon={isAttractioLiked(item.id) ? 'heart' : 'heart-outline'}
                      iconColor={MD3Colors.primary40}
                      size={34}
                      onPress={() => toggleLike(item.id)}
                    />
                  </View>
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
  containerList: {
    marginBottom: 30,
    paddingBottom: 50
  },
  likedButton: {
    paddingBottom: 20
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