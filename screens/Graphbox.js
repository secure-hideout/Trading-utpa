import React from 'react';
import { useState, useEffect } from 'react';
import { Image } from "expo-image";
import { View, Text, StyleSheet, TouchableOpacity, Modal, Dimensions } from 'react-native';
import { Border, Color, FontFamily, FontSize } from "../GlobalStyles";
import DropDownPicker from 'react-native-dropdown-picker';
import Graph from './Graph';



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
    { label: '1D', value: '15' },
    { label: '5D', value: '3' },
    { label: '1M', value: '10' },
    { label: '3M', value: '7' },
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

  return (
    <View style={styles.container}>
      <View style={styles.graphbox}>
        <View style={styles.graphborder}>
          <View style={styles.detailsBoxes}>
            <TouchableOpacity
              style={[styles.chartBar, { borderColor: buttonColor, borderWidth: 2 }]}
              onPress={toggleCandleChart}>
              <Image
                style={[styles.chartbarIcon]}
                source={require("../assets/Bar.svg")}
              />
            </TouchableOpacity>

            <TouchableOpacity
              style={[styles.maxiMize, { borderColor: buttonColour, borderWidth: 2 }]}
              onPress={compressChart} >
              <Image
                style={styles.MaximizeIcon}
                source={require("../assets/dot.svg")}
              />
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.setting}
              onPress={() => {
                alert('processing..')
              }}>
              <Image
                style={styles.settingsIcon}
                source={require("../assets/settings.svg")}
              />
            </TouchableOpacity>


            <View style={styles.question}>
              <Image
                style={styles.questionIcon}
                source={require("../assets/Question.svg")}
              />
            </View>
          </View>
          <View>
            <View style={styles.range1}>
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


          <Graph symbol={symbol} selectedInterval={selectedInterval} isCandleChart={isCandleChart} isCompressed={!isCompressed} chartSettings={!chartSettings} />

        </View>
      </View>
    </View>

  );
};

const { width, height } = Dimensions.get('window');

const styles = StyleSheet.create({
  depthbutton01: {
    zIndex: 2,
    //  flex: 1,
    marginLeft: 6,
  },
  container: {
    flexDirection: 'row',
    top: 35,
    // flex: 1
    //marginLeft: 6,
  },

  // graphbox:{
  //     top: 243,
  //   },
  graphbox: {
    //left: -65,
    top: -1,
    //flex: 1,
    width: '98%',
    height: 375,
    borderWidth: 1,
    left: 4,
    borderColor: 'black',
    borderStyle: 'dotted',
    borderRadius: Border.br_3xs,
    //zIndex: 1
  },
  featuredicon: {
    left: 13,
    top: 10,
    width: 28,
    height: 28,
    borderRadius: 20,
    backgroundColor: Color.aliceblue,
  },
  featureIcon: {
    top: -25,
    left: -32,
    width: 96,
    height: 96,
  },
  tradingbutton1: {
    height: 30,
    width: 75,
    left: 25,
    top: 10,
    borderRadius: 6,
    backgroundColor: '#B1A4FF',
  },
  trading: {
    top: 10,
    color: 'black',
    left: 14,
    top: 4,

  },
  depthbutton01: {
    width: 75,
    height: 30,
    left: 30,
    top: 10,
    borderRadius: 6,
    backgroundColor: Color.aliceblue,
  },
  depth01: {
    left: 14,
    top: 4,
  },


  detailsBoxes: {
    top: 100,
    //display: 'flex',
    // flex: 1,
    flexDirection: 'row',
    right: 240,
    zIndex: 1,
    paddingHorizontal: width * 0.00,
  },

  chartBar: {
    left: 250,
    top: -90,
    width: 33,
    height: 33,
    borderWidth: 1,
    borderColor: '#BEBEBE',
    //borderStyle: 'dotted',
    // backgroundColor: 'lightgray',
    borderRadius: Border.br_3xs,
  },
  chartbarIcon: {
    top: 2,
    left: 3,
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
    left: 260,
    top: -90,
    width: 33,
    height: 33,
    borderWidth: 1,
    borderColor: '#BEBEBE',
    //backgroundColor: 'lightgray',
    borderRadius: Border.br_3xs,
  },
  MaximizeIcon: {
    top: 3,
    left: 3,
    width: 23,
    height: 23,
  },
  setting: {
    left: 270,
    top: -90,
    width: 33,
    height: 33,
    borderWidth: 1,
    borderColor: '#BEBEBE',
    //backgroundColor: 'lightgray',
    borderRadius: Border.br_3xs,
  },
  settingsIcon: {
    top: 4,
    left: 4,
    width: 23,
    height: 23,
  },
  question: {
    left: 280,
    top: -90,
    width: 33,
    height: 33,
    borderWidth: 1,
    borderColor: '#BEBEBE',
    //backgroundColor: 'lightgray',
    borderRadius: Border.br_3xs,
  },
  questionIcon: {
    top: 4,
    left: 4,
    width: 23,
    height: 23,
  },
  intervel: {
    backgroundColor: '#fff',
    width: 80,
    height: 49,
    left: 310,
    //top: -100,
    //marginLeft: -1,
    zIndex: 1,
    flex: 1,
    top: -40

  },
  range: {
    //  // textAlign: 'right',
    top: -10,
    left: 250,
    fontSize: 17,
    color: '#747474',
    //marginRight: 2,
    zIndex: 1,
    // flex: 1
    // position: 'absolute'
  },
  range1: {
    zIndex: 1,
    // flex: 1,
    // left : 100
  }

})
export default Graphbox;