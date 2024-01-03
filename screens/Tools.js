import React, { useState } from 'react';
import { View, FlatList, StyleSheet, TouchableOpacity,Text, TextInput } from 'react-native';
import {  Card, Title, Paragraph, Button, Provider  } from 'react-native-paper';
import { Calendar } from 'react-native-calendars';
import Modal from 'react-native-modal';
import SelectDropdown from 'react-native-select-dropdown'
import { useNavigation } from '@react-navigation/native';


const Tools = ({}) => {
    const navigation = useNavigation();
    const [isCalendarVisible, setCalendarVisible] = useState(false);
    const [inputValue, setInputValue] = useState('');
    const [isModalVisible, setModalVisible] = useState(false);

    const timeszone = ["IST"]
    
    const currency = [ "INR"];

    const handleEditPress = () => {
      setModalVisible(true);
    };
  
    const handleInputChange = (text) => {
      setInputValue(text);
    };
  
    const handleButtonPress = () => {
      Alert.alert('Input Value', inputValue);
    };
  
    const handleModalClose = () => {
      setModalVisible(false);
    };
  

    const handleCardPress = () => {
      setCalendarVisible(!isCalendarVisible);
      } 
  
    return (
      <View style={styles.container}>
        <Card  style={styles.card12}>
          <View style={styles.rowContainer}>
          <Text style={styles.title}>Timeszone</Text>
            <View style={styles.dropDown}>
            <SelectDropdown
            // style={{, borderRadius: 30, marginBottom: 70 }}
             data={timeszone}
             onSelect={(selectedItem, index) => {
             console.log(selectedItem, index)
            }}
            dropdownStyle={styles.dropdown}
            defaultButtonText="IST" 
           />
          </View>
        </View>
      </Card>

    <Card style={styles.card12}>
     <View style={styles.rowContainer}>
      <Text style={styles.title}>Currency</Text>
       <View style={styles.dropDown}>
       <SelectDropdown
         style={{  marginLeft: 5, bottom: 70}}
         data={currency}
         onSelect={(selectedItem, index) => {
         console.log(selectedItem, index)
       }}
       dropdownStyle={styles.dropdown}
       defaultButtonText="INR"  
       />
      </View>
     </View>
    </Card>
      
    <Card style={styles.card13}>
     <View style={styles.rowContainer}>
      <Text style={styles.title2}>Dex Address</Text>
        <TouchableOpacity style={styles.Edit} onPress={handleEditPress}>
          <Text style={styles.title1}>Edit</Text>
        </TouchableOpacity>
     </View>
    </Card>

    <Modal isVisible={isModalVisible} >
      <Card style={styles.cardContainer4}>
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <TextInput
              placeholder="Type Dex Address..."
              value={inputValue}
              onChangeText={handleInputChange}
              style={{
                height: 40,
                width: '91%',
                marginLeft: 14,
                borderColor: 'gray',
                borderWidth: 2,
                marginBottom: 10,
                paddingHorizontal: 13,
                marginTop: 15,
                borderRadius: 10,
              }}
            />
        <View style={styles.buttons}>
         <View style={styles.button1}>
           <Button onPress={handleButtonPress} labelStyle={styles.buttonText} >
            Save
           </Button> 
        </View>

        <View style={styles.button2}>
         <Button onPress={handleModalClose} labelStyle={styles.buttonText1} >
          Cancel
         </Button>
         </View>
        </View>
      </View>
    </View>
  </Card>
</Modal>
         

    <Card style={styles.card12}>
     <View style={styles.rowContainer}>
      <Text style={styles.title}>Trading Hours</Text>
       <View style={styles.dropDown}>
        <View style={styles.Open}>
          <Text  style={styles.Opening}>Opening :</Text><Text style={styles.Opening1}> 9:30 AM</Text>
        </View>
        <View style={styles.closing}>
          <Text  style={styles.close}>  Closing :</Text><Text style={styles.Opening1}> 5:00PM</Text>
        </View>
      </View>
    </View>
  </Card>


  <TouchableOpacity  onPress={() => navigation.navigate('Calender')}>
    <Card style={styles.card14}>
     <View style={styles.rowContainer}>
      <Text style={styles.title5}>Calender</Text>
       {/* {isCalendarVisible ? (
        <Calendar onDayPress={(day) => setSelectedDate(day.dateString)} />
         ) : null} */}
      </View>
    </Card>
  </TouchableOpacity>


  <Card style={styles.card14}>
     <View style={styles.rowContainer}>
      <Text style={styles.title5}>Maintenance Mode</Text>
     </View>
   </Card>
  </View>
    );
  };
  
    const styles = {
      container :{
        flex: 1,
      },
      buttons: {
        paddingTop: 17,
        flexDirection: 'row',
        marginLeft: 10
      },
      button1: {
        paddingLeft: 5,
        width: '47%',
        backgroundColor: '#EAC9B1',
        borderRadius: 50,
      },
      buttonText: {
        paddingTop: 4,
        paddingRight: 15,
        justifyContent: 'center',
        alignItems: 'center',
        color: 'white',
        fontSize: 16,
        fontWeight: 'bold',
        left: 8
      },
      dropdown: {
        paddingBottom: 10,
        marginVertical: -50
      },
      Open:{
        flexDirection:'row',
      
      },
      Opening:{
        fontWeight: 'bold',
        color:'green',
        fontSize: 16,
      },
      Opening1:{
        fontWeight: 'bold',
        

      },
      button2: {
        left: 10,
        width: '47%',
        height: 47,
        backgroundColor: '#b1a4ff',
        borderRadius: 50,
      },
      buttonText1: {
        fontWeight: 'bold',
        paddingTop: 4,
        color: 'white',
        fontSize: 16,
        Left: 15,
      },
      card14:{
        padding: 22,
        width: '100%',
        marginBottom: 7, 
        backgroundColor: '#f5f5f5',
      },
      cardContainer4:{
         backgroundColor: 'white',
         marginHorizontal: 20,
         paddingVertical: 20,
       },
      Edit:{
        borderColor: 'gray',
        borderWidth: 2,
        borderRadius: 4,
        width: 60,
        height: 35
      },
      title1:{
        fontSize: 17,
        paddingTop: 4,
        paddingHorizontal: 12
      },
      title5:{
        fontSize: 18,
        right: 10,
        fontWeight: '600',
        lineHeight: 19.09,
        color: 'rgba(28, 30, 50, 1)',
      },
      card12: {
        width: '100%',
        marginBottom: 6, 
        backgroundColor: '#f5f5f5',
      },
      opening:{
         flexDirection: 'row',
         paddingHorizontal: 5
      },
      closing:{
        paddingTop: 8,
        flexDirection: 'row',
      },
      close:{
        fontWeight: 'bold',
        color: 'red',
        fontWeight: 600 ,
        fontSize: 16,
      },
      rowContainer:{
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: 1,
        flexDirection: 'row',
      },
      card1:{
        top: 15,
        fontSize: 18,
        fontWeight: '600',
        color: 'rgba(28, 30, 50, 1)',
      },
      card13:{
        padding: 15,
        width: '100%', // Each card takes up the full width
        marginBottom: 8, // Adjust the vertical margin as needed
        backgroundColor: '#f5f5f5',
      },
      title:{
        fontSize: 18,
        paddingLeft: 10,
        fontWeight: '600',
        lineHeight: 19.09,
        color: 'rgba(28, 30, 50, 1)',
      },
      title2:{
        paddingLeft: 15,
        fontSize: 18,
        right: 19,
        fontWeight: '600',
        lineHeight: 19.09,
        color: 'rgba(28, 30, 50, 1)',
      },
      dropDown: {
       // width: 160,
      // marginLeft: 60,
       paddingTop: 7,
       height: 65,
       paddingRight: 14,
       borderRadius: 10
      },
      dropDownContainer: {
        height: 40,
      },
      dropDownStyle: {
        backgroundColor: '#fafafa',
        borderColor: 'gray', 
      },
      dropDownItemStyle: {
        justifyContent: 'flex-start',
      },
      dropDownDropStyle: {
        backgroundColor: '#fafafa',
      },
    };
    
