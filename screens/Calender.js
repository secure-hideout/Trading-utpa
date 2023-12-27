import React from 'react';
import { SafeAreaView, StyleSheet, View, Text, FlatList,SectionList,TouchableOpacity } from 'react-native';
import { useRoute, useNavigation } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';

const Calender = () => {

  const navigation = useNavigation();
  const route = useRoute();
  const holidayData = [
//   // Paste your holiday data here
  {
    category: 'Trading/Stock Market Holidays',
    holidays: [
      { name: 'Republic Day', date: 'January 26, 2024', day: 'Friday' },
      { name: 'Maha Shivaratri', date: 'March 08, 2024', day: 'Friday' },
      { name: 'Holi', date: 'March 25, 2024', day: 'Monday' },
      { name: 'Good Friday', date: 'March 29, 2024', day: 'Friday' },
      { name: 'Eid-Ul-Fitr (Ramzan Eid)', date: 'April 10, 2024', day: 'Wednesday' },
      { name: 'Ram Navami', date: 'April 17, 2024', day: 'Wednesday' },
      { name: 'Maharashtra Day', date: 'May 01, 2024', day: 'Wednesday' },
      { name: 'Bakri Eid', date: 'June 17, 2024', day: 'Monday' },
      { name: 'Moharram', date: 'July 17, 2024', day: 'Wednesday' },
      { name: 'Independence Day', date: 'August 15, 2024', day: 'Thursday' },
      { name: 'Mahatma Gandhi Jayanti', date: 'October 02, 2024', day: 'Wednesday' },
      { name: 'Diwali-Laxmi Pujan*', date: 'November 01, 2024', day: 'Friday' },
      { name: 'Gurunanak Jayanti', date: 'November 15, 2024', day: 'Friday' },
      { name: 'Christmas', date: 'December 25, 2024', day: 'Wednesday' },
    ],
  },
  {
    category: 'Weekend Holidays',
    holidays: [
      { name: 'Dr.Baba Saheb Ambedkar Jayanti', date: 'April 14, 2024', day: 'Sunday' },
      { name: 'Mahavir Jayanti', date: 'April 21, 2024', day: 'Sunday' },
      { name: 'Ganesh Chaturthi', date: 'September 07, 2024', day: 'Saturday' },
      { name: 'Dussehra', date: 'October 13, 2024', day: 'Sunday' },
      { name: 'Diwali-Balipratipada', date: 'November 02, 2024', day: 'Saturday' },
    ],
  },
  {
    category: 'Settlement Holidays',
    holidays: [
      { name: 'Republic Day', date: 'January 26, 2024', day: 'Friday' },
      { name: 'Maha Shivaratri', date: 'March 08, 2024', day: 'Friday' },
      { name: 'Holi', date: 'March 25, 2024', day: 'Monday' },
      { name: 'Good Friday', date: 'March 29, 2024', day: 'Friday' },
      { name: 'Gudhi Padwa', date: 'April 09, 2024', day: 'Tuesday' },
      { name: 'Eid-Ul-Fitr (Ramzan Eid)', date: 'April 10, 2024', day: 'Wednesday' },
      { name: 'Dr.Baba Saheb Ambedkar Jayanti', date: 'April 14, 2024', day: 'Sunday' },
      { name: 'Ram Navami', date: 'April 17, 2024', day: 'Wednesday' },
      { name: 'Mahavir Jayanti', date: 'April 21, 2024', day: 'Sunday' },
      { name: 'Maharashtra Day', date: 'May 01, 2024', day: 'Wednesday' },
      { name: 'Buddha Pournima', date: 'May 23, 2024', day: 'Thursday' },
      { name: 'Bakri Eid', date: 'June 17, 2024', day: 'Monday' },
      { name: 'Moharram', date: 'July 17, 2024', day: 'Wednesday' },
      { name: 'Independence Day', date: 'August 15, 2024', day: 'Thursday' },
      { name: 'Parsi New Year', date: 'August 16, 2024', day: 'Friday' },
      { name: 'Ganesh Chaturthi', date: 'September 07, 2024', day: 'Saturday' },
      { name: 'Mahatma Gandhi Jayanti', date: 'October 02, 2024', day: 'Wednesday' },
      { name: 'Dasara', date: 'October 13, 2024', day: 'Sunday' },
      { name: 'Diwali-Laxmi Pujan*', date: 'November 01, 2024', day: 'Friday' },
      { name: 'Diwali-Balipratipada', date: 'November 02, 2024', day: 'Saturday' },
      { name: 'Gurunanak Jayanti', date: 'November 15, 2024', day: 'Friday' },
      { name: 'Christmas', date: 'December 25, 2024', day: 'Wednesday' },
    ],
  },
  {
    category: 'MCX Holidays',
    holidays: [
      { name: 'Republic Day', date: 'January 26, 2024', day: 'Friday', morningSession: 'Closed', eveningSession: 'Closed' },
      { name: 'Maha Shivaratri', date: 'March 08, 2024', day: 'Friday', morningSession: 'Closed', eveningSession: 'Open' },
      { name: 'Holi', date: 'March 25, 2024', day: 'Monday', morningSession: 'Closed', eveningSession: 'Open' },
      { name: 'Good Friday', date: 'March 29, 2024', day: 'Friday', morningSession: 'Closed', eveningSession: 'Closed' },
      { name: 'Eid-Ul-Fitr (Ramzan Eid)', date: 'April 10, 2024', day: 'Wednesday', morningSession: 'Closed', eveningSession: 'Open' },
      { name: 'Ram Navami', date: 'April 17, 2024', day: 'Wednesday', morningSession: 'Closed', eveningSession: 'Open' },
      { name: 'Maharashtra Day', date: 'May 01, 2024', day: 'Wednesday', morningSession: 'Closed', eveningSession: 'Open' },
      { name: 'Bakri Eid', date: 'June 17, 2024', day: 'Monday', morningSession: 'Closed', eveningSession: 'Open' },
      { name: 'Moharram', date: 'July 17, 2024', day: 'Wednesday', morningSession: 'Closed', eveningSession: 'Open' },
      { name: 'Independence Day', date: 'August 15, 2024', day: 'Thursday', morningSession: 'Closed', eveningSession: 'Closed' },
      { name: 'Mahatma Gandhi Jayanti', date: 'October 02, 2024', day: 'Wednesday', morningSession: 'Closed', eveningSession: 'Closed' },
      { name: 'Diwali-Laxmi Pujan*', date: 'November 01, 2024', day: 'Friday', morningSession: 'Closed', eveningSession: 'Open' },
      { name: 'Gurunanak Jayanti', date: 'November 15, 2024', day: 'Friday', morningSession: 'Closed', eveningSession: 'Open' },
      { name: 'Christmas', date: 'December 25, 2024', day: 'Wednesday', morningSession: 'Closed', eveningSession: 'Closed' },
    ],
  },
  {
   category: 'CDS Holidays',
    holidays: [
      { name: 'Republic Day', date: 'January 26, 2024', day: 'Friday' },
      { name: 'Maha Shivaratri', date: 'March 08, 2024', day: 'Friday' },
      { name: 'Holi', date: 'March 25, 2024', day: 'Monday' },
      { name: 'Good Friday', date: 'March 29, 2024', day: 'Friday' },
      { name: 'Eid-Ul-Fitr (Ramzan Eid)', date: 'April 10, 2024', day: 'Wednesday' },
      { name: 'Ram Navami', date: 'April 17, 2024', day: 'Wednesday' },
      { name: 'Maharashtra Day', date: 'May 01, 2024', day: 'Wednesday' },
      { name: 'Bakri Eid', date: 'June 17, 2024', day: 'Monday' },
      { name: 'Moharram', date: 'July 17, 2024', day: 'Wednesday' },
      { name: 'Independence Day', date: 'August 15, 2024', day: 'Thursday' },
      { name: 'Mahatma Gandhi Jayanti', date: 'October 02, 2024', day: 'Wednesday' },
      { name: 'Diwali-Laxmi Pujan*', date: 'November 01, 2024', day: 'Friday' },
      { name: 'Gurunanak Jayanti', date: 'November 15, 2024', day: 'Friday' },
      { name: 'Christmas', date: 'December 25, 2024', day: 'Wednesday' },
    ],
  },
 ];

 const sectionData = holidayData.map((category) => ({
  title: category.category,
  data: category.holidays,
}));


const goBack = () => {
    navigation.goBack();
};

return (
  <View style={styles.container1}>
     <View style={styles.backButton1}>
        <TouchableOpacity onPress={goBack} style={styles.backButton}>

          <Ionicons name="arrow-back-outline" size={25} color="black" style={styles.backIcon} />
        </TouchableOpacity>
        <Text style={styles.userInfo}>Holidays Calender</Text>
      </View>
  <SafeAreaView style={styles.container}>
    <SectionList
      sections={sectionData}
      keyExtractor={(item, index) => item.name + index}
      renderItem={({ item }) => (
        <View style={styles.itemContainer}>
          <Text style={styles.holidayText}>{item.name}</Text>
          <View style={[styles.session]}>
          
            <Text style={[styles.sessionText]}>Date: </Text>
            <Text style={[styles.text]}>{item.date}</Text>
            <Text style={[styles.sessionText]}>, Day: </Text > 
            <Text  style={[styles.text]}>{item.day}</Text>
          </View>
            {item.morningSession && (
              <View style={[styles.session]}>
                <Text style={[styles.sessionText]}>Evening Session:</Text>
              <Text style={[styles.sessionText, { color: item.morningSession === 'Open' ? 'green' : 'red' }]}>
                {item.morningSession}
              </Text>
              </View>
            )}
            {item.eveningSession && (
              <View style={[styles.session]}>
              <Text style={[styles.sessionText]}>Morning Session:</Text>
              <Text style={[styles.sessionText, { color: item.eveningSession === 'Open' ? 'green' : 'red' }]}>
                 {item.eveningSession}
              </Text>
              </View>
            )}
          </View>
        )}
      renderSectionHeader={({ section: { title } }) => (
        <View style={styles.categoryContainer}>
          <Text style={styles.categoryText}>{title}</Text>
        </View>
      )}
    />
  </SafeAreaView>
  </View>
);
};

