import React, { Component } from 'react';
import { StyleSheet, View, Text, Button, ScrollView, TouchableOpacity, TouchableWithoutFeedback, SafeAreaView, FlatList } from 'react-native';
import { Border, Color, FontFamily, FontSize } from "../GlobalStyles";



class Rectangleboxes1 extends Component {
  render() {
    const {
      Open,
      openValue,
      Close,
      closeValue,
      High,
      Hvalue,
      Low,
      Lvalue,

    } = this.props;

    return (
      <View style={styles.info}>
        <View style={styles.rectangleboxes}>
          <View style={styles.detailsbox}>
            <View style={styles.openclose}>
              < Text style={styles.open}>{Open}</Text>
              <Text style={styles.openvalue}>{openValue}</Text>
            </View>
            <View style={styles.openclose1}>
              <Text style={styles.close}>{Close}</Text>
              <Text style={styles.closevalue}>{closeValue}</Text>
            </View>
          </View>


          <View style={styles.detailsbox1}>
            <View style={styles.highlow}>
              <Text style={styles.high}>{High}</Text>
              <Text style={styles.highvalue}>{Hvalue}</Text>
            </View>
            <View style={styles.hightlow1}>
              <Text style={styles.low}>{Low}</Text>
              <Text style={styles.lowvalue}>{Lvalue}</Text>
            </View>
          </View>
        </View>
      </View>
    );
  };
}


const styles = StyleSheet.create({

  info: {
    top: 530,
    marginLeft: 1,
    marginRight: 2
  },

  rectangleboxes: {
    bottom: 510,
    right: 103,
    flexDirection: 'row',
    // borderRadius: Border.br_3xs,

  },

  detailsbox: {
    width: '50%',
    height: 80,
    left: 104,
    borderWidth: 1,
    borderColor: '#BEBEBE',
    borderRadius: Border.br_3xs,
  },
  openclose: {
    flexDirection: 'row',
    top: 13,
  },
  open: {
    flex: 1,
    left: 20,
    color: '#1C1E32',
  },
  openvalue: {
    left: -22,
    fontWeight: 'bold',
  },
  openclose1: {
    flexDirection: 'row',
    top: 26,
  },
  close: {
    flex: 1,
    left: 20,
    color: '#1C1E32',
  },
  closevalue: {
    left: -25,
    fontWeight: 'bold',
  },

  detailsbox1: {
    width: '49%',
    height: 80,
    left: 108,
    borderWidth: 1,
    borderColor: '#BEBEBE',
    borderRadius: Border.br_3xs,
  },
  highlow: {
    flexDirection: 'row',
    top: 13,
  },

  high: {
    flex: 1,
    left: 18,
    color: '#1C1E32',
  },
  highvalue: {
    left: -20,
    fontWeight: 'bold',
  },
  hightlow1: {
    flexDirection: 'row',
    top: 26,
  },
  low: {
    flex: 1,
    left: 18,
    color: '#1C1E32',
  },
  lowvalue: {
    right: 23,
    fontWeight: 'bold',
  },

})

export default Rectangleboxes1;

// import React, { Component } from 'react';
// import { StyleSheet, View, Text, Button, ScrollView, TouchableOpacity, TouchableWithoutFeedback, SafeAreaView, FlatList } from 'react-native';
// import { Border, Color, FontFamily, FontSize } from "../GlobalStyles";

// class Rectangleboxes1 extends Component {
//   render() {
//     const {
//       Open,
//       openValue,
//       Close,
//       closeValue,
//       High,
//       Hvalue,
//       Low,
//       Lvalue,

//     } = this.props;

//     return (
//       <View style={styles.info}>
//         <View style={styles.rectangleboxes}>
//           <View style={styles.detailsbox}>
//             <View style={styles.openclose}>
//               < Text style={styles.open}>{Open}</Text>
//               <Text style={styles.openvalue}>{openValue}</Text>
//             </View>
//             <View style={styles.openclose1}>
//               <Text style={styles.close}>{Close}</Text>
//               <Text style={styles.closevalue}>{closeValue}</Text>
//             </View>
//           </View>


//           <View style={styles.detailsbox1}>
//             <View style={styles.highlow}>
//               <Text style={styles.high}>{High}</Text>
//               <Text style={styles.highvalue}>{Hvalue}</Text>
//             </View>
//             <View style={styles.hightlow1}>
//               <Text style={styles.low}>{Low}</Text>
//               <Text style={styles.lowvalue}>{Lvalue}</Text>
//             </View>
//           </View>
//         </View>
//       </View>
//     );
//   };
// }


// const styles = StyleSheet.create({

//   info: {
//     top: 530,
//     marginLeft: 1,
//     marginRight: 2
//   },

//   rectangleboxes: {
//     bottom: 510,
//     right: 103,
//     flexDirection: 'row',
//     // borderRadius: Border.br_3xs,

//   },

//   detailsbox: {
//     width: '50%',
//     height: 80,
//     left: 104,
//     borderWidth: 1,
//     borderColor: '#BEBEBE',
//     borderRadius: Border.br_3xs,
//   },
//   openclose: {
//     flexDirection: 'row',
//     top: 13,
//   },
//   open: {
//     left: 20,
//     color: '#1C1E32',
//   },
//   openvalue: {
//     left: 82,
//     fontWeight: 'bold',
//   },
//   openclose1: {
//     flexDirection: 'row',
//     top: 26,
//   },
//   close: {
//     left: 20,
//     color: '#1C1E32',
//   },
//   closevalue: {
//     left: 80,
//     fontWeight: 'bold',
//   },

//   detailsbox1: {
//     width: '49%',
//     height: 80,
//     left: 108,
//     borderWidth: 1,
//     borderColor: '#BEBEBE',
//     borderRadius: Border.br_3xs,
//   },
//   highlow: {
//     flexDirection: 'row',
//     top: 13,
//   },

//   high: {
//     left: 18,
//     color: '#1C1E32',
//   },
//   highvalue: {
//     left: 83,
//     fontWeight: 'bold',
//   },
//   hightlow1: {
//     flexDirection: 'row',
//     top: 26,
//   },
//   low: {
//     left: 18,
//     color: '#1C1E32',
//   },
//   lowvalue: {
//     left: 86,
//     fontWeight: 'bold',
//   },

// })

// export default Rectangleboxes1;