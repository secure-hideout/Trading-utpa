import React from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
import Graph from './Graph';
import Rectangleboxes1 from './Rectangleboxes1';
import Rectangleboxes2 from './Rectangleboxes2';
import Graphbox from './Graphbox';
import Graphnavbar from './Graphnavbar';
import Payments from './Payments';

const Allgraph = ({ route, navigation }) => {
  const {
    symbol,
    Open,
    openValue,
    Close,
    closeValue,
    High,
    Hvalue,
    Low,
    Lvalue,
    Name,
    Dval,
    Value,
    Market,
    value1,
    volBtc,
    value2,
    volUsdt,
    value3,
    Price,
    priceVal,
    pricePer,
    sname,
    LastPrice,
    instrumentType,
    instrumentId,
    quantity,
    Quantities
  } = route.params;

  const goBack = () => {
    // Add logic here to determine where to navigate back
    navigation.goBack(); // Example: Always go back for now
  };

  return (

    <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={true}>
      <View style={styles.container}>
        <Graphnavbar Name={Name} Price={Price} priceVal={priceVal} pricePer={pricePer} goBack={goBack} />
        <View style={styles.componentContainer}>
          <Rectangleboxes1
            style={styles.Apple2}
            Open={Open}
            openValue={openValue}
            Close={Close}
            closeValue={closeValue}
            High={High}
            Hvalue={Hvalue}
            Low={Low}
            Lvalue={Lvalue}
          />
          <Rectangleboxes2
            Dval={Dval}
            value={Value}
            Market={Market}
            value1={value1}
            VolBTC={volBtc}
            Value2={value2}
            VolUSDT={volUsdt}
            value3={value3}
          />
          <Graphbox symbol={symbol} />
          {/* <Payments /> */}
          <Payments sname={sname} LastPrice={LastPrice} instrumentType={instrumentType} instrumentId={instrumentId} quantity={quantity} Quantities={Quantities} />
        </View>
      </View>
    </ScrollView>
  );
};


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    alignItems: 'center',
    //height: 900
  },
  scrollContent: {
    flexGrow: 1,
  },
  Apple2: {
    left: 10,
  },
});

export default Allgraph;