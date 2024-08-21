import React from 'react';
import { Button, StyleSheet } from 'react-native';
import Animated, { useSharedValue, useAnimatedStyle, withTiming } from 'react-native-reanimated';

const COLORS = ['#854F6C','#522B5B'];


export default function HomeScreen() {
  const backgroundColor = useSharedValue(COLORS[0]); // almacena el valor de la animación (color de fondo)
  const animatedStyle = useAnimatedStyle(() => { // aplica la animacion al componente
    return {
      backgroundColor: withTiming(backgroundColor.value, { duration: 1000 }),
    };
  });

  const handlePress = () => {
    const nextColor = COLORS[Math.floor(Math.random() * COLORS.length)];
    backgroundColor.value = nextColor;
  };

  return (
    <Animated.View style={[styles.container, animatedStyle]}>
      <Animated.Text style={styles.text}>Animated</Animated.Text>
      <Button title="Iniciar" onPress={handlePress} />
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    fontSize: 30,
    fontWeight: 'bold',
    color: '#333',
  },
});
