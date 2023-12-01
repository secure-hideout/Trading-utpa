import React, { useState, useEffect, createContext } from 'react';
import { fetchWatchlistData, addToWatchlistApi, removeFromWatchlistApi } from '../api';
import Toast from 'react-native-toast-message';
const AssetDataContext = createContext();

export const AssetDataProvider = ({ children }) => {
  const [assetData, setAssetData] = useState([]);
  const [watchlist, setWatchlist] = useState([]);

  const [firstName, setFirstName] = useState('');
  console.log("Current FirstName in Context:", firstName);




  const addToWatchlist = async (item, token) => {
    try {
      if (!item.InstrumentId || !item.InstrumentType) {
        console.error('InstrumentId and InstrumentType are required.');
        return;
      }

      // Log for debugging
      console.log('Current watchlist:', watchlist);
      console.log('Item to add:', item);

      if (watchlist.some(watchlistItem => watchlistItem.InstrumentId === item.InstrumentId)) {
        throw new Error('Item is already in the watchlist');
      }

      await addToWatchlistApi(item, token);
      setWatchlist(prevWatchlist => [...prevWatchlist, item]);
    } catch (error) {
      console.error('Failed to add to watchlist:', error);
      throw error;
    }
  };






  const removeFromWatchlist = async (item, token) => {
    try {
      await removeFromWatchlistApi(item, token);

      const newWatchlist = watchlist.filter(
        (watchlistItem) =>
          watchlistItem.InstrumentId !== item.InstrumentId ||
          watchlistItem.InstrumentType !== item.InstrumentType
      );

      setWatchlist(newWatchlist);
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
      setWatchlist,
      removeFromWatchlist,
      updateToken,
      firstName,
      setFirstName
    }}>
      {children}
    </AssetDataContext.Provider>
  );
};

export default AssetDataContext;

