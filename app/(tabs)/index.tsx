import React from 'react';
import { View, Text, StyleSheet, ScrollView, SafeAreaView } from 'react-native';
import SearchBar from '../../components/SearchBar';
import QuickReserveBanner from '../../components/QuickReserveBanner';
import UpcomingReservationCard from '../../components/UpcomingReservationCard';
import NearbyCarousel from '../../components/NearbyCarousel';
import { colors } from '../../constants/colors';

export default function HomeScreen() {
  // In a real app, we would fetch this from a user profile
  const lastName = '山田';

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        <View style={styles.header}>
          <Text style={styles.greeting}>こんにちは、{lastName}さん</Text>
        </View>
        
        <SearchBar />
        
        <QuickReserveBanner />
        
        <UpcomingReservationCard />
        
        <NearbyCarousel />
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  header: {
    padding: 16,
    paddingTop: 24,
  },
  greeting: {
    fontSize: 24,
    fontWeight: '700',
    color: colors.textMain,
  },
});