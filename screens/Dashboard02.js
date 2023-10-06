

import React, { useState, useEffect, useRef, useContext } from 'react';
import { View, Text, Image, TouchableOpacity, TextInput, Modal, Button, ScrollView } from 'react-native';
import { StyleSheet, SafeAreaView } from 'react-native';
//import React, { useContext } from 'react';

import AssetDataContext from './AssetDataContext';
import Header from './Header';
import MyPortfolio from './MyPortfolio';
import Deposit from './Deposite';
import MyWatchList from './MyWatchList';
import CardItems from './CardItems';
import CriptoAssets from './CriptoAssets';
//import  BottomTabBar  from './BottomTabBar';
//import SearchBarList from './SearchBarList';

//import AssetListDetails from './AssetListDetails';
import ViewPortfolio from './ViewPortfolio';



const Dashboard = () => {
  const { assetData, setAssetData } = useContext(AssetDataContext);
  const [watchlist, setWatchlist] = useState([]);
  // const [selectedCard, setSelectedCard] = useState('crypto');
  const [selectedAsset, setSelectedAsset] = useState(null);
  const [selectedCard, setSelectedCard] = useState('Crypto');


  // const handleCardItemClick = (cardName) => {
  //   setSelectedCard(cardName);
  // };


  // const addToWatchlist = (item) => {
  //   if (!watchlist.some((watchlistItem) => watchlistItem.name2 === item.name2)) {
  //     setWatchlist((prevWatchlist) => [...prevWatchlist, item]);
  //   }
  // };
  
  const cardData = [
    { name: 'Crypto', value: '$23,500', changePercentage: '+5.9%', logo: 'https://assets.coingecko.com/coins/images/10365/large/ethereum.png?1606373430', backgroundColor: "#C1C2EB" },
    { name: 'NSE', value: '$23,500', changePercentage: '+5.9%', logo: 'https://assets.coingecko.com/coins/images/10365/large/ethereum.png?1606373430', backgroundColor: '#B7DDD2'},
    { name: 'BSE', value: '$23,500', changePercentage: '+5.9%', logo: 'https://assets.coingecko.com/coins/images/10365/large/ethereum.png?1606373430', backgroundColor: "#C1C2EB" },
    { name: 'Comodity', value: '$23', changePercentage: '+5.9%', logo: 'https://assets.coingecko.com/coins/images/10365/large/ethereum.png?1606373430',backgroundColor: '#B7DDD2' }
  ];
  useEffect(() => {
    setSelectedAsset(cardData[0]); // Set the default to the "Crypto" card
  }, []);


  useEffect(() => {
    
    setAssetData([
    {name2:'Crpto',name3:"BTC", value:"$30,618", decimalValue:".60", changePercentage:"-7.90%",logo:'https://assets.coingecko.com/coins/images/10365/large/assets/bitcoinsvgrepocom-1.svg'},
    {name2:'nse', name3:"BTC", value:"$30,618", decimalValue:".60", changePercentage:"+7.90%",logo:'https://assets.coingecko.com/coins/images/10365/large/assets/bitcoinsvgrepocom-1.svg'},
    {name2:'bse', name3:"BTC", value:"$30,618", decimalValue:".60", changePercentage:"-7.90%",logo:'https://assets.coingecko.com/coins/images/10365/large/assets/bitcoinsvgrepocom-1.svg'},
    {name2:'comodity', name3:"BTC", value:"$30,618", decimalValue:".60", changePercentage:"+7.90%",logo:'https://assets.coingecko.com/coins/images/10365/large/assets/bitcoinsvgrepocom-1.svg'},
    {name2:'tata', name3:"BTC", value:"$30,618", decimalValue:".60", changePercentage:"+7.90%",logo:'https://assets.coingecko.com/coins/images/10365/large/assets/bitcoinsvgrepocom-1.svg'},
    {name2:'apple', name3:"BTC", value:"$30,618", decimalValue:".60", changePercentage:"+7.90%",logo:'https://assets.coingecko.com/coins/images/10365/large/assets/bitcoinsvgrepocom-1.svg'},
    {name2:'tesla', name3:"BTC", value:"$30,618", decimalValue:".60", changePercentage:"-7.90%",logo:'https://assets.coingecko.com/coins/images/10365/large/assets/bitcoinsvgrepocom-1.svg'},
    {name2:'twitter', name3:"BTC", value:"$30,618", decimalValue:".60", changePercentage:"+7.90%",logo:'https://assets.coingecko.com/coins/images/10365/large/assets/bitcoinsvgrepocom-1.svg'},
    {name2:'facebook', name3:"BTC", value:"$30,618", decimalValue:".60", changePercentage:"+7.90%",logo:'https://assets.coingecko.com/coins/images/10365/large/assets/bitcoinsvgrepocom-1.svg'},
    {name2:'google', name3:"BTC", value:"$30,618", decimalValue:".60", changePercentage:"+7.90%",logo:'https://assets.coingecko.com/coins/images/10365/large/assets/bitcoinsvgrepocom-1.svg'},

  ]);
}, []);



  //for scroll bottom minus icon 

  const scrollViewRef = useRef(null);

  const scrollToBottom = () => {
    scrollViewRef.current.scrollToEnd({ animated: true });
  };


  return (
  <SafeAreaView style={{flex:1}}>
    <ScrollView ref={scrollViewRef} style={styles.root}>
        {/* <Header /> */}
        <Header assetData={assetData} />

        <MyPortfolio />
        <Deposit />
        <MyWatchList />
 
        <View style={styles.container5}>
        {cardData.map((item, index) => {
        return(
           <CardItems  key={index} name={item.name} symbl={item.symbl} value={item.value} changePercentage={item.changePercentage} color={item.backgroundColor} onClick={() =>setSelectedCard(item.name)} />
        );
        })}
        </View>

      


        <CriptoAssets onScrollToBottom={scrollToBottom} data={watchlist}  assetData={assetData}>

        <ViewPortfolio assetData={assetData} selectedCard={selectedCard} />
        </CriptoAssets>

     
 
     
      

        
        </ScrollView>
        </SafeAreaView>
  );

      };
















// import React, { useState, useEffect, useRef, useContext } from 'react';
// import { View, Text, Image, TouchableOpacity, TextInput, Modal, Button, ScrollView } from 'react-native';
// import { StyleSheet, SafeAreaView } from 'react-native';
// //import React, { useContext } from 'react';

// import AssetDataContext from './AssetDataContext';
// import Header from './Header';
// import MyPortfolio from './MyPortfolio';
// import Deposit from './Deposite';
// import MyWatchList from './MyWatchList';
// import CardItems from './CardItems';
// import CriptoAssets from './CriptoAssets';
// //import  BottomTabBar  from './BottomTabBar';
// //import SearchBarList from './SearchBarList';

// //import AssetListDetails from './AssetListDetails';
// import ViewPortfolio from './ViewPortfolio';



// const Dashboard = () => {
//   const { assetData, setAssetData } = useContext(AssetDataContext);
//   const [watchlist, setWatchlist] = useState([]);
//   // const [selectedCard, setSelectedCard] = useState('crypto');
//   const [selectedAsset, setSelectedAsset] = useState(null);

//   // const handleCardItemClick = (cardName) => {
//   //   setSelectedCard(cardName);
//   // };


//   // const addToWatchlist = (item) => {
//   //   if (!watchlist.some((watchlistItem) => watchlistItem.name2 === item.name2)) {
//   //     setWatchlist((prevWatchlist) => [...prevWatchlist, item]);
//   //   }
//   // };
  
//   const cardData = [
//     { name: 'Crypto', value: '$23,500', changePercentage: '+5.9%', logo: 'https://assets.coingecko.com/coins/images/10365/large/ethereum.png?1606373430', backgroundColor: "#C1C2EB" },
//     { name: 'NSE', value: '$23,500', changePercentage: '+5.9%', logo: 'https://assets.coingecko.com/coins/images/10365/large/ethereum.png?1606373430', backgroundColor: '#B7DDD2'},
//     { name: 'BSE', value: '$23,500', changePercentage: '+5.9%', logo: 'https://assets.coingecko.com/coins/images/10365/large/ethereum.png?1606373430', backgroundColor: "#C1C2EB" },
//     { name: 'Comodity', value: '$23', changePercentage: '+5.9%', logo: 'https://assets.coingecko.com/coins/images/10365/large/ethereum.png?1606373430',backgroundColor: '#B7DDD2' }
//   ];
//   useEffect(() => {
//     setSelectedAsset(cardData[0]); // Set the default to the "Crypto" card
//   }, []);


//   useEffect(() => {
    
