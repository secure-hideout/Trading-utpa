import React, { useState, useEffect } from "react";
import { View, StyleSheet, TouchableOpacity, Text, Platform } from "react-native";
import { WebView } from "react-native-webview";
import {
  widthPercentageToDP,
  heightPercentageToDP,
} from "react-native-responsive-screen";

const Graph = ({ symbol, selectedInterval, isCandleChart, isCompressed }) => {
  const style = isCandleChart ? "1" : "10";

  const webViewWidth = isCompressed
    ? widthPercentageToDP("100%") // Use full width when compressed
    : widthPercentageToDP("90%"); // Use 90% of the width when not compressed
    
  const embedCode = `
    <!-- Paste your TradingView embed code here -->
    <div class="tradingview-widget-container">
      <script type="text/javascript" src="https://s3.tradingview.com/tv.js"></script>
      <script type="text/javascript">
        new TradingView.widget({
          "width": "100vh",
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

  const embedIOSCode = `
    <!-- Paste your TradingView embed code here -->
    <div class="tradingview-widget-container">
      <script type="text/javascript" src="https://s3.tradingview.com/tv.js"></script>
      <script type="text/javascript">
        new TradingView.widget({
          "width": "100vh",
          "height": 1000,
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
      <WebView
        style={styles.graphView}
        source={{ html: Platform.OS === "ios" ? embedIOSCode : embedCode }}
        scalesPageToFit={false}
        javaScriptEnabled={true}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  graph: {
    paddingTop: 5,
    display: "flex",
    height: Platform.OS === "ios" ? 600 : heightPercentageToDP("100%"), // Set the height as needed
    right: Platform.OS === "ios" ? 3 : 6,
  },
  graphView: {
    backgroundColor: "transparent",
  },
});

export default Graph;