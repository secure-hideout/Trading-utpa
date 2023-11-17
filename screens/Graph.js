import React, { useState, useEffect } from 'react';
import { View, StyleSheet, TouchableOpacity, Text } from 'react-native';
import { WebView } from 'react-native-webview';



const Graph = ({ symbol, selectedInterval, isCandleChart, isCompressed, }) => {


  const style = isCandleChart ? '1' : '10';

  const width = isCompressed ? 395 : 500;





  const embedCode = `
  <!-- Paste your TradingView embed code here -->
  <div class="tradingview-widget-container">
    <script type="text/javascript" src="https://s3.tradingview.com/tv.js"></script>
    <script type="text/javascript">
      new TradingView.widget({
        "width": ${width},
        "height": 310,
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
    height: 310,
    top: 1,
    left: -7,
    // zIndex: 4
  },
  graphView: {
    backgroundColor: 'transparent',
  },
  buttonText: {
    left: 30,

  }
})

export default Graph;