//     setAssetData([
//     {name2:'Crpto',name3:"BTC", value:"$30,618", decimalValue:".60", changePercentage:"-7.90%",logo:'https://assets.coingecko.com/coins/images/10365/large/assets/bitcoinsvgrepocom-1.svg'},
//     {name2:'nse', name3:"BTC", value:"$30,618", decimalValue:".60", changePercentage:"+7.90%",logo:'https://assets.coingecko.com/coins/images/10365/large/assets/bitcoinsvgrepocom-1.svg'},
//     {name2:'bse', name3:"BTC", value:"$30,618", decimalValue:".60", changePercentage:"-7.90%",logo:'https://assets.coingecko.com/coins/images/10365/large/assets/bitcoinsvgrepocom-1.svg'},
//     {name2:'comodity', name3:"BTC", value:"$30,618", decimalValue:".60", changePercentage:"+7.90%",logo:'https://assets.coingecko.com/coins/images/10365/large/assets/bitcoinsvgrepocom-1.svg'},
//     {name2:'tata', name3:"BTC", value:"$30,618", decimalValue:".60", changePercentage:"+7.90%",logo:'https://assets.coingecko.com/coins/images/10365/large/assets/bitcoinsvgrepocom-1.svg'},
//     {name2:'apple', name3:"BTC", value:"$30,618", decimalValue:".60", changePercentage:"+7.90%",logo:'https://assets.coingecko.com/coins/images/10365/large/assets/bitcoinsvgrepocom-1.svg'},
//     {name2:'tesla', name3:"BTC", value:"$30,618", decimalValue:".60", changePercentage:"-7.90%",logo:'https://assets.coingecko.com/coins/images/10365/large/assets/bitcoinsvgrepocom-1.svg'},
//     {name2:'twitter', name3:"BTC", value:"$30,618", decimalValue:".60", changePercentage:"+7.90%",logo:'https://assets.coingecko.com/coins/images/10365/large/assets/bitcoinsvgrepocom-1.svg'},
//     {name2:'facebook', name3:"BTC", value:"$30,618", decimalValue:".60", changePercentage:"+7.90%",logo:'https://assets.coingecko.com/coins/images/10365/large/assets/bitcoinsvgrepocom-1.svg'},
//     {name2:'google', name3:"BTC", value:"$30,618", decimalValue:".60", changePercentage:"+7.90%",logo:'https://assets.coingecko.com/coins/images/10365/large/assets/bitcoinsvgrepocom-1.svg'},

//   ]);
// }, []);



//   //for scroll bottom minus icon 

//   const scrollViewRef = useRef(null);

//   const scrollToBottom = () => {
//     scrollViewRef.current.scrollToEnd({ animated: true });
//   };


//   return (
//   <SafeAreaView style={{flex:1}}>
//     <ScrollView ref={scrollViewRef} style={styles.root}>
//         {/* <Header /> */}
//         <Header assetData={assetData} />

//         <MyPortfolio />
//         <Deposit />
//         <MyWatchList />
 
//         <View style={styles.container5}>
//         {cardData.map((item, index) => {
//         return(
//            <CardItems  key={index} name={item.name} symbl={item.symbl} value={item.value} changePercentage={item.changePercentage} color={item.backgroundColor} onClick={() =>setSelectedAsset(item)} />
//         );
//         })}
//         </View>

      
// {/* 
//       <CriptoAssets data={watchlist}
//         selectedCard={selectedCard} />  */}
//         <CriptoAssets onScrollToBottom={scrollToBottom} data={watchlist} selectedAsset={selectedAsset} />



     
//      {/* <CriptoAssets assetListDetailsComponent={<AssetListDetails />} /> */}
     
      

        
//         </ScrollView>
//         </SafeAreaView>
//   );

//       };






// const styles = {
  const styles = StyleSheet.create({


    root: {
      backgroundColor: '#FFFFFF',
      flex: 1
    },

  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    padding: 10,
    marginTop:10,
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
    fontWeight:700,
    lineHeight:21,
    fontFamily:'SFProDisplay',
    color:'#1C1E32',
  },
  userName: {
    fontSize: 18,
    
    fontWeight:600,
    lineHeight:21,
    fontFamily: 'SFProDisplay',
    color:'#1C1E32',
  
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
    fontSize:16,
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

   padding:10,
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
    padding:10,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    //backgroundColor: '#1C1E32',
    //marginLeft:-15,
    //marginLeft: 0,
    backgroundColor:'#FFFFFF',
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
    fontWeight:500,
    color: '#1C1E32',
  },
  withdrawText2: {
    marginRight: -10,
    lineHeight: 19.09,
    fontSize: 20,
    fontWeight:500,
    color: '#1C1E32',
  },


//container 4 Crypto list


container4: {
  padding:15,
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
  backgroundColor:'black',
  // borderRadius: 4,
},
buttonText: {
  // fontSize: 14,
  // // color: 'black',
  // color:'white',
  // fontSize: 10,
  fontSize:12,
  color: '#FFFFFF',
  fontWeight:900,
  lineHeight:11.93,
  textAlign:'center',
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
  flex:1,
  flexDirection: 'row',
  justifyContent: 'space-between',
  borderRadius: 10,
  marginLeft:2,
  backgroundColor:'#FFFFFF',
  
  
  //padding: 0,
},
 

gridContainer: {

  alignItems: 'center',
  marginTop:8,
  flex:1,
 
  
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
  padding:10,
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
  color:'rgba(28, 30, 50, 0.6)',
  fontWeight: 'bold',
  // marginLeft: 3,
  left:2,
},
value2: {
  fontSize: 14,
    fontWeight: '700',
    lineHeight: 19.09,
    color:'rgba(28, 30, 50, 1)',
},
button2: {
  backgroundColor: 'rgba(28, 30, 50, 0.2)',
  borderRadius: 10,
  padding: 3,
  marginTop: 10,
  
},
buttonValue: {
 fontFamily: 'SFProDisplay',
 fontWeight:800,
 fontSize: 12,
 lineHeight:13.55,
 color:'rgba(28, 30, 50, 1)',
 
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
  backgroundColor:"rgba(255, 255, 255, 0.8)",
  // backgroundColor:'black',
  borderBottomColor: '#E5E5E5',
  marginTop:10,
  borderRadius:10,
  height:60,
},
leftContent: {
  flexDirection: 'row',
  alignItems: 'center',
},
logo: {
  width: 25,
  height: 25,
  marginRight: 8,
  backgroundColor:"rgba(227, 233, 240, 1)",
  borderRadius:15,
 
},
Text: {
  fontSize: 16,
  fontWeight: '700',
  lineHeight: 19.09,
  color:'rgba(28, 30, 50, 1)',
},
span: {
  fontSize: 16,
  fontWeight: '700',
  lineHeight: 19.09,
  color:'rgba(28, 30, 50, 0.6)',
  left:2,
},
rightContent: {
  //alignItems: 'flex-end',
  flexDirection:'row',
  alignItems: 'flex-end',
  justifyContent: 'flex-end', // Align items to the right
  flex: 1, // Allow right content to take up available space
},


value: {
  fontSize: 16,
  fontWeight: 'bold',
 // marginBottom: 4,
 marginRight:3,
  color: '#1C1E32',
  lineHeight: 22, 
},
decimal: {
  fontSize: 16,
  marginRight:3,
  color: '#A1A1A1',
  fontWeight: 'bold',
  lineHeight: 22, 
},


button: {

  width:43,
  height:19.2,
  borderRadius:100,
  backgroundColor:'#EAC9B1',
},
changePercentage: {
  // fontSize: 14,
  // fontWeight: 'bold',
  // color: 'black',

 
  fontWeight:500,
  fontSize:10,
  lineHeight:17.55,
  alignItems:'center',
  left:4,
  
},
  });

     
    
    



export default Dashboard;

























































// import React, { useState } from 'react';
// import { View, Text, Image, TouchableOpacity, TextInput, Modal, Button, ScrollView } from 'react-native';

// import Header from './Header';
// import MyPortfolio from './MyPortfolio';
// import Deposit from './Deposite';
// import MyWatchList from './MyWatchList';
// import CardItems from './CardItems';

// import CryptoAssets from './CriptoAssets';
// import AssetItem from './AssetItem';

// const Dashboard = () => {
//   const cardData = [
//     { name: 'Crypto', value: '$23,500.69', changePercentage: '+5.9%', logo: 'https://assets.coingecko.com/coins/images/10365/large/ethereum.png?1606373430', backgroundColor: "#C1C2EB" },
//     { name: 'NSE', value: '$23,500', changePercentage: '+5.9%', logo: 'https://assets.coingecko.com/coins/images/10365/large/ethereum.png?1606373430', backgroundColor: '#B7DDD2'},
//     { name: 'BSE', value: '$23,500', changePercentage: '+5.9%', logo: 'https://assets.coingecko.com/coins/images/10365/large/ethereum.png?1606373430', backgroundColor: "#C1C2EB" },
//     { name: 'Comodity', value: '$23', changePercentage: '+5.9%', logo: 'https://assets.coingecko.com/coins/images/10365/large/ethereum.png?1606373430',backgroundColor: '#B7DDD2' }
//   ];

