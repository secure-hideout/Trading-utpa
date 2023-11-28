//old code


import React, { useState, useEffect, createContext } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';



const AssetDataContext = createContext();

export const AssetDataProvider = ({ children }) => {
  const [assetData, setAssetData] = useState([]);
  const [watchlist, setWatchlist] = useState([]);
  const [token, setToken] = useState(null);


  useEffect(() => {
    const fetchWatchlistData = async () => {
      if (!token) return;

      try {
        const response = await fetch('http://10.0.2.2:9000/api/user/watchlist', {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        });

        if (!response.ok) {
          throw new Error('Network response was not ok');
        }

        const data = await response.json();
        setWatchlist(data);
      } catch (error) {
        console.error('Error fetching watchlist data:', error);
      }
    };

    fetchWatchlistData();
  }, [token]);

  useEffect(() => {
    // Load watchlist from AsyncStorage when the component mounts
    const loadWatchlistFromStorage = async () => {
      try {
        const storedWatchlist = await AsyncStorage.getItem('watchlist');
        if (storedWatchlist) {
          setWatchlist(JSON.parse(storedWatchlist));
        }
      } catch (error) {
        console.error('Error loading watchlist from storage:', error);
      }
    };
    loadWatchlistFromStorage();
  }, []);



  const addToWatchlist = async (item, token) => {
    console.log('Item:', item); // Log the item object
    try {
      if (!item.InstrumentId || !item.InstrumentType) {  // Check for Zid and InstrumentType in the item
        console.error('InstrumentId (Zid) and InstrumentType are required.');
        return;
      }



      const requestBody = {

        InstrumentId: item.InstrumentId,  // Use Zid for InstrumentId
        InstrumentType: item.InstrumentType,  // Use Segment or Exchange based on your API requirement


      };


      console.log('Request payload:', JSON.stringify(requestBody));

      const response = await fetch('http://10.0.2.2:9000/api/user/addToWatchlist', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify(requestBody),
      });

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`Network response was not ok: ${errorText}`);
      }

      const data = await response.json();
      console.log('Added to watchlist successfully', data);

      setWatchlist((prevWatchlist) => {
        const newWatchlist = [...prevWatchlist, item];
        AsyncStorage.setItem('watchlist', JSON.stringify(newWatchlist)).catch((error) => {
          console.error('Failed to save watchlist to storage:', error);
        });
        return newWatchlist;
      });
    } catch (error) {
      console.error('Failed to add to watchlist:', error);
    }
  };

  const removeFromWatchlist = async (item) => {
    try {
      const newWatchlist = watchlist.filter(
        (watchlistItem) =>
          watchlistItem.InstrumentId !== item.InstrumentId ||
          watchlistItem.InstrumentType !== item.InstrumentType
      );

      // Update state
      setWatchlist(newWatchlist);

      // Update AsyncStorage
      await AsyncStorage.setItem('watchlist', JSON.stringify(newWatchlist));
    } catch (error) {
      console.error('Failed to remove from watchlist:', error);
    }
  };



  const updateToken = (newToken) => {
    setToken(newToken);
  };

  return (
    <AssetDataContext.Provider value={{
      assetData,
      setAssetData,
      watchlist,
      addToWatchlist,
      removeFromWatchlist,
      updateToken
    }}>
      {children}
    </AssetDataContext.Provider>
  );
};

export default AssetDataContext;











//wo api file

// import React, { useState, useEffect, createContext } from 'react';

// const AssetDataContext = createContext();

// export const AssetDataProvider = ({ children }) => {
//   const [assetData, setAssetData] = useState([]);
//   const [watchlist, setWatchlist] = useState([]);
//   const [token, setToken] = useState(null);

//   useEffect(() => {
//     const fetchWatchlistData = async () => {
//       if (!token) return;

//       try {
//         const response = await fetch('http://10.0.2.2:9000/api/user/watchlist', {
//           method: 'POST',
//           headers: {
//             'Authorization': `Bearer ${token}`,
//             'Content-Type': 'application/json',
//           },
//         });

