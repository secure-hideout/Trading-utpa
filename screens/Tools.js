import React, { useState } from 'react';
import { View, FlatList, StyleSheet, TouchableOpacity,Text } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import {  Card, Title, Paragraph, Button, Provider  } from 'react-native-paper';
import { Input } from 'react-native-elements';
import { useSelector } from 'react-redux';
import { Border, Color, FontFamily, FontSize } from "../GlobalStyles";
//import { Card, Title, Paragraph } from 'react-native-paper';
import { Calendar } from 'react-native-calendars';




const Tools = ({}) => {
    const navigation = useNavigation();
    const [tradingHours, setTradingHours] = useState('9:00 AM - 5:00 PM');
    const [isCalendarVisible, setCalendarVisible] = useState(false);
    const [selectedDate, setSelectedDate] = useState(null);


    const handleCardPress = (item) => {
      if (item.id === '2') {
        setCalendarVisible(!isCalendarVisible);
      } else {
        // Handle card press for other cards if needed
      }
    };
  
    const data = [
      {
        id: '1',
        title: 'Trading Hours',
        content: tradingHours,
      },
      {
        id: '2',
        title: 'Calendar',
        content: isCalendarVisible && <Calendar onDayPress={(day) => setSelectedDate(day.dateString)} />,
      },
      {
        id: '3',
        title: 'Maintenance Mode',
        // content: 'Content for Card 3'
      },
    ];
  
    const renderItem = ({ item }) => (
      <TouchableOpacity onPress={() => handleCardPress(item)}>
        <View style={styles.container}>
          <Card style={styles.card}>
            <Card.Content>
              <View style={styles.card1}>
                <Title style={styles.title}>{item.title}</Title>
              </View>
              <View style={styles.card2}>
                <Paragraph>
                  {item.id === '1' && (
                    <>
                      <View style={styles.opening}>
                        <Text style={{ color: 'green', fontSize: 16, fontWeight: 'bold' }}>Opening : </Text>
                        <Text style={{ fontSize: 16, fontWeight: 600 }}>9:00 AM</Text>
                      </View>
                      <View style={styles.closing}>
                        <Text style={{ color: 'red', fontSize: 16, fontWeight: 'bold' }}>Closing : </Text>
                        <Text style={{ fontSize: 16, fontWeight: 600 }}>5:00 PM</Text>
                      </View>
                    </>
                  )}
                  {item.id !== '1' && item.content}
                </Paragraph>
              </View>
            </Card.Content>
          </Card>
        </View>
      </TouchableOpacity>
    );
  
    return (
      <FlatList
        data={data}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.flatList}
      />
    );
  };
  
    
    // Your styles object (replace with your actual styles)
    const styles = {
      container :{
        paddingTop: 6,
        paddingHorizontal: 1
      },
      flatList: {
        width: '98%',
        marginLeft: 10,
      },
      card: {
        width: '98%', // Each card takes up the full width
        marginBottom: 8, // Adjust the vertical margin as needed
        backgroundColor: 'white',
      },
      opening:{
         flexDirection: 'row',
         paddingHorizontal: 5
      },
      closing:{
        flexDirection: 'row'
      },
      card1:{
        alignItems: 'center',
        fontSize: 18,
        fontWeight: '600',
        lineHeight: 19.09,
        color: 'rgba(28, 30, 50, 1)',
      },
      card2:{
        alignItems: 'center',
        paddingTop: 10
      },
      title:{
        fontSize: 18,
        fontWeight: '600',
        lineHeight: 19.09,
        color: 'rgba(28, 30, 50, 1)',
      }
    };
    
    
    
export default Tools;