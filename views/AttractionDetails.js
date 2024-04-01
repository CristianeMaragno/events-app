import * as React from 'react';
import { Image, View, StyleSheet, Button, Linking, Platform} from 'react-native';
import { IconButton, MD3Colors, Text, Card } from 'react-native-paper';
import { format } from "date-fns";
import { storeData, getData, removeData } from '../utils/Storage';
import {useState, useEffect} from 'react';

export default function AttractionDetailsScreen ({ route, navigation }) {
  const {event, like} = route.params;
  const [liked, setliked] = useState(like);

	const mapUrl = Platform.select({
		ios: `maps:0,0?q=${event.coordinates[0]},${event.coordinates[1]}`,
		android: `geo:0,0?q=${event.coordinates[0]},${event.coordinates[1]}`
 	});

  const saveLike = async (attractionId) => {
    const likes = await getData('likes');
    const updatedLikes = { ...likes, [attractionId]: true };
    await storeData('likes', updatedLikes);
  };

  const removeLike = async (attractionId) => {
    const likes = await getData('likes');
    const { [attractionId]: removedLike, ...restLikes } = likes;
    await storeData('likes', restLikes);
  };

  const toggleLike = (attractionId) => {
    if (liked) {
      removeLike(attractionId);
      setliked(false);
    } else {
      saveLike(attractionId);
      setliked(true);
    }
  };

  return (
    <View>
      <Card style={styles.cardContainer}>
        <Card.Cover style={styles.cover} source={{ uri: event.imageUrl }} />
        <Card.Content>
          <View style={{ paddingTop: 16 }}>
            <Text variant="headlineSmall">{event.name}</Text>
            <Text variant="bodyLarge">{format(new Date(event.date), "dd/MM/yyyy H:m")}</Text>
            <Text variant="bodyLarge">{event.address}</Text>
            <View style={styles.cardContainerLike}>
              <IconButton
                icon={liked ? 'heart' : 'heart-outline'}
                iconColor={MD3Colors.primary40}
                size={34}
                onPress={() => toggleLike(event.id)}
              />
            </View>
            <View>
              <Text variant="titleLarge">{event.price == "0" ? "Gratuito" : event.price}</Text>
            </View>

            <View style={styles.buttonContainer} >
              <IconButton
                icon="phone"
                mode="contained"
                iconColor={MD3Colors.primary40}
                size={34}
                onPress={() => Linking.openURL(`tel:${event.phone}`)}
              />
              <IconButton
                icon="link"
                mode="contained"
                iconColor={MD3Colors.primary40}
                size={34}
                onPress={() => Linking.openURL(`${event.siteUrl}`)}
              />
            </View>
            <View style={styles.buttonContainer} >
              <IconButton
                icon="ticket"
                mode="contained"
                iconColor={MD3Colors.primary40}
                size={34}
                onPress={() => Linking.openURL(`${event.ticketUrl}`)}
              />
              <IconButton
                icon="play-circle-outline"
                mode="contained"
                iconColor={MD3Colors.primary40}
                size={34}
                onPress={() => Linking.openURL(`${event.videoUrl}`)}
              />
              <IconButton
                icon="map-marker"
                mode="contained"
                iconColor={MD3Colors.primary40}
                size={34}
                onPress={() => Linking.openURL(mapUrl)}
              />
            </View>
          </View>
        </Card.Content>
      </Card>
    </View>
  );
}
const styles = StyleSheet.create({
  cardContainer: {
    height: "100%"
  },
  cover: {
    height: 300,
  },
  eventName: {
    fontSize: 18,
    fontWeight: 'bold',
    height: 44,
  },
  cardContainerLike:{
    flex: 1, 
    alignItems: 'flex-end',
    marginBottom: 20
  },
  contactDetails: {
    fontSize: 16,
    height: 44,
  },
  button: {
    padding: 15
  },
  buttonContainer: {
    marginTop: 16,
    flexDirection: 'row',
    marginBottom: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
});