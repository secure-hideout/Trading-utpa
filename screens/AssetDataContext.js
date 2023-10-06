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


  // const addToWatchlist = (item) => {
  //   setWatchlist((prevWatchlist) => {
  //     return [...prevWatchlist, item];
  //   });
  // };

  const addToWatchlist = (item) => {
    if (!watchlist.some((watchlistItem) => watchlistItem.name2 === item.name2)) {
      setWatchlist((prevWatchlist) => [...prevWatchlist, item]);
    }
  };

  // const removeFromWatchlist = (item) => {
  //   setWatchlist((prevWatchlist) => {
  //     return prevWatchlist.filter(watchItem => watchItem.name2 !== item.name2);
  //   });
  // };


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



//friday eve 

// import React, { useState } from 'react';
// import { useContext } from 'react';
// const AssetDataContext = React.createContext();

// export const AssetDataProvider = ({ children }) => {
//   const [assetData, setAssetData] = useState([]);
//   const [watchlist, setWatchlist] = useState([]);

//   const addToWatchlist = (item) => {
//     setWatchlist((prevWatchlist) => {
//       return [...prevWatchlist, item];
//     });
//   };

//   // const removeFromWatchlist = (item) => {
//   //   setWatchlist((prevWatchlist) => {
//   //     return prevWatchlist.filter(watchItem => watchItem.name2 !== item.item);
//   //   });
//   // };

//   const removeFromWatchlist = (name2ToRemove) => {
//     setWatchlist((prevWatchlist) => {
//       return prevWatchlist.filter(watchItem => watchItem.name2 !== name2ToRemove);
//     });
//   };




//   return (
//     <AssetDataContext.Provider value={{
//       assetData,
//       setAssetData,
//       watchlist,
//       addToWatchlist,
//       removeFromWatchlist
//     }}>
//       {children}
//     </AssetDataContext.Provider>
//   );
// };

// export default AssetDataContext;























// import React from 'react';

// const AssetDataContext = React.createContext();

// export const AssetDataProvider = AssetDataContext.Provider;
// export const AssetDataConsumer = AssetDataContext.Consumer;

// export default AssetDataContext;