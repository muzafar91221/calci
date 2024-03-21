
import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, ActivityIndicator, FlatList } from 'react-native';
import dayjs from 'dayjs';
import { BlurView } from 'expo-blur';


const ForecastItem = ({ forecast: item }) => {
    return (
        <>
            <BlurView intensity={30} style={styles.forecast}>

                <Text style={styles.temp}>{Math.floor(item.main.temp)} ° </Text>
                <Text style={styles.date}>{dayjs(item.dt * 1000).format('ddd ha')}</Text>

            </BlurView>
        </>

    )

}

export default ForecastItem;

const styles = StyleSheet.create({

    forecast: {
        
        
        marginTop: 'auto',
        alignItems: 'center',
        justifyContent: 'center',
        aspectRatio: 9/16,
        borderRadius: 20,
        marginBottom: 10,
        borderWidth:StyleSheet.hairlineWidth,
        overflow:'hidden'


        



    },

    temp: {
        padding: 5,
        fontSize: 24,
        fontWeight: '800',
        color:'gray'
    },
    date:{
        fontSize:14,
        fontWeight:'bold',
        color:'gray'
    }
})



