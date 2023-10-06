// export const styles = {
//     container3: {
//       //paddingVertical: 40,
//       //marginTop:-50,
//       //paddingBottom:15,
//       //padding:10,
//       flexDirection: 'row',
//       justifyContent: 'center',
//       alignItems: 'center',
//       //backgroundColor: '#1C1E32',
//       //marginLeft:-15,
//       //margin: 10,
//       backgroundColor:'#FFFFFF',
//     },
//     ellipse: {
//       width: 166,
//       height: 48,
//       borderRadius: 100,
//       backgroundColor: '#ECECEC',
//       justifyContent: 'center',
//       alignItems: 'center',
     
//     },
//     circle: {
//       width: 40,
//       height: 40,
//       borderRadius: 100,
//       backgroundColor: '#B1A4FF',
//       position:'absolute',
//       left: 0,
//       //marginLeft: 5,
//       justifyContent: 'center',
//       alignItems: 'center',
//     },
//     spacing: {
//       width: 10,
//     },
//     text: {
//       marginLeft: 16,
      
//       //color: 'black',
//       //textAlign: 'center',
      
      
//     },
//     withdrawText: {
//       marginRight: -10,
//       lineHeight: 19.09,
//       fontSize: 20,
//       textAlign: 'center',
//       fontWeight:500,
//       color: '#1C1E32',
//     },
//     withdrawText2: {
//       marginRight: -10,
//       lineHeight: 19.09,
//       fontSize: 20,
//       fontWeight:500,
//       color: '#1C1E32',
//     },
    
//   };




import { StyleSheet, Dimensions } from 'react-native';

const { width } = Dimensions.get('window');

export const styles = StyleSheet.create({
  container3: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    // paddingVertical: width * 0.04, remove space to the top
  },
  // ellipse: {
  //   width: width * 0.55,
  //   height: width * 0.16,
  //   borderRadius: width * 0.08,
  //   backgroundColor: '#ECECEC',
  //   justifyContent: 'center',
  //   alignItems: 'center',
  // },
  // circle: {
  //   width: width * 0.15,
  //   height: width * 0.15,
  //   borderRadius: width * 0.075,
  //   backgroundColor: '#B1A4FF',
  //   position: 'absolute',
  //   left: 0,
  //   justifyContent: 'center',
  //   alignItems: 'center',
  // },
  // spacing: {
  //   width: width * 0.03,
  // },


  ellipse: {
    width: width * 0.48,
    height: width * 0.13,
    borderRadius: width * 0.08,
    backgroundColor: '#ECECEC',
    justifyContent: 'center',
    alignItems: 'center',
  },
  circle: {
    width: width * 0.12,
    height: width * 0.12,
    borderRadius: width * 0.075,
    backgroundColor: '#B1A4FF',
    position: 'absolute',
    left: 0,
    justifyContent: 'center',
    alignItems: 'center',
  },
  spacing: {
    width: width * 0.01,
  },



  text: {
    marginLeft: width * 0.04,
    fontSize: width * 0.05,
    fontWeight: '500',
    color: '#1C1E32',
  },
  withdrawText: {
    marginRight: -width * 0.01,
    lineHeight: width * 0.056,
    fontSize: width * 0.05,
    textAlign: 'center',
    fontWeight: '500',
    color: '#1C1E32',
  },


  //styles for model container
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalText: {
    fontSize: 20,
    marginBottom: 20,
  },
});