//         if (!response.ok) {
//           throw new Error('Network response was not ok');
//         }

//         const data = await response.json();
//         setWatchlist(data);
//       } catch (error) {
//         console.error('Error fetching watchlist data:', error);
//       }
//     };

//     fetchWatchlistData();
//   }, [token, setWatchlist]);

//   const addToWatchlist = async (item, token) => {
//     console.log('Item:', item); // Log the item object
//     try {
//       if (!item.InstrumentId || !item.InstrumentType) {
//         console.error('InstrumentId (Zid) and InstrumentType are required.');
//         return;
//       }

//       const requestBody = {
//         InstrumentId: item.InstrumentId,
//         InstrumentType: item.InstrumentType,
//       };

//       console.log('Request payload:', JSON.stringify(requestBody));

//       const response = await fetch('http://10.0.2.2:9000/api/user/addToWatchlist', {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//           'Authorization': `Bearer ${token}`,
//         },
//         body: JSON.stringify(requestBody),
//       });

//       if (!response.ok) {
//         const errorText = await response.text();
//         throw new Error(`Network response was not ok: ${errorText}`);
//       }

//       const data = await response.json();
//       console.log('Added to watchlist successfully', data);

//       setWatchlist((prevWatchlist) => [...prevWatchlist, item]);
//     } catch (error) {
//       console.error('Failed to add to watchlist:', error);
//     }
//   };

//   const removeFromWatchlist = async (item) => {
//     try {
//       const newWatchlist = watchlist.filter(
//         (watchlistItem) =>
//           watchlistItem.InstrumentId !== item.InstrumentId ||
//           watchlistItem.InstrumentType !== item.InstrumentType
//       );

//       //     setWatchlist(newWatchlist);
//       //   } catch (error) {
//       //     console.error('Failed to remove from watchlist:', error);
//       //   }
//       // };

//       // const updateToken = (newToken) => {
//       //   setToken(newToken);
//       // };

//       updateWatchlist(newWatchlist);
//     } catch (error) {
//       console.error('Failed to remove from watchlist:', error);
//     }
//   };

//   const updateWatchlist = (newWatchlist) => {
//     setWatchlist(newWatchlist);
//   };
//   const updateToken = (newToken) => {
//     setToken(newToken);
//   };

//   return (
//     <AssetDataContext.Provider value={{
//       assetData,
//       setAssetData,
//       watchlist,
//       addToWatchlist,
//       removeFromWatchlist,
//       updateToken,
//     }}>
//       {children}
//     </AssetDataContext.Provider>
//   );
// };

// export default AssetDataContext;



//api connected file
// import React, { useState, useEffect, createContext } from 'react';
// import { fetchWatchlistData, addToWatchlistApi } from '../api/assetApi';


// const AssetDataContext = createContext();

// export const AssetDataProvider = ({ children }) => {
//   const [assetData, setAssetData] = useState([]);
//   const [watchlist, setWatchlist] = useState([]);
//   const [token, setToken] = useState(null);


//   useEffect(() => {
//     const fetchWatchlistData = async () => {
//       if (!token) return;

//       try {
//         const data = await fetchWatchlistData(token);
//         setWatchlist(data);
//       } catch (error) {
//         console.error('Error fetching watchlist data:', error);
//       }
//     };

//     fetchWatchlistData();
//   }, [token, setWatchlist]);

//   const addToWatchlist = async (item, token) => {
//     console.log('Item:', item); // Log the item object
//     try {
//       if (!item.InstrumentId || !item.InstrumentType) {
//         console.error('InstrumentId (Zid) and InstrumentType are required.');
//         return;
//       }

//       const data = await addToWatchlistApi(item, token);
//       setWatchlist((prevWatchlist) => [...prevWatchlist, item]);
//     } catch (error) {
//       console.error('Failed to add to watchlist:', error);
//     }
//   };
//   const removeFromWatchlist = async (item) => {
//     try {
//       const newWatchlist = watchlist.filter(
//         (watchlistItem) =>
//           watchlistItem.InstrumentId !== item.InstrumentId ||
//           watchlistItem.InstrumentType !== item.InstrumentType
//       )