const styles = StyleSheet.create({


session:{
 flexDirection: 'row'
},
text:{
  fontSize: 13,
  fontWeight: '700',
  color: 'orange'
},
userInfo: {
  top: 13,
  left: 50,
  fontWeight: 'bold',
  fontSize: 20,
  flex: 1,
  justifyContent: 'center',
  alignItems: 'center'
},
backIcon: {
  top: 12,
},
backButton: {
  marginRight: -40,

},
backButton1: {
  marginTop: 30,
  width: '98%',
  height: 50,
  //backgroundColor:'red',
  flexDirection: 'row'

},
container: {
  //flex: 1,

  backgroundColor: '#fff',
  padding: 10,
},
categoryContainer: {
  marginBottom: 16,
},
categoryText: {
  fontSize: 20,
  fontWeight: 'bold',
  marginBottom: 8,
  color: 'green',
},
itemContainer: {
  marginBottom: 16,
  borderBottomWidth: 1,
  borderBottomColor: '#ccc',
  paddingBottom: 8,
},
holidayText: {
    //fontSize: 18,
    //fontWeight: 'bold',
    fontSize: 18,
    fontWeight: '700',
    lineHeight: 19.09,
    color: 'rgba(28, 30, 50, 1)',

},
sessionText: {
  fontSize: 13,
  fontWeight: '700',
  color: 'gray'
},
morningSessionText: {
  fontSize: 16,
 // fontWeight: 'bold',
 // color: 'red', // Set a default color if needed
},
});

