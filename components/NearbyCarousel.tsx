import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import FacilityCard from './FacilityCard';
import { colors } from '../constants/colors';
import { sampleFacilities } from '../constants/facilities';

export default function NearbyCarousel() {
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>あなたの近くの施設</Text>
      </View>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        {sampleFacilities.map((facility) => (
          <FacilityCard key={facility.id} facility={facility} />
        ))}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginVertical: 16,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    marginBottom: 12,
  },
  title: {
    fontSize: 18,
    fontWeight: '600',
    color: colors.textMain,
  },
  scrollContent: {
    paddingLeft: 16,
    paddingRight: 4,
    paddingBottom: 8,
  },
});