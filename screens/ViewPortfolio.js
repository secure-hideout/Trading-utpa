


//before web socket
import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, TextInput } from "react-native";
import AssetCard from "./AssetCard";
import { useSelector } from "react-redux";
import { useNavigation } from "@react-navigation/native";
import LottieView from "lottie-react-native";
import * as Animatable from "react-native-animatable";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import { TouchableOpacity } from "react-native-gesture-handler";
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
  updateOverallChangePercentage,
}) => {
  const { token } = useSelector((state) => state.auth);
  const navigation = useNavigation();
  const [nseData, setNseData] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  const fetchData1 = async () => {
    try {
      const response1 = await fetchData(
        "http://35.154.235.224:9000/api/user/getPortfolio",
        {
          method: "GET",
          headers: new Headers({ Authorization: "Bearer " + token }),
          redirect: "follow",
        }
      );

      const response2 = await fetchData(
        "http://35.154.235.224:9000/api/user/getZtokens",
        {
          method: "POST",
          headers: new Headers({ Authorization: "Bearer " + token }),
          body: "",
          redirect: "follow",
        }
      );

      const mergedArray = response1.map((item1) => {
        const matchingItem = response2.find(
          (item2) => item2.Zid === item1.FinancialInstrumentID
        );

        return {
          name2: matchingItem ? matchingItem.Name : null,
          name3: matchingItem ? matchingItem.Segment : null,

          decimalValue: item1.Quantity, //display quantity

          Name: matchingItem ? matchingItem.Name : null,
          symbol: matchingItem ? matchingItem.Tradingsymbol : null,
          value: item1.AveragePrice,
          press: "Allgraphs",
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
  useEffect(() => {
    setSearchTerm("");

    fetchData1();
  }, []);

  //to display inside the card value
  const calculateTotalValue = (cardTypeData) => {
    let totalValue = 0;
    cardTypeData.forEach((item) => {
      if (item.decimalValue && item.LastPrice) {
        totalValue += item.decimalValue * item.LastPrice;
      }
    });
    return `$${totalValue.toFixed(2)}`;
  };

  const calculateChangePercentage = (cardTypeData) => {
    let totalChange = 0;
    cardTypeData.forEach((item) => {
      if (item.changePercentage && typeof item.changePercentage === "string") {
        totalChange += parseFloat(item.changePercentage.replace("%", ""));
      }
    });

    // Check if the total change is exactly 0
    if (totalChange === 0) {
      return "0.00%";
    }

    return totalChange >= 0
      ? `+${totalChange.toFixed(2)}%`
      : `${totalChange.toFixed(2)}%`;
  };

  useEffect(() => {
    let overallChange = 0;
    const cardTypes = Object.keys(cardData);

    cardTypes.forEach((cardType) => {
      const totalValue = calculateTotalValue(cardData[cardType]);
      const totalChangePercentage = calculateChangePercentage(
        cardData[cardType]
      );
      updateTotalValue(cardType, totalValue);
      updateChangePercentage(cardType, totalChangePercentage);
      overallChange += parseFloat(totalChangePercentage);
    });

    const overallChangePercentage = overallChange / cardTypes.length;
    updateOverallChangePercentage(
      overallChangePercentage >= 0
        ? `+${overallChangePercentage.toFixed(2)}%`
        : `${overallChangePercentage.toFixed(2)}%`
    );
  }, [token, nseData]);

  //to pass header total value and the percentage
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
    NASDAQ: [],
    Commodity: [],
  };

  const filteredData = searchTerm
    ? cardData[selectedCard].filter(
        (item) =>
          item.Name &&
          item.Name.toLowerCase().includes(searchTerm.toLowerCase())
      )
    : cardData[selectedCard];

  // const getSearchBarStyle = () => ({
  //   //...styles.searchBar,
  //   borderColor: selectedCardColor,
  // });

  return (
    <View style={styles.container}>
      {cardData[selectedCard] && cardData[selectedCard].length > 0 && (
        <View style={styles.search}>
          <View style={styles.searchBar}>
            <TextInput
              placeholder="Search..."
              value={searchTerm}
              onChangeText={(text) => setSearchTerm(text)}
             // style={getSearchBarStyle()}
            />
          </View>
          <View>
            <TouchableOpacity
              style={styles.icon1}
              onPress={() => {
                fetchData1();
              }}
            >
              <MaterialIcons style={styles.icon2} name="refresh" size={30} />
            </TouchableOpacity>
          </View>
        </View>
      )}

      <View
        style={[styles.headerContainer, { backgroundColor: selectedCardColor }]}
      >
        <View style={styles.nameContainer}>
          <Text style={styles.headerText}>Name</Text>
        </View>

        <View style={styles.quantityContainer}>
          <Text style={styles.headerText}>Quantity</Text>
        </View>
        <View style={styles.valueContainer1}>
          <Text style={styles.headerText}>Price</Text>
        </View>
        <View style={styles.valueContainer}>
          <Text style={styles.headerText}>Value</Text>
        </View>
      </View>

      {filteredData.length > 0 ? (
        filteredData.map((data, index) => (
          <AssetCard
            data={data}
            key={index}
            onPress={() =>
              navigation.navigate("Allgraphs", {
                instrumentType: data?.instrumentType,
                instrumentId: data?.instrumentId,
              })
            }
          />
        ))
      ) : (
        <View style={styles.noDataContainer}>
          <LottieView
            source={require("../assets/animations/Animation.json")}
            autoPlay
            loop
            style={styles.animation}
            onAnimationFinish={() => console.log("Animation finished")}
          />
          <Animatable.Text
            key={selectedCard}
            animation="zoomIn"
            style={styles.cardDataText}
          >
            {/* Make Your First Investment {selectedCard} */}
            Make Your First Investment
          </Animatable.Text>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // alignItems: "center",
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
    justifyContent: "center",
    alignItems: "center",
  },
  animation: {
    width: 400,
    height: 300,
  },
  cardDataText: {
    color: "red",
    fontSize: 17,
    fontWeight: "700",
    marginTop: 8,
  },

  nameContainer: {
    flexDirection: "row",
    flex: 1.7,
    alignItems: "center",
  },
  headerContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    padding: 12,
    borderBottomWidth: 1,
    // backgroundColor: '#C1C2EB',
    borderBottomColor: "#E5E5E5",
    marginTop: 10,
    borderRadius: 10,
  },

  headerText: {
    fontSize: 16,
    fontWeight: "600",
    lineHeight: 17.71,
  },
  quantityContainer: {
    flex: 2,
  },
  valueContainer1: {
    flex: 2.3,
  },
  valueContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  // searchBar: {
  //   height: 40,
  //   borderWidth: 3,
  //   borderRadius: 5,
  //   margin: 10,
  //   paddingLeft: 10,
  // },
  icon: {
    //display: 'flex',
    justifyContent: "flex-end",
  },
  icon1: {
    justifyContent: "flex-end",
  },
  icon2: {
    justifyContent: "flex-end",
  },
  search: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%", // Set width to 100%
    paddingHorizontal: 16, // Add some padding for better spacing
    alignItems: "center", // Align items vertically in the center
  },
  searchBar: {
    flex: 1,
    height: 40,
    borderWidth: 3,
    borderRadius: 5,
    paddingLeft: 10,
    borderColor:"#ade0d1"
  },
  icon1: {
    marginLeft: 10, // Add some margin to separate the icon from the TextInput
  },
});

export default ViewPortfolio;
