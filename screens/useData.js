import { useContext } from 'react';
import AssetDataContext from './AssetDataContext';

const useData = () => {
  const context = useContext(AssetDataContext);
  if (!context) {
    throw new Error('useData must be used within an AssetDataProvider');
  }
  return context;
};

export default useData;