

// const Forecast ="api.openweathermap.org/data/2.5/forecast?lat={lat}&lon={lon}&appid={API key}"

import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, ActivityIndicator, FlatList } from 'react-native';
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
      `${Base_Url}/forecast?lat=${lat}&lon=${lon}&appid=${Open_Weather_key}`
    );
    const data = await result.json();
    console.log(data);
    setForecast(data.list);
  };

  if (!weather) {
    return <ActivityIndicator />;
  }

  return (
    <View style={styles.container}>
      <Text style={styles.location}>{weather?.name}</Text>
      <Text style={styles.temp}>{Math.floor(weather?.main?.temp)}°</Text>

      <FlatList
        horizontal
        data={forecast}
        renderItem={({item}) => <ForecastItem forecast={item}/>}
        />
    

    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  location: {
    fontSize: 22,
  },
  temp: {
    fontSize: 70,
    color: 'gray',
    fontWeight: '800',
  },
});

export default App;