export default Calender;



// import React from 'react';
// import { SafeAreaView, StyleSheet, View, Text, FlatList, SectionList } from 'react-native';


// const Calender = () => {
// const holidayData = [
//     {
//         category: 'Trading/Stock Market Holidays',
//         holidays: [
//           { name: 'Republic Day', date: 'January 26, 2024', day: 'Friday' },
//           { name: 'Maha Shivaratri', date: 'March 08, 2024', day: 'Friday' },
//           { name: 'Holi', date: 'March 25, 2024', day: 'Monday' },
//           { name: 'Good Friday', date: 'March 29, 2024', day: 'Friday' },
//           { name: 'Eid-Ul-Fitr (Ramzan Eid)', date: 'April 10, 2024', day: 'Wednesday' },
//           { name: 'Ram Navami', date: 'April 17, 2024', day: 'Wednesday' },
//           { name: 'Maharashtra Day', date: 'May 01, 2024', day: 'Wednesday' },
//           { name: 'Bakri Eid', date: 'June 17, 2024', day: 'Monday' },
//           { name: 'Moharram', date: 'July 17, 2024', day: 'Wednesday' },
//           { name: 'Independence Day', date: 'August 15, 2024', day: 'Thursday' },
//           { name: 'Mahatma Gandhi Jayanti', date: 'October 02, 2024', day: 'Wednesday' },
//           { name: 'Diwali-Laxmi Pujan*', date: 'November 01, 2024', day: 'Friday' },
//           { name: 'Gurunanak Jayanti', date: 'November 15, 2024', day: 'Friday' },
//           { name: 'Christmas', date: 'December 25, 2024', day: 'Wednesday' },
//         ],
//       },
//       {
//         category: 'Weekend Holidays',
//         holidays: [
//           { name: 'Dr.Baba Saheb Ambedkar Jayanti', date: 'April 14, 2024', day: 'Sunday' },
//           { name: 'Mahavir Jayanti', date: 'April 21, 2024', day: 'Sunday' },
//           { name: 'Ganesh Chaturthi', date: 'September 07, 2024', day: 'Saturday' },
//           { name: 'Dussehra', date: 'October 13, 2024', day: 'Sunday' },
//           { name: 'Diwali-Balipratipada', date: 'November 02, 2024', day: 'Saturday' },
//         ],
//       },
//       {
//         category: 'Settlement Holidays',
//         holidays: [
//           { name: 'Republic Day', date: 'January 26, 2024', day: 'Friday' },
//           { name: 'Maha Shivaratri', date: 'March 08, 2024', day: 'Friday' },
//           { name: 'Holi', date: 'March 25, 2024', day: 'Monday' },
//           { name: 'Good Friday', date: 'March 29, 2024', day: 'Friday' },
//           { name: 'Gudhi Padwa', date: 'April 09, 2024', day: 'Tuesday' },
//           { name: 'Eid-Ul-Fitr (Ramzan Eid)', date: 'April 10, 2024', day: 'Wednesday' },
//           { name: 'Dr.Baba Saheb Ambedkar Jayanti', date: 'April 14, 2024', day: 'Sunday' },
//           { name: 'Ram Navami', date: 'April 17, 2024', day: 'Wednesday' },
//           { name: 'Mahavir Jayanti', date: 'April 21, 2024', day: 'Sunday' },
//           { name: 'Maharashtra Day', date: 'May 01, 2024', day: 'Wednesday' },
//           { name: 'Buddha Pournima', date: 'May 23, 2024', day: 'Thursday' },
//           { name: 'Bakri Eid', date: 'June 17, 2024', day: 'Monday' },
//           { name: 'Moharram', date: 'July 17, 2024', day: 'Wednesday' },
//           { name: 'Independence Day', date: 'August 15, 2024', day: 'Thursday' },
//           { name: 'Parsi New Year', date: 'August 16, 2024', day: 'Friday' },
//           { name: 'Ganesh Chaturthi', date: 'September 07, 2024', day: 'Saturday' },
//           { name: 'Mahatma Gandhi Jayanti', date: 'October 02, 2024', day: 'Wednesday' },
//           { name: 'Dasara', date: 'October 13, 2024', day: 'Sunday' },
//           { name: 'Diwali-Laxmi Pujan*', date: 'November 01, 2024', day: 'Friday' },
//           { name: 'Diwali-Balipratipada', date: 'November 02, 2024', day: 'Saturday' },
//           { name: 'Gurunanak Jayanti', date: 'November 15, 2024', day: 'Friday' },
//           { name: 'Christmas', date: 'December 25, 2024', day: 'Wednesday' },
//         ],
//       },
//       {
//         category: 'MCX Holidays',
//         holidays: [
//           { name: 'Republic Day', date: 'January 26, 2024', day: 'Friday', morningSession: 'Closed', eveningSession: 'Closed' },
//           { name: 'Maha Shivaratri', date: 'March 08, 2024', day: 'Friday', morningSession: 'Closed', eveningSession: 'Open' },
//           { name: 'Holi', date: 'March 25, 2024', day: 'Monday', morningSession: 'Closed', eveningSession: 'Open' },
//           { name: 'Good Friday', date: 'March 29, 2024', day: 'Friday', morningSession: 'Closed', eveningSession: 'Closed' },
//           { name: 'Eid-Ul-Fitr (Ramzan Eid)', date: 'April 10, 2024', day: 'Wednesday', morningSession: 'Closed', eveningSession: 'Open' },
//           { name: 'Ram Navami', date: 'April 17, 2024', day: 'Wednesday', morningSession: 'Closed', eveningSession: 'Open' },
//           { name: 'Maharashtra Day', date: 'May 01, 2024', day: 'Wednesday', morningSession: 'Closed', eveningSession: 'Open' },
//           { name: 'Bakri Eid', date: 'June 17, 2024', day: 'Monday', morningSession: 'Closed', eveningSession: 'Open' },
//           { name: 'Moharram', date: 'July 17, 2024', day: 'Wednesday', morningSession: 'Closed', eveningSession: 'Open' },
//           { name: 'Independence Day', date: 'August 15, 2024', day: 'Thursday', morningSession: 'Closed', eveningSession: 'Closed' },
//           { name: 'Mahatma Gandhi Jayanti', date: 'October 02, 2024', day: 'Wednesday', morningSession: 'Closed', eveningSession: 'Closed' },
//           { name: 'Diwali-Laxmi Pujan*', date: 'November 01, 2024', day: 'Friday', morningSession: 'Closed', eveningSession: 'Open' },
//           { name: 'Gurunanak Jayanti', date: 'November 15, 2024', day: 'Friday', morningSession: 'Closed', eveningSession: 'Open' },
//           { name: 'Christmas', date: 'December 25, 2024', day: 'Wednesday', morningSession: 'Closed', eveningSession: 'Closed' },
//         ],
//       },
//       {
//         category: 'CDS Holidays',
//         holidays: [
//           { name: 'Republic Day', date: 'January 26, 2024', day: 'Friday' },
//           { name: 'Maha Shivaratri', date: 'March 08, 2024', day: 'Friday' },
//           { name: 'Holi', date: 'March 25, 2024', day: 'Monday' },
//           { name: 'Good Friday', date: 'March 29, 2024', day: 'Friday' },
//           { name: 'Eid-Ul-Fitr (Ramzan Eid)', date: 'April 10, 2024', day: 'Wednesday' },
//           { name: 'Ram Navami', date: 'April 17, 2024', day: 'Wednesday' },
//           { name: 'Maharashtra Day', date: 'May 01, 2024', day: 'Wednesday' },
//           { name: 'Bakri Eid', date: 'June 17, 2024', day: 'Monday' },
//           { name: 'Moharram', date: 'July 17, 2024', day: 'Wednesday' },
//           { name: 'Independence Day', date: 'August 15, 2024', day: 'Thursday' },
//           { name: 'Mahatma Gandhi Jayanti', date: 'October 02, 2024', day: 'Wednesday' },
//           { name: 'Diwali-Laxmi Pujan*', date: 'November 01, 2024', day: 'Friday' },
//           { name: 'Gurunanak Jayanti', date: 'November 15, 2024', day: 'Friday' },
//           { name: 'Christmas', date: 'December 25, 2024', day: 'Wednesday' },
//         ],
//       },
// ];

