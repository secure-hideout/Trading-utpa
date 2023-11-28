// api.js
const BASE_URL = 'http://35.154.235.224:9000/api/user';

export const fetchWatchlistData = async (token) => {
    try {
        const response = await fetch(`${BASE_URL}/watchlist`, {
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
        return data;
    } catch (error) {
        console.error('Error fetching watchlist data:', error);
        throw error;
    }
};

export const addToWatchlistApi = async (item, token) => {
    try {
        const response = await fetch(`${BASE_URL}/addToWatchlist`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`,
            },
            body: JSON.stringify({
                InstrumentId: item.InstrumentId,
                InstrumentType: item.InstrumentType,
            }),
        });

        const data = await response.json();

        return {
            ok: response.ok,
            text: () => Promise.resolve(JSON.stringify(data)),
            json: () => Promise.resolve(data),
        };
    } catch (error) {
        console.error('Failed to add to watchlist:', error);
        throw error;
    }
};


export const removeFromWatchlistApi = async (item, token) => {
    try {
        const response = await fetch(`${BASE_URL}/removeFromWatchlist`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`,
            },
            body: JSON.stringify({
                InstrumentId: item.InstrumentId,
                InstrumentType: item.InstrumentType,
                // ...other properties if needed
            }),
        });

        if (!response.ok) {
            const errorText = await response.text();
            throw new Error(`Network response was not ok: ${errorText}`);
        }

        console.log('Removed from watchlist successfully');

        return true;
    } catch (error) {
        console.error('Failed to remove from watchlist:', error);
        throw error;
    }
};
