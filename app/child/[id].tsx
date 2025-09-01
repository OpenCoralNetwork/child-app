import { View, Text, StyleSheet, ScrollView, SafeAreaView, Image, TouchableOpacity } from 'react-native';
import { useLocalSearchParams, Stack, useRouter } from 'expo-router';
import { ChevronLeft } from 'lucide-react-native';
import { colors } from '../../constants/colors';

interface ChildData {
  id: string;
  name: string;
  ageMonths: number;
  imageUrl: string;
  dailyLife: {
    eating: string;
    weaning: string;
    nursing: string;
    toilet: string;
  };
  vaccines: {
    progress: number;
    total: number;
  };
  allergies: string[];
  sleep: {
    wakeUp: string;
    nap: string;
    bedtime: string;
  };
  sizes: {
    diaper: string;
    clothes: string;
  };
  preferences: {
    likes: string[];
    dislikes: string[];
  };
  development: {
    milestones: {
      title: string;
      achieved: boolean;
    }[];
  };
}

// Mock data - In a real app, this would come from your backend
const mockChildren: Record<string, ChildData> = {
  "1": {
    id: "1",
    name: "花田 はな",
    ageMonths: 25,
    imageUrl: "https://images.pexels.com/photos/35537/child-children-girl-happy.jpg?auto=compress&cs=tinysrgb&w=600",
    dailyLife: {
      eating: "スプーン (一部介助)",
      weaning: "カミカミ期",
      nursing: "卒乳済み",
      toilet: "オムツ",
    },
    vaccines: {
      progress: 8,
      total: 10,
    },
    allergies: ["卵", "牛乳"],
    sleep: {
      wakeUp: "7:00",
      nap: "13:00-15:00",
      bedtime: "20:00",
    },
    sizes: {
      diaper: "M",
      clothes: "90cm",
    },
    preferences: {
      likes: ["お絵かき", "ブロック遊び"],
      dislikes: ["大きな音", "暗い場所"],
    },
    development: {
      milestones: [
        { title: "2語文を話す", achieved: true },
        { title: "階段を上る", achieved: true },
        { title: "スプーンで食べる", achieved: true },
        { title: "簡単な指示に従う", achieved: true },
      ],
    },
  },
  "2": {
    id: "2",
    name: "花田 さくら",
    ageMonths: 36,
    imageUrl: "https://images.pexels.com/photos/1912868/pexels-photo-1912868.jpeg?auto=compress&cs=tinysrgb&w=600",
    dailyLife: {
      eating: "箸 (自立)",
      weaning: "完了",
      nursing: "卒乳済み",
      toilet: "トイレ",
    },
    vaccines: {
      progress: 10,
      total: 10,
    },
    allergies: [],
    sleep: {
      wakeUp: "6:30",
      nap: "13:30-15:00",
      bedtime: "20:30",
    },
    sizes: {
      diaper: "パンツ",
      clothes: "95cm",
    },
    preferences: {
      likes: ["歌", "ダンス", "お絵かき"],
      dislikes: ["虫"],
    },
    development: {
      milestones: [
        { title: "3語以上の文を話す", achieved: true },
        { title: "片足で立つ", achieved: true },
        { title: "自分で着替える", achieved: true },
        { title: "トイレを使う", achieved: true },
      ],
    },
  },
};

function InfoCard({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <View style={styles.card}>
      <Text style={styles.cardTitle}>{title}</Text>
      {children}
    </View>
  );
}

