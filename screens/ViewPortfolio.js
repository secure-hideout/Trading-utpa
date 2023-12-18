import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet } from "react-native";
import AssetCard from "./AssetCard";
import { useSelector } from "react-redux";
import { useNavigation } from '@react-navigation/native';
import LottieView from 'lottie-react-native';

import * as Animatable from 'react-native-animatable';
import Icon from 'react-native-vector-icons/MaterialIcons';

const fetchData = async (url, options) => {
  const response = await fetch(url, options);
  const data = await response.json();
  return data;
};


const ViewPortfolio = ({
  selectedCard,
  updateTotalValue,
  updateChangePercentage,
  selectedCardColor,
  updateOverallTotalValue,
  updateOverallChangePercentage
}) => {
  const { token } = useSelector((state) => state.auth);
  const navigation = useNavigation();
  const [nseData, setNseData] = useState([]);


  useEffect(() => {
    const fetchData1 = async () => {
      try {
        const response1 = await fetchData("http://35.154.235.224:9000/api/user/getPortfolio", {
          method: "GET",
          headers: new Headers({ "Authorization": "Bearer " + token }),
          redirect: "follow",
        });


        const response2 = await fetchData("http://35.154.235.224:9000/api/user/getZtokens", {
          method: "POST",
          headers: new Headers({ "Authorization": "Bearer " + token }),
          body: "",
          redirect: "follow",
        });

        const mergedArray = response1.map((item1) => {
          const matchingItem = response2.find((item2) => item2.Zid === item1.FinancialInstrumentID);

          return {
            name2: matchingItem ? matchingItem.Name : null,
            name3: matchingItem ? matchingItem.Segment : null,

            decimalValue: item1.Quantity,//display quantity

            Name: matchingItem ? matchingItem.Name : null,
            symbol: matchingItem ? matchingItem.Tradingsymbol : null,
            value: item1.AveragePrice,
            press: 'Allgraphs',
            LastPrice: item1.AveragePrice,
            sname: matchingItem ? matchingItem.Name : null,
            instrumentId: matchingItem ? matchingItem.Zid : null,
            instrumentType: matchingItem ? matchingItem.Segment : null,
            Price: matchingItem ? matchingItem.Name : null,
            priceVal: item1.AveragePrice,
            Quantities: item1.Quantity,
            //  logo: 'https://assets.coingecko.com/coins/images/10365/large/assets/bitcoinsvgrepocom-1.svg',
            Open: "open",
            openValue: 10000,
            Close: "Close",
            closeValue: 50,
            High: "High",
            Hvalue: 1500000,
            Low: "Low",
            Lvalue: 25,
            Dval: "Daily Vol",
            Value: "140.03B",
            Market: "Market",
            value1: "200.3B",
            volBtc: "vol BTC",
            value2: "10,000",
            volUsdt: "vol USDT",
            value3: "10,000",



          };
        });
        setNseData(mergedArray);
      } catch (error) {
        // console.log("Error in API calls:", error);
      }
    };

    fetchData1();
  }, [token]);


  //to display inside the card 
  const calculateTotalValue = (cardType) => {
    const cardTypeData = cardData[cardType];
    if (cardTypeData) {
      let totalValue = 0;
      cardTypeData.forEach((item) => {
        if (item.decimalValue && item.LastPrice) {
          totalValue += item.decimalValue * item.LastPrice;
        }
      });
      return `$${totalValue.toFixed(2)}`;
    }
    return "$0.00";
  };

  const calculateChangePercentage = (cardType) => {
    const cardTypeData = cardData[cardType];
    let totalChange = 0;
    if (cardTypeData) {
      cardTypeData.forEach((item) => {
        if (item.changePercentage && typeof item.changePercentage === 'string') {
          totalChange += parseFloat(item.changePercentage.replace('%', ''));
        }
      });
    }

    // Format the change percentage with the sign
    return totalChange >= 0 ? `+${totalChange.toFixed(2)}%` : `${totalChange.toFixed(2)}%`;
  };

  useEffect(() => {
    let overallChange = 0;
    const cardTypes = Object.keys(cardData);

    cardTypes.forEach((cardType) => {
      const totalValue = calculateTotalValue(cardType);
      const totalChangePercentage = calculateChangePercentage(cardType);
      updateTotalValue(cardType, totalValue);
      updateChangePercentage(cardType, totalChangePercentage);
      overallChange += parseFloat(totalChangePercentage);
    });

    const overallChangePercentage = overallChange / cardTypes.length;
    updateOverallChangePercentage(overallChangePercentage >= 0 ? `+${overallChangePercentage.toFixed(2)}%` : `${overallChangePercentage.toFixed(2)}%`);
  }, [token, nseData]);


  const calculateOverallTotalValue = () => {
    let overallTotal = 0;
    Object.values(cardData).forEach((cardTypeData) => {
      cardTypeData.forEach((item) => {
        if (item.decimalValue && item.LastPrice) {
          overallTotal += item.decimalValue * item.LastPrice;
        }
      });
    });
    return overallTotal;
  };


  useEffect(() => {
    const overallTotal = calculateOverallTotalValue();
    updateOverallTotalValue(overallTotal);

  }, [token, nseData]);

  const cardData = {
    Crypto: [],

    NSE: nseData,

    // BSE: [],
    NASDAQ: [],


    Commodity: [],
  };

  return (
    <View style={styles.container}>


      {/* <View style={styles.headerContainer}> */}
      <View style={[styles.headerContainer, { backgroundColor: selectedCardColor }]}>
        <View style={styles.nameContainer}>
          <Text style={styles.headerText}>Name</Text>
        </View>
        <View style={styles.name3Wrapper}>
          {/* <Text style={styles.headerText}>Segment</Text> */}
        </View>
        <Text style={[styles.headerText, styles.selectedCardText]}>{selectedCard}</Text>
        <View style={styles.quantityContainer}>
          <Text style={styles.headerText}>Quantity</Text>
        </View>
        <View style={styles.valueContainer}>
          <Text style={styles.headerText}>Value</Text>
        </View>
      </View>

      {/* //todisplay total value and name  */}
      {/* <Text style={styles.portfolioText}>{selectedCard} Portfolio</Text> */}
      {/* <Text style={styles.totalValue}>{calculateTotalValue(selectedCard)}</Text> */}

      {/* {cardData[selectedCard] ? ( */}
      {cardData[selectedCard] && cardData[selectedCard].length > 0 ? (
        cardData[selectedCard].map((data, index) => (
          <AssetCard data={data} key={index}
            onPress={() => navigation.navigate('Allgraphs', {

              instrumentType: data?.instrumentType,
              instrumentId: data?.instrumentId,

            })} />
        ))
      ) : (

        <View style={styles.noDataContainer}>
          <LottieView
            source={require('../assets/animations/Animation.json')}
            autoPlay
            loop
            style={styles.animation}
            onAnimationFinish={() => console.log('Animation finished')}

          />

          <Animatable.Text
            key={selectedCard}
            animation="zoomIn"
            style={styles.cardDataText}
          >
            You Have No Stock In {selectedCard}
          </Animatable.Text>

        </View>


      )
      }
    </View >
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "FFFFFF",
  },
  portfolio: {
    alignItems: "center",
    justifyContent: "center",
  },
  portfolioText: {
    fontSize: 16,
    fontWeight: "600",
    lineHeight: 17.71,
  },
  totalValue: {
    fontSize: 14,
    fontWeight: "600",
    lineHeight: 19.09,
    color: "rgba(28, 30, 50, 1)",
  },

  noDataContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  animation: {
    width: 400,
    height: 300,
  },
  cardDataText: {
    color: 'red',
    fontSize: 17,
    fontWeight: '700',
    marginTop: 8,
  },

  nameContainer: {
    flexDirection: 'row',
    flex: 1.3,
    alignItems: 'center',
  },
  headerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 12,
    borderBottomWidth: 1,
    // backgroundColor: '#C1C2EB',
    borderBottomColor: '#E5E5E5',
    marginTop: 10,
    borderRadius: 5,

  },
  headerText: {
    fontSize: 17,
    fontWeight: '700',
    // color: 'rgba(28, 30, 50, 1)',
    color: 'rgba(28, 30, 50, 0.6)',

  },
  selectedCardText: {
    flex: 3,
    textAlign: 'center',
  },
  quantityContainer: {
    flex: 2,
  },
  valueContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default ViewPortfolio;






