import React from 'react';
import { useState, useEffect } from 'react';
import { Image } from "expo-image";
import { View, Text, StyleSheet, TouchableOpacity, Modal, Dimensions } from 'react-native';
import { Border, Color, FontFamily, FontSize } from "../GlobalStyles";
import DropDownPicker from 'react-native-dropdown-picker';
import Graph from './Graph';
import TradingCalendar from './TradingCalender';


const Graphbox = ({
  symbol
}) => {

  const [open, setOpen] = useState(false);
  const [selectedInterval, setSelectedInterval] = useState(''); //
  const [isCandleChart, setCandleChart] = useState(true);
  const [isCompressed, setIsCompressed] = useState(false);
  const [chartSettings, setChartSettings] = useState(null); // State to store chart settings
  //const [buttonClicked, setButtonClicked] = useState(false);
  const [isGreen, setIsGreen] = useState(false);
  const [iGreen, setIGreen] = useState(false);

  const intervalOptions = [
    { label: '1D', value: '1 day' },
    { label: '5D', value: '1 week' },
    { label: '1M', value: '1 month' },
    { label: '3M', value: '5M' },
    { label: '6M', value: '8' },
    { label: '1Y', value: '9' },
  ];

  const toggleCandleChart = () => {
    setCandleChart(!isCandleChart);
    setIsGreen(!isGreen);
  };

  //const buttonStyle = buttonClicked ? styles.clickedButton : styles.unclickedButton;
  const buttonColor = isGreen ? '#ffdab9' : '#BEBEBE';


  const compressChart = () => {
    setIsCompressed(!isCompressed);
    setIGreen(!iGreen);
  };

  const buttonColour = iGreen ? '#ffdab9' : '#BEBEBE';

  const getChartSettings = () => {
    if (tradingViewRef.current) {
      const settings = tradingViewRef.current.getSettings();
      setChartSettings(settings);
    }
  };
console.log(selectedInterval);

  return (
    <View >
      <View style={[styles.graphbox, styles.forRow]}>
        
        
      <View style={[styles.container1, styles.forRow]}>

        <View style={styles.chartBar1}>
           <View style={[styles.chartBar, { borderColor: buttonColor, borderWidth: 2 }]}>
            <TouchableOpacity
              
              onPress={toggleCandleChart}>
              <Image
                style={[styles.chartbarIcon]}
                source={require("../assets/Bar.svg")}
              />
            </TouchableOpacity>
            </View>


            <View style={[styles.maxiMize, { borderColor: buttonColour, borderWidth: 2 }]}>
            <TouchableOpacity
              
              onPress={compressChart} >
              <Image
                style={styles.MaximizeIcon}
                source={require("../assets/dot.svg")}
              />
            </TouchableOpacity>
            </View>

            <View style={styles.setting}>
            <TouchableOpacity
              
              onPress={() => {
                alert('processing..')
              }}>
              <Image
                style={styles.settingsIcon}
                source={require("../assets/settings.svg")}
              />
            </TouchableOpacity>
            </View>


            <View style={styles.question}>
              <Image
                style={styles.questionIcon}
                source={require("../assets/Question.svg")}
              />
            </View>
            </View>
         
        
            <View style={styles.range12}>
            <Text style={styles.range}>Range:</Text>
              <View style={styles.intervel}>
              
                <DropDownPicker
                  open={open}
                  value={selectedInterval}
                  items={intervalOptions}
                  setOpen={setOpen}
                  setValue={setSelectedInterval}
                  placeholder="1D"
                />
              </View> 
            </View>
          </View>
          
        <View>
          <Graph symbol={symbol} selectedInterval={selectedInterval} isCandleChart={isCandleChart} isCompressed={!isCompressed} chartSettings={!chartSettings} />
        </View>
      
      </View>
    </View>

  );
};

const { width, height } = Dimensions.get('window');

