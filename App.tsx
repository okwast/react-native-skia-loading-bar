import React from 'react';
import { StyleSheet, View } from 'react-native';
import { Canvas } from '@shopify/react-native-skia';
import { LoadingBar } from './LoadingBar';

const App = () => {
  return (
    <View style={styles.container}>
      <Canvas style={styles.canvas}>
        <LoadingBar />
      </Canvas>
    </View>
  );
};

const styles = StyleSheet.create({
  canvas: {
    width: '80%',
    height: 30,
    borderRadius: 10,
    overflow: 'hidden',
    borderColor: 'black',
    borderWidth: 2,
  },
  container: { flex: 1, justifyContent: 'center', alignItems: 'center' },
});

export default App;
