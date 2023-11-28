import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet } from "react-native";
import AssetCard from "./AssetCard";
import { useSelector } from "react-redux";
import { useNavigation } from '@react-navigation/native';



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

        // console.log("Response1:", response1);

        const response2 = await fetchData("http://35.154.235.224:9000/api/user/getZtokens", {
          method: "POST",
          headers: new Headers({ "Authorization": "Bearer " + token }),
          body: "",
          redirect: "follow",
        });

        // console.log("Response2:", response2);

        const mergedArray = response1.map((item1) => {
          const matchingItem = response2.find((item2) => item2.Zid === item1.FinancialInstrumentID);

          return {
            name2: matchingItem ? matchingItem.Name : null,
            name3: matchingItem ? matchingItem.Segment : null,

            decimalValue: item1.Quantity,

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
            logo: 'https://assets.coingecko.com/coins/images/10365/large/assets/bitcoinsvgrepocom-1.svg',
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

  const calculateTotalValue = (cardType) => {
    const cardTypeData = cardData[cardType];
    if (cardTypeData) {
      let totalValue = 0;
      cardTypeData.forEach((item) => {
        if (item.value && typeof item.value === 'string') {
          totalValue += parseFloat(item.value.replace('$', '').replace(/,/g, ''));
        } else if (item.LastPrice && typeof item.LastPrice === 'number') {
          totalValue += item.LastPrice;
        }
      });
      return `$${totalValue.toFixed(2)}`;
    }
    return "$0.00";
  };

  const calculateChangePercentage = (cardType) => {
    const cardTypeData = cardData[cardType];
    if (cardTypeData) {
      let totalChange = 0;
      cardTypeData.forEach((item) => {
        if (item.changePercentage && typeof item.changePercentage === 'string') {
          totalChange += parseFloat(item.changePercentage.replace('+', '').replace('%', ''));
        }
      });
      return totalChange > 0
        ? `+${totalChange.toFixed(2)}%`
        : `${totalChange.toFixed(2)}%`;
    }
    return '+0.00%';
  };

  useEffect(() => {
    const cardTypes = Object.keys(cardData);
    cardTypes.forEach((cardType) => {
      const totalValue = calculateTotalValue(cardType);
      const totalChangePercentage = calculateChangePercentage(cardType);
      updateTotalValue(cardType, totalValue);
      updateChangePercentage(cardType, totalChangePercentage);
    });
  }, [token, nseData]);

  const cardData = {
    Crypto: [
      {
        name2: "BNB",
        name3: "BTC",
        value: "$212.4",
        decimalValue: ".60",
        changePercentage: "+7.90%",
        logo: "https://assets.coingecko.com/coins/images/10365/large/assets/bitcoinsvgrepocom-1.svg",
      },
      {
        name2: "BNB",
        name3: "BTC",
        value: "$212.4",
        decimalValue: ".60",
        changePercentage: "+7.90%",
        logo: "https://assets.coingecko.com/coins/images/10365/large/assets/bitcoinsvgrepocom-1.svg",
      },
      {
        name2: "BNB",
        name3: "BTC",
        value: "$212.4",
        decimalValue: ".60",
        changePercentage: "+7.90%",
        logo: "https://assets.coingecko.com/coins/images/10365/large/assets/bitcoinsvgrepocom-1.svg",
      },
      {
        name2: "BNB",
        name3: "BTC",
        value: "$212.4",
        decimalValue: ".60",
        changePercentage: "+7.90%",
        logo: "https://assets.coingecko.com/coins/images/10365/large/assets/bitcoinsvgrepocom-1.svg",
      },
      {
        name2: "BNB",
        name3: "BTC",
        value: "$212.4",
        decimalValue: ".60",
        changePercentage: "+7.90%",
        logo: "https://assets.coingecko.com/coins/images/10365/large/assets/bitcoinsvgrepocom-1.svg",
      },
      {
        name2: "BNB",
        name3: "BTC",
        value: "$212.4",
        decimalValue: ".60",
        changePercentage: "+7.90%",
        logo: "https://assets.coingecko.com/coins/images/10365/large/assets/bitcoinsvgrepocom-1.svg",
      },
      {
        name2: 'ETC',
        name3: 'BTC',
        value: '$27,618',
        decimalValue: '.60',
        changePercentage: '-7.90%',
        logo: 'https://assets.coingecko.com/coins/images/10365/large/assets/bitcoinsvgrepocom-1.svg',
        symbol: 'ETC',
        press: 'Allgraphs',
        Name: "Etc",
        Price: "ETC Price",
        priceVal: "30,000000",
        pricePer: "-10.35",
        Open: "open",
        openValue: 1000000,
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
        value2: "10,000000000",
        volUsdt: "vol USDT",
        value3: "10,000",
      },

    ],

    NSE: nseData,

    BSE: [
      {
        name2: 'ACC',
        name3: 'BTC',
        value: '$30,618',
        decimalValue: '.60',
        changePercentage: '-7.90%',
        logo: 'https://assets.coingecko.com/coins/images/10365/large/assets/bitcoinsvgrepocom-1.svg',
      },
      {
        name2: "BNB",
        name3: "BTC",
        value: "$212.4",
        decimalValue: ".60",
        changePercentage: "+7.90%",
        logo: "https://assets.coingecko.com/coins/images/10365/large/assets/bitcoinsvgrepocom-1.svg",
      },
      {
        name2: "BNB",
        name3: "BTC",
        value: "$212.4",
        decimalValue: ".60",
        changePercentage: "+7.90%",
        logo: "https://assets.coingecko.com/coins/images/10365/large/assets/bitcoinsvgrepocom-1.svg",
      },
      {
        name2: "BNB",
        name3: "BTC",
        value: "$212.4",
        decimalValue: ".60",
        changePercentage: "+7.90%",
        logo: "https://assets.coingecko.com/coins/images/10365/large/assets/bitcoinsvgrepocom-1.svg",
      },

    ],
    Commodity: [
      {
        name2: "BNB",
        name3: "BTC",
        value: "$212.4",
        decimalValue: ".60",
        changePercentage: "+7.90%",
        logo: "https://assets.coingecko.com/coins/images/10365/large/assets/bitcoinsvgrepocom-1.svg",
      },
      {
        name2: "BNB",
        name3: "BTC",
        value: "$212.4",
        decimalValue: ".60",
        changePercentage: "+7.90%",
        logo: "https://assets.coingecko.com/coins/images/10365/large/assets/bitcoinsvgrepocom-1.svg",
      },
      {
        name2: "BNB",
        name3: "BTC",
        value: "$212.4",
        decimalValue: ".60",
        changePercentage: "+7.90%",
        logo: "https://assets.coingecko.com/coins/images/10365/large/assets/bitcoinsvgrepocom-1.svg",
      },
      {
        name2: "BNB",
        name3: "BTC",
        value: "$212.4",
        decimalValue: ".60",
        changePercentage: "+7.90%",
        logo: "https://assets.coingecko.com/coins/images/10365/large/assets/bitcoinsvgrepocom-1.svg",
      },
    ],
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

      {cardData[selectedCard] ? (
        cardData[selectedCard].map((data, index) => (
          <AssetCard data={data} key={index}
            onPress={() => navigation.navigate('Allgraphs', {
              symbol: data.symbol,
              Open: data.Open,
              Name: data.Name,
              Price: data.Price,
              priceVal: data.priceVal,
              pricePer: data.pricePer,
              openValue: data.openValue,
              Close: data.Close,
              closeValue: data.closeValue,
              High: data.High,
              Hvalue: data.Hvalue,
              Low: data.Low,
              Lvalue: data.Lvalue,
              Name: data.Name,
              Dval: data.Dval,
              Value: data.Value,
              Market: data.Market,
              value1: data.value1,
              volBtc: data.volBtc,
              value2: data.value2,
              volUsdt: data.volUsdt,
              value3: data.value3,
              Price: data.Price,
              priceVal: data.priceVal,
              LastPrice: data.LastPrice,
              sname: data.sname,
              Quantities: data.Quantities,
              instrumentType: data.instrumentType,
              instrumentId: data.instrumentId,
              quantity: data.quantity,

            })} />
        ))
      ) : (
        <Text style={styles.cardDataText}>
          No data available for {selectedCard}
        </Text>
      )}
    </View>
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
  cardDataText: {
    fontSize: 16,
    fontWeight: "600",
    lineHeight: 17.71,
  },
  nameContainer: {
    flexDirection: 'row',
    flex: 1.3,
    alignItems: 'center',
    // Other styling properties...
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













//withintegrate with consolelog
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
// }) => {
//   const { token } = useSelector((state) => state.auth);
//   const navigation = useNavigation();
//   const [nseData, setNseData] = useState([]);



//   // useEffect(() => {
//   //   const fetchData1 = async () => {
//   //     try {
//   //       const response1 = await fetchData("http://35.154.235.224:9000/api/user/getPortfolio", {
//   //         method: "GET",
//   //         headers: new Headers({ "Authorization": "Bearer " + token }),
//   //         redirect: "follow",
//   //       });

//   //       const response2 = await fetchData("http://35.154.235.224:9000/api/user/getZtokens", {
//   //         method: "POST",
//   //         headers: new Headers({ "Authorization": "Bearer " + token }),
//   //         body: "",
//   //         redirect: "follow",
//   //       });
//   useEffect(() => {
//     const fetchData1 = async () => {
//       try {
//         const response1 = await fetchData("http://35.154.235.224:9000/api/user/getPortfolio", {
//           method: "GET",
//           headers: new Headers({ "Authorization": "Bearer " + token }),
//           redirect: "follow",
//         });

//         console.log("Response1:", response1);

//         const response2 = await fetchData("http://35.154.235.224:9000/api/user/getZtokens", {
//           method: "POST",
//           headers: new Headers({ "Authorization": "Bearer " + token }),
//           body: "",
//           redirect: "follow",
//         });

//         console.log("Response2:", response2);

//         const mergedArray = response1.map((item1) => {
//           const matchingItem = response2.find((item2) => item2.Zid === item1.FinancialInstrumentID);

//           return {
//             name2: matchingItem ? matchingItem.Name : null,
//             name3: matchingItem ? matchingItem.Segment : null,

//             decimalValue: item1.Quantity,

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
//             logo: 'https://assets.coingecko.com/coins/images/10365/large/assets/bitcoinsvgrepocom-1.svg',
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
//         console.log("Error in API calls:", error);
//       }
//     };

//     fetchData1();
//   }, [token]);

//   // const calculateTotalValue = (cardType) => {
//   //   if (cardType === "NSE" && nseData) {
//   //     let totalValue = 0;

//   //     nseData.forEach((item) => {
//   //       if (item.LastPrice && typeof item.LastPrice === 'number') {
//   //         totalValue += item.LastPrice;
//   //       }
//   //     });

//   //     return `$${totalValue.toFixed(2)}`;
//   //   }
//   //   return "$0.00";
//   // };
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

//   // const calculateChangePercentage = (cardType) => {
//   //   const cardTypeData = cardData[cardType];
//   //   if (cardTypeData) {
//   //     let totalChange = 0;
//   //     cardTypeData.forEach((item) => {
//   //       if (item.changePercentage && typeof item.changePercentage === 'string') {
//   //         totalChange += parseFloat(item.changePercentage.replace("+", "").replace("%", ""));
//   //       }
//   //     });
//   //     return totalChange > 0
//   //       ? `+${totalChange.toFixed(2)}%`
//   //       : `${totalChange.toFixed(2)}%`;
//   //   }
//   //   return "+0.00%";
//   // };

//   // useEffect(() => {
//   //   const cardTypes = Object.keys(cardData);
//   //   cardTypes.forEach((cardType) => {
//   //     const totalValue = calculateTotalValue(cardType);
//   //     const totalChangePercentage = calculateChangePercentage(cardType);
//   //     updateTotalValue(cardType, totalValue);
//   //     updateChangePercentage(cardType, totalChangePercentage);
//   //   });
//   // }, [token, nseData]);



//   // const calculateTotalValue = (cardType) => {
//   //   const cardTypeData = cardData[cardType];
//   //   if (cardTypeData) {
//   //     let totalValue = 0;
//   //     cardTypeData.forEach((item) => {
//   //       if (item.value && typeof item.value === 'string') {
//   //         totalValue += parseFloat(item.value.replace('$', '').replace(/,/g, ''));
//   //       }
//   //     });
//   //     return `$${totalValue.toFixed(2)}`;
//   //   }
//   //   return "$0.00";
//   // };

//   const calculateChangePercentage = (cardType) => {
//     const cardTypeData = cardData[cardType];
//     if (cardTypeData) {
//       let totalChange = 0;
//       cardTypeData.forEach((item) => {
//         if (item.changePercentage && typeof item.changePercentage === 'string') {
//           totalChange += parseFloat(item.changePercentage.replace('+', '').replace('%', ''));
//         }
//       });
//       return totalChange > 0
//         ? `+${totalChange.toFixed(2)}%`
//         : `${totalChange.toFixed(2)}%`;
//     }
//     return '+0.00%';
//   };

//   useEffect(() => {
//     const cardTypes = Object.keys(cardData);
//     cardTypes.forEach((cardType) => {
//       const totalValue = calculateTotalValue(cardType);
//       const totalChangePercentage = calculateChangePercentage(cardType);
//       updateTotalValue(cardType, totalValue);
//       updateChangePercentage(cardType, totalChangePercentage);
//     });
//   }, [token, nseData]);

//   const cardData = {
//     Crypto: [
//       {
//         name2: "BNB",
//         name3: "BTC",
//         value: "$212.4",
//         decimalValue: ".60",
//         changePercentage: "+7.90%",
//         logo: "https://assets.coingecko.com/coins/images/10365/large/assets/bitcoinsvgrepocom-1.svg",
//       },
//       {
//         name2: "BNB",
//         name3: "BTC",
//         value: "$212.4",
//         decimalValue: ".60",
//         changePercentage: "+7.90%",
//         logo: "https://assets.coingecko.com/coins/images/10365/large/assets/bitcoinsvgrepocom-1.svg",
//       },
//       {
//         name2: "BNB",
//         name3: "BTC",
//         value: "$212.4",
//         decimalValue: ".60",
//         changePercentage: "+7.90%",
//         logo: "https://assets.coingecko.com/coins/images/10365/large/assets/bitcoinsvgrepocom-1.svg",
//       },
//       {
//         name2: "BNB",
//         name3: "BTC",
//         value: "$212.4",
//         decimalValue: ".60",
//         changePercentage: "+7.90%",
//         logo: "https://assets.coingecko.com/coins/images/10365/large/assets/bitcoinsvgrepocom-1.svg",
//       },
//       {
//         name2: "BNB",
//         name3: "BTC",
//         value: "$212.4",
//         decimalValue: ".60",
//         changePercentage: "+7.90%",
//         logo: "https://assets.coingecko.com/coins/images/10365/large/assets/bitcoinsvgrepocom-1.svg",
//       },
//       {
//         name2: "BNB",
//         name3: "BTC",
//         value: "$212.4",
//         decimalValue: ".60",
//         changePercentage: "+7.90%",
//         logo: "https://assets.coingecko.com/coins/images/10365/large/assets/bitcoinsvgrepocom-1.svg",
//       },
//       {
//         name2: 'ETC',
//         name3: 'BTC',
//         value: '$27,618',
//         decimalValue: '.60',
//         changePercentage: '-7.90%',
//         logo: 'https://assets.coingecko.com/coins/images/10365/large/assets/bitcoinsvgrepocom-1.svg',
//         symbol: 'ETC',
//         press: 'Allgraphs',
//         Name: "Etc",
//         Price: "ETC Price",
//         priceVal: "30,000000",
//         pricePer: "-10.35",
//         Open: "open",
//         openValue: 1000000,
//         Close: "Close",
//         closeValue: 50,
//         High: "High",
//         Hvalue: 1500000,
//         Low: "Low",
//         Lvalue: 25,
//         Dval: "Daily Vol",
//         Value: "140.03B",
//         Market: "Market",
//         value1: "200.3B",
//         volBtc: "vol BTC",
//         value2: "10,000000000",
//         volUsdt: "vol USDT",
//         value3: "10,000",
//       },

//     ],

//     NSE: nseData,

//     BSE: [
//       {
//         name2: 'ACC',
//         name3: 'BTC',
//         value: '$30,618',
//         decimalValue: '.60',
//         changePercentage: '-7.90%',
//         logo: 'https://assets.coingecko.com/coins/images/10365/large/assets/bitcoinsvgrepocom-1.svg',
//       },
//       {
//         name2: "BNB",
//         name3: "BTC",
//         value: "$212.4",
//         decimalValue: ".60",
//         changePercentage: "+7.90%",
//         logo: "https://assets.coingecko.com/coins/images/10365/large/assets/bitcoinsvgrepocom-1.svg",
//       },
//       {
//         name2: "BNB",
//         name3: "BTC",
//         value: "$212.4",
//         decimalValue: ".60",
//         changePercentage: "+7.90%",
//         logo: "https://assets.coingecko.com/coins/images/10365/large/assets/bitcoinsvgrepocom-1.svg",
//       },
//       {
//         name2: "BNB",
//         name3: "BTC",
//         value: "$212.4",
//         decimalValue: ".60",
//         changePercentage: "+7.90%",
//         logo: "https://assets.coingecko.com/coins/images/10365/large/assets/bitcoinsvgrepocom-1.svg",
//       },

//     ],
//     Commodity: [
//       {
//         name2: "BNB",
//         name3: "BTC",
//         value: "$212.4",
//         decimalValue: ".60",
//         changePercentage: "+7.90%",
//         logo: "https://assets.coingecko.com/coins/images/10365/large/assets/bitcoinsvgrepocom-1.svg",
//       },
//       {
//         name2: "BNB",
//         name3: "BTC",
//         value: "$212.4",
//         decimalValue: ".60",
//         changePercentage: "+7.90%",
//         logo: "https://assets.coingecko.com/coins/images/10365/large/assets/bitcoinsvgrepocom-1.svg",
//       },
//       {
//         name2: "BNB",
//         name3: "BTC",
//         value: "$212.4",
//         decimalValue: ".60",
//         changePercentage: "+7.90%",
//         logo: "https://assets.coingecko.com/coins/images/10365/large/assets/bitcoinsvgrepocom-1.svg",
//       },
//       {
//         name2: "BNB",
//         name3: "BTC",
//         value: "$212.4",
//         decimalValue: ".60",
//         changePercentage: "+7.90%",
//         logo: "https://assets.coingecko.com/coins/images/10365/large/assets/bitcoinsvgrepocom-1.svg",
//       },
//     ],
//   };

//   return (
//     <View style={styles.container}>
//       <View style={styles.portfolio}>
//         {/* <Text style={styles.portfolioText}>{selectedCard} Portfolio</Text> */}
//         {/* <Text style={styles.totalValue}>{calculateTotalValue(selectedCard)}</Text> */}
//         {/* {selectedCard === "NSE" ? calculateTotalValue(selectedCard) : ""} */}
//       </View>
//       {cardData[selectedCard] ? (
//         cardData[selectedCard].map((data, index) => (
//           <AssetCard data={data} key={index}
//             onPress={() => navigation.navigate('Allgraphs', {
//               symbol: data.symbol,
//               Open: data.Open,
//               Name: data.Name,
//               Price: data.Price,
//               priceVal: data.priceVal,
//               pricePer: data.pricePer,
//               openValue: data.openValue,
//               Close: data.Close,
//               closeValue: data.closeValue,
//               High: data.High,
//               Hvalue: data.Hvalue,
//               Low: data.Low,
//               Lvalue: data.Lvalue,
//               Name: data.Name,
//               Dval: data.Dval,
//               Value: data.Value,
//               Market: data.Market,
//               value1: data.value1,
//               volBtc: data.volBtc,
//               value2: data.value2,
//               volUsdt: data.volUsdt,
//               value3: data.value3,
//               Price: data.Price,
//               priceVal: data.priceVal,
//               LastPrice: data.LastPrice,
//               sname: data.sname,
//               Quantities: data.Quantities,
//               instrumentType: data.instrumentType,
//               instrumentId: data.instrumentId,
//               quantity: data.quantity,

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













//working
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

//         const response2 = await fetchData("http://35.154.235.224:9000/api/user/getZtokens", {
//           method: "POST",
//           headers: new Headers({ "Authorization": "Bearer " + token }),
//           body: "",
//           redirect: "follow",
//         });

//         const mergedArray = response1.map((item1) => {
//           const matchingItem = response2.find((item2) => item2.Zid === item1.FinancialInstrumentID);

//           return {
//             name2: matchingItem ? matchingItem.Name : null,
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
//             logo: 'https://assets.coingecko.com/coins/images/10365/large/assets/bitcoinsvgrepocom-1.svg',
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
//         console.log("Error in API calls:", error);
//       }
//     };

//     fetchData1();
//   }, [token]);

//   // const calculateTotalValue = (cardType) => {
//   //   if (cardType === "NSE" && nseData) {
//   //     let totalValue = 0;

//   //     nseData.forEach((item) => {
//   //       if (item.LastPrice && typeof item.LastPrice === 'number') {
//   //         totalValue += item.LastPrice;
//   //       }
//   //     });

//   //     return `$${totalValue.toFixed(2)}`;
//   //   }
//   //   return "$0.00";
//   // };

//   // const calculateChangePercentage = (cardType) => {
//   //   const cardTypeData = cardData[cardType];
//   //   if (cardTypeData) {
//   //     let totalChange = 0;
//   //     cardTypeData.forEach((item) => {
//   //       if (item.changePercentage && typeof item.changePercentage === 'string') {
//   //         totalChange += parseFloat(item.changePercentage.replace("+", "").replace("%", ""));
//   //       }
//   //     });
//   //     return totalChange > 0
//   //       ? `+${totalChange.toFixed(2)}%`
//   //       : `${totalChange.toFixed(2)}%`;
//   //   }
//   //   return "+0.00%";
//   // };

//   // useEffect(() => {
//   //   const cardTypes = Object.keys(cardData);
//   //   cardTypes.forEach((cardType) => {
//   //     const totalValue = calculateTotalValue(cardType);
//   //     const totalChangePercentage = calculateChangePercentage(cardType);
//   //     updateTotalValue(cardType, totalValue);
//   //     updateChangePercentage(cardType, totalChangePercentage);
//   //   });
//   // }, [token, nseData]);



//   const calculateTotalValue = (cardType) => {
//     const cardTypeData = cardData[cardType];
//     if (cardTypeData) {
//       let totalValue = 0;
//       cardTypeData.forEach((item) => {
//         if (item.value && typeof item.value === 'string') {
//           totalValue += parseFloat(item.value.replace('$', '').replace(/,/g, ''));
//         }
//       });
//       return `$${totalValue.toFixed(2)}`;
//     }
//     return "$0.00";
//   };

//   const calculateChangePercentage = (cardType) => {
//     const cardTypeData = cardData[cardType];
//     if (cardTypeData) {
//       let totalChange = 0;
//       cardTypeData.forEach((item) => {
//         if (item.changePercentage && typeof item.changePercentage === 'string') {
//           totalChange += parseFloat(item.changePercentage.replace('+', '').replace('%', ''));
//         }
//       });
//       return totalChange > 0
//         ? `+${totalChange.toFixed(2)}%`
//         : `${totalChange.toFixed(2)}%`;
//     }
//     return '+0.00%';
//   };

//   useEffect(() => {
//     const cardTypes = Object.keys(cardData);
//     cardTypes.forEach((cardType) => {
//       const totalValue = calculateTotalValue(cardType);
//       const totalChangePercentage = calculateChangePercentage(cardType);
//       updateTotalValue(cardType, totalValue);
//       updateChangePercentage(cardType, totalChangePercentage);
//     });
//   }, [token, nseData]);

//   const cardData = {
//     Crypto: [
//       {
//         name2: "BNB",
//         name3: "BTC",
//         value: "$212.4",
//         decimalValue: ".60",
//         changePercentage: "+7.90%",
//         logo: "https://assets.coingecko.com/coins/images/10365/large/assets/bitcoinsvgrepocom-1.svg",
//       },
//       {
//         name2: 'ETC',
//         name3: 'BTC',
//         value: '$27,618',
//         decimalValue: '.60',
//         changePercentage: '-7.90%',
//         logo: 'https://assets.coingecko.com/coins/images/10365/large/assets/bitcoinsvgrepocom-1.svg',
//         symbol: 'ETC',
//         press: 'Allgraphs',
//         Name: "Etc",
//         Price: "ETC Price",
//         priceVal: "30,000000",
//         pricePer: "-10.35",
//         Open: "open",
//         openValue: 1000000,
//         Close: "Close",
//         closeValue: 50,
//         High: "High",
//         Hvalue: 1500000,
//         Low: "Low",
//         Lvalue: 25,
//         Dval: "Daily Vol",
//         Value: "140.03B",
//         Market: "Market",
//         value1: "200.3B",
//         volBtc: "vol BTC",
//         value2: "10,000000000",
//         volUsdt: "vol USDT",
//         value3: "10,000",
//       },

//     ],

//     NSE: nseData,

//     BSE: [
//       {
//         name2: 'ACC',
//         name3: 'BTC',
//         value: '$30,618',
//         decimalValue: '.60',
//         changePercentage: '-7.90%',
//         logo: 'https://assets.coingecko.com/coins/images/10365/large/assets/bitcoinsvgrepocom-1.svg',
//       },

//     ],
//     Commodity: [
//       {
//         name2: "BNB",
//         name3: "BTC",
//         value: "$212.4",
//         decimalValue: ".60",
//         changePercentage: "+7.90%",
//         logo: "https://assets.coingecko.com/coins/images/10365/large/assets/bitcoinsvgrepocom-1.svg",
//       },
//     ],
//   };

//   return (
//     <View style={styles.container}>
//       <View style={styles.portfolio}>
//         {/* <Text style={styles.portfolioText}>{selectedCard} Portfolio</Text> */}
//         {/* <Text style={styles.totalValue}>{calculateTotalValue(selectedCard)}</Text> */}
//         {/* {selectedCard === "NSE" ? calculateTotalValue(selectedCard) : ""} */}
//       </View>
//       {cardData[selectedCard] ? (
//         cardData[selectedCard].map((data, index) => (
//           <AssetCard data={data} key={index}
//             onPress={() => navigation.navigate('Allgraphs', {
//               symbol: data.symbol,
//               Open: data.Open,
//               Name: data.Name,
//               Price: data.Price,
//               priceVal: data.priceVal,
//               pricePer: data.pricePer,
//               openValue: data.openValue,
//               Close: data.Close,
//               closeValue: data.closeValue,
//               High: data.High,
//               Hvalue: data.Hvalue,
//               Low: data.Low,
//               Lvalue: data.Lvalue,
//               Name: data.Name,
//               Dval: data.Dval,
//               Value: data.Value,
//               Market: data.Market,
//               value1: data.value1,
//               volBtc: data.volBtc,
//               value2: data.value2,
//               volUsdt: data.volUsdt,
//               value3: data.value3,
//               Price: data.Price,
//               priceVal: data.priceVal,
//               LastPrice: data.LastPrice,
//               sname: data.sname,
//               Quantities: data.Quantities,
//               instrumentType: data.instrumentType,
//               instrumentId: data.instrumentId,
//               quantity: data.quantity,

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



//with integration
// import React, { useState, useEffect } from "react";
// import { View, Text, StyleSheet } from "react-native";
// import AssetCard from "./AssetCard";
// import { useSelector } from "react-redux";
// import { useNavigation } from '@react-navigation/native';




// const ViewPortfolio = ({
//   selectedCard,
//   updateTotalValue,
//   updateChangePercentage,
// }) => {
//   const { token } = useSelector((state) => state.auth);
//   console.log("Dashboard", token);


//   const navigation = useNavigation();
//   const [nseData, setNseData] = useState([]);

//   useEffect(() => {
//     const myHeaders1 = new Headers();
//     myHeaders1.append(
//       "Authorization",
//       "Bearer " + token
//     );

//     const requestOptions1 = {
//       method: "GET",
//       headers: myHeaders1,
//       redirect: "follow",
//     };

//     const myHeaders2 = new Headers();
//     myHeaders2.append(
//       "Authorization",
//       "Bearer " + token
//     );

//     const raw = "";

//     const requestOptions2 = {
//       method: "POST",
//       headers: myHeaders2,
//       body: raw,
//       redirect: "follow",
//     };

//     fetch("http://35.154.235.224:9000/api/user/getPortfolio", requestOptions1)
//       .then((response) => response.json())
//       .then((data1) => {

//         fetch("http://35.154.235.224:9000/api/user/getZtokens", requestOptions2)
//           .then((response) => response.json())
//           .then((data2) => {

//             const mergedArray = data1.map((item1) => {
//               const matchingItem = data2.find(
//                 (item2) => item2.Zid === item1.FinancialInstrumentID
//               );


//               return {
//                 name2: matchingItem ? matchingItem.Name : null,
//                 Name: matchingItem ? matchingItem.Name : null,
//                 symbol: matchingItem ? matchingItem.Tradingsymbol : null,
//                 value: item1.AveragePrice,
//                 press: 'Allgraphs',
//                 LastPrice: item1.AveragePrice,
//                 sname: matchingItem ? matchingItem.Name : null,
//                 instrumentId: matchingItem ? matchingItem.Zid : null,
//                 instrumentType: matchingItem ? matchingItem.Segment : null,
//                 Price: matchingItem ? matchingItem.Name : null,
//                 priceVal: item1.AveragePrice,
//                 Quantities: item1.Quantity,
//                 logo: 'https://assets.coingecko.com/coins/images/10365/large/assets/bitcoinsvgrepocom-1.svg',
//                 Open: "open",
//                 openValue: 10000,
//                 Close: "Close",
//                 closeValue: 50,
//                 High: "High",
//                 Hvalue: 1500000,
//                 Low: "Low",
//                 Lvalue: 25,
//                 Dval: "Daily Vol",
//                 Value: "140.03B",
//                 Market: "Market",
//                 value1: "200.3B",
//                 volBtc: "vol BTC",
//                 value2: "10,000",
//                 volUsdt: "vol USDT",
//                 value3: "10,000",



//               };
//             });
//             console.log("Merged Array for NSE:", mergedArray);
//             setNseData(mergedArray);
//             console.log("Final Array", mergedArray);

//           })
//           .catch((error) => console.log("Error in the second API call:", error));
//       })
//       .catch((error) => console.log("Error in the first API call:", error));
//   }, [])

//   const cardData = {
//     Crypto: [
//       {
//         name2: "BNB",
//         name3: "BTC",
//         value: "$212.4",
//         decimalValue: ".60",
//         changePercentage: "+7.90%",
//         logo: "https://assets.coingecko.com/coins/images/10365/large/assets/bitcoinsvgrepocom-1.svg",
//       },
//       {
//         name2: 'ETC',
//         name3: 'BTC',
//         value: '$27,618',
//         decimalValue: '.60',
//         changePercentage: '-7.90%',
//         logo: 'https://assets.coingecko.com/coins/images/10365/large/assets/bitcoinsvgrepocom-1.svg',
//         symbol: 'ETC',
//         press: 'Allgraphs',
//         Name: "Etc",
//         Price: "ETC Price",
//         priceVal: "30,000000",
//         pricePer: "-10.35",
//         Open: "open",
//         openValue: 1000000,
//         Close: "Close",
//         closeValue: 50,
//         High: "High",
//         Hvalue: 1500000,
//         Low: "Low",
//         Lvalue: 25,
//         Dval: "Daily Vol",
//         Value: "140.03B",
//         Market: "Market",
//         value1: "200.3B",
//         volBtc: "vol BTC",
//         value2: "10,000000000",
//         volUsdt: "vol USDT",
//         value3: "10,000",
//       },

//     ],

//     NSE: nseData,

//     BSE: [
//       {
//         name2: 'ACC',
//         name3: 'BTC',
//         value: '$30,618',
//         decimalValue: '.60',
//         changePercentage: '-7.90%',
//         logo: 'https://assets.coingecko.com/coins/images/10365/large/assets/bitcoinsvgrepocom-1.svg',
//       },

//     ],
//     Commodity: [
//       {
//         name2: "BNB",
//         name3: "BTC",
//         value: "$212.4",
//         decimalValue: ".60",
//         changePercentage: "+7.90%",
//         logo: "https://assets.coingecko.com/coins/images/10365/large/assets/bitcoinsvgrepocom-1.svg",
//       },
//     ],
//   };




//   const calculateTotalValue = (cardType) => {
//     if (cardType === "NSE" && nseData) {
//       let totalValue = 0;

//       nseData.forEach((item) => {
//         if (item.LastPrice && typeof item.LastPrice === 'number') {
//           totalValue += item.LastPrice;
//         }
//       });

//       return `$${totalValue.toFixed(2)}`;
//     }
//     return "$0.00";
//   };

//   const calculateChangePercentage = (cardType) => {
//     const cardTypeData = cardData[cardType];
//     if (cardTypeData) {
//       let totalChange = 0;
//       cardTypeData.forEach((item) => {
//         // Ensure 'changePercentage' property is present and has a valid format
//         if (item.changePercentage && typeof item.changePercentage === 'string') {
//           totalChange += parseFloat(item.changePercentage.replace("+", "").replace("%", ""));
//         }
//       });
//       return totalChange > 0
//         ? `+${totalChange.toFixed(2)}%`
//         : `${totalChange.toFixed(2)}%`;
//     }
//     return "+0.00%";
//   };

//   useEffect(() => {
//     const cardTypes = Object.keys(cardData);
//     cardTypes.forEach((cardType) => {
//       const totalValue = calculateTotalValue(cardType);
//       const totalChangePercentage = calculateChangePercentage(cardType);
//       updateTotalValue(cardType, totalValue);
//       updateChangePercentage(cardType, totalChangePercentage);
//     });
//   }, []);


//   return (
//     <View style={styles.container}>
//       <View style={styles.portfolio}>
//         {/* <Text style={styles.portfolioText}>{selectedCard} Portfolio</Text> */}
//         {/* <Text style={styles.totalValue}>{calculateTotalValue(selectedCard)}</Text> */}
//         {/* {selectedCard === "NSE" ? calculateTotalValue(selectedCard) : ""} */}
//       </View>
//       {cardData[selectedCard] ? (
//         cardData[selectedCard].map((data, index) => (
//           <AssetCard data={data} key={index}
//             onPress={() => navigation.navigate('Allgraphs', {
//               symbol: data.symbol,
//               Open: data.Open,
//               Name: data.Name,
//               Price: data.Price,
//               priceVal: data.priceVal,
//               pricePer: data.pricePer,
//               openValue: data.openValue,
//               Close: data.Close,
//               closeValue: data.closeValue,
//               High: data.High,
//               Hvalue: data.Hvalue,
//               Low: data.Low,
//               Lvalue: data.Lvalue,
//               Name: data.Name,
//               Dval: data.Dval,
//               Value: data.Value,
//               Market: data.Market,
//               value1: data.value1,
//               volBtc: data.volBtc,
//               value2: data.value2,
//               volUsdt: data.volUsdt,
//               value3: data.value3,
//               Price: data.Price,
//               priceVal: data.priceVal,
//               LastPrice: data.LastPrice,
//               sname: data.sname,
//               Quantities: data.Quantities,
//               instrumentType: data.instrumentType,
//               instrumentId: data.instrumentId,
//               quantity: data.quantity,

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















// // ViewPortfolio.js wo integrate
// import React, { useEffect } from 'react';
// import { View, Text, StyleSheet } from 'react-native';
// import AssetCard from './AssetCard';

// const ViewPortfolio = ({ selectedCard, updateTotalValue, updateChangePercentage }) => {


//   const cardData = {
//     Crypto: [
//       {
//         name2: 'BNB', name3: 'BTC', value: '$212.4', decimalValue: '.60', changePercentage: '+7.90%', logo: 'https://assets.coingecko.com/coins/images/10365/large/assets/bitcoinsvgrepocom-1.svg',
//       },
//       {
//         name2: 'ETC',
//         name3: 'BTC',
//         value: '$27,618',
//         decimalValue: '.60',
//         changePercentage: '-7.90%',
//         logo: 'https://assets.coingecko.com/coins/images/10365/large/assets/bitcoinsvgrepocom-1.svg',
//       },
//       {
//         name2: 'ETH',
//         name3: 'BTC',
//         value: '$100,633',
//         decimalValue: '.60',
//         changePercentage: '-17.90%',
//         logo: 'https://assets.coingecko.com/coins/images/10365/large/assets/bitcoinsvgrepocom-1.svg',
//       },

//       {
//         name2: 'XRP',
//         name3: 'BTC',
//         value: '$0.522',
//         decimalValue: '.60',
//         changePercentage: '-7.90%',
//         logo: 'https://assets.coingecko.com/coins/images/10365/large/assets/bitcoinsvgrepocom-1.svg',
//       },
//       {
//         name2: 'SOL',
//         name3: 'BTC',
//         value: '$23.3',
//         decimalValue: '.60',
//         changePercentage: '-7.90%',
//         logo: 'https://assets.coingecko.com/coins/images/10365/large/assets/bitcoinsvgrepocom-1.svg',
//       },
//       {
//         name2: 'AVAX',
//         name3: 'BTC',
//         value: '$1000.6',
//         decimalValue: '.60',
//         changePercentage: '+7.90%',
//         logo: 'https://assets.coingecko.com/coins/images/10365/large/assets/bitcoinsvgrepocom-1.svg',
//       },
//       {
//         name2: 'JUV',
//         name3: 'BTC',
//         value: '$1.11',
//         decimalValue: '.60',
//         changePercentage: '+7.90%',
//         logo: 'https://assets.coingecko.com/coins/images/10365/large/assets/bitcoinsvgrepocom-1.svg',
//       },

//     ],
//     NSE: [
//       {
//         name2: 'FORCE',
//         name3: 'BTC',
//         value: '$30,618',
//         decimalValue: '.60',
//         changePercentage: '-7.90%',
//         logo: 'https://assets.coingecko.com/coins/images/10365/large/assets/bitcoinsvgrepocom-1.svg',
//       },
//       {
//         name2: 'HONDA', name3: 'BTC', value: '$212.4', decimalValue: '.60', changePercentage: '+7.90%', logo: 'https://assets.coingecko.com/coins/images/10365/large/assets/bitcoinsvgrepocom-1.svg',
//       },
//       {
//         name2: 'TATA', name3: 'BTC', value: '$212.4', decimalValue: '.60', changePercentage: '+7.90%', logo: 'https://assets.coingecko.com/coins/images/10365/large/assets/bitcoinsvgrepocom-1.svg',
//       },
//       {
//         name2: 'APPLE', name3: 'BTC', value: '$212.4', decimalValue: '.60', changePercentage: '+7.90%', logo: 'https://assets.coingecko.com/coins/images/10365/large/assets/bitcoinsvgrepocom-1.svg',
//       },
//       {
//         name2: 'TESLA', name3: 'BTC', value: '$212.4', decimalValue: '.60', changePercentage: '+7.90%', logo: 'https://assets.coingecko.com/coins/images/10365/large/assets/bitcoinsvgrepocom-1.svg',
//       },
//       {
//         name2: 'JIO', name3: 'BTC', value: '$212.4', decimalValue: '.60', changePercentage: '+7.90%', logo: 'https://assets.coingecko.com/coins/images/10365/large/assets/bitcoinsvgrepocom-1.svg',
//       },

//     ],
//     BSE: [
//       {
//         name2: 'ACC',
//         name3: 'BTC',
//         value: '$30,618',
//         decimalValue: '.60',
//         changePercentage: '-7.90%',
//         logo: 'https://assets.coingecko.com/coins/images/10365/large/assets/bitcoinsvgrepocom-1.svg',
//       },
//       {
//         name2: 'ADANI', name3: 'BTC', value: '$212.4', decimalValue: '.60', changePercentage: '+7.90%', logo: 'https://assets.coingecko.com/coins/images/10365/large/assets/bitcoinsvgrepocom-1.svg',
//       },
//       {
//         name2: 'ADITYA', name3: 'BTC', value: '$212.4', decimalValue: '.60', changePercentage: '+7.90%', logo: 'https://assets.coingecko.com/coins/images/10365/large/assets/bitcoinsvgrepocom-1.svg',
//       },
//       {
//         name2: 'ALKEM', name3: 'BTC', value: '$212.4', decimalValue: '.60', changePercentage: '+7.90%', logo: 'https://assets.coingecko.com/coins/images/10365/large/assets/bitcoinsvgrepocom-1.svg',
//       },
//       {
//         name2: 'ATUL', name3: 'BTC', value: '$212.4', decimalValue: '.60', changePercentage: '+7.90%', logo: 'https://assets.coingecko.com/coins/images/10365/large/assets/bitcoinsvgrepocom-1.svg',
//       },
//       {
//         name2: 'ASTRAL', name3: 'BTC', value: '$212.4', decimalValue: '.60', changePercentage: '+7.90%', logo: 'https://assets.coingecko.com/coins/images/10365/large/assets/bitcoinsvgrepocom-1.svg',
//       },
//     ],
//     Commodity: [

//       {
//         name2: 'BNB', name3: 'BTC', value: '$212.4', decimalValue: '.60', changePercentage: '+7.90%', logo: 'https://assets.coingecko.com/coins/images/10365/large/assets/bitcoinsvgrepocom-1.svg',
//       },
//       {
//         name2: 'BNB', name3: 'BTC', value: '$212.4', decimalValue: '.60', changePercentage: '+7.90%', logo: 'https://assets.coingecko.com/coins/images/10365/large/assets/bitcoinsvgrepocom-1.svg',
//       },
//       {
//         name2: 'BNB', name3: 'BTC', value: '$212.4', decimalValue: '.60', changePercentage: '+7.90%', logo: 'https://assets.coingecko.com/coins/images/10365/large/assets/bitcoinsvgrepocom-1.svg',
//       },
//       {
//         name2: 'BNB', name3: 'BTC', value: '$20000', decimalValue: '.60', changePercentage: '+7.90%', logo: 'https://assets.coingecko.com/coins/images/10365/large/assets/bitcoinsvgrepocom-1.svg',
//       },

//     ],
//   };

//   const calculateTotalValue = (cardType) => {
//     const cardTypeData = cardData[cardType];
//     if (cardTypeData) {
//       let totalValue = 0;
//       cardTypeData.forEach((item) => {
//         totalValue += parseFloat(item.value.replace('$', '').replace(/,/g, ''));
//       });
//       return `$${totalValue.toFixed(2)}`;
//     }
//     return '$0.00';
//   };


//   const calculateChangePercentage = (cardType) => {
//     const cardTypeData = cardData[cardType];
//     if (cardTypeData) {
//       let totalChange = 0;
//       cardTypeData.forEach((item) => {
//         totalChange += parseFloat(item.changePercentage.replace('+', '').replace('%', ''));
//       });
//       return totalChange > 0 ? `+${totalChange.toFixed(2)}%` : `${totalChange.toFixed(2)}%`;
//     }
//     return '+0.00%';
//   };

//   useEffect(() => {
//     const cardTypes = Object.keys(cardData);
//     cardTypes.forEach(cardType => {
//       const totalValue = calculateTotalValue(cardType);
//       const totalChangePercentage = calculateChangePercentage(cardType);
//       updateTotalValue(cardType, totalValue);
//       updateChangePercentage(cardType, totalChangePercentage);
//     });
//   }, []);


//   return (
//     <View style={styles.container}>
//       <View style={styles.portfolio}>

//         {/* //todisplay total value and name  */}
//         {/* <Text style={styles.portfolioText}>{selectedCard} Portfolio</Text> */}
//         {/* <Text style={styles.totalValue}>{calculateTotalValue(selectedCard)}</Text> */}
//       </View>
//       {cardData[selectedCard] ? (
//         cardData[selectedCard].map((data, index) => (
//           <AssetCard data={data} key={index} />
//         ))
//       ) : (
//         <Text style={styles.cardDataText}>No data available for {selectedCard}</Text>
//       )}
//     </View>
//   );
// };



// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     alignItems: 'center',
//     justifyContent: 'center',
//     backgroundColor: 'FFFFFF',
//   },
//   portfolio: {
//     alignItems: 'center',
//     justifyContent: 'center',
//   },
//   portfolioText: {
//     fontSize: 16,
//     fontWeight: '600',
//     lineHeight: 17.71,
//   },
//   totalValue: {
//     fontSize: 14,
//     fontWeight: '600',
//     lineHeight: 19.09,
//     color: 'rgba(28, 30, 50, 1)',
//   },
//   cardDataText: {
//     fontSize: 16,
//     fontWeight: '600',
//     lineHeight: 17.71,
//   },
// });

// export default ViewPortfolio;