// return (
//   // Transform the data into a format suitable for SectionList
//   <SafeAreaView style={styles.container}>
//   {holidayData.map((category) => (
//     <View key={category.category} style={styles.categoryContainer}>
//       <Text style={styles.categoryText}>{category.category}</Text>
//       <FlatList
//         data={category.holidays}
//         keyExtractor={(item) => item.name}
//         renderItem={({ item }) => (
//           <View style={styles.itemContainer}>
//             <Text style={styles.holidayText}>{item.name}</Text>
//             <Text>{`Date: ${item.date}, Day: ${item.day}`}</Text>
//             {item.morningSession && (
//               <Text>{`Morning Session: ${item.morningSession}, Evening Session: ${item.eveningSession}`}</Text>
//             )}
//           </View>
//         )}
//       />
//     </View>
//   ))}
// </SafeAreaView>
// ); 
//             }
// const styles = StyleSheet.create({
// container: {
// flex: 1,
// backgroundColor: '#fff',
// padding: 16,
// },
// categoryContainer: {
// marginBottom: 16,
// },
// categoryText: {
// fontSize: 20,
// fontWeight: 'bold',
// marginBottom: 8,
// },
// itemContainer: {
// marginBottom: 16,
// borderBottomWidth: 1,
// borderBottomColor: '#ccc',
// paddingBottom: 8,
// },
// holidayText: {
// fontSize: 18,
// fontWeight: 'bold',
// },
// });