const styles = StyleSheet.create({
  // depthbutton01: {
  //   zIndex: 2,
  //   marginLeft: 6,
  // },
  container: {
    flexDirection: 'row',
   
  },
  graphbox: {
    //flex: 1,
    //display: 'flex',
    marginTop: 5,
    height: 497,
    borderWidth: 1,
    borderColor: 'black',
    borderStyle: 'dotted',
    borderRadius: Border.br_3xs,
  },
  forRow:{
    width: '98%',
  },
  chartBar1: {
    flex:1 ,
    paddingTop: 13,
    //width: '98%',
    height: 10,
    flexDirection: 'row',
   // display: 'flex',
    alignContent: 'center',
  },

  detailsBoxes: {
    flexDirection: 'row',
    height: 40,
    width: 50,
    backgroundColor: 'red',
    display: 'flex',
    flexDirection: 'row',
    //right: 240,
    zIndex: 1,
    paddingHorizontal: width * 0.00,
  },
  chartBar: {
    width: 33,
    height: 33,
    marginTop: 5,
    marginLeft: 5,
    borderWidth: 1,
    borderColor: '#BEBEBE',
    borderRadius: Border.br_3xs,
  },
  chartbarIcon: {
    marginTop: 2,
    marginLeft: 3,
    width: 23,
    height: 23,
    Color: 'red'
  },
  unclickedButton: {
    backgroundColor: 'green',
  },
  clickedButton: {
    backgroundColor: 'red', // Change the background color when clicked
  },
  maxiMize: {
    marginLeft: 5,
    marginTop: 5,
    width: 33,
    height: 33,
    borderWidth: 1,
    borderColor: '#BEBEBE',
    borderRadius: Border.br_3xs,
  },
  MaximizeIcon: {
    marginTop: 3,
    left: 3,
    width: 23,
    height: 23,
  },
  container1:{
    display:'flex' ,
    //width: '98%',
    //height: 20,
    flexDirection: 'row',
   // display: 'flex',
    //justifyContent: 'space-between',
   // display: 'flex',
  },
  setting: {
    marginLeft: 5,
    marginTop: 5,
    width: 33,
    height: 33,
    borderWidth: 1,
    borderColor: '#BEBEBE',
    borderRadius: Border.br_3xs,
  },
  settingsIcon: {
    marginTop: 4,
    left: 4,
    width: 23,
    height: 23,
  },
  question: {
    marginLeft: 5,
    marginTop: 5,
    width: 33,
    height: 33,
    borderWidth: 1,
    borderColor: '#BEBEBE',
    borderRadius: Border.br_3xs,
  },
  questionIcon: {
    marginTop: 4,
    left: 4,
    width: 23,
    height: 23,
  },
  intervel: {
    marginRight: 10,
    paddingTop: 10,
  //   bottom: 45,
  //  // paddingHorizontal: 10,
  //   paddingLeft: 0,
  // //  flexDirection: 'row', // Ensure a horizontal layout
  // //  justifyContent: 'flex-end',
  //   alignItems: 'center', // Align items to the center vertically (adjust as needed)
  //   zIndex: 1,
  //   flex: 1,
  //   justifyContent: 'right',
  //   justifyContent: 'flex-end',
  //   backgroundColor: '#fff',
       width: 80,
  //  // height: 40,
  //   zIndex: 1,
  },
  range: {
    marginRight: 10,
    paddingTop: 20,
    // right: 50,
    // top: 20
    // paddingBottom: 20,
    // flexDirection: 'row', // Ensure a horizontal layout
    justifyContent: 'flex-end',
    // alignItems: 'center', // Align items to the center vertically (adjust as needed)
    // zIndex: 1,
    // fontSize: 17,
    // color: '#747474',
    // position: 'absolute'
  },
  range12: {
   // marginLeft: 20,
    flexDirection: 'row',
    //paddingTop: -90,
   // display: 'flex',
    // paddingLeft: 150,
    // justifyContent: 'flex-end',
    // alignItems: 'center', /* Adjust as needed */
    // flex: 1,
    /* Additional styling for the range1 container goes here */
  }

})
export default Graphbox;