//   const assetData = [
//     {name2:'Crpto', name3:"BTC", value:"$30,618", decimalValue:".60", changePercentage:"+7.90%",logo:'https://assets.coingecko.com/coins/images/10365/large/assets/bitcoinsvgrepocom-1.svg'},
//     {name2:'nse', name3:"BTC", value:"$30,618", decimalValue:".60", changePercentage:"+7.90%",logo:'https://assets.coingecko.com/coins/images/10365/large/assets/bitcoinsvgrepocom-1.svg'},
//     {name2:'bse', name3:"BTC", value:"$30,618", decimalValue:".60", changePercentage:"+7.90%",logo:'https://assets.coingecko.com/coins/images/10365/large/assets/bitcoinsvgrepocom-1.svg'},
//     {name2:'comodity', name3:"BTC", value:"$30,618", decimalValue:".60", changePercentage:"+7.90%",logo:'https://assets.coingecko.com/coins/images/10365/large/assets/bitcoinsvgrepocom-1.svg'},
//     {name2:'tata', name3:"BTC", value:"$30,618", decimalValue:".60", changePercentage:"+7.90%",logo:'https://assets.coingecko.com/coins/images/10365/large/assets/bitcoinsvgrepocom-1.svg'},
//     {name2:'apple', name3:"BTC", value:"$30,618", decimalValue:".60", changePercentage:"+7.90%",logo:'https://assets.coingecko.com/coins/images/10365/large/assets/bitcoinsvgrepocom-1.svg'},
//     {name2:'tesla', name3:"BTC", value:"$30,618", decimalValue:".60", changePercentage:"+7.90%",logo:'https://assets.coingecko.com/coins/images/10365/large/assets/bitcoinsvgrepocom-1.svg'},
//     {name2:'twitter', name3:"BTC", value:"$30,618", decimalValue:".60", changePercentage:"+7.90%",logo:'https://assets.coingecko.com/coins/images/10365/large/assets/bitcoinsvgrepocom-1.svg'},
//     {name2:'facebook', name3:"BTC", value:"$30,618", decimalValue:".60", changePercentage:"+7.90%",logo:'https://assets.coingecko.com/coins/images/10365/large/assets/bitcoinsvgrepocom-1.svg'},
//     {name2:'google', name3:"BTC", value:"$30,618", decimalValue:".60", changePercentage:"+7.90%",logo:'https://assets.coingecko.com/coins/images/10365/large/assets/bitcoinsvgrepocom-1.svg'},

//   ];

//   return (
//     <ScrollView >
      


//         <Header />
//         <MyPortfolio />
//         <Deposit />
//         <MyWatchList />


       
//         <View style={styles.container5}>
//         {cardData.map((item, index) => {
//         return <CardItems name={item.name} symbl={item.symbl} value={item.value} changePercentage={item.changePercentage} color={item.backgroundColor} />;
//         })}
//         </View>

//       <CryptoAssets />


    
//       <View style={styles.containerItem}>
//       {assetData.map((item, index) => {
//         return <AssetItem name2={item.name2} name3={item.name3} value={item.value} decimalValue={item.decimalValue} changePercentage={item.changePercentage} />;
//       })}
//       </View>
      
      
//       {/* <View style={styles.containerItem}>
//       {assetData.map((item, index) => {
//         return <AssetItem name2={item.name2} name3={item.name3} value={item.value} decimalValue={item.decimalValue} changePercentage={item.changePercentage} />;
//       })}
//       </View> */}

//     </ScrollView>
//   );
// };


// const styles = {

//   container: {
//     flex: 1,
//     backgroundColor: '#FFFFFF',
//     padding: 10,
//     //height:900,
//     marginTop:10,
//   },
//   nav: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     justifyContent: 'space-between',
//     borderBottomWidth: 1,
//     borderColor: '#ccc',
//     paddingVertical: 10,
//   },
//   leftContent: {
//     flexDirection: 'row',
//     alignItems: 'center',
//   },
//   logo: {
//     width: 30,
//     height: 30,
//     marginRight: 10,
//   },
//   welcomeText: {
//     // fontSize: 14,figma font size its look small 
//     fontSize: 18,
//     fontWeight:700,
//     lineHeight:21,
//     fontFamily:'SFProDisplay',
//     color:'#1C1E32',
//   },
//   userName: {
//     fontSize: 18,
    
//     fontWeight:600,
//     lineHeight:21,
//     fontFamily: 'SFProDisplay',
//     color:'#1C1E32',
  
//   },
//   rightImageContainer: {
//     flexDirection: 'row',
//     alignItems: 'center',
//   },
//   rightImage: {
//     width: 30,
//     height: 30,
//     marginLeft: 10,
//   },
//   searchBox: {
//     fontSize:16,
//     marginTop: 16,
//     paddingHorizontal: 16,
//     paddingVertical: 10,
//     height: 40,
//     borderWidth: 1,
//     borderColor: '#C1C2EB',
//     borderRadius: 8,
//     marginHorizontal: 16,
//     backgroundColor: '#E3E9F0',
//   },

// // container: {
// //   flex: 1,
// //   backgroundColor: 'white',
// //   padding: 20,
// // },
// // nav: {
// //   flexDirection: 'row',
// //   alignItems: 'center',
// //   justifyContent: 'space-between',
// //   borderBottomWidth: 1,
// //   borderColor: '#ccc',
// //   paddingVertical: 10,
// // },
// // leftContent: {
// //   flexDirection: 'row',
// //   alignItems: 'center',
// // },
// // logo: {
// //   width: 40,
// //   height: 40,
// //   marginRight: 10,
// // },
// // welcomeText: {
// //   fontSize: 18,
// // },
// // userName: {
// //   fontSize: 18,
// //   fontWeight: 'bold',
// // },
// // rightImage: {
// //   width: 40,
// //   height: 40,
// //   marginLeft: 10,
// // },
// // rightImage1: {
// //   width: 40,
// //   height: 40,
// //   marginLeft: 90,
// // },
// // searchBox: {
// //   marginTop: 16,
// //   paddingHorizontal: 16,
// //   paddingVertical: 10,
// //   height: 40,
// //   borderWidth: 1,
// //   borderColor: 'lightgray',
// //   borderRadius: 8,
// //   marginHorizontal: 16,
// //   backgroundColor: 'red',
// // },


// //second container current portfolio
// container2: {
//   // position: 'absolute',
//  //  top: 100,
//    //left: '50%',
//    padding:10,
//    //marginLeft: -191.5,
//    alignItems: 'start',
//    backgroundColor: '#FFFFFF',
//  },
//  valueText: {
//    fontWeight: 500,
//    fontSize: 16,
//    lineHeight: 19.09,
//    color: '#A1A1A1',
//    fontFamily: 'SFProDisplay',
//  },
//  portfolioContainer: {
//    flexDirection: 'column',
//  },
//  valueAmount: {
//    flexDirection: 'row',
//    alignItems: 'center',
//  },
//  amountText: {
//    fontWeight: 700,
//    fontSize: 32,
//    lineHeight: 38.19,
//    color: '#1C1E32',
//    fontFamily: 'SFProDisplay',
//  },
//  decimalText: {
//    fontWeight: 700,
//    fontSize: 32,
//    lineHeight: 38.19,
//    color: '#A1A1A1',
//    fontFamily: 'SFProDisplay',
//  },
//  greenBox: {
//    marginLeft: 10,
//    backgroundColor: '#EAC9B1',
//    width: 60,
//    height: 30,
//    borderRadius: 100,
//    justifyContent: 'center',
//    alignItems: 'center',
//  },
//  percentText: {
//    fontWeight: 500,
//    fontSize: 10,
//    lineHeight: 11.93,
//    color: '#1C1E32',
//    fontFamily: 'SFProDisplay',
 
//  },



// /// Deposite and withdraw



//   container3: {
//     //paddingVertical: 40,
//     //marginTop:-50,
//     //paddingBottom:15,
//     padding:10,
//     flexDirection: 'row',
//     justifyContent: 'center',
//     alignItems: 'center',
//     //backgroundColor: '#1C1E32',
//     marginLeft:-15,
//     //marginLeft: 0,
//     backgroundColor:'#FFFFFF',
//   },
//   ellipse: {
//     width: 166,
//     height: 48,
//     borderRadius: 100,
//     backgroundColor: '#ECECEC',
//     justifyContent: 'center',
//     alignItems: 'center',
//   },
//   circle: {
//     width: 40,
//     height: 40,
//     borderRadius: 100,
//     backgroundColor: '#B1A4FF',
//     position: 'absolute',
//     left: 0,
//     marginLeft: 5,
//     justifyContent: 'center',
//     alignItems: 'center',
//   },
//   spacing: {
//     width: 50,
//   },
//   text: {
//     marginLeft: 16,
    
//     //color: 'black',
//     //textAlign: 'center',
    
    
//   },
//   withdrawText: {
//     marginRight: -10,
//     lineHeight: 19.09,
//     fontSize: 20,
//     textAlign: 'center',
//     fontWeight:500,
//     color: '#1C1E32',
//   },
//   withdrawText2: {
//     marginRight: -10,
//     lineHeight: 19.09,
//     fontSize: 20,
//     fontWeight:500,
//     color: '#1C1E32',
//   },





// //container 4 Crypto list

// container4: {
//   padding:15,
//   //borderRadius:20,
//    flexDirection: 'row',
//    justifyContent: 'space-between',
//    alignItems: 'center',
//    //padding: 13,
//    backgroundColor: '#FFFFFF',
// },
// title: {
//   fontSize: 18,
//   fontWeight: 'bold',
// },
// buttonsContainer: {
//   flexDirection: 'row',
// },
// button: {
//   marginLeft: 8,
//   paddingVertical: 4,
//   paddingHorizontal: 8,
//   backgroundColor: '#1C1E32',
//   borderRadius: 10,
//   backgroundColor:'black',
//   // borderRadius: 4,
// },
// buttonText: {
//   // fontSize: 14,
//   // // color: 'black',
//   // color:'white',
//   // fontSize: 10,
//   fontSize:12,
//   color: '#FFFFFF',
//   fontWeight:900,
//   lineHeight:11.93,
//   textAlign:'center',
// },

