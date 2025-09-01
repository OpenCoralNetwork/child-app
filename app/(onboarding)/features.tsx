import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  SafeAreaView,
  StatusBar,
} from 'react-native';
import { router } from 'expo-router';
import { LinearGradient } from 'expo-linear-gradient';
import { colors } from '@/constants/colors';

const features = [
  {
    icon: '🔍',
    title: '施設検索',
    description: 'お近くの保育園、学童施設、一時預かり施設を簡単に検索できます',
  },
  {
    icon: '📅',
    title: '予約管理',
    description: '施設の予約状況を確認し、空きがあれば即座に予約できます',
  },
  {
    icon: '👶',
    title: 'お子様プロフィール',
    description: 'お子様の情報、アレルギー、医療情報を安全に管理できます',
  },
  {
    icon: '💬',
    title: 'コミュニティ',
    description: '子育て中の親同士で情報交換や相談ができる掲示板機能',
  },
  {
    icon: '📍',
    title: '地図機能',
    description: '現在地周辺の施設を地図上で確認し、ルート案内も可能',
  },
  {
    icon: '🔔',
    title: '通知機能',
    description: '予約確定、キャンセル、重要なお知らせを通知でお届け',
  },
];

export default function FeaturesScreen() {
  const handleNext = () => {
    router.push('/(onboarding)/terms');
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor={colors.background} />
      
      <LinearGradient
        colors={[colors.background, colors.accentSoft]}
        style={styles.gradient}
      >
        <ScrollView 
          style={styles.scrollContainer}
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
        >
          {/* Header */}
          <View style={styles.header}>
            <Text style={styles.title}>主な機能</Text>
            <Text style={styles.subtitle}>
              子育てをサポートする{'\n'}便利な機能をご紹介します
            </Text>
          </View>

          {/* Features List */}
          <View style={styles.featuresContainer}>
            {features.map((feature, index) => (
              <View key={index} style={styles.featureCard}>
                <View style={styles.featureIcon}>
                  <Text style={styles.iconText}>{feature.icon}</Text>
                </View>
                <View style={styles.featureContent}>
                  <Text style={styles.featureTitle}>{feature.title}</Text>
                  <Text style={styles.featureDescription}>{feature.description}</Text>
                </View>
              </View>
            ))}
          </View>
        </ScrollView>

        {/* Bottom Button */}
        <View style={styles.bottomSection}>
          <TouchableOpacity style={styles.nextButton} onPress={handleNext}>
            <Text style={styles.nextButtonText}>次へ</Text>
          </TouchableOpacity>
        </View>
      </LinearGradient>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  gradient: {
    flex: 1,
  },
  scrollContainer: {
    flex: 1,
  },
  scrollContent: {
    paddingHorizontal: 20,
    paddingTop: 20,
  },
  header: {
    alignItems: 'center',
    marginBottom: 32,
  },
  title: {
    fontSize: 28,
    fontWeight: '700',
    color: colors.textMain,
    marginBottom: 12,
  },
  subtitle: {
    fontSize: 16,
    color: colors.textSub,
    textAlign: 'center',
    lineHeight: 24,
  },
  featuresContainer: {
    gap: 16,
  },
  featureCard: {
    flexDirection: 'row',
    backgroundColor: colors.surface,
    borderRadius: 16,
    padding: 20,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
  },
  featureIcon: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: colors.accentSoft,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 16,
  },
  iconText: {
    fontSize: 24,
  },
  featureContent: {
    flex: 1,
  },
  featureTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: colors.textMain,
    marginBottom: 8,
  },
  featureDescription: {
    fontSize: 14,
    color: colors.textSub,
    lineHeight: 20,
  },
  bottomSection: {
    paddingHorizontal: 20,
    paddingBottom: 40,
    paddingTop: 20,
  },
  nextButton: {
    backgroundColor: colors.accent,
    borderRadius: 12,
    paddingVertical: 16,
    alignItems: 'center',
    justifyContent: 'center',
  },
  nextButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.surface,
  },
});