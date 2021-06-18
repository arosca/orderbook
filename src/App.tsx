import React, {useEffect} from 'react';
import styled from 'styled-components/native';
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

const Container = styled.View`
  flex-direction: row;
`;
const Panel = styled.View`
  flex: 1;
`;

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

    setTimeout(() => {
      dispatch(send(unsubscribeMessage));
    }, 4000);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <ScrollView>
      <Container>
        <Panel>
          <Text>Asks / Sell / Rosu</Text>
          {data?.asks?.map((data, index) => (
            <Row key={`asks-${index}`} data={data} />
          ))}
        </Panel>
        <Panel>
          <Text>Bids / Buy / Verde</Text>
          {data?.bids?.map((data, index) => (
            <Row key={`bids-${index}`} data={data} />
          ))}
        </Panel>
      </Container>
    </ScrollView>
  );
};

export const App = () => {
  const isDarkMode = useColorScheme() === 'dark';

  return (
    <SafeAreaView>
      <StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'} />
      <Provider store={store}>
        <Orderbook />
      </Provider>
    </SafeAreaView>
  );
};