// export default Calender;







// import React from 'react';
// import { SafeAreaView, StyleSheet, View, Text, FlatList,SectionList,TouchableOpacity } from 'react-native';
// import { useRoute, useNavigation } from '@react-navigation/native';
// import { Ionicons } from '@expo/vector-icons';

// const Calender = () => {

//   const navigation = useNavigation();
//   const route = useRoute();
// const holidayData = [
// //   // Paste your holiday data here
//   {
//     category: 'Trading/Stock Market Holidays',
//     holidays: [
//       { name: 'Republic Day', date: 'January 26, 2024', day: 'Friday' },
//       { name: 'Maha Shivaratri', date: 'March 08, 2024', day: 'Friday' },
//       { name: 'Holi', date: 'March 25, 2024', day: 'Monday' },
//       { name: 'Good Friday', date: 'March 29, 2024', day: 'Friday' },
//       { name: 'Eid-Ul-Fitr (Ramzan Eid)', date: 'April 10, 2024', day: 'Wednesday' },
//       { name: 'Ram Navami', date: 'April 17, 2024', day: 'Wednesday' },
//       { name: 'Maharashtra Day', date: 'May 01, 2024', day: 'Wednesday' },
//       { name: 'Bakri Eid', date: 'June 17, 2024', day: 'Monday' },
//       { name: 'Moharram', date: 'July 17, 2024', day: 'Wednesday' },
//       { name: 'Independence Day', date: 'August 15, 2024', day: 'Thursday' },
//       { name: 'Mahatma Gandhi Jayanti', date: 'October 02, 2024', day: 'Wednesday' },
//       { name: 'Diwali-Laxmi Pujan*', date: 'November 01, 2024', day: 'Friday' },
//       { name: 'Gurunanak Jayanti', date: 'November 15, 2024', day: 'Friday' },
//       { name: 'Christmas', date: 'December 25, 2024', day: 'Wednesday' },
//     ],
//   },
//   {
//     category: 'Weekend Holidays',
//     holidays: [
//       { name: 'Dr.Baba Saheb Ambedkar Jayanti', date: 'April 14, 2024', day: 'Sunday' },
//       { name: 'Mahavir Jayanti', date: 'April 21, 2024', day: 'Sunday' },
//       { name: 'Ganesh Chaturthi', date: 'September 07, 2024', day: 'Saturday' },
//       { name: 'Dussehra', date: 'October 13, 2024', day: 'Sunday' },
//       { name: 'Diwali-Balipratipada', date: 'November 02, 2024', day: 'Saturday' },
//     ],
//   },
//   {
//     category: 'Settlement Holidays',
//     holidays: [
//       { name: 'Republic Day', date: 'January 26, 2024', day: 'Friday' },
//       { name: 'Maha Shivaratri', date: 'March 08, 2024', day: 'Friday' },
//       { name: 'Holi', date: 'March 25, 2024', day: 'Monday' },
//       { name: 'Good Friday', date: 'March 29, 2024', day: 'Friday' },
//       { name: 'Gudhi Padwa', date: 'April 09, 2024', day: 'Tuesday' },
//       { name: 'Eid-Ul-Fitr (Ramzan Eid)', date: 'April 10, 2024', day: 'Wednesday' },
//       { name: 'Dr.Baba Saheb Ambedkar Jayanti', date: 'April 14, 2024', day: 'Sunday' },
//       { name: 'Ram Navami', date: 'April 17, 2024', day: 'Wednesday' },
//       { name: 'Mahavir Jayanti', date: 'April 21, 2024', day: 'Sunday' },
//       { name: 'Maharashtra Day', date: 'May 01, 2024', day: 'Wednesday' },
//       { name: 'Buddha Pournima', date: 'May 23, 2024', day: 'Thursday' },
//       { name: 'Bakri Eid', date: 'June 17, 2024', day: 'Monday' },
//       { name: 'Moharram', date: 'July 17, 2024', day: 'Wednesday' },
//       { name: 'Independence Day', date: 'August 15, 2024', day: 'Thursday' },
//       { name: 'Parsi New Year', date: 'August 16, 2024', day: 'Friday' },
//       { name: 'Ganesh Chaturthi', date: 'September 07, 2024', day: 'Saturday' },
//       { name: 'Mahatma Gandhi Jayanti', date: 'October 02, 2024', day: 'Wednesday' },
//       { name: 'Dasara', date: 'October 13, 2024', day: 'Sunday' },
//       { name: 'Diwali-Laxmi Pujan*', date: 'November 01, 2024', day: 'Friday' },
//       { name: 'Diwali-Balipratipada', date: 'November 02, 2024', day: 'Saturday' },
//       { name: 'Gurunanak Jayanti', date: 'November 15, 2024', day: 'Friday' },
//       { name: 'Christmas', date: 'December 25, 2024', day: 'Wednesday' },
//     ],
//   },
//   {
//     category: 'MCX Holidays',
//     holidays: [
//       { name: 'Republic Day', date: 'January 26, 2024', day: 'Friday', morningSession: 'Closed', eveningSession: 'Closed' },
//       { name: 'Maha Shivaratri', date: 'March 08, 2024', day: 'Friday', morningSession: 'Closed', eveningSession: 'Open' },
//       { name: 'Holi', date: 'March 25, 2024', day: 'Monday', morningSession: 'Closed', eveningSession: 'Open' },
//       { name: 'Good Friday', date: 'March 29, 2024', day: 'Friday', morningSession: 'Closed', eveningSession: 'Closed' },
//       { name: 'Eid-Ul-Fitr (Ramzan Eid)', date: 'April 10, 2024', day: 'Wednesday', morningSession: 'Closed', eveningSession: 'Open' },
//       { name: 'Ram Navami', date: 'April 17, 2024', day: 'Wednesday', morningSession: 'Closed', eveningSession: 'Open' },
//       { name: 'Maharashtra Day', date: 'May 01, 2024', day: 'Wednesday', morningSession: 'Closed', eveningSession: 'Open' },
//       { name: 'Bakri Eid', date: 'June 17, 2024', day: 'Monday', morningSession: 'Closed', eveningSession: 'Open' },
//       { name: 'Moharram', date: 'July 17, 2024', day: 'Wednesday', morningSession: 'Closed', eveningSession: 'Open' },
//       { name: 'Independence Day', date: 'August 15, 2024', day: 'Thursday', morningSession: 'Closed', eveningSession: 'Closed' },
//       { name: 'Mahatma Gandhi Jayanti', date: 'October 02, 2024', day: 'Wednesday', morningSession: 'Closed', eveningSession: 'Closed' },
//       { name: 'Diwali-Laxmi Pujan*', date: 'November 01, 2024', day: 'Friday', morningSession: 'Closed', eveningSession: 'Open' },
//       { name: 'Gurunanak Jayanti', date: 'November 15, 2024', day: 'Friday', morningSession: 'Closed', eveningSession: 'Open' },
//       { name: 'Christmas', date: 'December 25, 2024', day: 'Wednesday', morningSession: 'Closed', eveningSession: 'Closed' },
//     ],
//   },
//   {
//    category: 'CDS Holidays',
//     holidays: [
//       { name: 'Republic Day', date: 'January 26, 2024', day: 'Friday' },
//       { name: 'Maha Shivaratri', date: 'March 08, 2024', day: 'Friday' },
//       { name: 'Holi', date: 'March 25, 2024', day: 'Monday' },
//       { name: 'Good Friday', date: 'March 29, 2024', day: 'Friday' },
//       { name: 'Eid-Ul-Fitr (Ramzan Eid)', date: 'April 10, 2024', day: 'Wednesday' },
//       { name: 'Ram Navami', date: 'April 17, 2024', day: 'Wednesday' },
//       { name: 'Maharashtra Day', date: 'May 01, 2024', day: 'Wednesday' },
//       { name: 'Bakri Eid', date: 'June 17, 2024', day: 'Monday' },
//       { name: 'Moharram', date: 'July 17, 2024', day: 'Wednesday' },
//       { name: 'Independence Day', date: 'August 15, 2024', day: 'Thursday' },
//       { name: 'Mahatma Gandhi Jayanti', date: 'October 02, 2024', day: 'Wednesday' },
//       { name: 'Diwali-Laxmi Pujan*', date: 'November 01, 2024', day: 'Friday' },
//       { name: 'Gurunanak Jayanti', date: 'November 15, 2024', day: 'Friday' },
//       { name: 'Christmas', date: 'December 25, 2024', day: 'Wednesday' },
//     ],
//   },
//  ];

