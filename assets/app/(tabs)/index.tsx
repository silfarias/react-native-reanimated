import { useEffect } from 'react';
import { StyleSheet, Text, TouchableOpacity } from 'react-native';
import Animated, { useSharedValue, useAnimatedStyle, withTiming, withSpring } from 'react-native-reanimated';

const COLORS = [
  '#DFB692', 
  '#522B5B',
  '#854F6C',
  '#2B124C'
];


export default function HomeScreen() {

  const backgroundColor = useSharedValue(COLORS[0]); // almacena el valor de la animación (color de fondo)
  const titleOpacity = useSharedValue(1); // devuelve un valor compartido 
  const titlePosition = useSharedValue(-300);

  const animatedBackgroundStyle = useAnimatedStyle(() => { // aplica la animacion al componente
    return {
      backgroundColor: withTiming(backgroundColor.value, { duration: 1000 }),
    };
  });

  const animatedTitleStyle = useAnimatedStyle(() => {
    return {
      opacity: withTiming(titleOpacity.value, { duration: 1500 }),
      transform: [{ translateY: withSpring(titlePosition.value) }],
    }
  })

  const handlePress = () => {
    const nextColor = COLORS[Math.floor(Math.random() * COLORS.length)];
    backgroundColor.value = nextColor;
    titleOpacity.value = 0; // desvanecimiento del titulo
  };

  useEffect(() => {
    titlePosition.value = 0;
  }, []);

  return (
    <Animated.View style={[styles.container, animatedBackgroundStyle]}>

      <Animated.View style={[styles.contTitle, animatedTitleStyle]}>
        <Animated.Text style={styles.text}>Animated App</Animated.Text>
      </Animated.View>

      <TouchableOpacity style={styles.button} onPress={handlePress}>
        <Text style={styles.buttonText}>Iniciar</Text>
      </TouchableOpacity>

    </Animated.View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  contTitle: {
    position: 'absolute',
    top: '40%',
  },
  text: {
    fontSize: 30,
    fontWeight: 'bold',
    color: '#fff',
  },
  button: {
    position: 'absolute',
    bottom: 40,
    backgroundColor: '#190019',
    padding: 10,
    borderRadius: 5,
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
});
