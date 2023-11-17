import React, { useState, useEffect, useRef, useContext } from 'react';
import { View, ScrollView } from 'react-native';
import { StyleSheet, SafeAreaView } from 'react-native';
import AssetDataContext from './AssetDataContext';
import Header from './Header';
import MyPortfolio from './MyPortfolio';
import Deposit from './Deposite';
import MyWatchList from './MyWatchList';
import CardItems from './CardItems';
import CriptoAssets from './CriptoAssets';
import ViewPortfolio from './ViewPortfolio';
import { useSelector } from 'react-redux';



const Dashboard = () => {

  const { token } = useSelector(state => state.auth)
  console.log("Dashboard", token)
  const [cardData, setCardData] = useState([

    { name: 'Crypto', value: '', changePercentage: '', color: '', logo: 'https://assets.coingecko.com/coins/images/10365/large/ethereum.png?1606373430', backgroundColor: "#C1C2EB" },
    { name: 'NSE', value: '', changePercentage: '', color: '', logo: 'https://assets.coingecko.com/coins/images/10365/large/ethereum.png?1606373430', backgroundColor: '#B7DDD2' },
    { name: 'BSE', value: '', changePercentage: '', color: '', logo: 'https://assets.coingecko.com/coins/images/10365/large/ethereum.png?1606373430', backgroundColor: "#C1C2EB" },
    { name: 'Commodity', value: '', changePercentage: '', color: '', logo: 'https://assets.coingecko.com/coins/images/10365/large/ethereum.png?1606373430', backgroundColor: '#B7DDD2' }
  ]);

  const { assetData, setAssetData } = useContext(AssetDataContext);
  const [watchlist, setWatchlist] = useState([]);
  const [selectedCard, setSelectedCard] = useState('Crypto');

  const [totalValues, setTotalValues] = useState({});

  const updateTotalValue = (category, totalValue) => {
    setTotalValues((prevTotalValues) => ({
      ...prevTotalValues,
      [category]: totalValue,
    }));
  };

  const updateChangePercentage = (category, changePercentage) => {
    setCardData((prevCardData) => {
      return prevCardData.map((item) => {
        if (item.name === category) {

          return { ...item, changePercentage };
        }
        return item;
      });
    });
  };

  useEffect(() => {
    var myHeaders = new Headers();
    myHeaders.append("Authorization", `Bearer ${token}`);

    var requestOptions = {
      method: 'POST', //get
      headers: myHeaders,
      redirect: 'follow'
    };

    fetch("http://35.154.235.224:9000/api/user/getZtokens", requestOptions)
      .then(response => response.json())
      .then(result => {
        const transformedData = result.map(item => ({
          name2: item.Name,
          value: `$${item.LastPrice.toFixed(2)}`,
          name3: item.Exchange,

          //todisplay graph

          press: 'Allgraphs',
          Name: item.Name,

          Open: "open",
          openValue: 1,
          Close: "Close",
          closeValue: 50,
          High: "High",
          symbol: item.Tradingsymbol,
          Hvalue: 150,
          Low: "Low",
          Lvalue: 25,
          Dval: "Daily Vol",
          Value: "140.03B",
          Market: "Market",
          value1: "200.03B",
          volBtc: "vol BTC",
          value2: "10,000",
          volUsdt: "vol USDT",
          value3: "10,000",

          priceVal: item.LastPrice,

          sname: item.Name,
          instrumentId: item.Zid,
          instrumentType: item.Segment,
          //quantity: "1",
          LastPrice: item.LastPrice,



          //addtowatchlist 
          InstrumentId: item.Zid,
          InstrumentType: item.Segment,

          // logo: 'https://assets.coingecko.com/coins/images/10365/large/assets/bitcoinsvgrepocom-1.svg', 
        }));
        setAssetData(transformedData);
      })
      .catch(error => console.log('this error', error));



  }, []);

  //for scroll bottom minus icon 

  const scrollViewRef = useRef(null);

  const scrollToBottom = () => {
    scrollViewRef.current.scrollToEnd({ animated: true });
  };


  return (
    <SafeAreaView style={{ flex: 1 }}>
      <ScrollView ref={scrollViewRef} style={styles.root} stickyHeaderIndices={[0]}>
        <Header assetData={assetData} />
        <MyPortfolio />
        <Deposit />
        <MyWatchList />
        <View style={styles.container5}>
          {cardData.map((item, index) => {
            const totalValue = totalValues[item.name] || '';


            console.log(`Item Name: ${item.name}, Total Value: ${totalValue}`);

            return (
              <CardItems
                key={index}
                name={item.name}
                symbl={item.symbl}
                value={totalValue}
                changePercentage={item.changePercentage}
                color={item.backgroundColor}
                onClick={() => setSelectedCard(item.name)}

                selectedCard={selectedCard}//tostyle selected card 
              />
            );
          })}
        </View>
        <CriptoAssets
          onScrollToBottom={scrollToBottom}
          data={watchlist}
          //assetData={assetData}
          selectedCard={selectedCard}//tofetchcardname 
        >
          <ViewPortfolio
            assetData={assetData}
            selectedCard={selectedCard}
            updateTotalValue={updateTotalValue}
            updateChangePercentage={updateChangePercentage}
          />
        </CriptoAssets>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({


  root: {
    backgroundColor: '#FFFFFF',
    flex: 1
  },

  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    padding: 10,
    marginTop: 10,
  },
  nav: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderBottomWidth: 1,
    borderColor: '#ccc',
    paddingVertical: 10,
  },
  leftContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  logo: {
    width: 30,
    height: 30,
    marginRight: 10,
  },
  welcomeText: {
    // fontSize: 14,figma font size its look small 
    fontSize: 18,
    fontWeight: 700,
    lineHeight: 21,
    fontFamily: 'SFProDisplay',
    color: '#1C1E32',
  },
  userName: {
    fontSize: 18,

    fontWeight: 600,
    lineHeight: 21,
    fontFamily: 'SFProDisplay',
    color: '#1C1E32',

  },
  rightImageContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  rightImage: {
    width: 30,
    height: 30,
    marginLeft: 10,
  },
  searchBox: {
    fontSize: 16,
    marginTop: 16,
    paddingHorizontal: 16,
    paddingVertical: 10,
    height: 40,
    borderWidth: 1,
    borderColor: '#C1C2EB',
    borderRadius: 8,
    marginHorizontal: 16,
    backgroundColor: '#E3E9F0',
  },



  //second container current portfolio
  container2: {

    padding: 10,
    alignItems: 'start',
    backgroundColor: '#FFFFFF',
  },
  valueText: {
    fontWeight: 500,
    fontSize: 16,
    lineHeight: 19.09,
    color: '#A1A1A1',
    fontFamily: 'SFProDisplay',
  },
  portfolioContainer: {
    flexDirection: 'column',
  },
  valueAmount: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  amountText: {
    fontWeight: 700,
    fontSize: 32,
    lineHeight: 38.19,
    color: '#1C1E32',
    fontFamily: 'SFProDisplay',
  },
  decimalText: {
    fontWeight: 700,
    fontSize: 32,
    lineHeight: 38.19,
    color: '#A1A1A1',
    fontFamily: 'SFProDisplay',
  },
  greenBox: {
    marginLeft: 10,
    backgroundColor: '#EAC9B1',
    width: 60,
    height: 30,
    borderRadius: 100,
    justifyContent: 'center',
    alignItems: 'center',
  },
  percentText: {
    fontWeight: 500,
    fontSize: 10,
    lineHeight: 11.93,
    color: '#1C1E32',
    fontFamily: 'SFProDisplay',

  },



  /// Deposite and withdraw



  container3: {
    padding: 10,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    //backgroundColor: '#1C1E32',
    //marginLeft:-15,
    //marginLeft: 0,
    backgroundColor: '#FFFFFF',
  },
  ellipse: {
    // width: 166,
    // height: 48,
    width: 170,
    height: 50,
    borderRadius: 100,
    backgroundColor: '#ECECEC',
    justifyContent: 'center',
    alignItems: 'center',
  },
  circle: {
    // width: 40,
    // height: 40,
    width: 45,
    height: 45,
    borderRadius: 100,
    backgroundColor: '#B1A4FF',
    position: 'absolute',
    left: 0,
    //marginLeft: 5,
    justifyContent: 'center',
    alignItems: 'center',
  },
  spacing: {
    width: 50,
  },
  text: {
    marginLeft: 16,
  },
  withdrawText: {
    marginRight: -10,
    lineHeight: 19.09,
    fontSize: 20,
    textAlign: 'center',
    fontWeight: 500,
    color: '#1C1E32',
  },
  withdrawText2: {
    marginRight: -10,
    lineHeight: 19.09,
    fontSize: 20,
    fontWeight: 500,
    color: '#1C1E32',
  },


  //container 4 Crypto list


  container4: {
    padding: 15,
    //borderRadius:20,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    //padding: 13,
    backgroundColor: '#FFFFFF',
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  buttonsContainer: {
    flexDirection: 'row',
  },
  button: {
    marginLeft: 8,
    paddingVertical: 4,
    paddingHorizontal: 8,
    backgroundColor: '#1C1E32',
    borderRadius: 10,
    backgroundColor: 'black',
    // borderRadius: 4,
  },
  buttonText: {
    // fontSize: 14,
    // // color: 'black',
    // color:'white',
    // fontSize: 10,
    fontSize: 12,
    color: '#FFFFFF',
    fontWeight: 900,
    lineHeight: 11.93,
    textAlign: 'center',
  },

  modalCloseButton: {
    marginTop: 16,
    padding: 8,
    backgroundColor: '#ECECEC',
    borderRadius: 4,
  },
  modalCloseButtonText: {
    fontSize: 14,
    color: 'black',
    backgroundColor: '#ECECEC',
    borderRadius: 4,
  },



  //4 gird items
  container5: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderRadius: 10,
    marginLeft: 2,
    backgroundColor: '#FFFFFF',


    //padding: 0,
  },


  gridContainer: {

    alignItems: 'center',
    marginTop: 8,
    flex: 1,


  },

  firstLine: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  secondLine: {
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 10,
  },
  logo2: {
    width: 20,
    height: 20,
    marginBottom: 8,
  },
  gridText: {
    fontSize: 16,
    fontWeight: '600',
    lineHeight: 17.71,

    //fontFamily: 'SFProDisplay',
  },
  gridSubText: {
    fontSize: 15,
    color: 'rgba(28, 30, 50, 0.6)',
    fontWeight: 'bold',
    // marginLeft: 3,
    left: 2,
  },
  value2: {
    fontSize: 14,
    fontWeight: '700',
    lineHeight: 19.09,
    color: 'rgba(28, 30, 50, 1)',
  },
  button2: {
    backgroundColor: 'rgba(28, 30, 50, 0.2)',
    borderRadius: 10,
    padding: 3,
    marginTop: 10,

  },
  buttonValue: {
    fontFamily: 'SFProDisplay',
    fontWeight: 800,
    fontSize: 12,
    lineHeight: 13.55,
    color: 'rgba(28, 30, 50, 1)',

  },


  //AssetContainer


  containerAssets: {
    marginTop: 15,
    padding: 7,
    flexDirection: 'column',
    backgroundColor: 'rgba(227, 233, 240, 1)',
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
  },
  headerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    //marginBottom: 10,
    padding: 7,
  },
  imageContainer: {
    alignItems: 'center',
  },
  logo: {
    marginTop: -7,
    backgroundColor: '#FFFFFF',
    borderRadius: 10,
    height: 20,
    width: 70,
    justifyContent: 'center',
    alignItems: 'center',
    borderBottomLeftRadius: 40,
    borderBottomRightRadius: 40,

  },
  minusIcon: {
    marginTop: -15,
  },
  button: {
    marginLeft: 8,
    paddingVertical: 4,
    paddingHorizontal: 8,
    backgroundColor: '#1C1E32',
    borderRadius: 10,
  },
  buttonText: {
    fontSize: 12,
    color: '#FFFFFF',
    fontWeight: 600,
    lineHeight: 11.93,
    textAlign: 'center',
  },
  assetText: {
    fontSize: 18,
    fontWeight: 700,
    lineHeight: 19.93,
    fontFamily: 'SFProDisplay',
    color: 'rgba(28, 30, 50, 1)',
  },




  // asset items 
  containerAssetItem: {


    flexDirection: 'row',

    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 12,
    borderBottomWidth: 1,
    backgroundColor: "rgba(255, 255, 255, 0.8)",
    // backgroundColor:'black',
    borderBottomColor: '#E5E5E5',
    marginTop: 10,
    borderRadius: 10,
    height: 60,
  },
  leftContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  logo: {
    width: 25,
    height: 25,
    marginRight: 8,
    backgroundColor: "rgba(227, 233, 240, 1)",
    borderRadius: 15,

  },
  Text: {
    fontSize: 16,
    fontWeight: '700',
    lineHeight: 19.09,
    color: 'rgba(28, 30, 50, 1)',
  },
  span: {
    fontSize: 16,
    fontWeight: '700',
    lineHeight: 19.09,
    color: 'rgba(28, 30, 50, 0.6)',
    left: 2,
  },
  rightContent: {
    //alignItems: 'flex-end',
    flexDirection: 'row',
    alignItems: 'flex-end',
    justifyContent: 'flex-end', // Align items to the right
    flex: 1, // Allow right content to take up available space
  },


  value: {
    fontSize: 16,
    fontWeight: 'bold',
    // marginBottom: 4,
    marginRight: 3,
    color: '#1C1E32',
    lineHeight: 22,
  },
  decimal: {
    fontSize: 16,
    marginRight: 3,
    color: '#A1A1A1',
    fontWeight: 'bold',
    lineHeight: 22,
  },


  button: {

    width: 43,
    height: 19.2,
    borderRadius: 100,
    backgroundColor: '#EAC9B1',
  },
  changePercentage: {
    // fontSize: 14,
    // fontWeight: 'bold',
    // color: 'black',


    fontWeight: 500,
    fontSize: 10,
    lineHeight: 17.55,
    alignItems: 'center',
    left: 4,

  },
});







export default Dashboard;
