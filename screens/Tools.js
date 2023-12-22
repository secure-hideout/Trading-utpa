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
        flexDirection:'row'
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
        backgroundColor: 'white',
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
        backgroundColor: 'white',
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
        backgroundColor: 'white',
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














// import React, { useState } from 'react';
// import { View, FlatList, StyleSheet, TouchableOpacity,Text, TextInput } from 'react-native';
// import { useNavigation } from '@react-navigation/native';
// import {  Card, Title, Paragraph, Button, Provider  } from 'react-native-paper';
// import { Input } from 'react-native-elements';
// import { useSelector } from 'react-redux';
// import { Border, Color, FontFamily, FontSize } from "../GlobalStyles";
// import { Calendar } from 'react-native-calendars';
// import RNPickerSelect from 'react-native-picker-select';
// import DropDownPicker from 'react-native-dropdown-picker';
// import { Dropdown } from 'react-native-elements';
// import InputSelect from 'react-native-input-select';
// import Modal from 'react-native-modal';


// const Tools = ({}) => {
//     const navigation = useNavigation();
//     const [tradingHours, setTradingHours] = useState('9:00 AM - 5:00 PM');
//     const [isCalendarVisible, setCalendarVisible] = useState(false);
//     const [selectedDate, setSelectedDate] = useState(null);
//     const [selectedValue, setSelectedValue] = useState('BTC');
//     const [selectedValues, setSelectedValues] = useState('INR');
//     const [selectedInterval, setSelectedInterval] = useState('');
//     const [inputValue, setInputValue] = useState('');
//     const [isEditing, setIsEditing] = useState(false);
//     const [isModalVisible, setModalVisible] = useState(false);

//     const timezoneOptions = [
//       { label: 'Bitcoin (BTC)', value: 'option1' },
//       { label: 'Ethereum (ETH)', value: 'option2' },
//       { label: 'Ripple (XRP)', value: 'option3' },
//       { label: 'Litecoin (LTC)', value: 'option4' },
//       { label: 'Cardano (ADA)', value: 'option5' },
//       // Add more options as needed
//     ];

//     const currency = [
//       { label: 'INR', value: 'option1' },
//       { label: 'USD', value: 'option2' },
//     ];

//     const handleEditPress = () => {
//       // Open the modal when "Edit" is pressed
//       setModalVisible(true);
//     };
  
//     const handleInputChange = (text) => {
//       setInputValue(text);
//     };
  
//     const handleButtonPress = () => {
//       Alert.alert('Input Value', inputValue);
//     };
  
//     const handleModalClose = () => {
//       // Close the modal when needed (e.g., cancel button pressed)
//       setModalVisible(false);
//     };
  

//     const handleCardPress = (item) => {
//       if (item.id === '2') {
//         setCalendarVisible(!isCalendarVisible);
//       } else {
//         // Handle card press for other cards if needed
//       }
//     };
  
//     const data = [
//       {
//         id: '1',
//         title: 'Trading Hours',
//         content: tradingHours,
//       },
//       {
//         id: '2',
//         title: 'Calendar',
//         content: isCalendarVisible && <Calendar onDayPress={(day) => setSelectedDate(day.dateString)} />,
//       },
//       {
//         id: '3',
//         title: 'Maintenance Mode',
//         // content: 'Content for Card 3'
//       },
//     ];
  
//     const renderItem = ({ item }) => (
//       <TouchableOpacity onPress={() => handleCardPress(item)}>
//         <View style={styles.container}>
         
//           <Card style={styles.card}>
//             <Card.Content>
//               <View style={styles.card1}>
//                 <Title style={styles.title}>{item.title}</Title>
//               </View>
//               <View style={styles.card2}>
//                 <Paragraph>
//                   {item.id === '1' && (
//                     <>
//                       <View style={styles.opening}>
//                         <Text style={{ color: 'green', fontSize: 16, fontWeight: 'bold' }}>Opening : </Text>
//                         <Text style={{ fontSize: 16, fontWeight: 600 }}>9:00 AM</Text>
//                       </View>
//                       <View style={styles.closing}>
//                         <Text style={{ color: 'red', fontSize: 16, fontWeight: 'bold' }}>Closing : </Text>
//                         <Text style={{ fontSize: 16, fontWeight: 600 }}>5:00 PM</Text>
//                       </View>
//                     </>
//                   )}
//                   {item.id !== '1' && item.content}
//                 </Paragraph>
//               </View>
//             </Card.Content>
//           </Card>
//         </View>
//       </TouchableOpacity>
//     );
  
//     return (
//       <View style={styles.container}>
      
     
     
//       <Card  style={styles.card12}>
//       <View style={styles.rowContainer}>
//       <Text style={styles.title}>Timeszone</Text>
     
//       <View style={styles.dropDown}>
//       <InputSelect
//             placeholder="Select "
//             value={selectedValues}
//             onSelect={(value) => setSelectedValue(value)}
//             data={timezoneOptions}
//           />
//       </View>
//       </View>
     
    
//       </Card>
//       {/* </View> */}
//       <Card style={styles.card12}>
//       <View style={styles.rowContainer}>
//       <Text style={styles.title}>Currency</Text>
//       <View style={styles.dropDown}>
      
//       <InputSelect
//             placeholder=""
//             value={selectedValue}
//             onSelect={(value) => setSelectedValue(value)}
//             data={currency}
//             style={{ width: '20%', paddingTop: 10 }}
            
