import * as React from 'react';
import { BottomNavigation, Text } from 'react-native-paper';

const NavigationBar = ({ navigation }) => {
  const AttrationsRoute = () => navigation.navigate('AttractionList');  
  const LikedRoute = () => navigation.navigate('AttractionsLiked');
  
  const [index, setIndex] = React.useState(0);
  const [routes] = React.useState([
    { key: 'attractions', title: 'Atrações', focusedIcon: 'heart', unfocusedIcon: 'heart-outline'},
    { key: 'liked', title: 'Favoritadas', focusedIcon: 'heart', unfocusedIcon: 'heart-outline' },
  ]);

  const renderScene = BottomNavigation.SceneMap({
    attractions: AttrationsRoute,
    liked: LikedRoute,
  });

  return (
    <BottomNavigation
      navigationState={{ index, routes }}
      onIndexChange={setIndex}
      renderScene={renderScene}
    />
  );
};

export default NavigationBar;