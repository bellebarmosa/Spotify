import React, { useEffect } from 'react';
import { StatusBar } from 'expo-status-bar';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { Provider } from 'react-redux';
import { AppNavigator } from './navigation/AppNavigator';
import { store } from './store/store';
import { initializeTheme, loadTheme } from './store/themeSlice';
import { StyleSheet } from 'react-native';

// Initialize theme on app start
loadTheme().then((theme) => {
  store.dispatch(initializeTheme(theme));
});

export default function App() {
  return (
    <Provider store={store}>
      <GestureHandlerRootView style={styles.container}>
        <AppNavigator />
        <StatusBar style="light" />
      </GestureHandlerRootView>
    </Provider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
