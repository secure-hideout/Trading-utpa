import React, { useState, useEffect, createContext, useContext } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

const AssetDataContext = React.createContext();

export const AssetDataProvider = ({ children }) => {
  const [assetData, setAssetData] = useState([]);
  const [watchlist, setWatchlist] = useState([]);


  useEffect(() => {
    const loadWatchlist = async () => {
      try {
        const storedWatchlist = await AsyncStorage.getItem('watchlist');
        if (storedWatchlist) {
          setWatchlist(JSON.parse(storedWatchlist));
        }
      } catch (error) {
        console.error('Error loading watchlist from AsyncStorage:', error);
      }
    };

    loadWatchlist();
  }, []);

  useEffect(() => {
    const storeWatchlist = async () => {
      try {
        await AsyncStorage.setItem('watchlist', JSON.stringify(watchlist));
      } catch (error) {
        console.error('Error storing watchlist in AsyncStorage:', error);
      }
    };

    storeWatchlist();
  }, [watchlist]);

  const addToWatchlist = (item) => {
    if (!watchlist.some((watchlistItem) => watchlistItem.name2 === item.name2)) {
      setWatchlist((prevWatchlist) => [...prevWatchlist, item]);
    }
  };

  const removeFromWatchlist = (item) => {
    const newWatchlist = watchlist.filter(
      (watchlistItem) => watchlistItem.name2 !== item.name2
    );
    setWatchlist(newWatchlist);
  };


  return (
    <AssetDataContext.Provider value={{
      assetData,
      setAssetData,
      watchlist,
      addToWatchlist,
      removeFromWatchlist
    }}>
      {children}
    </AssetDataContext.Provider>
  );
};

export default AssetDataContext;

























//try watchlist from database
// import React, { useState, useEffect, createContext, useContext } from 'react';
// import AsyncStorage from '@react-native-async-storage/async-storage';
// import jwtDecode from 'jwt-decode';


// const AssetDataContext = React.createContext();

// export const AssetDataProvider = ({ children }) => {
//   const [assetData, setAssetData] = useState([]);
//   const [watchlist, setWatchlist] = useState([]);
//   const [token, setToken] = useState(null);  // New state for token
//   const [userID, setUserID] = useState(null);  // New state for userID

//   useEffect(() => {
//     if (token) {
//       const decodedToken = jwtDecode(token);
//       setUserID(decodedToken.UserID);
//     }
//   }, [token]);


//   useEffect(() => {
//     const loadWatchlist = async () => {
//       try {
//         const storedWatchlist = await AsyncStorage.getItem('watchlist');
//         if (storedWatchlist) {
//           setWatchlist(JSON.parse(storedWatchlist));
//         }
//       } catch (error) {
//         console.error('Error loading watchlist from AsyncStorage:', error);
//       }
//     };

//     loadWatchlist();
//   }, []);

//   useEffect(() => {

//     const storeWatchlist = async () => {
//       try {
//         await AsyncStorage.setItem('watchlist', JSON.stringify(watchlist));
//       } catch (error) {
//         console.error('Error storing watchlist in AsyncStorage:', error);
//       }
//     };

//     storeWatchlist();
//   }, [watchlist]);


//   const addToWatchlist = async (item) => {
//     if (!watchlist.some((watchlistItem) => watchlistItem.name2 === item.name2)) {
//       try {
//         const response = await fetch('http://localhost:9000/api/user/watchlist', {
//           method: 'POST',
//           headers: {
//             'Content-Type': 'application/json',
//             'Authorization': `Bearer ${token}`
//           },
//           body: JSON.stringify({
//             UserID: userID,
//             InstrumentId: item.id,
//             InstrumentType: "NSE"  // Make dynamic if necessary
//           })
//         });

//         const responseData = await response.json();

//         if (response.ok) {
//           setWatchlist((prevWatchlist) => [...prevWatchlist, responseData]);
//         } else {
//           console.error("Failed to add to watchlist", responseData.message);
//         }
//       } catch (error) {
//         console.error("Error adding to watchlist:", error);
//       }
//     }
//   };

//   const removeFromWatchlist = (item) => {
//     const newWatchlist = watchlist.filter(
//       (watchlistItem) => watchlistItem.name2 !== item.name2
//     );
//     setWatchlist(newWatchlist);
//   };


//   return (
//     <AssetDataContext.Provider value={{
//       assetData,
//       setAssetData,
//       watchlist,
//       addToWatchlist,
//       removeFromWatchlist,
//       token,      // Providing token so that child components can set it upon login
//       setToken   // Providing setToken for same reason
//     }}>
//       {children}
//     </AssetDataContext.Provider>
//   );
// };

// export default AssetDataContext;

























