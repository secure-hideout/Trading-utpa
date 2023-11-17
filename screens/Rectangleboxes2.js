import React, { Component } from 'react';
import { StyleSheet, View, Text, Button, ScrollView, TouchableOpacity, TouchableWithoutFeedback, SafeAreaView, FlatList } from 'react-native';
import { Border, Color, FontFamily, FontSize } from "../GlobalStyles";

// const Rectangleboxes1 = ({
class Rectangleboxes2 extends Component {

  render() {
    const {
      Dval, value,
      Market, value1,
      VolBTC, Value2,
      VolUSDT, value3,
    } = this.props;
    // }) => {

    return (
      <View style={styles.info}>
        <View style={styles.forRow}>
          <View style={styles.rectanglebox1}>
            <View style={styles.daily1}>
              <Text style={styles.dailyval}>{Dval}</Text>
              <Text style={styles.dailyvalue}>{value}</Text>
            </View>
            <View style={styles.market1}>
              <Text style={styles.market}>{Market}</Text>
              <Text style={styles.marketvalue}>{value1}</Text>
            </View>

          </View>
        </View>
        <View style={styles.forRow1}>
          <View style={styles.rectanglebox2}>
            <View style={styles.btc}>
              <Text style={styles.volbtc}>{VolBTC}</Text>
              <Text style={styles.btcvalue}>{Value2}</Text>
            </View>
            <View style={styles.usdt}>
              <Text style={styles.volusdt}>{VolUSDT}</Text>
              <Text style={styles.usdtvalue}>{value3}</Text>
            </View>
          </View>
        </View>
      </View>

    );
  };
}

const styles = StyleSheet.create({
  info: {
    top: 530,

  },
  // rectangleboxes:{
  //  // bottom: 510,
  //   right: 100,
  //   flexDirection:'row',
  //   borderRadius: Border.br_3xs,
  // },
  rectanglebox1: {
    bottom: 505,
    height: 40,
    width: '99%',
    borderWidth: 1,
    left: 2,
    borderColor: '#BEBEBE',
    borderRadius: Border.br_3xs,
  },
  daily1: {
    flexDirection: 'row',
    top: 10,

  },
  forRow: {
    flexDirection: 'row',
  },
  forRow1: {
    flexDirection: 'row',
  },
  dailyval: {
    left: 22,
    color: '#1C1E32',
  },
  dailyvalue: {
    left: 61,
    fontWeight: 'bold',
  },
  market1: {
    flexDirection: 'row',
    top: -8,
    paddingLeft: '25%'
  },
  market: {
    left: 106,

  },
  marketvalue: {
    left: 155,
    fontWeight: 'bold',
  },
  rectanglebox2: {
    bottom: 500,
    height: 40,
    width: '99%',
    borderWidth: 1,
    left: 2,
    borderColor: '#BEBEBE',
    borderRadius: Border.br_3xs,
  },
  btc: {
    flexDirection: 'row',
    top: 10,
  },
  usdt: {
    flexDirection: 'row',
    top: -8,
    left: 100
  },
  volbtc: {
    left: 22,
    color: '#1C1E32',
  },
  btcvalue: {
    left: 64,
    fontWeight: 'bold',
  },
  volusdt: {
    paddingLeft: '27%',
    color: '#1C1E32',
  },
  usdtvalue: {
    left: 35,
    fontWeight: 'bold',
  },

})

export default Rectangleboxes2;