import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {Container, List, ListItem, Text} from 'native-base';
import Video, {FilterType} from 'react-native-video';
import {Button} from 'native-base/dist/src';

function VideosListScreen({navigation}) {
  return (
    <Container>
      <List>
        <ListItem
          onPress={() =>
            navigation.navigate('Video Player', {
              external: true,
              videoURL:
                'https://content.jwplatform.com/manifests/yp34SRmf.m3u8',
            })
          }>
          <Text>First Video</Text>
        </ListItem>
        <ListItem
          onPress={() =>
            navigation.navigate('Video Player', {
              external: true,
              videoURL:
                'https://bitdash-a.akamaihd.net/content/MI201109210084_1/m3u8s/f08e80da-bf1d-4e3d-8899-f0f6155f6efa.m3u8',
            })
          }>
          <Text>Second Video</Text>
        </ListItem>
        <ListItem
          onPress={() =>
            navigation.navigate('Video Player', {
              external: true,
              videoURL:
                'https://bitdash-a.akamaihd.net/content/sintel/hls/playlist.m3u8',
            })
          }>
          <Text>Second Video</Text>
        </ListItem>
      </List>
    </Container>
  );
}

function VideoPlayerScreen({navigation, route}) {
  const {external, videoURL} = route.params;
  const [filterType, setFilterType] = React.useState(FilterType.NONE);

  changFilter=filterType=>{
    setFilterType(filterType)
  }
  return (
    <Container>
      <Video
        controls
        paused
        filterEnable
        filter={filterType}
        filterEnabled={true}
        source={external ? {uri: videoURL} : videoURL} // Can be a URL or a local file.
        style={{flex: 1}}
      />
      <Button
        block
        onPress={() => {
          changFilter(FilterType.MONO);
        }}>
        <Text>Change to Mono</Text>
      </Button>
      <Button
        block
        onPress={() => {
          changFilter(FilterType.CHROME);
        }}>
        <Text>Change to Chrome</Text>
      </Button>
      <Button
        block
        onPress={() => {
          changFilter(FilterType.SEPIA);
        }}>
        <Text>Change to Sepia</Text>
      </Button>
    </Container>
  );
}

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Video List" component={VideosListScreen} />
        <Stack.Screen name="Video Player" component={VideoPlayerScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