// <Text style={styles.cardDataText}>
//   No data available for {selectedCard}
// </Text>

// <Animatable.View
//   // animation="shake" // You can choose any animation type from react-native-animatable
//   easing="ease-out"
//   iterationCount="infinite"
//   style={styles.noDataContainer}
// >
//   <Icon name="language" size={300} color="#716f7c" />
//   <Text style={styles.cardDataText}>
//     No data available for {selectedCard}
//   </Text>
// </Animatable.View>

//wo multiplw with quantity
// import React, { useState, useEffect } from "react";
// import { View, Text, StyleSheet } from "react-native";
// import AssetCard from "./AssetCard";
// import { useSelector } from "react-redux";
// import { useNavigation } from '@react-navigation/native';



// const fetchData = async (url, options) => {
//   const response = await fetch(url, options);
//   const data = await response.json();
//   return data;
// };


// const ViewPortfolio = ({
//   selectedCard,
//   updateTotalValue,
//   updateChangePercentage,
//   selectedCardColor,
//   updateOverallTotalValue,
//   updateOverallChangePercentage
// }) => {
//   const { token } = useSelector((state) => state.auth);
//   const navigation = useNavigation();
//   const [nseData, setNseData] = useState([]);


//   useEffect(() => {
//     const fetchData1 = async () => {
//       try {
//         const response1 = await fetchData("http://35.154.235.224:9000/api/user/getPortfolio", {
//           method: "GET",
//           headers: new Headers({ "Authorization": "Bearer " + token }),
//           redirect: "follow",
//         });

