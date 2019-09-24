import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { createAppContainer } from 'react-navigation';
import AppNavigator from './src/components/Nav.js';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import firebase from 'firebase';
import ReduxThunk from 'redux-thunk';
import reducers from './src/reducers';

const AppContainer = createAppContainer(AppNavigator);


export default function App() {

	const store = createStore(reducers, {}, applyMiddleware(ReduxThunk));
  return (
  	<Provider store={store}>
    	<AppContainer />
    </Provider>
  );
}