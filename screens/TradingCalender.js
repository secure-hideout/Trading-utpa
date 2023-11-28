// import React from 'react';
// import { View, StyleSheet } from 'react-native';
// import Pdf from 'react-native-pdf';

// const TradingCalendar = () => {
//   return (
//     <View style={styles.container}>
//       <Pdf
//         source={{ uri: 'URL_TO_YOUR_TRADING_CALENDAR_PDF', cache: true }}
//         onLoadComplete={(numberOfPages, filePath) => {
//           console.log(`Number of pages: ${numberOfPages}`);
//         }}
//         onPageChanged={(page, numberOfPages) => {
//           console.log(`Current page: ${page}`);
//         }}
//         onError={(error) => {
//           console.log(error);
//         }}
//         style={styles.pdf}
//       />
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     justifyContent: 'center',
//     alignItems: 'center',
//   },
//   pdf: {
//     flex: 1,
//     width: '100%',
//   },
// });

// export default TradingCalendar;




// import React from 'react';
// import { View, StyleSheet } from 'react-native';
// import { PDFView } from 'react-native-pdf';

// const TradingCalendarScreen = () => {
 
//     const pdfUrl = 'https://zerodha.com/z-connect/traders-zone/holidays/market-holiday-calendar-2023-nse-bse-and-mcx';
  
//   return (
//     <View style={styles.container}>
//       {/* Use PDFView to display a PDF */}
//       <PDFView
//         fadeInDuration={250.0}
//         style={{ flex: 1 }}
//         resource={{ uri: pdfUrl, cache: true }}
//         onLoadComplete={(numberOfPages, filePath) => {
//           console.log(`number of pages: ${numberOfPages}`);
//         }}
//         onPageChanged={(page, numberOfPages) => {
//           console.log(`current page: ${page}`);
//         }}
//         onError={(error) => {
//           console.log(error);
//         }}
//       />
//     </View>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//   },
// });

// export default TradingCalendarScreen;