//         // console.log("Response1:", response1);

//         const response2 = await fetchData("http://35.154.235.224:9000/api/user/getZtokens", {
//           method: "POST",
//           headers: new Headers({ "Authorization": "Bearer " + token }),
//           body: "",
//           redirect: "follow",
//         });

//         // console.log("Response2:", response2);

//         const mergedArray = response1.map((item1) => {
//           const matchingItem = response2.find((item2) => item2.Zid === item1.FinancialInstrumentID);

//           return {
//             name2: matchingItem ? matchingItem.Name : null,
//             name3: matchingItem ? matchingItem.Segment : null,

//             decimalValue: item1.Quantity,//display quantity

//             Name: matchingItem ? matchingItem.Name : null,
//             symbol: matchingItem ? matchingItem.Tradingsymbol : null,
//             value: item1.AveragePrice,
//             press: 'Allgraphs',
//             LastPrice: item1.AveragePrice,
//             sname: matchingItem ? matchingItem.Name : null,
//             instrumentId: matchingItem ? matchingItem.Zid : null,
//             instrumentType: matchingItem ? matchingItem.Segment : null,
//             Price: matchingItem ? matchingItem.Name : null,
//             priceVal: item1.AveragePrice,
//             Quantities: item1.Quantity,
//             //  logo: 'https://assets.coingecko.com/coins/images/10365/large/assets/bitcoinsvgrepocom-1.svg',
//             Open: "open",
//             openValue: 10000,
//             Close: "Close",
//             closeValue: 50,
//             High: "High",
//             Hvalue: 1500000,
//             Low: "Low",
//             Lvalue: 25,
//             Dval: "Daily Vol",
//             Value: "140.03B",
//             Market: "Market",
//             value1: "200.3B",
//             volBtc: "vol BTC",
//             value2: "10,000",
//             volUsdt: "vol USDT",
//             value3: "10,000",



//           };
//         });
//         setNseData(mergedArray);
//       } catch (error) {
//         // console.log("Error in API calls:", error);
//       }
//     };

//     fetchData1();
//   }, [token]);


//   //to display inside the card
//   const calculateTotalValue = (cardType) => {
//     const cardTypeData = cardData[cardType];
//     if (cardTypeData) {
//       let totalValue = 0;
//       cardTypeData.forEach((item) => {
//         if (item.value && typeof item.value === 'string') {
//           totalValue += parseFloat(item.value.replace('$', '').replace(/,/g, ''));
//         } else if (item.LastPrice && typeof item.LastPrice === 'number') {
//           totalValue += item.LastPrice;
//         }
//       });
//       return `$${totalValue.toFixed(2)}`;
//     }
//     return "$0.00";
//   };
//   const calculateChangePercentage = (cardType) => {
//     const cardTypeData = cardData[cardType];
//     let totalChange = 0;
//     if (cardTypeData) {
//       cardTypeData.forEach((item) => {
//         if (item.changePercentage && typeof item.changePercentage === 'string') {
//           totalChange += parseFloat(item.changePercentage.replace('%', ''));
//         }
//       });
//     }

//     // Format the change percentage with the sign
//     return totalChange >= 0 ? `+${totalChange.toFixed(2)}%` : `${totalChange.toFixed(2)}%`;
//   };

//   useEffect(() => {
//     let overallChange = 0;
//     const cardTypes = Object.keys(cardData);

