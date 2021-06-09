import React from 'react';
import {SafeAreaView, StatusBar, useColorScheme} from 'react-native';

const ws_subscribe_message = {
  event: 'subscribe',
  feed: 'book_ui_1',
  product_ids: ['PI_XBTUSD'],
};

const ws = new WebSocket('wss://www.cryptofacilities.com/ws/v1');

ws.onopen = () => {
  // connection opened
  ws.send(JSON.stringify(ws_subscribe_message));
};

ws.onmessage = e => {
  // a message was received
  console.log(e.data);
};

ws.onerror = e => {
  // an error occurred
  console.log(e.message);
};

ws.onclose = e => {
  // connection closed
  console.log(e.code, e.reason);
};

export const App = () => {
  const isDarkMode = useColorScheme() === 'dark';

  return (
    <SafeAreaView>
      <StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'} />
    </SafeAreaView>
  );
};
