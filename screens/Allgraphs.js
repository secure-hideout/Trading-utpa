import React, { useEffect, useState, useContext } from "react";
import { View,Text, StyleSheet, ScrollView, TouchableOpacity } from "react-native";
import Graphnavbar from "./Graphnavbar";
import Rectangleboxes1 from "./Rectangleboxes1";
import Rectangleboxes2 from "./Rectangleboxes2";
import Graphbox from "./Graphbox";
import Payments from "./Payments";
import {Color} from "../GlobalStyles";
import { useSelector } from "react-redux";
import { Ionicons } from '@expo/vector-icons';


const Allgraph = ({ route, navigation, fetchData, Name }) => {
  const { instrumentId, instrumentType } = route.params;

  const { token } = useSelector((state) => state.auth);
  console.log("Allgraphs", instrumentId);

  

  const [apiData, setApiData] = useState({
    symbol: '',
    Open: 'Open',
    openValue: "",
    Close: "Close",
    closeValue: "",
    High: "High",
    Hvalue: "",
    Low: "Low",
    Lvalue: "",
    Name: "",
    Dval: "",
    Value: "",
    Market: "",
    value1: "",
    volBtc: "",
    value2: "",
    volUsdt: "",
    value3: "",
    Price: "",
    priceVal: "",
    pricePer: "",
    sname: "",
    LastPrice: "",
    instrumentType: "",
    instrumentId: "",
    quantity: "",
    // Quantities: "",
  });

  const [apiqData, setQData] = useState({
    Quantities: "",
  });

  useEffect(() => {

  const fetchInstrumentDetails = async () => {
       
        console.log("------------------>",instrumentId,instrumentType)
    try {
      const response = await fetch(
        `http://10.0.2.2:9000/api/user/getSymbol?instrumentId=${instrumentId}&instrumentType=${instrumentType}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`, // Include the token in the Authorization header
          },
        }
      );

      if (response.ok) {
        const data = await response.json();
        
        //console.log(data);
        setApiData({
         // quantity: data.ExchangeDetails.last_quantity,
          openValue: data?.ExchangeDetails?.ohlc?.open,
          closeValue: data?.ExchangeDetails?.ohlc?.close,
          Hvalue: data?.ExchangeDetails?.ohlc?.high,
          Lvalue: data?.ExchangeDetails?.ohlc?.high,
          Open: 'Open',
          Close: 'Close',
          High: 'High',
          Low: 'Low',
          Dval: "Dval",
          Market: "Market",
          Quantities: data?.ExchangeDetails?.last_quantity,
          symbol: data?.instrumentDetails?.Tradingsymbol,
          Name: data?.instrumentDetails?.Name,
          Price:  data?.instrumentDetails?.Name,
          priceVal:  `$${data?.instrumentDetails?.LastPrice.toFixed(2)}`,
          instrumentType: data?.instrumentDetails?.InstrumentType
        });
        setApiData(prevState => ({ ...prevState,LastPrice: data.instrumentDetails.LastPrice}));
      } else {
        console.error("Error fetching data:", response.status);
      }
    } catch (error) {
      console.error("Error fetching instrument details:", error.message);
    }
  };
  fetchInstrumentDetails();
},[]);
   


  
  const goBack = () => {
     navigation.goBack();
  };

  const handleBackPress = () => {
    goBack(); // Call the provided goBack function
  };


  return (
    <View style={[styles.container, styles.container1]}>
       <View style={[styles.box1]}>
        <TouchableOpacity style={styles.backbutton} onPress={handleBackPress}>
          <View style={styles.backicon1}>
            <Ionicons name="arrow-back-outline" size={25} color="black " />
          </View>
        </TouchableOpacity>
        <View style={styles.text1}>
          <Text style={styles.bitcoin}>{apiData.Name}</Text>
        </View>
      </View>


      <ScrollView
        contentContainerStyle={[styles.scrollContent, styles.container1]}
        showsVerticalScrollIndicator={true}
      >
        <Graphnavbar
          // Name={apiData.Name}
          Price={apiData.Price}
          priceVal={apiData.priceVal}
          pricePer={apiData.pricePer}
          Quantities={apiqData.Quantities}
          goBack={goBack}
        />

        <Rectangleboxes1
          style={styles.Apple2}
          Open={apiData.Open}
          openValue={apiData.openValue}
          Close={apiData.Close}
          closeValue={apiData.closeValue}
          High={apiData.High}
          Hvalue={apiData.Hvalue}
          Low={apiData.Low}
          Lvalue={apiData.Lvalue}
        />

        <Rectangleboxes2
          Dval={apiData.Dval}
          value={apiData.Value}
          Market={apiData.Market}
          value1={apiData.value1}
          VolBTC={apiData.volBtc}
          Value2={apiData.value2}
          VolUSDT={apiData.volUsdt}
          value3={apiData.value3}
        />
        <Graphbox symbol={apiData.symbol} /> 
        {/* {apiData?.symbol ? <Graphbox symbol={apiData.symbol} /> : ""} */}
      </ScrollView>

      <Payments
        sname={apiData.sname}
        LastPrice={apiData.LastPrice}
        instrumentType={apiData.instrumentType}
        instrumentId={instrumentId}
        quantity={apiData.quantity}
        Quantities={apiqData.Quantities}
        setQData={setQData}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
    alignItems: "center",
    //height: 900
  },
  box1: {
    //backgroundColor: 'red',
    flexDirection: 'row',
    paddingTop: 10,
    height: 76,
    width: '98.71%',
   // left: 1,
   },
  backicon1: {
    paddingRight: 10,
    paddingTop: 30,
  },
  bitcoinbox: {
    height: 37,
    width: 37,
    backgroundColor: Color.peachpuff,
    marginTop: 50,
    borderRadius: 20,
  },
  forRow: {
    flexDirection: 'row',
  },
  bitcoin: {
   
    display: 'flex',
    paddingTop: 33,
    fontWeight: '700',
    fontSize: 18,
  },
  container1: {
    // flex: 1,
    backgroundColor: "white",
    alignItems: "center",
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