import React from 'react';
import { View, Text, StyleSheet, ScrollView, SafeAreaView } from 'react-native';
import { colors } from '../../constants/colors';

export default function BoardScreen() {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>掲示板</Text>
      </View>
      
      <ScrollView style={styles.content}>
        <View style={styles.placeholderContainer}>
          <Text style={styles.placeholderText}>掲示板機能は開発中です</Text>
          <Text style={styles.placeholderSubtext}>地域の子育て情報や施設からのお知らせが表示される予定です</Text>
        </View>
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
  title: {
    fontSize: 24,
    fontWeight: '700',
    color: colors.textMain,
  },
  content: {
    flex: 1,
  },
  placeholderContainer: {
    flex: 1,
    padding: 24,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 100,
  },
  placeholderText: {
    fontSize: 18,
    fontWeight: '600',
    color: colors.textMain,
    textAlign: 'center',
    marginBottom: 12,
  },
  placeholderSubtext: {
    fontSize: 16,
    color: colors.textSub,
    textAlign: 'center',
    maxWidth: '80%',
  },
});