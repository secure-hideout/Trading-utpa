export const deleteConform = (id, token) => {


  const myHeaders = new Headers();
  myHeaders.append("Authorization", `Bearer ${token}`);
  myHeaders.append("Content-Type", "application/json");

  const Id = id;
  console.log("------------------>", id);
  const requestOptions = {
    method: 'DELETE',
    headers: myHeaders,
    redirect: 'follow',
  };

  return new Promise((resolve, reject) => {
    fetch(`http://35.154.235.224:8000/users/${Id}`, requestOptions)
      .then((response) => {
        if (!response.ok) {
          console.error('delete successful');
          throw new Error(`HTTP status ${response.status}`);
        }
        return response.json();
      })
      .then((result) => {
        console.error('Delete response:', result);
        console.error("Error fetching data:", result.status);
        resolve(result); // or resolve(result) depending on your needs
      })
      .catch((error) => {
        console.error("Error fetching data:", error.status);
        console.error('Error deleting account:', error);
        console.error('Error', 'Failed to delete. Please try again.');
        reject(error);
      });
  });
};



// export const updateName = async () => {
//   //const token = 'your_token_here'; // Replace with your actual token

//   const requestOptions = {
//     method: 'POST',
//     headers: {
//       'Content-Type': 'application/json',
//       Authorization: `Bearer ${token}`,
//     },
//     body: JSON.stringify({
//       firstname1: firstname, // Replace with the actual firstname
//       lastname1: lastname, // Replace with the actual lastname
//       Currenc1y: 'INR', // Replace with the actual currency
//     }),
//   };

//     console.log("------------------>",firstname,lastname)
//   try {
//     const response = await fetch(
//       'http://10.0.2.2:9000/api/user/updateProfile', // Replace with your actual API endpoint
//       requestOptions
//     );

//     const result = await response.text();
//     setUpdateResult(result);
//   } catch (error) {
//     console.error('Error:', error);
//   }
// };


// const updateName = async () => {

//   const requestOptions = {
//     method: 'POST',
//     headers: {
//       'Content-Type': 'application/json',
//       Authorization: `Bearer ${token}`,
//     },
//     body: JSON.stringify({
//       firstName: firstname, // Replace with the actual firstname
//       lastName: lastname, // Replace with the actual lastname
//       Currenc1y: 'INR', // Replace with the actual currency
//     }),
//   };

//   console.log("------------------>",firstname,lastname)
//   try {
//     const response = await fetch(
//       'http://35.154.235.224:9000/api/user/updateProfile', // Replace with your actual API endpoint
//       requestOptions
//     );

//     const result = await response.text();
//    // setUpdateResult(result);
//     hideupdatename();
//     Toast.show({
//       type: "success",
//       text1: `Name Changed Succesfull`,
//     });
//     fetchData();
//     setFirstname('');
//     setLastname('');
//     //setShowDeleteModal(false)
//   } catch (error) {
//     console.error('Error:', error);
//   }
//  };



//  useEffect(() => {
//     fetchData();
//  }, [token, firstname, lastname]);


// export const fetchData = async () => {
//   try {
//     const response = await fetch(
//       "http://35.154.235.224:9000/api/user/profile",
//       {
//         method: "POST",
//         headers: {
//           Authorization: `Bearer ${token}`,
//         },
//         redirect: "follow",
//       }
//     );

//     if (response.ok) {
//       const result = await response.json();
//       setApiData1({
//         FirstName: result.FirstName,
//         LastName: result.LastName,
//         FirstName: result.LastName,
//         //console.log("---->",FirstName)
//       })
      
//     } else {
//       console.error("Error fetching data:", response.status);
//     }
//   } catch (error) {
//     console.error("Error:", error);
//   }
// };
