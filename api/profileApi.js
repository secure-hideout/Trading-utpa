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
    fetch(`http://192.168.0.77:8000/users/${Id}`, requestOptions)
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



export const updateName = async () => {
  //const token = 'your_token_here'; // Replace with your actual token

  const requestOptions = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({
      firstname1: firstname, // Replace with the actual firstname
      lastname1: lastname, // Replace with the actual lastname
      Currenc1y: 'INR', // Replace with the actual currency
    }),
  };

    console.log("------------------>",firstname,lastname)
  try {
    const response = await fetch(
      'http://10.0.2.2:9000/api/user/updateProfile', // Replace with your actual API endpoint
      requestOptions
    );

    const result = await response.text();
    setUpdateResult(result);
  } catch (error) {
    console.error('Error:', error);
  }
};
