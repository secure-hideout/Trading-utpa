// ViewPortfolio.js
import React, { useEffect } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import AssetCard from './AssetCard';

const ViewPortfolio = ({ selectedCard, updateTotalValue, updateChangePercentage }) => {


  const cardData = {
    Crypto: [
      {
        name2: 'BNB', name3: 'BTC', value: '$212.4', decimalValue: '.60', changePercentage: '+7.90%', logo: 'https://assets.coingecko.com/coins/images/10365/large/assets/bitcoinsvgrepocom-1.svg',
      },
      {
        name2: 'ETC',
        name3: 'BTC',
        value: '$27,618',
        decimalValue: '.60',
        changePercentage: '-7.90%',
        logo: 'https://assets.coingecko.com/coins/images/10365/large/assets/bitcoinsvgrepocom-1.svg',
      },
      {
        name2: 'ETH',
        name3: 'BTC',
        value: '$100,633',
        decimalValue: '.60',
        changePercentage: '-17.90%',
        logo: 'https://assets.coingecko.com/coins/images/10365/large/assets/bitcoinsvgrepocom-1.svg',
      },

      {
        name2: 'XRP',
        name3: 'BTC',
        value: '$0.522',
        decimalValue: '.60',
        changePercentage: '-7.90%',
        logo: 'https://assets.coingecko.com/coins/images/10365/large/assets/bitcoinsvgrepocom-1.svg',
      },
      {
        name2: 'SOL',
        name3: 'BTC',
        value: '$23.3',
        decimalValue: '.60',
        changePercentage: '-7.90%',
        logo: 'https://assets.coingecko.com/coins/images/10365/large/assets/bitcoinsvgrepocom-1.svg',
      },
      {
        name2: 'AVAX',
        name3: 'BTC',
        value: '$1000.6',
        decimalValue: '.60',
        changePercentage: '+7.90%',
        logo: 'https://assets.coingecko.com/coins/images/10365/large/assets/bitcoinsvgrepocom-1.svg',
      },
      {
        name2: 'JUV',
        name3: 'BTC',
        value: '$1.11',
        decimalValue: '.60',
        changePercentage: '+7.90%',
        logo: 'https://assets.coingecko.com/coins/images/10365/large/assets/bitcoinsvgrepocom-1.svg',
      },

    ],
    NSE: [
      {
        name2: 'FORCE',
        name3: 'BTC',
        value: '$30,618',
        decimalValue: '.60',
        changePercentage: '-7.90%',
        logo: 'https://assets.coingecko.com/coins/images/10365/large/assets/bitcoinsvgrepocom-1.svg',
      },
      {
        name2: 'HONDA', name3: 'BTC', value: '$212.4', decimalValue: '.60', changePercentage: '+7.90%', logo: 'https://assets.coingecko.com/coins/images/10365/large/assets/bitcoinsvgrepocom-1.svg',
      },
      {
        name2: 'TATA', name3: 'BTC', value: '$212.4', decimalValue: '.60', changePercentage: '+7.90%', logo: 'https://assets.coingecko.com/coins/images/10365/large/assets/bitcoinsvgrepocom-1.svg',
      },
      {
        name2: 'APPLE', name3: 'BTC', value: '$212.4', decimalValue: '.60', changePercentage: '+7.90%', logo: 'https://assets.coingecko.com/coins/images/10365/large/assets/bitcoinsvgrepocom-1.svg',
      },
      {
        name2: 'TESLA', name3: 'BTC', value: '$212.4', decimalValue: '.60', changePercentage: '+7.90%', logo: 'https://assets.coingecko.com/coins/images/10365/large/assets/bitcoinsvgrepocom-1.svg',
      },
      {
        name2: 'JIO', name3: 'BTC', value: '$212.4', decimalValue: '.60', changePercentage: '+7.90%', logo: 'https://assets.coingecko.com/coins/images/10365/large/assets/bitcoinsvgrepocom-1.svg',
      },

    ],
    BSE: [
      {
        name2: 'ACC',
        name3: 'BTC',
        value: '$30,618',
        decimalValue: '.60',
        changePercentage: '-7.90%',
        logo: 'https://assets.coingecko.com/coins/images/10365/large/assets/bitcoinsvgrepocom-1.svg',
      },
      {
        name2: 'ADANI', name3: 'BTC', value: '$212.4', decimalValue: '.60', changePercentage: '+7.90%', logo: 'https://assets.coingecko.com/coins/images/10365/large/assets/bitcoinsvgrepocom-1.svg',
      },
      {
        name2: 'ADITYA', name3: 'BTC', value: '$212.4', decimalValue: '.60', changePercentage: '+7.90%', logo: 'https://assets.coingecko.com/coins/images/10365/large/assets/bitcoinsvgrepocom-1.svg',
      },
      {
        name2: 'ALKEM', name3: 'BTC', value: '$212.4', decimalValue: '.60', changePercentage: '+7.90%', logo: 'https://assets.coingecko.com/coins/images/10365/large/assets/bitcoinsvgrepocom-1.svg',
      },
      {
        name2: 'ATUL', name3: 'BTC', value: '$212.4', decimalValue: '.60', changePercentage: '+7.90%', logo: 'https://assets.coingecko.com/coins/images/10365/large/assets/bitcoinsvgrepocom-1.svg',
      },
      {
        name2: 'ASTRAL', name3: 'BTC', value: '$212.4', decimalValue: '.60', changePercentage: '+7.90%', logo: 'https://assets.coingecko.com/coins/images/10365/large/assets/bitcoinsvgrepocom-1.svg',
      },
    ],
    Commodity: [

      {
        name2: 'BNB', name3: 'BTC', value: '$212.4', decimalValue: '.60', changePercentage: '+7.90%', logo: 'https://assets.coingecko.com/coins/images/10365/large/assets/bitcoinsvgrepocom-1.svg',
      },
      {
        name2: 'BNB', name3: 'BTC', value: '$212.4', decimalValue: '.60', changePercentage: '+7.90%', logo: 'https://assets.coingecko.com/coins/images/10365/large/assets/bitcoinsvgrepocom-1.svg',
      },
      {
        name2: 'BNB', name3: 'BTC', value: '$212.4', decimalValue: '.60', changePercentage: '+7.90%', logo: 'https://assets.coingecko.com/coins/images/10365/large/assets/bitcoinsvgrepocom-1.svg',
      },
      {
        name2: 'BNB', name3: 'BTC', value: '$20000', decimalValue: '.60', changePercentage: '+7.90%', logo: 'https://assets.coingecko.com/coins/images/10365/large/assets/bitcoinsvgrepocom-1.svg',
      },

    ],
  };

  const calculateTotalValue = (cardType) => {
    const cardTypeData = cardData[cardType];
    if (cardTypeData) {
      let totalValue = 0;
      cardTypeData.forEach((item) => {
        totalValue += parseFloat(item.value.replace('$', '').replace(/,/g, ''));
      });
      return `$${totalValue.toFixed(2)}`;
    }
    return '$0.00';
  };


  const calculateChangePercentage = (cardType) => {
    const cardTypeData = cardData[cardType];
    if (cardTypeData) {
      let totalChange = 0;
      cardTypeData.forEach((item) => {
        totalChange += parseFloat(item.changePercentage.replace('+', '').replace('%', ''));
      });
      return totalChange > 0 ? `+${totalChange.toFixed(2)}%` : `${totalChange.toFixed(2)}%`;
    }
    return '+0.00%';
  };

  useEffect(() => {
    const cardTypes = Object.keys(cardData);
    cardTypes.forEach(cardType => {
      const totalValue = calculateTotalValue(cardType);
      const totalChangePercentage = calculateChangePercentage(cardType);
      updateTotalValue(cardType, totalValue);
      updateChangePercentage(cardType, totalChangePercentage);
    });
  }, []);


  return (
    <View style={styles.container}>
      <View style={styles.portfolio}>
        <Text style={styles.portfolioText}>{selectedCard} Portfolio</Text>
        <Text style={styles.totalValue}>{calculateTotalValue(selectedCard)}</Text>
      </View>
      {cardData[selectedCard] ? (
        cardData[selectedCard].map((data, index) => (
          <AssetCard data={data} key={index} />
        ))
      ) : (
        <Text style={styles.cardDataText}>No data available for {selectedCard}</Text>
      )}
    </View>
  );
};



const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'FFFFFF',
  },
  portfolio: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  portfolioText: {
    fontSize: 16,
    fontWeight: '600',
    lineHeight: 17.71,
  },
  totalValue: {
    fontSize: 14,
    fontWeight: '600',
    lineHeight: 19.09,
    color: 'rgba(28, 30, 50, 1)',
  },
  cardDataText: {
    fontSize: 16,
    fontWeight: '600',
    lineHeight: 17.71,
  },
});

export default ViewPortfolio;


