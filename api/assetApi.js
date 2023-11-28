
// assetApi.js
const baseURL = 'http://10.0.2.2:9000';

// assetApi.js
export const fetchWatchlistData = async (token) => {
    try {
        const response = await fetch(`${baseURL}/api/user/watchlist`, {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json',
            },
        });

        if (!response.ok) {
            throw new Error(`Failed to fetch watchlist data: ${response.statusText}`);
        }

        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error fetching watchlist data:', error.message);
        throw error;
    }
};

export const addToWatchlistApi = async (item, token) => {
    try {
        const requestBody = {
            InstrumentId: item.InstrumentId,
            InstrumentType: item.InstrumentType,
        };

        const response = await fetch(`${baseURL}/api/user/addToWatchlist`, {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(requestBody),
        });

        if (!response.ok) {
            const errorText = await response.text();
            throw new Error(`Failed to add to watchlist: ${errorText}`);
        }

        const data = await response.json();
        console.log('Added to watchlist successfully', data);
        return data;
    } catch (error) {
        console.error('Failed to add to watchlist:', error.message);
        throw error;
    }
};


