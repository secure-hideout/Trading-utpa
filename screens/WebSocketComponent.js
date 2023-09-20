


// import React, { useEffect, useState } from 'react';
// import { View, Text, Button } from 'react-native';

// const WebSocketComponent = () => {
//   const [ws, setWs] = useState(null);
//   const [message, setMessage] = useState('');
//   const [isConnected, setIsConnected] = useState(false);

//   useEffect(() => {
//     const websocket = new WebSocket('wss://echo.websocket.org');
//     setWs(websocket);

//     websocket.onopen = () => {
//       console.log('WebSocket connected!');
//       setIsConnected(true);
//     };

//     websocket.onmessage = (e) => {
//       setMessage(e.data);
//     };

//     websocket.onerror = (e) => {
//       console.error('WebSocket error', e);
//     };

//     websocket.onclose = (e) => {
//       console.log('WebSocket closed', e.code, e.reason);
//       setIsConnected(false);
//     };

//     return () => {
//       websocket.close();
//     };
//   }, []);

//   const sendMessage = () => {
//     if (ws && ws.readyState === WebSocket.OPEN) {
//       ws.send('Hello Server!');
//     } else {
//       console.log('WebSocket is not connected');
//     }
//   };

//   return (
//     <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
//       <Text>Received Message: {message}</Text>
//       <Button title="Send Message" onPress={sendMessage} disabled={!isConnected} />
//       {!isConnected && <Text>WebSocket is not connected</Text>}
//     </View>
//   );
// };

// export default WebSocketComponent;




































import React, { useEffect, useState } from 'react';
import { View, Text, Button } from 'react-native';

const WebSocketComponent = () => {
  const [ws, setWs] = useState(null);
  const [message, setMessage] = useState('');

  useEffect(() => {
    const websocket = new WebSocket('wss://your-websocket-server.com'); // Ensure you are using wss:// for a secure connection

    websocket.onopen = () => {
      console.log('WebSocket connected!');

      // Send authentication details
      const authData = {
        user: 'whv197',
        code: 'Hemadurga@2016',
        apikey: 'b0di01v61wrpaq1u',
        secret: '7gnr03exy7yz9l8e4mbi5ja6n7bfg7f4'
      };
      websocket.send(JSON.stringify(authData));
    };

    websocket.onmessage = (e) => {
      const data = JSON.parse(e.data);

      if (data.authentication) {
        if (data.authentication === 'failed') {
          console.error('Authentication failed');
          websocket.close();
        } else if (data.authentication === 'success') {
          console.log('Successfully authenticated!');
        }
      } else {
        setMessage(data.message || e.data); // Assuming the server sends a message field
      }
    };

    websocket.onerror = (e) => {
      console.error('WebSocket error', e);
    };

    websocket.onclose = (e) => {
      console.log('WebSocket closed', e.code, e.reason);
    };

    // Save the websocket instance to the state
    setWs(websocket);

    return () => {
      websocket.close();
    };
  }, []);

  const sendMessage = () => {
    if (ws) {
      ws.send('Hello Server!');
    }
  };

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>Received Message: {message}</Text>
      <Button title="Send Message" onPress={sendMessage} />
    </View>
  );
};

export default WebSocketComponent;






























// import React, { useEffect, useState } from 'react';
// import { View, Text, Button } from 'react-native';

// const WebSocketComponent = () => {
//   const [ws, setWs] = useState(null);
//   const [message, setMessage] = useState('');

//   useEffect(() => {
//     const websocket = new WebSocket('ws://your-websocket-server.com');
//     setWs(websocket);
//     websocket.onopen = () => {
//       console.log('WebSocket connected!');
//     };

//     websocket.onmessage = (e) => {
//       setMessage(e.data);
//     };

//     websocket.onerror = (e) => {
//       console.error('WebSocket error', e);
//     };

//     websocket.onclose = (e) => {
//       console.log('WebSocket closed', e.code, e.reason);
//     };

//     return () => {
//       websocket.close();
//     };
//   }, []);

//   const sendMessage = () => {
//     if (ws) {
//       ws.send('Hello Server!');
//     }
//   };

//   return (
//     <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
//       <Text>Received Message: {message}</Text>
//       <Button title="Send Message" onPress={sendMessage} />
//     </View>
//   );
// };

// export default WebSocketComponent;
