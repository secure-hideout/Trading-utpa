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
    fontWeight: '600',
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

  buttonList: {
    flex: 1,
    paddingTop: 10,
    width: "100%",
    backgroundColor: "#f5f5f5",
  },
  button: {
    marginBottom: 4,
    backgroundColor: "#f5f5f5",
    width: "100%",
  },
  buttons: {
    paddingTop: 17,
    justifyContent: 'center',
    flexDirection: "row",
    //marginLeft: 10,
  },
  buttonText: {
    paddingTop: 4,
    paddingRight: 15,
    justifyContent: "center",
    alignItems: "center",
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
    left: 4,
  },
  conform: {
    textAlign: "center",
    fontSize: 18,
    fontWeight: "700",
    lineHeight: 19.09,
    color: "rgba(28, 30, 50, 1)",
    top: 15,
  },
  conform1: {
    paddingBottom: 20,
    textAlign: "center",
    fontWeight: '600',
    fontSize: 16,
    top: 15,
  },
  button1: {
    paddingLeft: 5,
   // width: "47%",
    height: 47,
    backgroundColor: "#C1C2EB",
    borderRadius: 5,
  },
  button2: {
    left: 10,
    //width: "47%",
    height: 47,
    backgroundColor: "#B7DDD2",
    borderRadius: 5,
  },
  buttonText1: {
    fontWeight: "bold",
    paddingTop: 4,
    alignItems: "center",
    color: "white",
    fontSize: 16,
    Left: 15,
  },
  buttonContent: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    borderWidth: 1,
    borderColor: "#E3E9F0",
    //borderRadius: 10,
    backgroundColor: "rgba(255, 255, 255, 0.8)",
    padding: 12,
  },
  cardContainer4: {
    backgroundColor: "white",
    width: "95%",
    marginHorizontal: 10,
    paddingVertical: 9,
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