//       updateWatchlist(newWatchlist);
//     } catch (error) {
//       console.error('Failed to remove from watchlist:', error);
//     }
//   };

//   const updateWatchlist = (newWatchlist) => {
//     setWatchlist(newWatchlist);
//   };
//   const updateToken = (newToken) => {
//     setToken(newToken);
//   };

//   return (
//     <AssetDataContext.Provider value={{
//       assetData,
//       setAssetData,
//       watchlist,
//       addToWatchlist,
//       removeFromWatchlist,
//       updateToken,
//     }}>
//       {children}
//     </AssetDataContext.Provider>
//   );
// };

// export default AssetDataContext;


// wodatawhenreload
// import React, { useState, useEffect, createContext } from 'react';

// const AssetDataContext = createContext();

// export const AssetDataProvider = ({ children }) => {
//   const [assetData, setAssetData] = useState([]);
//   const [watchlist, setWatchlist] = useState([]);
//   const [token, setToken] = useState(null);

//   useEffect(() => {
//     const fetchWatchlistData = async () => {
//       if (!token) return;

//       try {
//         const response = await fetch('http://10.0.2.2:9000/api/user/watchlist', {
//           method: 'POST',
//           headers: {
//             'Authorization': `Bearer ${token}`,
//             'Content-Type': 'application/json',
//           },
//         });

//         if (!response.ok) {
//           throw new Error('Network response was not ok');
//         }

//         const data = await response.json();
//         setWatchlist(data);
//       } catch (error) {
//         console.error('Error fetching watchlist data:', error);
//       }
//     };

//     fetchWatchlistData();
//   }, [token, setWatchlist]);

//   const addToWatchlist = async (item, token) => {
//     console.log('Item:', item); // Log the item object
//     try {
//       if (!item.InstrumentId || !item.InstrumentType) {
//         console.error('InstrumentId (Zid) and InstrumentType are required.');
//         return;
//       }

//       const requestBody = {
//         InstrumentId: item.InstrumentId,
//         InstrumentType: item.InstrumentType,
//       };

//       console.log('Request payload:', JSON.stringify(requestBody));

//       const response = await fetch('http://10.0.2.2:9000/api/user/addToWatchlist', {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//           'Authorization': `Bearer ${token}`,
//         },
//         body: JSON.stringify(requestBody),
//       });

//       if (!response.ok) {
//         const errorText = await response.text();
//         throw new Error(`Network response was not ok: ${errorText}`);
//       }

//       const data = await response.json();
//       console.log('Added to watchlist successfully', data);

//       setWatchlist((prevWatchlist) => [...prevWatchlist, item]);
//     } catch (error) {
//       console.error('Failed to add to watchlist:', error);
//     }
//   };

//   const removeFromWatchlist = async (item) => {
//     try {
//       const newWatchlist = watchlist.filter(
//         (watchlistItem) =>
//           watchlistItem.InstrumentId !== item.InstrumentId ||
//           watchlistItem.InstrumentType !== item.InstrumentType
//       );

//       //     setWatchlist(newWatchlist);
//       //   } catch (error) {
//       //     console.error('Failed to remove from watchlist:', error);
//       //   }
//       // };

//       // const updateToken = (newToken) => {
//       //   setToken(newToken);
//       // };

//       updateWatchlist(newWatchlist);
//     } catch (error) {
//       console.error('Failed to remove from watchlist:', error);
//     }
//   };

//   const updateWatchlist = (newWatchlist) => {
//     setWatchlist(newWatchlist);
//   };
//   const updateToken = (newToken) => {
//     setToken(newToken);
//   };

//   return (
//     <AssetDataContext.Provider value={{
//       assetData,
//       setAssetData,
//       watchlist,
//       addToWatchlist,
//       removeFromWatchlist,
//       updateToken,
//     }}>
//       {children}
//     </AssetDataContext.Provider>
//   );
// };

// export default AssetDataContext;




