import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Calendar, Clock, ChevronRight } from 'lucide-react-native';
import { colors } from '../constants/colors';
import { useRouter } from 'expo-router';

interface UpcomingReservationProps {
  facilityId: string;
  facilityName: string;
  date: string;
  time: string;
}

export default function UpcomingReservationCard({
  facilityId = '1',
  facilityName = '札幌こども保育園',
  date = '2025/05/15',
  time = '14:00 - 16:00',
}: UpcomingReservationProps) {
  const router = useRouter();

  return (
    <TouchableOpacity 
      style={styles.container}
      onPress={() => router.push(`/facility/${facilityId}`)}
    >
      <View style={styles.header}>
        <Text style={styles.title}>次回の予約</Text>
      </View>
      <View style={styles.content}>
        <Text style={styles.facilityName}>{facilityName}</Text>
        <View style={styles.row}>
          <Calendar size={16} color={colors.textSub} style={styles.icon} />
          <Text style={styles.detail}>{date}</Text>
        </View>
        <View style={styles.row}>
          <Clock size={16} color={colors.textSub} style={styles.icon} />
          <Text style={styles.detail}>{time}</Text>
        </View>
      </View>
      <View style={styles.footer}>
        <Text style={styles.viewDetails}>詳細を見る</Text>
        <ChevronRight size={16} color={colors.accent} />
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.surface,
    borderRadius: 16,
    marginHorizontal: 16,
    marginVertical: 8,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 3,
    elevation: 2,
  },
  header: {
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#F3F4F6',
  },
  title: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.textMain,
  },
  content: {
    padding: 16,
  },
  facilityName: {
    fontSize: 18,
    fontWeight: '700',
    color: colors.textMain,
    marginBottom: 12,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  icon: {
    marginRight: 8,
  },
  detail: {
    fontSize: 15,
    color: colors.textSub,
  },
  footer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-end',
    padding: 12,
    backgroundColor: '#F9FAFB',
  },
  viewDetails: {
    fontSize: 14,
    fontWeight: '500',
    color: colors.accent,
    marginRight: 4,
  },
});