// modalCloseButton: {
//   marginTop: 16,
//   padding: 8,
//   backgroundColor: '#ECECEC',
//   borderRadius: 4,
// },
// modalCloseButtonText: {
//   fontSize: 14,
//   color: 'black',
//   backgroundColor: '#ECECEC',
//   borderRadius: 4,
// },



// //4 gird items
// container5: {
//   flex:1,
//   flexDirection: 'row',
//   justifyContent: 'space-between',
//   borderRadius: 10,
//   marginLeft:2,
//   backgroundColor:'#FFFFFF',
  
  
//   //padding: 0,
// },
 

// gridContainer: {

//   alignItems: 'center',
//   marginTop:8,
//   //margin: 5,
//   //borderRadius: 10,
//   ///backgroundColor: 'lightgray',
 
//   flex:1,
 
  
// },

// firstLine: {
//   flexDirection: 'row',
//   alignItems: 'center',
//   marginBottom: 10,
// },
// secondLine: {
//   flexDirection: 'column',
//   alignItems: 'center',
//   justifyContent: 'center',
//   padding:10,
// },
// logo2: {
//   width: 20,
//   height: 20,
//   marginBottom: 8,
// },
// // textContainer: {
// //   //marginLeft: 5,
// // },
// gridText: {
//   fontSize: 16,
//   fontWeight: '600',
//   lineHeight: 17.71,
 
//   //fontFamily: 'SFProDisplay',
// },
// gridSubText: {
//   fontSize: 15,
//   color:'rgba(28, 30, 50, 0.6)',
//   fontWeight: 'bold',
//   // marginLeft: 3,
//   left:2,
// },
// value2: {
//   fontSize: 14,
//     fontWeight: '700',
//     lineHeight: 19.09,
//     color:'rgba(28, 30, 50, 1)',
// },
// button2: {
//   backgroundColor: 'rgba(28, 30, 50, 0.2)',
//   borderRadius: 10,
//   padding: 3,
//   marginTop: 10,
  
// },
// buttonValue: {
//  fontFamily: 'SFProDisplay',
//  fontWeight:800,
//  fontSize: 12,
//  lineHeight:13.55,
//  color:'rgba(28, 30, 50, 1)',
 
// },


// //AssetContainer
  
// containerAssets: {
//   //marginTop:10,
//   padding:15,

  
//   flexDirection: 'row',
//   alignItems: 'flex-start',
//   justifyContent: 'space-between',
//   //paddingHorizontal: 16,
//   //paddingVertical: 16, // Increase the vertical padding to increase the height
//   backgroundColor: '#FFFFFF',
//   //height:500,
//   //borderRadius:30
// },
// button: {
//   // backgroundColor: 'black',
//   // paddingVertical: 5,
//   // paddingHorizontal: 10,
//   // borderRadius: 15,

//   marginLeft: 8,
//   paddingVertical: 4,
//   paddingHorizontal: 8,
//   backgroundColor: '#1C1E32',
//   borderRadius: 10,
//   backgroundColor:'black',
// },
// buttonText: {
//   // color: '#fff',
//   // fontSize: 16,
//   // fontWeight: 'bold',

//   fontSize: 12,
//   color: '#FFFFFF',
//   fontWeight:600,
//   lineHeight:11.93,
//   textAlign:'center',

// },
// assetText: {
//   // fontSize: 18,
//   // fontWeight: 'bold',
//   fontSize:18,
//   fontWeight:700,
//   lineHeight:19.93,
//   fontFamily:'SFProDisplay',

//   color:'rgba(28, 30, 50, 1)',
// },



//     //asset items 


//     containerAssetItem: {
//       // flexDirection: 'row',
//       // alignItems: 'center',
//       // justifyContent: 'space-between',
//       // padding: 12,
//       // borderBottomWidth: 1,
//       // borderBottomColor: '#E5E5E5',


//       flexDirection: 'row',
//       alignItems: 'center',
//       justifyContent: 'space-between',
//       padding: 12,
//       borderBottomWidth: 1,
//       backgroundColor:"#E3E9F0",
//       borderBottomColor: '#E5E5E5',
//       marginTop:10,
//       borderRadius:10,
//       height:50,

//     },
//     leftContent: {
//       flexDirection: 'row',
//       alignItems: 'center',
//     },
//     logo: {
//       width: 24,
//       height: 24,
//       marginRight: 8,
//     },
//     Text: {
//       fontSize: 18,
//       fontWeight: 'bold',
//       marginRight: 2,
//     },
//     span: {
//       fontSize: 18,
//       color: '#888888',
//       fontWeight: 'bold',
//     },
//     rightContent: {
//       // alignItems: 'flex-end',
//       flexDirection:'row',
//     alignItems: 'flex-end',
//     justifyContent: 'flex-end', // Align items to the right
//     flex: 1, // Allow right content to take up available space
//     },
//     value: {
//       fontSize: 18,
//       fontWeight: 'bold',
//      // marginBottom: 4,
//      marginRight:3,
//       color: '#1C1E32',
//       lineHeight: 22, // Adjust the lineHeight as needed
//     },
//     decimal: {
//       fontSize: 18,
//       marginRight:3,
//       color: '#A1A1A1',
//       fontWeight: 'bold',
//       lineHeight: 22, // Adjust the lineHeight to match value
//     },
//     button: {
//     //   backgroundColor: '#EAC9B1',
//     //   paddingVertical: 4,
//     //   paddingHorizontal: 5,
//     //   borderRadius: 8,
//     //   marginTop: 8,

//     width:50,
//     height:20,
//     borderRadius:100,
//     backgroundColor:'#EAC9B1',
//      },


//     changePercentage: {
//       // fontSize: 14,
//       // fontWeight: 'bold',
//       // color: 'black',

//       fontWeight:500,
//       fontSize:14,
//       lineHeight:18.55,
//     },
//   };

     
    
    



// export default Dashboard;





























// import * as React from "react";
// import { Text, StyleSheet, View, Pressable, ScrollView } from "react-native";
// import { Image } from "expo-image";
// import { FontSize, FontFamily, Color, Border } from "../GlobalStyles";
// import { useNavigation } from '@react-navigation/native';

// const Dashboard02 = () => {
//     const navigation = useNavigation(); // Create a navigation reference
  
//     const handleSeeAllPress = () => {
//       navigation.navigate('List'); // Navigate to the 'Next' page when 'See All' is pressed
//     };
  


//   return (
//     <ScrollView>
    
//     <View style={styles.dashboard02}>
//      <View style={[styles.nav, styles.navLayout]}>
//         <View style={[styles.navChild, styles.navLayout]} />
//         <Text style={[styles.welcomeSatyam, styles.textPosition]}>
//           <Text style={styles.welcome}>{`Welcome `}</Text>
//           <Text style={styles.satyam}>Satyam</Text>
//           <Text style={styles.text36}>,</Text>
//         </Text>
//         <Image
//           style={[styles.maskGroupIcon, styles.maskGroupPosition]}
//           contentFit="cover"
//           source={require("../assets/mask-group.png")}
//         />
//         <Image
//           style={[styles.maskGroupIcon1, styles.maskGroupPosition]}
//           source={require("../assets/mask-group1.svg")}
//         />
//       </View>
//       <Image
//         style={[styles.maskGroupIcon2, styles.groupLayout]}
//         source={require("../assets/mask-group2.svg")}
//       />
//       <Text style={[styles.currentPortfolioValue, styles.textPosition]}>
//         Current Portfolio Value
//       </Text>
//       <View style={[styles.dashboard02Inner, styles.dashboard02Layout]} />
//       <Text style={[styles.deposit, styles.textPosition]}>Deposit</Text>
//       <View style={[styles.dashboard02Child1, styles.dashboard02ChildLayout]} />
//       <Image
//         style={[styles.frameIcon9, styles.frameIconLayout]}
//         source={require("../assets/frame3.svg")}
//       />
//       <View style={[styles.dashboard02Child2, styles.dashboard02Layout]} />
//       <View style={[styles.dashboard02Child3, styles.dashboard02ChildLayout]} />
//       <View style={[styles.dashboard02Child4, styles.iconLayout]} />
//       <View style={styles.dashboard02Child5} />
//       <Text style={[styles.withdraw, styles.textPosition]}>Withdraw</Text>
//       <Image
//         style={[styles.frameIcon10, styles.frameIconLayout]}
//         source={require("../assets/frame4.svg")}
//       />
//       <View style={[styles.iosStatusBar, styles.navLayout]}>
//         <View style={[styles.statusBar, styles.borderBorder]} />
//         <Text style={[styles.time, styles.timePosition]}>9:41</Text>
//         <View style={[styles.battery, styles.timePosition]}>
//           <View style={[styles.border, styles.timePosition]} />
//           <Image
//             style={[styles.capIcon, styles.timePosition]}
//             source={require("../assets/cap.svg")}
//           />
//           <View style={[styles.capacity, styles.timePosition]} />
//         </View>
//         <Image style={styles.wifiIcon} source={require("../assets/wifi.svg")} />
//         <Image
//           style={styles.cellularConnectionIcon}
//           source={require("../assets/cellular-connection.svg")}
//         />
        
