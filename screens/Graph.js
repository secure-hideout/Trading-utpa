import React, { useState, useEffect } from 'react';
import { View, StyleSheet, TouchableOpacity, Text } from 'react-native';
import { WebView } from 'react-native-webview';



const Graph = ({ symbol, selectedInterval, isCandleChart, isCompressed, }) => {


  const style = isCandleChart ? '1' : '10';

  const width = isCompressed ? 400 : 500;





  const embedCode = `
  <!-- Paste your TradingView embed code here -->
  <div class="tradingview-widget-container">
    <script type="text/javascript" src="https://s3.tradingview.com/tv.js"></script>
    <script type="text/javascript">
      new TradingView.widget({
        "width": ${width},
        "height": 420,
        "symbol": "${symbol}", 
        "interval": "${selectedInterval}",
        "timezone": "Etc/UTC",
        //"theme": "light",
        "style": "${style}",
        "locale": "en",
        "toolbar_bg": "#f1f3f6",
        "enable_publishing": false,
        "hide_top_toolbar": true,
        "save_image": false,
        "container_id": "tradingview_123",
        "toolbar": ["D", "5D", "1M", "3M", "6M", "1Y"],
      });
       </script>
  </div>
   `;

  return (
    <View style={styles.graph}>
      {/* <TouchableOpacity
        style={styles.compressButton}
        onPress={() => setIsCompressed(!isCompressed)}>
        <Text style={styles.buttonText}>
          {isCompressed ? 'Expand' : 'Compress'}
        </Text>
    </TouchableOpacity> */}
      <WebView
        style={styles.graphView}
        source={{ html: embedCode }}
        scalesPageToFit={false}
        javaScriptEnabled={true}
      />
    </View>
  );
};


const styles = StyleSheet.create({

  graph: {
    paddingTop: 5,
   display: 'flex',
    height: 498,
    right: 6,
    //marginbottom: 1,
   // marginRight: 10,
   // paddingRight: 10,
   // marginLeft: 20,
    // zIndex: 4
  },
  graphView: {
    backgroundColor: 'transparent',
  },
  // buttonText: {
  //   left: 30,

  // }
})

export default Graph;