//  const sectionData = holidayData.map((category) => ({
//   title: category.category,
//   data: category.holidays,
// }));


// const goBack = () => {
//   if (route.params?.fromBottomTab) {
//     // If navigated from the bottom tab, go back to the previous screen in the tab navigator
//     navigation.goBack();
//   } else {
//     // If navigated from the header, go back to the WatchList screen
//     navigation.navigate('WatchList');
//   }
// };

// return (
//   <View style={styles.container1}>
//      <View style={styles.backButton1}>
//         <TouchableOpacity onPress={goBack} style={styles.backButton}>

//           <Ionicons name="arrow-back-outline" size={25} color="black" style={styles.backIcon} />
//         </TouchableOpacity>
//         <Text style={styles.userInfo}>Holidays Calender</Text>
//       </View>
//   <SafeAreaView style={styles.container}>
//     <SectionList
//       sections={sectionData}
//       keyExtractor={(item, index) => item.name + index}
//       renderItem={({ item }) => (
//         <View style={styles.itemContainer}>
//           <Text style={styles.holidayText}>{item.name}</Text>
//           <Text style={[styles.sessionText]}>{`Date: ${item.date}, Day: ${item.day}`}</Text>
//             {item.morningSession && (
//               <View style={[styles.session]}>
//                 <Text style={[styles.sessionText]}>Evening Session:</Text>
//               <Text style={[styles.sessionText, { color: item.morningSession === 'Open' ? 'green' : 'red' }]}>
//                 {item.morningSession}
//               </Text>
//               </View>
//             )}
//             {item.eveningSession && (
//               <View style={[styles.session]}>
//               <Text style={[styles.sessionText]}>Morning Session:</Text>
//               <Text style={[styles.sessionText, { color: item.eveningSession === 'Open' ? 'green' : 'red' }]}>
//                  {item.eveningSession}
//               </Text>
//               </View>
//             )}
//           </View>
//         )}
//       renderSectionHeader={({ section: { title } }) => (
//         <View style={styles.categoryContainer}>
//           <Text style={styles.categoryText}>{title}</Text>
//         </View>
//       )}
//     />
//   </SafeAreaView>
//   </View>
// );
// };

