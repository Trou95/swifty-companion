import React from 'react';
import {StyleSheet, Text, SafeAreaView} from 'react-native';
import WebView from 'react-native-webview';

function App(): React.JSX.Element {
  return (
    <SafeAreaView style={{width: '100%', height: '100%'}}>
      <WebView source={{uri: 'https://swifty-companion.vercel.app/'}} />
    </SafeAreaView>
  );
}

export default App;