export default Tools;












//before edit settings page 
// import React, { useState } from 'react';
// import { View, FlatList, StyleSheet, TouchableOpacity,Text, TextInput } from 'react-native';
// import {  Card, Title, Paragraph, Button, Provider  } from 'react-native-paper';
// import { Calendar } from 'react-native-calendars';
// import Modal from 'react-native-modal';
// import SelectDropdown from 'react-native-select-dropdown'
// import { useNavigation } from '@react-navigation/native';


// const Tools = ({}) => {
//     const navigation = useNavigation();
//     const [isCalendarVisible, setCalendarVisible] = useState(false);
//     const [inputValue, setInputValue] = useState('');
//     const [isModalVisible, setModalVisible] = useState(false);

//     const timeszone = ["IST"]
    
//     const currency = [ "INR"];

//     const handleEditPress = () => {
//       setModalVisible(true);
//     };
  
//     const handleInputChange = (text) => {
//       setInputValue(text);
//     };
  
//     const handleButtonPress = () => {
//       Alert.alert('Input Value', inputValue);
//     };
  
//     const handleModalClose = () => {
//       setModalVisible(false);
//     };
  

//     const handleCardPress = () => {
//       setCalendarVisible(!isCalendarVisible);
//       } 
  
//     return (
//       <View style={styles.container}>
//         <Card  style={styles.card12}>
//           <View style={styles.rowContainer}>
//           <Text style={styles.title}>Timeszone</Text>
//             <View style={styles.dropDown}>
//             <SelectDropdown
//             // style={{, borderRadius: 30, marginBottom: 70 }}
//              data={timeszone}
//              onSelect={(selectedItem, index) => {
//              console.log(selectedItem, index)
//             }}
//             dropdownStyle={styles.dropdown}
//             defaultButtonText="IST" 
//            />
//           </View>
//         </View>
//       </Card>

