// buy - verde - bid
// sell - rosu - ask
import React, {useEffect} from 'react';
import {
  Text,
  SafeAreaView,
  StatusBar,
  useColorScheme,
  ScrollView,
} from 'react-native';
import {Provider} from 'react-redux';
import {connect, send} from '@giantmachines/redux-websocket';

import {useAppDispatch, useAppSelector} from './hooks';

import {store} from './state/store';
import {getData} from './state/feed/selectors';

const subscribeMessage = {
  event: 'subscribe',
  feed: 'book_ui_1',
  product_ids: ['PI_XBTUSD'],
};
const unsubscribeMessage = {
  event: 'unsubscribe',
  feed: 'book_ui_1',
  product_ids: ['PI_XBTUSD'],
};
const WS_URL = 'wss://www.cryptofacilities.com/ws/v1';

const Row = ({data}: {data: number[]}) => {
  return (
    <Text>
      {data[0]} - {data[1]} - {data[2]}
    </Text>
  );
};

const Orderbook = () => {
  const dispatch = useAppDispatch();
  const data = useAppSelector(getData);

  useEffect(() => {
    dispatch(connect(WS_URL));
    setTimeout(() => {
      dispatch(send(subscribeMessage));
    }, 3000);
    dispatch(connect(WS_URL));
    setTimeout(() => {
      dispatch(send(unsubscribeMessage));
    }, 5000);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <ScrollView>
      <Text>Asks / Sell / Rosu</Text>
      {data?.asks?.map((data, index) => (
        <Row key={`asks-${index}`} data={data} />
      ))}
      <Text>Bids / Buy / Verde</Text>
      {data?.bids?.map((data, index) => (
        <Row key={`bids-${index}`} data={data} />
      ))}
    </ScrollView>
  );
};

export const App = () => {
  const isDarkMode = useColorScheme() === 'dark';

  return (
    <Provider store={store}>
      <SafeAreaView>
        <StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'} />
        <Orderbook />
      </SafeAreaView>
    </Provider>
  );
};
