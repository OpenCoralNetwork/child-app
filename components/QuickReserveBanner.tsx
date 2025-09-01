import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image } from 'react-native';
import { ChevronRight } from 'lucide-react-native';
import { colors } from '../constants/colors';
import { useRouter } from 'expo-router';

export default function QuickReserveBanner() {
  const router = useRouter();

  return (
    <TouchableOpacity 
      style={styles.container}
      onPress={() => router.push('/reserve')}
    >
      <View style={styles.content}>
        <Text style={styles.title}>今すぐ予約</Text>
        <Text style={styles.subtitle}>お近くの施設をすぐに予約できます</Text>
        <View style={styles.button}>
          <Text style={styles.buttonText}>施設を探す</Text>
          <ChevronRight size={16} color="white" />
        </View>
      </View>
      <Image
        source={{ uri: 'https://images.pexels.com/photos/3771679/pexels-photo-3771679.jpeg?auto=compress&cs=tinysrgb&w=600' }}
        style={styles.image}
        resizeMode="cover"
      />
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    backgroundColor: colors.accent,
    borderRadius: 16,
    overflow: 'hidden',
    margin: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  content: {
    flex: 3,
    padding: 16,
    justifyContent: 'space-between',
  },
  title: {
    fontSize: 22,
    fontWeight: '700',
    color: 'white',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 14,
    color: 'white',
    opacity: 0.9,
    marginBottom: 16,
  },
  button: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 8,
    alignSelf: 'flex-start',
  },
  buttonText: {
    color: 'white',
    marginRight: 4,
    fontSize: 14,
    fontWeight: '500',
  },
  image: {
    flex: 2,
    height: '100%',
  },
});