//     <Card style={styles.card12}>
//      <View style={styles.rowContainer}>
//       <Text style={styles.title}>Currency</Text>
//        <View style={styles.dropDown}>
//        <SelectDropdown
//          style={{  marginLeft: 5, bottom: 70}}
//          data={currency}
//          onSelect={(selectedItem, index) => {
//          console.log(selectedItem, index)
//        }}
//        dropdownStyle={styles.dropdown}
//        defaultButtonText="INR"  
//        />
//       </View>
//      </View>
//     </Card>
      
//     <Card style={styles.card13}>
//      <View style={styles.rowContainer}>
//       <Text style={styles.title2}>Dex Address</Text>
//         <TouchableOpacity style={styles.Edit} onPress={handleEditPress}>
//           <Text style={styles.title1}>Edit</Text>
//         </TouchableOpacity>
//      </View>
//     </Card>

//     <Modal isVisible={isModalVisible} >
//       <Card style={styles.cardContainer4}>
//         <View style={styles.modalContainer}>
//           <View style={styles.modalContent}>
//             <TextInput
//               placeholder="Type Dex Address..."
//               value={inputValue}
//               onChangeText={handleInputChange}
//               style={{
//                 height: 40,
//                 width: '91%',
//                 marginLeft: 14,
//                 borderColor: 'gray',
//                 borderWidth: 2,
//                 marginBottom: 10,
//                 paddingHorizontal: 13,
//                 marginTop: 15,
//                 borderRadius: 10,
//               }}
//             />
//         <View style={styles.buttons}>
//          <View style={styles.button1}>
//            <Button onPress={handleButtonPress} labelStyle={styles.buttonText} >
//             Save
//            </Button> 
//         </View>

//         <View style={styles.button2}>
//          <Button onPress={handleModalClose} labelStyle={styles.buttonText1} >
//           Cancel
//          </Button>
//          </View>
//         </View>
//       </View>
//     </View>
//   </Card>
// </Modal>
         

//     <Card style={styles.card12}>
//      <View style={styles.rowContainer}>
//       <Text style={styles.title}>Trading Hours</Text>
//        <View style={styles.dropDown}>
//         <View style={styles.Open}>
//           <Text  style={styles.Opening}>Opening :</Text><Text style={styles.Opening1}> 9:30 AM</Text>
//         </View>
//         <View style={styles.closing}>
//           <Text  style={styles.close}>  Closing :</Text><Text style={styles.Opening1}> 5:00PM</Text>
//         </View>
//       </View>
//     </View>
//   </Card>


//   <TouchableOpacity  onPress={() => navigation.navigate('Calender')}>
//     <Card style={styles.card14}>
//      <View style={styles.rowContainer}>
//       <Text style={styles.title5}>Calender</Text>
//        {/* {isCalendarVisible ? (
//         <Calendar onDayPress={(day) => setSelectedDate(day.dateString)} />
//          ) : null} */}
//       </View>
//     </Card>
//   </TouchableOpacity>