//     cardTypes.forEach((cardType) => {
//       const totalValue = calculateTotalValue(cardType);
//       const totalChangePercentage = calculateChangePercentage(cardType);
//       updateTotalValue(cardType, totalValue);
//       updateChangePercentage(cardType, totalChangePercentage);
//       overallChange += parseFloat(totalChangePercentage);
//     });

//     const overallChangePercentage = overallChange / cardTypes.length;
//     updateOverallChangePercentage(overallChangePercentage >= 0 ? `+${overallChangePercentage.toFixed(2)}%` : `${overallChangePercentage.toFixed(2)}%`);
//   }, [token, nseData]);



//   //to calculate overall total value and pass to header
//   const calculateOverallTotalValue = () => {
//     let overallTotal = 0;
//     Object.values(cardData).forEach((cardTypeData) => {
//       cardTypeData.forEach((item) => {
//         if (item.value && typeof item.value === 'string') {
//           overallTotal += parseFloat(item.value.replace('$', '').replace(/,/g, ''));
//         } else if (item.LastPrice && typeof item.LastPrice === 'number') {
//           overallTotal += item.LastPrice;
//         }
//       });
//     });
//     return overallTotal;
//   };

//   useEffect(() => {
//     const overallTotal = calculateOverallTotalValue();
//     updateOverallTotalValue(overallTotal);

//   }, [token, nseData]);

//   const cardData = {
//     Crypto: [],

//     NSE: nseData,

//     // BSE: [],
//     NASDAQ: [],


//     Commodity: [],
//   };

//   return (
//     <View style={styles.container}>


//       {/* <View style={styles.headerContainer}> */}
//       <View style={[styles.headerContainer, { backgroundColor: selectedCardColor }]}>
//         <View style={styles.nameContainer}>
//           <Text style={styles.headerText}>Name</Text>
//         </View>
//         <View style={styles.name3Wrapper}>
//           {/* <Text style={styles.headerText}>Segment</Text> */}
//         </View>
//         <Text style={[styles.headerText, styles.selectedCardText]}>{selectedCard}</Text>
//         <View style={styles.quantityContainer}>
//           <Text style={styles.headerText}>Quantity</Text>
//         </View>
//         <View style={styles.valueContainer}>
//           <Text style={styles.headerText}>Value</Text>
//         </View>
//       </View>

//       {/* //todisplay total value and name  */}
//       {/* <Text style={styles.portfolioText}>{selectedCard} Portfolio</Text> */}
//       {/* <Text style={styles.totalValue}>{calculateTotalValue(selectedCard)}</Text> */}

//       {cardData[selectedCard] ? (
//         cardData[selectedCard].map((data, index) => (
//           <AssetCard data={data} key={index}
//             onPress={() => navigation.navigate('Allgraphs', {

//               instrumentType: data?.instrumentType,
//               instrumentId: data?.instrumentId,

//             })} />
//         ))
//       ) : (
//         <Text style={styles.cardDataText}>
//           No data available for {selectedCard}
//         </Text>
//       )}
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     alignItems: "center",
//     justifyContent: "center",
//     backgroundColor: "FFFFFF",
//   },
//   portfolio: {
//     alignItems: "center",
//     justifyContent: "center",
//   },
//   portfolioText: {
//     fontSize: 16,
//     fontWeight: "600",
//     lineHeight: 17.71,
//   },
//   totalValue: {
//     fontSize: 14,
//     fontWeight: "600",
//     lineHeight: 19.09,
//     color: "rgba(28, 30, 50, 1)",
//   },
//   cardDataText: {
//     fontSize: 16,
//     fontWeight: "600",
//     lineHeight: 17.71,
//   },
//   nameContainer: {
//     flexDirection: 'row',
//     flex: 1.3,
//     alignItems: 'center',
//     // Other styling properties...
//   },
//   headerContainer: {
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     padding: 12,
//     borderBottomWidth: 1,
//     // backgroundColor: '#C1C2EB',
//     borderBottomColor: '#E5E5E5',
//     marginTop: 10,
//     borderRadius: 5,

//   },
//   headerText: {
//     fontSize: 17,
//     fontWeight: '700',
//     // color: 'rgba(28, 30, 50, 1)',
//     color: 'rgba(28, 30, 50, 0.6)',

//   },
//   selectedCardText: {
//     flex: 3,
//     textAlign: 'center',
//   },
//   quantityContainer: {
//     flex: 2,
//   },
//   valueContainer: {
//     flex: 1,
//     alignItems: 'center',
//     justifyContent: 'center',
//   },
// });

// export default ViewPortfolio;














