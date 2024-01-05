import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Card, Button } from 'react-native-paper';
import { useSelector } from 'react-redux';
import Toast from 'react-native-toast-message';
import TransactionModal from './TransactionModal'; // Import the TransactionModal component

const Payments = ({ Instrument = 'Sell', LastPrice, instrumentType, instrumentId, Quantities, setQData }) => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [sellType, setSellType] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [isRegistered, setIsRegistered] = useState(false);
  const [latestQuantities, setLatestQuantities] = useState(Quantities);

  const { token } = useSelector((state) => state.auth);

  const performTransaction = async (quantity) => {
    setIsModalVisible(false);
    setLoading(true);
    setError('');

    const availableQuantity = Quantities;

    try {
      const data = {
        instrumentId: parseInt(instrumentId),
        instrumentType: instrumentType,
        quantity: parseInt(quantity),
      };

      const myHeaders = new Headers();
      myHeaders.append('Content-Type', 'application/json');
      myHeaders.append('Authorization', `Bearer ${token}`);

      const raw = JSON.stringify(data);

      let requestOptions;

      if (sellType === 'sell') {
        if (parseInt(quantity) > availableQuantity) {
          Toast.show({
            type: 'error',
            text1:'Error',
            text2: `Cannot sell more than available quantity ${availableQuantity}`,
          });
          setLoading(false);
          return;
        }

        requestOptions = {
          method: 'POST',
          headers: myHeaders,
          body: raw,
          redirect: 'follow',
        };

        const response = await fetch('http://35.154.235.224:9000/api/user/sellSymbol', requestOptions);

        console.log(`${sellType} API response:`, response.status, response.statusText);

        if (response.ok) {
          setIsRegistered(true);
          fetchData1();
          Toast.show({
            type: 'success',
            text1:'Success',
            text2: `Sell Successful`,
          });

          const responseData = await response.json();
          const updatedQuantities = responseData.quantities;
          setLatestQuantities(updatedQuantities);
          console.log('Latest value:', responseData?.quantity);
        } else {
          console.error(`${sellType} API error response:`, await response.text());
          setError('Please enter Quantity');
          Toast.show({
            type: 'error',
            text1: 'Failed To Sell',
          });
        }
      } else if (sellType === 'buy') {
        requestOptions = {
          method: 'POST',
          headers: myHeaders,
          body: raw,
          redirect: 'follow',
        };

        const response = await fetch('http://35.154.235.224:9000/api/user/purshaseSymbol', requestOptions);

        console.log(`${sellType} API response:`, response.status, response.statusText);

        if (response.ok) {
          setIsRegistered(true);
          fetchData1();
          Toast.show({
            type: 'success',
            text1:'Success',
            text2: `Buy Successful`,
          });
        } else {
          console.error(`${sellType} API error response:`, await response.text());
          setError('Please enter Quantity');
          Toast.show({
            type: 'error',
            text1: 'Insufficient Funds!',
          });
        }
      }
    } catch (err) {
      console.error(`${sellType} API error:`, err);
      setError('Network error. Please check your internet connection.');
    } finally {
      setLoading(false);
    }
  };

  const fetchData1 = async () => {
    try {
      const response = await fetch('http://35.154.235.224:9000/api/user/getPortfolio', {
        method: 'GET',
        headers: new Headers({ Authorization: `Bearer ${token}` }),
        redirect: 'follow',
      });

      if (response.ok) {
        const result = await response.json();

        const filteredResult = result.filter((item) => item.FinancialInstrumentID === instrumentId);

        // Extract quantities and default to 0 if the array is empty
        const quantities = filteredResult.map((item) => item.Quantity);
        const defaultQuantity = quantities.length > 0 ? quantities[0] : 0;
        setQData({
          Quantities: defaultQuantity,
        });
        console.log('Filtered Results:', quantities);
      } else {
        console.error('Error fetching portfolio data:', response.status);
      }
    } catch (error) {
      console.error('Error in API calls:', error.message);
    }
  };

  useEffect(() => {
    fetchData1();
  }, []);

  const showTransactionModal = (type) => {
    setSellType(type);
    setIsModalVisible(true);
  };

  const hideTransactionModal = () => {
    setIsModalVisible(false);
  };

  return (
    <View style={styles.sellandbuy}>
      <TouchableOpacity style={[styles.button]} onPress={() => showTransactionModal('sell')}>
        <Text style={styles.sell}>Sell</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.button3} onPress={() => showTransactionModal('buy')}>
        <Text style={styles.buy}>Buy</Text>
      </TouchableOpacity>

      {/* Transaction Modal */}
      <TransactionModal
  isVisible={isModalVisible}
  onClose={hideTransactionModal}
  onTransaction={performTransaction}
  sellType={sellType}
  lastPrice={LastPrice}
  availableQuantity={Quantities}
/>
    </View>
  );
};

const styles = StyleSheet.create({
  sellandbuy: {
    flexDirection: 'row',
    padding: 10,
  },
  button: {
    marginRight: 2,
    backgroundColor: '#C1C2EB',
    width: '46%',
    height: 47,
    borderRadius: 50,
  },
  button3: {
    left: 3,
    width: '47%',
    height: 47,
    backgroundColor: '#B7DDD2',
    borderRadius: 50,
  },
  sell: {
    color: 'black',
    textAlign: 'center',
    marginTop: 10,
    fontWeight: 'bold',
    fontSize: 16,
  },
  buy: {
    color: 'black',
    textAlign: 'center',
    fontWeight: 'bold',
    marginTop: 10,
    fontSize: 16,
  },
});

export default Payments;