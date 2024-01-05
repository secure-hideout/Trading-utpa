import React, { Component } from 'react';
import { StyleSheet, View, Text, Button, ScrollView, TouchableOpacity, TouchableWithoutFeedback, SafeAreaView, FlatList } from 'react-native';
import { Border, Color, FontFamily, FontSize } from "../GlobalStyles";



class Rectangleboxes1 extends Component {
  render() {
    const {
      Open,
      openValue,
      Close,
      closeValue,
      High,
      Hvalue,
      Low,
      Lvalue,

    } = this.props;

    return (
      <View style={styles.info}>
        <View style={styles.rectangleboxes}>
          <View style={styles.detailsbox}>
            <View style={styles.openclose}>
              < Text style={styles.open}>{Open}</Text>
              <Text style={styles.openvalue}>{openValue}</Text>
            </View>
            <View style={styles.openclose1}>
              <Text style={styles.close}>{Close}</Text>
              <Text style={styles.closevalue}>{closeValue}</Text>
            </View>
          </View>


          <View style={styles.detailsbox1}>
            <View style={styles.highlow}>
              <Text style={styles.high}>{High}</Text>
              <Text style={styles.highvalue}>{Hvalue}</Text>
            </View>
            <View style={styles.hightlow1}>
              <Text style={styles.low}>{Low}</Text>
              <Text style={styles.lowvalue}>{Lvalue}</Text>
            </View>
          </View>
        </View>
      </View>
    );
  };
}


const styles = StyleSheet.create({

  info: {
   // flex: 1,
  },

  rectangleboxes: {
    flexDirection: 'row',
   // marginLeft: 15,
    padding: 4
  },

  detailsbox: {
    width: '49.3%',
    height: 80,
    borderWidth: 1,
    borderColor: '#BEBEBE',
    borderRadius: Border.br_3xs,
  },
  openclose: {
    flexDirection: 'row',
    top: 13,
  },

  open: {
    flex: 1,
    marginLeft: 18,
    color: '#1C1E32',
  },
  openvalue: {
    paddingRight: 19,
    fontWeight: 'bold',
  },
  openclose1: {
    flexDirection: 'row',
    paddingTop: 26,
  },
  close: {
    flex: 1,
    marginLeft: 19,
    color: '#1C1E32',
  },
  closevalue: {
    marginRight: 19,
    fontWeight: 'bold',
  },

  detailsbox1: {
    marginLeft: 4,
    width: '49.3%',
    borderWidth: 1,
    borderColor: '#BEBEBE',
    borderRadius: Border.br_3xs,
  },
  highlow: {
    flexDirection: 'row',
    top: 13,
  },

  high: {
    flex: 1,
    paddingLeft: 18,
    color: '#1C1E32',
  },
  highvalue: {
    paddingRight: 17,
    fontWeight: 'bold',
  },
  hightlow1: {
    flexDirection: 'row',
    top: 26,
  },
  low: {
    flex: 1,
    paddingLeft: 18,
    color: '#1C1E32',
  },
  lowvalue: {
    paddingRight: 17,
    fontWeight: 'bold',
  },

})

export default Rectangleboxes1;