// const styles = StyleSheet.create({


// nave:{
//    //flex: 1,
//    backgroundColor: 'red',
//    width: '100%',
//    height: 100
// },
// nave1:{
//    display: 'flex',
//    paddingTop: 60,
//    fontSize: 16,
//   // alignContent: 'flex-end',
//     justifyContent: 'flex-end'

// },
// session:{
//  flexDirection: 'row'
// },
// userInfo: {
//   top: 13,
//   left: 50,
//   fontWeight: 'bold',
//   fontSize: 20,
//   flex: 1,
//   justifyContent: 'center',
//   alignItems: 'center'
// },
// backIcon: {
//   top: 12,
// },
// backButton: {
//   marginRight: -40,

// },
// backButton1: {
//   marginTop: 30,
//   width: '98%',
//   height: 50,
//   //backgroundColor:'red',
//   flexDirection: 'row'

// },
// container: {
//   //flex: 1,

//   backgroundColor: '#fff',
//   padding: 10,
// },
// categoryContainer: {
//   marginBottom: 16,
// },
// categoryText: {
//   fontSize: 20,
//   fontWeight: 'bold',
//   marginBottom: 8,
//   color: 'green',
// },
// itemContainer: {
//   marginBottom: 16,
//   borderBottomWidth: 1,
//   borderBottomColor: '#ccc',
//   paddingBottom: 8,
// },
// holidayText: {
//   fontSize: 18,
//   fontWeight: 'bold',
// },
// sessionText: {
//   fontSize: 16,
//   fontWeight: '700',
//   color: 'gray'
// },
// morningSessionText: {
//   fontSize: 16,
//  // fontWeight: 'bold',
//  // color: 'red', // Set a default color if needed
// },
// });

// export default Calender;