//       </View>
//       <View style={styles.rectangleParent}>
//         <View style={styles.groupChild} />
//         <View style={styles.arrowLongSquareUp} />
//         <Text style={[styles.text, styles.textPosition]}>
//           <Text style={styles.text1}>$23,500</Text>
//           <Text style={styles.text2}>.49</Text>
//         </Text>
//       </View>
//       <View style={[styles.parent, styles.parentPosition1]}>
//         <Text style={[styles.text3, styles.ytdTypo]}>+5.9%</Text>
//         <Image
//           style={[styles.frameIcon, styles.frameIconPosition]}
//           source={require("../assets/frame.svg")}
//         />
//       </View>
//       <View style={styles.myWatchlistParent}>
//          <Text style={[styles.myWatchlist]}> 
//           My Watchlist
//         </Text>
//         <View style={[styles.groupItem, styles.groupItemLayout]} />
//           <Text style={[styles.ytd, styles.ytdClr]}>YTD</Text>
//            <View style={styles.groupInner} />
//             <Text style={[styles.mtd, styles.ytdTypo]}>MTD</Text>
//             <View style={[styles.rectangleContainer, styles.groupLayout1]}>
//           <View style={[styles.groupChild2, styles.groupChildPosition1]} />
//           <View style={[styles.ellipseView, styles.groupLayout]} />
//           <Image
//             style={[styles.ethereumSvgrepoCom1Icon, styles.ethereumIconLayout]}
//             source={require("../assets/ethereumsvgrepocom-1.svg")}
//           />
//           <Text style={[styles.bitcoinBtc, styles.bitcoinFlexBox]}>
//             <Text style={styles.bitcoinBtcTxt}>
//               <Text>
//                 <Text style={styles.bitcoin}>
//                   <Text style={styles.bitcoin1}>Ethereum</Text>
//                 </Text>
//               </Text>
//               <Text style={[styles.btc, styles.ytdTypo]}>ETH</Text>
//             </Text>
//           </Text>
//           <Text style={styles.text4}>
//             <Text style={styles.text1}>$1,882.</Text>
//             <Text style={styles.text6}>43</Text>
//           </Text>
//           <View style={[styles.groupChild4, styles.groupChildLayout]} />
//           <View style={[styles.container, styles.groupPosition]}>
//             <Text style={[styles.text11, styles.textTypo1]}>+3.97%</Text>
//             <Image
//               style={[styles.frameIcon2, styles.frameIconPosition]}
//               source={require("../assets/frame2.svg")}
//             />
//           </View>
//         </View>

//        </View>
//        <View style={styles.myWatchlistParent}>
//         <View style={[styles.groupItemLayout]} />
//         <Text style={[styles.ytd, styles.ytdClr]}>YTD</Text>
//         <View style={styles.groupInner} />
//         <Text style={[styles.mtd, styles.ytdTypo]}>MTD</Text>
//         <View style={[styles.rectangleGroup, styles.groupLayout1]}>
//           <View style={[styles.rectangleView, styles.groupChildPosition1]} />
//           <View style={[styles.ellipseView, styles.groupLayout]} />
//           <Image
//             style={styles.bitcoinSvgrepoCom1Icon}
//             source={require("../assets/bitcoinsvgrepocom-1.svg")}
//           />
        
//           <Text style={[styles.bitcoinBtc, styles.bitcoinFlexBox]}>
//             <Text style={styles.bitcoinBtcTxt}>
//               <Text>
//                 <Text style={styles.bitcoin}>
//                   <Text style={styles.bitcoin1}>Bitcoin</Text>
//                 </Text>
//               </Text>
//               <Text style={[styles.btc, styles.ytdTypo]}>BTC</Text>
//             </Text>
//           </Text>
//           <Text style={styles.text4}>
//             <Text style={styles.text1}>$30,618.</Text>
//             <Text style={styles.text6}>60</Text>
//           </Text>
//           <View style={[styles.groupChild1, styles.groupChildLayout]} />
//           <View style={[styles.group, styles.groupPosition]}>
//             <Text style={[styles.text7, styles.textTypo1]}>-7.90%</Text>
//             <Image
//               style={[styles.frameIcon1, styles.frameIconPosition]}
//               source={require("../assets/frame1.svg")}
//             />
//           </View>
//         </View>
//         <View style={[styles.rectangleContainer, styles.groupLayout1]}>
//           <View style={[styles.groupChild2, styles.groupChildPosition1]} />
//           <View style={[styles.ellipseView, styles.groupLayout]} />
//           <Image
//             style={[styles.ethereumSvgrepoCom1Icon]} //, styles.ethereumIconLayout
//             source={require("../assets/ethereumsvgrepocom-1.svg")}
//           />
        
//           <Text style={[styles.bitcoinBtc, styles.bitcoinFlexBox]}>
//             <Text style={styles.bitcoinBtcTxt}>
//               <Text>
//                 <Text style={styles.bitcoin}>
//                   <Text style={styles.bitcoin1}>Ethereum</Text>
//                 </Text>
//               </Text>
//               <Text style={[styles.btc, styles.ytdTypo]}>ETH</Text>
//             </Text>
//           </Text>
//           <Text style={styles.text4}>
//             <Text style={styles.text1}>$1,882.</Text>
//             <Text style={styles.text6}>43</Text>
//           </Text>
//           <View style={[styles.groupChild4, styles.groupChildLayout]} />
//           <View style={[styles.container, styles.groupPosition]}>
//             <Text style={[ styles.textTypo1]}>+3.97%</Text>
//             <Image
//               style={[styles.frameIcon2, styles.frameIconPosition]}
//               source={require("../assets/frame2.svg")}
//             />

            
//           </View>
          
//           </View>
//           <View style={styles.container}>
//                <View style={styles.box1} />
//                 <View style={styles.box2} />
//           </View>
             



//          </View>

//          <View style={styles.dashboard02Child} />
//       <Text style={[styles.cryptoAssets, styles.myWatchlistTypo]}>
//         Crypto Assets
//       </Text>
//       <View style={[styles.groupView, styles.groupParentLayout]}>
//         <View style={[styles.groupChild5, styles.groupParentLayout]} />
//         <View style={[styles.groupChild6, styles.framePosition]} />
//         <Text style={[styles.bitcoinBtc1, styles.framePosition]}>
//           <Text style={styles.bitcoinBtcTxt}>
//             <Text>
//               <Text style={styles.bitcoin}>
//                 <Text style={styles.bitcoin1}>Bitcoin</Text>
//               </Text>
//             </Text>
//             <Text style={[styles.btc, styles.ytdTypo]}>BTC</Text>
//           </Text>
//         </Text>
//         <Text style={[styles.text12, styles.textTypo]}>
//           <Text style={styles.text1}>$30,618.</Text>
//           <Text style={styles.text6}>60</Text>
//         </Text>
//         <View style={[styles.groupChild7, styles.groupChildPosition]} />
//         <View style={[styles.parent1, styles.parentPosition]}>
//           <Text style={[styles.text7, styles.textTypo1]}>-7.90%</Text>
//           <Image
//             style={[styles.frameIcon1, styles.frameIconPosition]}
//             source={require("../assets/frame1.svg")}
//           />
//         </View>
//       </View>


//      <Pressable style={[styles.dashboard02Item, styles.groupChildLayout]} onPress={handleSeeAllPress}>
      
//       <Text style={[styles.seeAll, styles.ytdClr]}>SeeAll</Text>
      
//       <Image
//         style={[styles.bitcoin1Icon, styles.groupItemLayout]}
//         source={require("../assets/bitcoin-1.svg")}
//       />
//      </Pressable>



      