//           />
//       </View>
//       </View>
      
//       </Card>
      
     
//       <Card style={styles.card13}>
//       <View style={styles.rowContainer}>
//           <Text style={styles.title2}>Dex Address</Text>

//           <TouchableOpacity style={styles.Edit} onPress={handleEditPress}>
//             <Text style={styles.title1}>Edit</Text>
//           </TouchableOpacity>
//         </View>
//       </Card>

//       <Modal isVisible={isModalVisible} >
//       <Card style={styles.cardContainer4}>
//         <View style={styles.modalContainer}>
//           <View style={styles.modalContent}>
//             <TextInput
//               placeholder="Type Dex Address..."
//               value={inputValue}
//               onChangeText={handleInputChange}
//               style={{
//                 height: 40,
//                 width: 300,
//                 marginLeft: 17,
//                 borderColor: 'gray',
//                 borderWidth: 1,
//                 marginBottom: 10,
//                 paddingHorizontal: 13,
//                 marginTop: 10,
//                 top: 8,
//               }}
//             />
//             {/* <Button title="Save" onPress={handleButtonPress} />
//             <Button title="Cancel" onPress={handleModalClose} /> */}

//             <View style={styles.buttons}>
//             <View style={styles.button1}>
//               <Button onPress={handleButtonPress} labelStyle={styles.buttonText} >
//                 Save
//               </Button>
//             </View>
//             <View style={styles.button2}>
//               <Button onPress={handleModalClose} labelStyle={styles.buttonText1} >
//                 Cancel
//               </Button>
//             </View>
//           </View>
//           </View>
         
//         </View>
//         </Card>
//         </Modal>
        

      

//       <FlatList
//         data={data}
//         renderItem={renderItem}
//         keyExtractor={(item) => item.id}
//         contentContainerStyle={styles.flatList}
//       />

//       </View>
//     );
//   };
  
    
//     // Your styles object (replace with your actual styles)
//     const styles = {
//       container :{
//         paddingTop: 6,
//         paddingHorizontal: 1
//       },
//       flatList: {
//         width: '98%',
//         marginLeft: 10,
//       },
//       buttons: {
//         paddingTop: 17,
//         flexDirection: 'row',
//         marginLeft: 10
//         //justifyContent: 'space-between'
//       },
//       button1: {
//         paddingLeft: 5,
//         width: '47%',
//         height: 47,
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
//         alignItems: 'center',
//         color: 'white',
//         fontSize: 16,
//         Left: 15,
//       },
//       card: {
//         width: '98%', // Each card takes up the full width
//         marginBottom: 8, // Adjust the vertical margin as needed
//         backgroundColor: 'white',
//       },
//       cardContainer4:{
//         //marginRight: 10,
//          backgroundColor: 'white',
//          width: '90%',
//          marginHorizontal: 20,
//          paddingVertical: 20,
//        },
//       Edit:{
//         borderColor: 'gray',
//         //  backgroundColor: 'red',
//         borderWidth: 2,
//         borderRadius: 4,
//          width: 60,
//          height: 35
//          //paddingHorizontal: 
//       },
//       title1:{
//         fontSize: 17,
        
//         paddingTop: 4,
//         paddingHorizontal: 12
//       },
//       card12: {
//         // flexDirection: 'row',
//         width: '95%',
//         zIndex: 1,
//         marginLeft: 14,
//         marginBottom: 12, // Adjust the vertical margin as needed
//         backgroundColor: 'white',
//       },
//       opening:{
//          flexDirection: 'row',
//          paddingHorizontal: 5
//       },
//       closing:{
//         flexDirection: 'row'
//       },
//       rowContainer:{
//         justifyContent: 'space-between',
//         alignItems: 'center',
//         padding: 10,
//         flexDirection: 'row',
//       },
//       card1:{
//         alignItems: 'center',
//         fontSize: 18,
//         fontWeight: '600',
//         lineHeight: 19.09,
//         color: 'rgba(28, 30, 50, 1)',
//       },
//       card2:{
//         alignItems: 'center',
//         paddingTop: 10
//       },
//       card13:{
//         marginLeft: 12,
//         padding: 20,
//         width: '96%', // Each card takes up the full width
//         marginBottom: 8, // Adjust the vertical margin as needed
//         backgroundColor: 'white',
//       },
//       title:{
//         fontSize: 18,
//         fontWeight: '600',
//         lineHeight: 19.09,
//         color: 'rgba(28, 30, 50, 1)',
//       },
//       title2:{
//         fontSize: 18,
//         right: 18,
//         fontWeight: '600',
//         lineHeight: 19.09,
//         color: 'rgba(28, 30, 50, 1)',
//       },
//       dropDown: {
//       // top: 1,
//        height: 65,
//        width: 130,
//        paddingLeft: 10
//       },
      
//       dropDownContainer: {
//         height: 40,
//       },
//       dropDownStyle: {
//         backgroundColor: '#fafafa',
//         borderColor: 'gray', // Set the border color
//         borderWidth: 1,       // Set the border width
//         borderRadius: 8,
//       },
//       dropDownItemStyle: {
//         justifyContent: 'flex-start',
//       },
//       dropDownDropStyle: {
//         backgroundColor: '#fafafa',
//       },


//     };
    
    
    
// export default Tools;