// src/screen/SplashScreenCustom.jsx
import { View, Dimensions, StyleSheet } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Logo } from '@/src/components';

const { width, height } = Dimensions.get('window');

export const SplashScreenCustom = () => {
  return (
    <LinearGradient
      colors={['#FF8A65', '#FF4081']}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 0 }}
      style={styles.gradient}
    >
      <View style={styles.logoContainer}>
        <Logo 
          width={width * 0.4} 
          height={width * 0.4} 
          fill='#011C26'
        />
      </View>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  gradient: {
    flex: 1,
    height: height,
    width: '100%',
  },
  logoContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
  }
});