//       <View style={[styles.rectangleParent1, styles.groupParentLayout]}>
//         <View style={[styles.groupChild5, styles.groupParentLayout]} />
//         <View style={[styles.groupChild6, styles.framePosition]} />
//         <Image
//           style={[styles.ethereumSvgrepoCom1Icon1, styles.ethereumIconLayout]}
//           source={require("../assets/ethereumsvgrepocom-1.svg")}
//         />
//         <Text style={[styles.bitcoinBtc1, styles.framePosition]}>
//           <Text style={styles.bitcoinBtcTxt}>
//             <Text>
//               <Text  style={styles.bitcoin}>
//                 <Text style={styles.bitcoin1}>Ethereum</Text>
//               </Text>
//             </Text>
//             <Text style={[styles.btc, styles.ytdTypo]}>ETH</Text>
//           </Text>
//         </Text>
//         <Text style={[styles.text16, styles.textTypo]}>
//           <Text style={styles.text1}>$1882.</Text>
//           <Text style={styles.text6}>43</Text>
//         </Text>
//         <View style={[styles.groupChild10, styles.groupChildPosition]} />
//         <View style={[styles.parent2, styles.parentPosition]}>
//           <Text style={[styles.text11, styles.textTypo1]}>+3.97%</Text>
//           <Image
//             style={[styles.frameIcon2, styles.frameIconPosition]}
//             source={require("../assets/frame2.svg")}
//           />
//         </View>
//       </View>
//       <View style={[styles.rectangleParent2, styles.groupParentLayout]}>
//         <View style={[styles.groupChild5, styles.groupParentLayout]} />
//         <View style={[styles.groupChild6, styles.framePosition]} />
//         <Image
//           style={[styles.rippleSvgrepoCom1Icon, styles.iconLayout]}
//           source={require("../assets/ripplesvgrepocom-1.svg")}
//         />
//         <Text style={[styles.bitcoinBtc1, styles.framePosition]}>
//           <Text style={styles.bitcoinBtcTxt}>
//             <Text>
//               <Text style={styles.bitcoin}>
//                 <Text style={styles.bitcoin1}>Ripple</Text>
//               </Text>
//             </Text>
//             <Text style={[styles.btc, styles.ytdTypo]}>XRP</Text>
//           </Text>
//         </Text>
//         <Text style={[styles.text20, styles.textTypo]}>
//           <Text style={styles.text1}>$0.</Text>
//           <Text style={styles.text6}>48</Text>
//         </Text>
//         <View style={[styles.groupChild10, styles.groupChildPosition]} />
//         <View style={[styles.parent2, styles.parentPosition]}>
//           <Text style={[styles.text11, styles.textTypo1]}>+0.00%</Text>
//           <Image
//             style={[styles.frameIcon2, styles.frameIconPosition]}
//             source={require("../assets/frame2.svg")}
//           />
//         </View>
//       </View>
//       <View style={[styles.rectangleParent3, styles.groupParentLayout]}>
//         <View style={[styles.groupChild5, styles.groupParentLayout]} />
//         <View style={[styles.groupChild6, styles.framePosition]} />
//         <Image
//           style={styles.litecoin1Icon}
//           source={require("../assets/litecoin-1.svg")}
//         />
//         <Text style={[styles.bitcoinBtc1, styles.framePosition]}>
//           <Text style={styles.bitcoinBtcTxt}>
//             <Text>
//               <Text style={styles.bitcoin}>
//                 <Text style={styles.bitcoin1}>Litecoin</Text>
//               </Text>
//             </Text>
//             <Text style={[styles.btc, styles.ytdTypo]}>LTC</Text>
//           </Text>
//         </Text>
//         <Text style={[styles.text24, styles.textTypo]}>
//           <Text style={styles.text1}>$97.</Text>
//           <Text style={styles.text6}>41</Text>
//         </Text>
//         <View style={[styles.groupChild7, styles.groupChildPosition]} />
//         <View style={[styles.parent1, styles.parentPosition]}>
//           <Text style={[styles.text7, styles.textTypo1]}>-7.90%</Text>
//           <Image
//             style={[styles.frameIcon1, styles.frameIconPosition]}
//             source={require("../assets/frame1.svg")}
//           />
//         </View>
//       </View>
//       <View style={[styles.rectangleParent4, styles.groupParentLayout]}>
//         <View style={[styles.groupChild5, styles.groupParentLayout]} />
//         <View style={[styles.groupChild6, styles.framePosition]} />
//         <Image
//           style={[styles.ethereumSvgrepoCom1Icon1, styles.ethereumIconLayout]}
//           source={require("../assets/usdt-1.svg")}
//         />
//         <Text style={[styles.bitcoinBtc1, styles.framePosition]}>
//           <Text style={styles.bitcoinBtcTxt}>
//             <Text>
//               <Text style={styles.bitcoin}>
//                 <Text style={styles.bitcoin1}>Tether</Text>
//               </Text>
//             </Text>
//             <Text style={[styles.btc, styles.ytdTypo]}>USDT</Text>
//           </Text>
//         </Text>
//         <Text style={[styles.text28, styles.textTypo]}>
//           <Text style={styles.text1}>$1.</Text>
//           <Text style={styles.text6}>00</Text>
//         </Text>
//         <View style={[styles.groupChild7, styles.groupChildPosition]} />
//         <View style={[styles.parent5, styles.parentPosition]}>
//           <Text style={[styles.text31, styles.textTypo1]}>-0.90%</Text>
//           <Image
//             style={[styles.frameIcon7, styles.frameIconPosition]}
//             source={require("../assets/frame1.svg")}
//           />
//         </View>
//       </View>
//       <View style={[styles.rectangleParent5, styles.groupParentLayout]}>
//         {/* <View style={[styles.groupChild5, styles.groupParentLayout]} /> */}
//         {/* <View style={[styles.groupChild6, styles.framePosition]} /> */}
//         <Image
//           style={[styles.icon, styles.iconLayout]}
//           contentFit="cover"
//           source={require("../assets/3265299-1.png")}
//         />
//         <Text style={[styles.bitcoinBtc1, styles.framePosition]}>
//           <Text style={styles.bitcoinBtcTxt}>
//             <Text>
//               <Text style={styles.bitcoin}>
//                 <Text style={styles.bitcoin1}>Dogecoin</Text>
//               </Text>
//             </Text>
//             <Text style={[styles.btc, styles.ytdTypo]}>DOGE</Text>
//           </Text>
//         </Text>
//         <Text style={[styles.text32, styles.textTypo]}>
//           <Text style={styles.text1}>$0.</Text>
//           <Text style={styles.text6}>065</Text>
//         </Text>
//         <View style={[styles.groupChild10, styles.groupChildPosition]} />
//         <View style={[styles.parent2, styles.parentPosition]}>
//           <Text style={[styles.text11, styles.textTypo1]}>+0.90%</Text>
//           <Image
//             style={[styles.frameIcon2, styles.frameIconPosition]}
//             source={require("../assets/frame2.svg")}
//           />
//         </View>
//       </View>
      
      
      
//     </View>
//   </ScrollView>
//   );
// };

// const styles = StyleSheet.create({
//   textPosition: {  
//     textAlign: "left",
//     left: "45%",
//     position: "absolute",
    
//   },
//   parentPosition1: {  // 1s1 arrow position
//     left: "50%",
//     position: "absolute",
//   },
//   ytdTypo: {
//     fontSize: FontSize.size_3xs,
//     fontFamily: FontFamily.sFProDisplay,
    
//   },
//   frameIconPosition: {
//     maxHeight: "100%",
//     maxWidth: "100%",
//     left: "0%",
//     bottom: "0%",
//     top: "0%",
//     height: "100%",
//     position: "absolute",
//     overflow: "hidden",
//   },
//   myWatchlistTypo: { //my watchlist heading 
//     width: 128,
//     alignItems: "center",
//     display: "flex",
//     textAlign: "left",
//     fontFamily: FontFamily.sFProDisplay,
//     fontSize: FontSize.size_base,
//     left: "50%",
//     marginLeft: -189.5,
//     position: "absolute",
//   },
//   groupItemLayout: {
//     height: 20,
//     position: "absolute",
//   },
//   ytdClr: {
//     color: Color.white,
//     textAlign: "center",
//   },

 

//   groupLayout1: { //2 watch list boxes context
//     height: 40,
//     width: 162,
//     position: "absolute",
//     //backgroundColor:Color.cornflowerblue,
//   },
//   groupChildPosition1: {  //for watch list boxes
//     borderRadius: Border.br_3xs,
//     left: 0,
//     top: 0,
    
//   },
//   groupLayout: {
//     width: 15,
//     height: 23,
    
//   },
//   bitcoinFlexBox: {//texts in watchlist boxes
//     width: 120,
//     alignItems: "center",
//     display: "flex",
//     textAlign: "left",
    
//   },
//   groupChildLayout: {//up arrow down arrow watchlist see all boxes
//     width: 50,
//     height: 20,
//     borderRadius: Border.br_81xl,
//     position: "absolute",
   
//   },
//   groupPosition: {
//     height: 19,
//     top: 62,
//     left: "10%",
//     position: "absolute",
    
//   },
//   textTypo1: {//small texts all
//     fontSize: FontSize.size_5xs,
//     top: 5,
//     color: Color.gray_100,
//     textAlign: "left",
//     fontFamily: FontFamily.sFProDisplay,
//     fontWeight: "500",
//     left: "44%",
//     position: "absolute",
    
//   },
//   ethereumIconLayout: {   //ethereum icon and tether icon only
//     top: 14,
//     height: 16,
//     width: 16,
//     left: 3,
//     position: "absolute",
//     overflow: "hidden",
   
//   },
//   groupParentLayout: {  //all crypto  assests boxes movement main
//     height: 52,
//     width: 372,
//     position: "absolute",
    
//   },
//   framePosition: {  //crypto all headding box 
//     top: 8,
//     left: "42%",
//     position: "absolute",
    
//   },
//   textTypo: {               //crypto all $values
//     textAlign: "right",
//     top: 12,
//     letterSpacing: -0.3,
//     fontWeight: "700",
//     fontFamily: FontFamily.sFProDisplay,
//     fontSize: FontSize.size_base,
//     left: "48%",
//     position: "absolute",
    
//   },
//   groupChildPosition: { //crypto assests small arrow boxes
//     left: 295,
//     top: 13,
//     width: 50,
//     height: 20,
//     borderRadius: Border.br_81xl,
//     position: "absolute",
  