export default function ChildProfileScreen() {
  const { id } = useLocalSearchParams();
  const router = useRouter();
  const child = mockChildren[id as string];

  if (!child) {
    return (
      <SafeAreaView style={styles.container}>
        <Text style={styles.errorText}>お子様が見つかりませんでした</Text>
      </SafeAreaView>
    );
  }

  return (
    <>
      <Stack.Screen
        options={{
          headerShown: true,
          headerTitle: child.name,
          headerLeft: () => (
            <TouchableOpacity onPress={() => router.back()}>
              <ChevronLeft size={24} color={colors.textMain} />
            </TouchableOpacity>
          ),
        }}
      />
      <SafeAreaView style={styles.container}>
        <ScrollView>
          <View style={styles.profileSection}>
            <Image
              source={{ uri: child.imageUrl }}
              style={styles.avatar}
            />
            <View style={styles.profileInfo}>
              <Text style={styles.childName}>{child.name}</Text>
              <Text style={styles.childAge}>
                {Math.floor(child.ageMonths / 12)}歳{child.ageMonths % 12}ヶ月
              </Text>
            </View>
          </View>

          <View style={styles.section}>
            <InfoCard title="日常生活">
              <View style={styles.infoRow}>
                <Text style={styles.infoLabel}>食事</Text>
                <Text style={styles.infoValue}>{child.dailyLife.eating}</Text>
              </View>
              <View style={styles.infoRow}>
                <Text style={styles.infoLabel}>離乳食</Text>
                <Text style={styles.infoValue}>{child.dailyLife.weaning}</Text>
              </View>
              <View style={styles.infoRow}>
                <Text style={styles.infoLabel}>授乳</Text>
                <Text style={styles.infoValue}>{child.dailyLife.nursing}</Text>
              </View>
              <View style={styles.infoRow}>
                <Text style={styles.infoLabel}>排泄</Text>
                <Text style={styles.infoValue}>{child.dailyLife.toilet}</Text>
              </View>
            </InfoCard>

            <InfoCard title="予防接種">
              <View style={styles.progressBar}>
                <View 
                  style={[
                    styles.progressFill,
                    { width: `${(child.vaccines.progress / child.vaccines.total) * 100}%` }
                  ]}
                />
              </View>
              <Text style={styles.progressText}>
                {child.vaccines.progress}/{child.vaccines.total} 完了
              </Text>
            </InfoCard>

            <InfoCard title="アレルギー">
              <View style={styles.tagContainer}>
                {child.allergies.length > 0 ? (
                  child.allergies.map((allergy, index) => (
                    <View key={index} style={styles.tag}>
                      <Text style={styles.tagText}>{allergy}</Text>
                    </View>
                  ))
                ) : (
                  <Text style={styles.noDataText}>アレルギーなし</Text>
                )}
              </View>
            </InfoCard>

            <InfoCard title="睡眠">
              <View style={styles.infoRow}>
                <Text style={styles.infoLabel}>起床</Text>
                <Text style={styles.infoValue}>{child.sleep.wakeUp}</Text>
              </View>
              <View style={styles.infoRow}>
                <Text style={styles.infoLabel}>昼寝</Text>
                <Text style={styles.infoValue}>{child.sleep.nap}</Text>
              </View>
              <View style={styles.infoRow}>
                <Text style={styles.infoLabel}>就寝</Text>
                <Text style={styles.infoValue}>{child.sleep.bedtime}</Text>
              </View>
            </InfoCard>

            <InfoCard title="サイズ">
              <View style={styles.infoRow}>
                <Text style={styles.infoLabel}>オムツ</Text>
                <Text style={styles.infoValue}>{child.sizes.diaper}</Text>
              </View>
              <View style={styles.infoRow}>
                <Text style={styles.infoLabel}>服</Text>
                <Text style={styles.infoValue}>{child.sizes.clothes}</Text>
              </View>
            </InfoCard>

            <InfoCard title="好き嫌い">
              <View style={styles.infoRow}>
                <Text style={styles.infoLabel}>好きなこと</Text>
                <View style={styles.tagContainer}>
                  {child.preferences.likes.map((like, index) => (
                    <View key={index} style={styles.tag}>
                      <Text style={styles.tagText}>{like}</Text>
                    </View>
                  ))}
                </View>
              </View>
              <View style={styles.infoRow}>
                <Text style={styles.infoLabel}>苦手なこと</Text>
                <View style={styles.tagContainer}>
                  {child.preferences.dislikes.map((dislike, index) => (
                    <View key={index} style={styles.tag}>
                      <Text style={styles.tagText}>{dislike}</Text>
                    </View>
                  ))}
                </View>
              </View>
            </InfoCard>

            <InfoCard title="発達">
              {child.development.milestones.map((milestone, index) => (
                <View key={index} style={styles.milestone}>
                  <Text style={styles.milestoneText}>{milestone.title}</Text>
                  <View style={[styles.checkmark, milestone.achieved && styles.checkmarkActive]} />
                </View>
              ))}
            </InfoCard>
          </View>
        </ScrollView>
      </SafeAreaView>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  errorText: {
    fontSize: 16,
    color: colors.error,
    textAlign: 'center',
    marginTop: 24,
  },
  profileSection: {
    padding: 16,
    flexDirection: 'row',
    alignItems: 'center',
  },
  avatar: {
    width: 80,
    height: 80,
    borderRadius: 40,
  },
  profileInfo: {
    marginLeft: 16,
  },
  childName: {
    fontSize: 24,
    fontWeight: '700',
    color: colors.textMain,
    marginBottom: 4,
  },
  childAge: {
    fontSize: 16,
    color: colors.textSub,
  },
  section: {
    padding: 16,
    gap: 16,
  },
  card: {
    backgroundColor: colors.surface,
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 3,
    elevation: 2,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: colors.textMain,
    marginBottom: 12,
  },
  infoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  infoLabel: {
    width: 80,
    fontSize: 14,
    color: colors.textSub,
  },
  infoValue: {
    flex: 1,
    fontSize: 14,
    color: colors.textMain,
  },
  progressBar: {
    height: 8,
    backgroundColor: '#E5E7EB',
    borderRadius: 4,
    marginBottom: 8,
  },
  progressFill: {
    height: '100%',
    backgroundColor: colors.accent,
    borderRadius: 4,
  },
  progressText: {
    fontSize: 14,
    color: colors.textSub,
    textAlign: 'center',
  },
  tagContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  tag: {
    backgroundColor: colors.accentSoft,
    paddingVertical: 4,
    paddingHorizontal: 8,
    borderRadius: 16,
  },
  tagText: {
    color: colors.accent,
    fontSize: 14,
  },
  noDataText: {
    color: colors.textSub,
    fontSize: 14,
  },
  milestone: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 12,
  },
  milestoneText: {
    fontSize: 14,
    color: colors.textMain,
  },
  checkmark: {
    width: 20,
    height: 20,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: '#E5E7EB',
  },
  checkmarkActive: {
    backgroundColor: colors.accent,
    borderColor: colors.accent,
  },
});