
import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, ActivityIndicator, FlatList } from 'react-native';


const ForecastItem = ({ forecast }) => {
    return (
        <View style={styles.forecast}>

            <Text>{item.main.temp}</Text>

        </View>
    );
}

export default ForecastItem;

const styles = StyleSheet.create({})