//   },
//   parentPosition: { ////crypto assests total arrows with num
//     marginLeft: 147.5,
//     top: 13,
//     height: 19,
//     left: "40%",
//     position: "absolute",
    
//   },
//   iconLayout: {//ripple icon
//     height: 14,
//     position: "absolute",
    
//   },
//   groupChild23Position: {
//     height: 25,
//     marginLeft: -187.5,
//     width: 375,
//     left: "50%",
//     position: "absolute",
//   },
//   dashboard02Layout: {//depposite withdraw boxes
//     height: 48,
//     top: 175,
//     width: 166,
//     backgroundColor: Color.whitesmoke,
//     borderRadius: Border.br_81xl,
//     position: "absolute",
    
//   },
//   dashboard02ChildLayout: {//depposite withdraw arrow circle
//     height: 40,
//     width: 40,
//     backgroundColor: Color.cornflowerblue,
//     top: 179,
//     borderRadius: Border.br_81xl,
//     position: "absolute",
//   },
//   frameIconLayout: {//depposite withdraw arrow position
//     bottom: "74.01%",
//     top: "26.3%",
//     width: "6.4%",
//     height: "3.96%",
//     maxHeight: "100%",
//     maxWidth: "100%",
//     position: "absolute",
//     overflow: "hidden",
//   },
//   navLayout: {//navbar layout
//     height: 44,
//     position: "absolute",

    
//   },
//   borderBorder: {//upside of the navbar may be battery %
//     borderWidth: 1,
//     borderStyle: "solid",
//   },
//   timePosition: {
//     top: "50%",
//     position: "absolute",
 
//   },
//   maskGroupPosition: {//profile photo and notification icons
//     top: 7,
//     width: 30,
//     height: 30,
//     position: "absolute",
    
//   },
//   currentPortfolioValue: {//urrentPortfolioValue text
//     top: 100,
//     color: Color.darkgray,
//     fontFamily: FontFamily.sFProDisplay,
//     fontWeight: "500",
//     fontSize: FontSize.size_base,
//     textAlign: "left",
//     marginLeft: -170.5,
    
//   },
//   groupChild: {//current protfolio value small circle 
//     left: 165,
//     width: 60,
//     height: 30,
//     backgroundColor: Color.peachpuff,
//     borderRadius: Border.br_81xl,
//     top: 4,
//     position: "absolute",
//   },
//   arrowLongSquareUp: {//hodden Arrow
//     height: "63.16%",
//     width: "9.2%",
//     top: "23.68%",
//     right: "100%",
//     bottom: "13.16%",
//     left: "86.8%",
//     position: "absolute",
    
//   },
//   text1: {//intigers all
//     color: Color.gray_100,
//     left:-95,
    
//   },
//   text2: {//current portfolio float value
//     color: Color.darkgray,
    
//   },
//   text: {//current portfolio value font property
//     marginLeft: -120.5,
//     fontSize: 32,
//     fontWeight: "700",
//     top: 0,
//     fontFamily: FontFamily.sFProDisplay,
    
//   },
//   rectangleParent: {//current portfolio value property $23500 
//     top: 121,
//     width: 261,
//     height: 38,
//     left: 16,
//     position: "absolute",
    

//   },
//   text3: {      //current portfollio small box value
//     top: 5,
//     fontSize: FontSize.size_3xs,
//     marginLeft: -5,
//     color: Color.gray_100,
//     textAlign: "left",
//     fontWeight: "500",
//     left: "50%",
//     position: "absolute",
    
    
    
//   },
//   frameIcon: {     // current portfollio small box value 1st arrow
//     width: "45.53%",
//     right: "54.47%",
   
//   },

//   parent: {        //1st arrow with value
//     marginLeft: -20,
//     top: 129,
//     width: 48,
//     height: 22,
//   },

//   myWatchlist: {//my watchlist small text
//     top: 0,
//     color: Color.darkgray,
//     fontWeight: "500",
   
    
//   },
//   groupItem: {  //ytd background shadow
//     width: 30,
//     height: 20,
//     backgroundColor: Color.gray_100,
//     left: 363,
//     top: 0,
//     borderRadius: Border.br_81xl,
    
//   },
//   ytd: {//ytd text background
//     marginLeft: 155.5,
//     textAlign: "center",
//     fontWeight: "600",
//     fontSize: FontSize.size_3xs,
//     fontFamily: FontFamily.sFProDisplay,
//     top: 4,
//     left: "62%",
//     position: "absolute",
   
//   },
//   groupInner: {  //Mtd box background
//     left: 321,
//     backgroundColor: Color.whitesmoke,
//     height: 20,
//     width: 34,
//     top: 0,
//     borderRadius: Border.br_81xl,
//     position: "absolute",
//   },
//   mtd: {//mtd text
//     fontWeight:"bold",
//     marginLeft: 125.5,
//     textAlign: "center",
//     fontWeight: "600",
//     color: Color.gray_100,
//     top: 4,
//     fontSize: FontSize.size_3xs,
//     left: "59%",
//     position: "absolute",
   
//   },
  
//   ellipseView: {  // wish list icon background color
//     backgroundColor: Color.gray_200,
//     top: 6,
//     left: "50%",
//     position: "absolute",
//     marginLeft: -75,
//     width: 30,
//   },
//   bitcoinSvgrepoCom1Icon: {//bitcoin my watclist icon
//     top: 7,
//     left: 7,
//     width: 13,
//     height: 21,
//     position: "absolute",
//     overflow: "hidden",
    
//   },
//   bitcoin1: {//bitcoin etherium text
//     fontSize: FontSize.size_smi,
  
//   },
//   bitcoin: {
//     fontWeight: "600",
    
//     color: Color.gray_100,
//     fontFamily: FontFamily.sFProDisplay,
    
//   },
//   btc: {//small btc eth text
//     color: Color.gray_500,
//     fontWeight: "500",
    
//   },

//   // Terminal error

//   // bitcoinBtcTxt: {
//   //   lineBreak: "anywhere",
//   //   width: "100%",
    
//   // },

//   bitcoinBtc: {//bitcoin btc inside box text
//     marginLeft: -44,
//     top: 8,
//     left: "40%",
//     position: "absolute",
    
//   },
  
//   text6: {//all $ data float numbers 
//     color: Color.gray_500,
   
//   },
//   text4: {  //bitcoins value text
//     letterSpacing: -0.3,
//     top: 34,
//     marginLeft: -75,
//     fontWeight: "700",
//     textAlign: "left",
//     fontFamily: FontFamily.sFProDisplay,
//     fontSize: FontSize.size_base,
//     left: "50%",
//     position: "absolute",
//   },
//   groupChild1: {
//     left: 10,  //this is 7.90 backgroung shadow box
//     backgroundColor: Color.gray_300,
//     width: 50,
//     top: 62,
    
//   },
//   text7: {//its only for 7.90 value position 
//     marginLeft: -4.5,
//   },
//   frameIcon1: {    //its only for 7.90 value position  arrow
//     width: "45.47%",
//     right: "55.53%",  
//   },
//   group: {         //in washlist 7.90 with arrow only
//     marginLeft: -4,
//     width: 43,
//   },
  
  
//   ethereumSvgrepoCom1Icon: { //Ethereum trading icon
//     top: 10,
//     height: 16,
//     width: 16,
//     left: 6,
//   },
//   groupChild4: { //Ethereum trading num background shadow 
//     left: 7,
//     backgroundColor: Color.gray_300,
//     width: 50,
//     top: 62,
//   },
//   text11: {  //Ethereum and ripple small box values
//     marginLeft: -3,
//   },
//   frameIcon2: {  //arrow icons
//     width: "42.5%",
//     right: "57.5%",
    
//   },
//   container: {  //Etherium
//     marginLeft: 5,
//     width: 45,
//   },
  
//   myWatchlistParent: {  //wishlist two boxes movements
//     top: 239,
//     height: 121,
//     width: 343,
//     left: "50%",
//     marginLeft: -200.5,
//     position: "absolute",
//   },
  
//   dashboard02Child: { //Assets bg
//     borderTopLeftRadius: Border.br_11xl,
//     borderTopRightRadius: Border.br_11xl,
//     height: 436,
//     width:400,
//     backgroundColor: Color.aliceblue,
//     top: 376,
//     left: 6,
//     position: "absolute",
//   },
//   cryptoAssets: {//cryptoAssets text
//     top: 395,
//     color: Color.gray_100,
//     //color: Color.cornflowerblue,
//     fontWeight: "700",
//     paddingLeft: 9,
    
    
//   },
//   groupChild5: { //Asset list bg 
//     backgroundColor: Color.gray_400,
//     borderRadius: Border.br_3xs,
//     left: -17,
//     top: -5,
    
//   },
//   groupChild6: {  //crypto Assests icon bg shadow
//     marginLeft: -160.5,
//     backgroundColor: Color.aliceblue,
//     width: 30,
//     height: 30,
//     borderRadius: Border.br_3xs,
//   },
//   bitcoinBtc1: {   //coins names list
//     marginLeft: -120.5,
//     width: 82,
//     alignItems: "center",
//     display: "flex",
//     textAlign: "left",
    
