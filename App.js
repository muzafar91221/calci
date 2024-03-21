

// const Forecast ="api.openweathermap.org/data/2.5/forecast?lat={lat}&lon={lon}&appid={API key}"

import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, ActivityIndicator, FlatList, StatusBar, ImageBackground } from 'react-native';
import * as Location from 'expo-location';
import ForecastItem from './components/ForeCastItem';

const Base_Url = 'https://api.openweathermap.org/data/2.5';
const Open_Weather_key = 'c49a4afe81e36976bd3aa17fc3f2cd39';

const App = () => {
  const [weather, setWeather] = useState(null);
  const [forecast, setForecast] = useState(null);
  const [location, setLocation] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);

  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        setErrorMsg('Permission to access location was denied');
        return;
      }

      let location = await Location.getCurrentPositionAsync({});
      setLocation(location);
    })();
  }, []);

  useEffect(() => {
    if (location) {
      fetchWeather();
      fetchForecast();
    }
  }, [location]);

  const fetchWeather = async () => {
    const lat = location?.coords.latitude;
    const lon = location?.coords.longitude;

    const result = await fetch(
      `${Base_Url}/weather?lat=${lat}&lon=${lon}&appid=${Open_Weather_key}&units=metric`
    );
    const data = await result.json();
    setWeather(data);
  };

  const fetchForecast = async () => {
    const lat = location?.coords.latitude;
    const lon = location?.coords.longitude;

    const result = await fetch(
      `${Base_Url}/forecast?lat=${lat}&lon=${lon}&appid=${Open_Weather_key}&units=metric`
    );
    const data = await result.json();
    console.log(JSON.stringify(data, null, 2));
    setForecast(data.list);
  };

  if (!weather) {
    return <ActivityIndicator />;
  }

  return (
    <ImageBackground source={{uri:'https://images.unsplash.com/photo-1504608524841-42fe6f032b4b?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTJ8fHdlYXRoZXJ8ZW58MHx8MHx8fDA%3D'}} style={styles.container}>
      <View style={{
        flex: 1, alignItems: 'center',
        justifyContent: 'center',
      }}>
        <Text style={styles.location}>{weather?.name}</Text>
        <Text style={styles.temp}>{Math.floor(weather?.main?.temp)}°</Text>
        <Text style={{fontSize:15,color:'gray'}}>feels_like {Math.floor(weather?.main?.feels_like)}°</Text>
        <Text style={{fontSize:15,color:'gray'}}>humidity {Math.floor(weather?.main?.humidity)}°</Text>
        



        <FlatList
          horizontal
          data={forecast}
          style={{ height: 160, flexGrow: 0, marginTop: 'auto' }}
          renderItem={({ item }) => <ForecastItem forecast={item} />}
          contentContainerStyle={{ gap: 8, paddingHorizontal:10}}
        />


        <StatusBar style='auto'></StatusBar>


      </View>
    </ImageBackground>

  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,






  },
  location: {
    fontSize: 62,
    color:'gray',
    fontWeight:'bold',

  },
  temp: {
    fontSize: 70,
    color: 'gray',
    fontWeight: '800',
  },
});

export default App;