//   <Card style={styles.card14}>
//      <View style={styles.rowContainer}>
//       <Text style={styles.title5}>Maintenance Mode</Text>
//      </View>
//    </Card>
//   </View>
//     );
//   };
  
//     const styles = {
//       container :{
//         flex: 1,
//       },
//       buttons: {
//         paddingTop: 17,
//         flexDirection: 'row',
//         marginLeft: 10
//       },
//       button1: {
//         paddingLeft: 5,
//         width: '47%',
//         backgroundColor: '#EAC9B1',
//         borderRadius: 50,
//       },
//       buttonText: {
//         paddingTop: 4,
//         paddingRight: 15,
//         justifyContent: 'center',
//         alignItems: 'center',
//         color: 'white',
//         fontSize: 16,
//         fontWeight: 'bold',
//         left: 8
//       },
//       dropdown: {
//         paddingBottom: 10,
//         marginVertical: -50
//       },
//       Open:{
//         flexDirection:'row'
//       },
//       Opening:{
//         fontWeight: 'bold',
//         color:'green',
//         fontSize: 16,
//       },
//       Opening1:{
//         fontWeight: 'bold',
//       },
//       button2: {
//         left: 10,
//         width: '47%',
//         height: 47,
//         backgroundColor: '#b1a4ff',
//         borderRadius: 50,
//       },
//       buttonText1: {
//         fontWeight: 'bold',
//         paddingTop: 4,
//         color: 'white',
//         fontSize: 16,
//         Left: 15,
//       },
//       card14:{
//         padding: 22,
//         width: '100%',
//         marginBottom: 7, 
//         backgroundColor: 'white',
//       },
//       cardContainer4:{
//          backgroundColor: 'white',
//          marginHorizontal: 20,
//          paddingVertical: 20,
//        },
//       Edit:{
//         borderColor: 'gray',
//         borderWidth: 2,
//         borderRadius: 4,
//         width: 60,
//         height: 35
//       },
//       title1:{
//         fontSize: 17,
//         paddingTop: 4,
//         paddingHorizontal: 12
//       },
//       title5:{
//         fontSize: 18,
//         right: 10,
//         fontWeight: '600',
//         lineHeight: 19.09,
//         color: 'rgba(28, 30, 50, 1)',
//       },
//       card12: {
//         width: '100%',
//         marginBottom: 6, 
//         backgroundColor: 'white',
//       },
//       opening:{
//          flexDirection: 'row',
//          paddingHorizontal: 5
//       },
//       closing:{
//         paddingTop: 8,
//         flexDirection: 'row',
//       },
//       close:{
//         fontWeight: 'bold',
//         color: 'red',
//         fontWeight: 600 ,
//         fontSize: 16,
//       },
//       rowContainer:{
//         justifyContent: 'space-between',
//         alignItems: 'center',
//         padding: 1,
//         flexDirection: 'row',
//       },
//       card1:{
//         top: 15,
//         fontSize: 18,
//         fontWeight: '600',
//         color: 'rgba(28, 30, 50, 1)',
//       },
//       card13:{
//         padding: 15,
//         width: '100%', // Each card takes up the full width
//         marginBottom: 8, // Adjust the vertical margin as needed
//         backgroundColor: 'white',
//       },
//       title:{
//         fontSize: 18,
//         paddingLeft: 10,
//         fontWeight: '600',
//         lineHeight: 19.09,
//         color: 'rgba(28, 30, 50, 1)',
//       },
//       title2:{
//         paddingLeft: 15,
//         fontSize: 18,
//         right: 19,
//         fontWeight: '600',
//         lineHeight: 19.09,
//         color: 'rgba(28, 30, 50, 1)',
//       },
//       dropDown: {
//        // width: 160,
//       // marginLeft: 60,
//        paddingTop: 7,
//        height: 65,
//        paddingRight: 14,
//        borderRadius: 10
//       },
//       dropDownContainer: {
//         height: 40,
//       },
//       dropDownStyle: {
//         backgroundColor: '#fafafa',
//         borderColor: 'gray', 
//       },
//       dropDownItemStyle: {
//         justifyContent: 'flex-start',
//       },
//       dropDownDropStyle: {
//         backgroundColor: '#fafafa',
//       },
//     };
    
// export default Tools;