//   },
//   text12: {
//     marginLeft: 32.5,
//   },
//   groupChild7: { // crpto asset icon shadow for 3
//     backgroundColor: Color.peachpuff,
//     left: 20,
//   },
//   parent1: {
//     width: 49,
//   },
//   groupView: {  //crypto 1st box movements
//     top: 434,
//     left: 37,  
//   },
//   dashboard02Item: {   //seeall box
//     top: 395,
//     backgroundColor: Color.gray_100,
    
//     width: 60,
//     left: 340,
//   },

  
//   // seeAll: {
//   //       marginLeft: 155.5,
//   //       top: 399,
//   //       textAlign: "center",
        


//   //       fontSize: FontSize.size_3xs,
//   //       fontFamily: FontFamily.sFProDisplay,

//   //       left: "47%",
//   //       position: "absolute",
    
   
//   // },

   
//   bitcoin1Icon: {//icon bit coin
//     top: 50,
//     left:-300 ,

//     width: 20,
//     overflow: "hidden",
//   },
//   ethereumSvgrepoCom1Icon1: {
//     top: 16,
//     left: 8,
    
//   },
//   text16: { //Assets $1882.43
//     marginLeft: 45.5,
//   },
//   groupChild10: {//assets 2 and 3 bg shadow 
//     backgroundColor: Color.powderblue,
//   },
//   parent2: {//assets 2 and 3 bg
//     width: 45, 
//   },


//   //etherium 


//   rectangleParent1: { //Ethereumeethe box
//     top: 493,
//     left: 37,  
//   },

//   //riopple
//   rippleSvgrepoCom1Icon: { //ripple icon
//     width: 14,
//     top: 15,
//     height: 14,
//     left: 3,
//     overflow: "hidden",
//   },
//   text20: {//ripple value text
//     marginLeft: 70.5,
    
//   },
//   rectangleParent2: { //RippleXRP box
//     top: 552,
//     left: 37,
//   },
//   litecoin1Icon: {//icon
//     top: 15,
//     marginLeft: 5,
//     width: 12,
//     height: 12,
//     position: "absolute",
//     overflow: "hidden",
//   },



//   text24: {           //#97.41
//     marginLeft: 60.5,
//     marginTop: -1,
//   },
  
//   rectangleParent3: {//litecoin box
//     top: 611,
//     left: 37,
//   },
//   text28: {//Teather $value
//     marginLeft: 68.5,
    
//   },
//   text31: { //Teather arrow value
//     marginLeft: -1,
//     fontSize: FontSize.size_5xs,
//   },
//   frameIcon7: {//Teather arrow
//     width: "43.46%",
//     right: "56.54%",
//   },
//   parent5: {//Teather small box content
//     width: 44,
//   },
//   rectangleParent4: {////Teather box
//     top: 669,
//     left: 37,
//   },
//   icon: {
//     width: 14,
//     top: 18,
//     height: 14,
//     left: 16,
    
//   },
//   text32: {
//     marginLeft: 55.5,
//   },
//   rectangleParent5: {
//     top: 727,
//     left: 21,
//     backgroundColor: Color.gray_400,
//     borderRadius: Border.br_3xs,
//     width:45,
//   },
//   groupChild23: {
//     backgroundColor: Color.aliceblue,
//     top: 0,
//   },
//   frame: {
//     marginLeft: -69.5,
//     width: 118,
//     height: 5,
//     backgroundColor: Color.gray_100,
//     borderRadius: Border.br_81xl,
//     top: 10,
//     overflow: "hidden",
//   },
//   rectangleParent6: {
//     top: 787,
//   },
//   dashboard02Inner: {  //diposit background
//     left: 7,
//   },
//   deposit: {
//     marginLeft: -110.5,
//     top: 188,
//     color: Color.gray_100,
//     fontFamily: FontFamily.sFProDisplay,
//     fontWeight: "500",
//     fontSize: FontSize.size_base,
//     textAlign: "center",
//   },
//   dashboard02Child1: {
//     left: 10,
//   },
//   frameIcon9: {     //deposit icon
//     right: "10.13%",
//     left: "4.10%",
    
//   },
//   dashboard02Child2: {  //withdrow background shadow
//     left: 240,
//   },
//   dashboard02Child3: {  //withdraw
//     left: 363,
//  },
//    dashboard02Child4: {
//     left: 163,
//     borderBottomRightRadius: Border.br_base,
//     borderBottomLeftRadius: Border.br_base,
//     height: 14,
//     top: 376,
//     width: 50,
//     backgroundColor: Color.white,
//   },
//   dashboard02Child5: {
//     top: 370,
//     left: 193,
//     borderRadius: Border.br_base,
//     height: 3,
//     width: 24,
//     backgroundColor: Color.gray_100,
//     position: "absolute",
//   },
//   withdraw: {             //withdraw 
//     marginLeft: 89.5,
//     top: 189,
//     color: Color.gray_100,
//     fontFamily: FontFamily.sFProDisplay,
//     fontWeight: "600",
//     fontSize: FontSize.size_base,
//     textAlign: "left",
//   },
//   frameIcon10: {   //withdraw form arrow icon
//     right: "7.47%",
//     left: "90.13%",
//     //paddingTop:20,
//   },
//   statusBar: {
    
//    // width: 400,
//    // height: 44,
//     borderColor: "#1c1e32",
//     position: "absolute",
//     left: 0,
//     backgroundColor: Color.gray_100,
//     top: 0,
//   },
//   time: {
//     marginTop: -9,
//     fontSize: 15,
//     letterSpacing: 0,
//     fontFamily: FontFamily.sFProText,
//     width: 54,
//     textAlign: "center",
//     color: Color.white,
//     fontWeight: "600",
//     left: 0,
//   },
//   border: {
//     marginTop: -5.67,
//     right: 2,
//     borderRadius: 3,
//     borderColor: "#fff",
//     width: 20,
//     opacity: 0.35,
//     height: 11,
//     borderWidth: 1,
//     borderStyle: "solid",
//   },
//   capIcon: {
//     marginTop: -2,
//     right: 0,
//     width: 1,
//     height: 4,
//     opacity: 0.4,
//   },
//   capacity: { //battary capacity
//     marginTop: -3.67,
//     right: 4,
//     borderRadius: 1,
//     width: 18,
//     height: 7,
//     backgroundColor: Color.white,
//   },
//   battery: {
//     marginTop: -4.67,
//     right: 2,
//     height: 11,
//     width: 24,
//   },
//   wifiIcon: {   //wifi
//     width: 15,
//     height: 16,
//     left:270,
//   },
//   cellularConnectionIcon: { //signal
//     width: 17,
//     height: 11,
//     left:320,
//   },
//   iosStatusBar: {
//     marginLeft: -189.5,
//     height: 44,
//     width: 375,
//     left: "50%",
//     top: 0,
//   },
//   navChild: {
//     marginLeft: -187.5,
//     height: 44,
//     width: 375,
//     left: "50%",
//     top: 0,
//     backgroundColor: Color.white,
//   },
//   welcome: {
//     fontWeight: "700",
//     fontFamily: FontFamily.sFProDisplay,
//   },
//   satyam: {
//     fontFamily: FontFamily.sFProDisplay,
//   },
//   text36: {
//     fontFamily: FontFamily.sFProDisplay,
//     fontWeight: "500",
//   },
//   welcomeSatyam: {
//     marginLeft: -136.5,
//     top: 12,
//     fontSize: 14,
//     color: Color.gray_100,
//   },
//   maskGroupIcon: {
//     left: 0,
//   },
//   maskGroupIcon1: {
//     left: 350,
//   },
//   nav: {
//     top: 44,
//     marginLeft: -187.5,
//     height: 44,
//     width: 375,
//     left: "50%",
//   },
//   maskGroupIcon2: {
//     top: 51,
//     left: 330,
//     position: "absolute",
//   },
//   dashboard02: {
//     flex: 1,
//     height: 812,
//     overflow: "hidden",
//     width: "100%",
//     backgroundColor: Color.white,
//   },
  
  
//   // 4 boxes
//   container: {
//     borderRadius: Border.br_3xs,
//     flexDirection: 'row',
//     justifyContent: 'space-between', // Distribute space evenly between children
//     padding: 31, // Add some padding for better visibility
//   },
//   rectangleGroup: { //bitcoin total box 
//     left: 1,
//     top: 31,
//     width: 16,
//   },
//   rectangleContainer: { //Etherium totoal box
//     left: 103,
//     top: 31,
//     width: 100,
//   },
//   groupChild2: {  //Ethereum box
//     backgroundColor: Color.powderblue,
//     height: 90,
//     width: 95,
//     position: "absolute",
//   },
//   rectangleView: { //shadow bos bitcoin in wa
//     backgroundColor: "#c1c2eb",
//     height:90,
//     width: 95,
//     position: "absolute",
//   },
//   box1: {
//     marginLeft: 174,
//     paddingTop: 14,
//     width: 95,
//     height: 90,
//     borderRadius: Border.br_3xs,
//     backgroundColor: Color.peachpuff,
//   },
//   box2:{
//     marginLeft: 5,
//     marginTop: 1,
//     width: 95,
//     height: 90,
//     borderRadius: Border.br_3xs,
//     backgroundColor: Color.powderblue,
//   },
// });

// export default Dashboard02;