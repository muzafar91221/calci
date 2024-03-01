import { ActivityIndicator, StyleSheet, Text, View } from "react-native";
import React, { useEffect, useState } from "react";
import { useFonts } from "expo-font"

const Base_Url = 'https://api.openweathermap.org/data/2.5/weather';

const Open_Weather_key = 'c49a4afe81e36976bd3aa17fc3f2cd39';



const App = () => {

  const [weather, setweather] = useState(null);

  const fetchWeather = async () => {

    const lat=30.73
    const lon = 76.77

    const result = await fetch(
      `${Base_Url}?lat=${lat}&lon=${lon}&appid=${Open_Weather_key}&units=metric`
      );
    const data = await result.json();
    console.log(JSON.stringify(data, null, 2));

    setweather(data);
  };

  useEffect(() => {
    fetchWeather();
  }, []);

  if(!weather){
    return (<ActivityIndicator/>)
  }

  return (
    <View style={styles.container}>
      <Text style={styles.location}>{weather?.name}</Text>
      <Text style={styles.temp}>{weather?.main?.temp}</Text>
    </View>
  );
};

export default App;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  location: {
    
    fontSize: 22,
  },
  temp: {
  
    fontSize: 70,
    color: "gray",
    fontWeight: "800",
  },
});
