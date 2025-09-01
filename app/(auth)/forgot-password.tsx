import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  SafeAreaView,
  StatusBar,
  Alert,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
} from 'react-native';
import { router } from 'expo-router';
import { LinearGradient } from 'expo-linear-gradient';
import { colors } from '@/constants/colors';

export default function ForgotPasswordScreen() {
  const [email, setEmail] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isEmailSent, setIsEmailSent] = useState(false);

  const validateEmail = (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const handleSendEmail = async () => {
    if (!email.trim()) {
      Alert.alert('入力エラー', 'メールアドレスを入力してください。');
      return;
    }

    if (!validateEmail(email.trim())) {
      Alert.alert('入力エラー', '正しいメールアドレスを入力してください。');
      return;
    }

    setIsLoading(true);
    try {
      // TODO: 実際のパスワードリセット機能を実装
      // ここでは一時的に成功をシミュレート
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      setIsEmailSent(true);
    } catch (error) {
      Alert.alert('エラー', 'メールの送信に失敗しました。しばらく後でもう一度お試しください。');
    } finally {
      setIsLoading(false);
    }
  };

  const handleBackToLogin = () => {
    router.back();
  };

  const handleResendEmail = () => {
    setIsEmailSent(false);
    setEmail('');
  };

  if (isEmailSent) {
    return (
      <SafeAreaView style={styles.container}>
        <StatusBar barStyle="dark-content" backgroundColor={colors.background} />
        
        <LinearGradient
          colors={[colors.background, colors.accentSoft]}
          style={styles.gradient}
        >
          <View style={styles.centeredContent}>
            {/* Success Icon */}
            <View style={styles.successIconContainer}>
              <Text style={styles.successIcon}>📧</Text>
            </View>

            <Text style={styles.title}>メールを送信しました</Text>
            <Text style={styles.subtitle}>
              {email} にパスワード再設定用のリンクを送信しました。{'\n\n'}
              メールをご確認いただき、リンクをクリックしてパスワードを再設定してください。
            </Text>

            <View style={styles.infoBox}>
              <Text style={styles.infoText}>
                • メールが届かない場合は、迷惑メールフォルダをご確認ください{'\n'}
                • リンクの有効期限は24時間です{'\n'}
                • メールアドレスが間違っている場合は、下記ボタンから再送信してください
              </Text>
            </View>

            <View style={styles.buttonContainer}>
              <TouchableOpacity style={styles.resendButton} onPress={handleResendEmail}>
                <Text style={styles.resendButtonText}>再送信</Text>
              </TouchableOpacity>
              
              <TouchableOpacity style={styles.backButton} onPress={handleBackToLogin}>
                <Text style={styles.backButtonText}>ログイン画面に戻る</Text>
              </TouchableOpacity>
            </View>
          </View>
        </LinearGradient>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor={colors.background} />
      
      <KeyboardAvoidingView 
        style={styles.keyboardAvoidingView}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      >
        <LinearGradient
          colors={[colors.background, colors.accentSoft]}
          style={styles.gradient}
        >
          <ScrollView 
            contentContainerStyle={styles.scrollContent}
            keyboardShouldPersistTaps="handled"
          >
            {/* Header */}
            <View style={styles.header}>
              <View style={styles.logoContainer}>
                <Text style={styles.logo}>🔒</Text>
              </View>
              <Text style={styles.title}>パスワードを忘れた方</Text>
              <Text style={styles.subtitle}>
                登録されているメールアドレスに{'\n'}パスワード再設定用のリンクを送信します
              </Text>
            </View>

            {/* Form */}
            <View style={styles.formContainer}>
              <View style={styles.inputContainer}>
                <Text style={styles.inputLabel}>メールアドレス</Text>
                <TextInput
                  style={styles.input}
                  value={email}
                  onChangeText={setEmail}
                  placeholder="example@email.com"
                  placeholderTextColor={colors.textSub}
                  keyboardType="email-address"
                  autoCapitalize="none"
                  autoCorrect={false}
                />
              </View>

              <TouchableOpacity 
                style={[styles.sendButton, isLoading && styles.disabledButton]}
                onPress={handleSendEmail}
                disabled={isLoading}
              >
                <Text style={styles.sendButtonText}>
                  {isLoading ? 'メール送信中...' : 'パスワード再設定メールを送信'}
                </Text>
              </TouchableOpacity>
            </View>

            {/* Footer */}
            <View style={styles.footer}>
              <Text style={styles.footerText}>パスワードを思い出しましたか？</Text>
              <TouchableOpacity onPress={handleBackToLogin}>
                <Text style={styles.loginLink}>ログイン画面に戻る</Text>
              </TouchableOpacity>
            </View>
          </ScrollView>
        </LinearGradient>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  keyboardAvoidingView: {
    flex: 1,
  },
  gradient: {
    flex: 1,
  },
  scrollContent: {
    flexGrow: 1,
    paddingHorizontal: 24,
  },
  centeredContent: {
    flex: 1,
    justifyContent: 'center',
    paddingHorizontal: 24,
  },
  header: {
    alignItems: 'center',
    paddingTop: 60,
    paddingBottom: 32,
  },
  logoContainer: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: colors.surface,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 24,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
  logo: {
    fontSize: 32,
  },
  successIconContainer: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: colors.surface,
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'center',
    marginBottom: 32,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
  successIcon: {
    fontSize: 40,
  },
  title: {
    fontSize: 24,
    fontWeight: '700',
    color: colors.textMain,
    marginBottom: 16,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 16,
    color: colors.textSub,
    textAlign: 'center',
    lineHeight: 24,
    marginBottom: 24,
  },
  formContainer: {
    flex: 1,
    marginBottom: 32,
  },
  inputContainer: {
    marginBottom: 24,
  },
  inputLabel: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.textMain,
    marginBottom: 8,
  },
  input: {
    backgroundColor: colors.surface,
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 16,
    fontSize: 16,
    color: colors.textMain,
    borderWidth: 1,
    borderColor: 'transparent',
  },
  sendButton: {
    backgroundColor: colors.accent,
    borderRadius: 12,
    paddingVertical: 16,
    alignItems: 'center',
    justifyContent: 'center',
  },
  disabledButton: {
    opacity: 0.6,
  },
  sendButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.surface,
  },
  infoBox: {
    backgroundColor: colors.surface,
    borderRadius: 12,
    padding: 20,
    marginBottom: 32,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
  },
  infoText: {
    fontSize: 14,
    color: colors.textSub,
    lineHeight: 22,
  },
  buttonContainer: {
    gap: 16,
  },
  resendButton: {
    backgroundColor: 'transparent',
    borderWidth: 2,
    borderColor: colors.accent,
    borderRadius: 12,
    paddingVertical: 16,
    alignItems: 'center',
    justifyContent: 'center',
  },
  resendButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.accent,
  },
  backButton: {
    backgroundColor: colors.accent,
    borderRadius: 12,
    paddingVertical: 16,
    alignItems: 'center',
    justifyContent: 'center',
  },
  backButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.surface,
  },
  footer: {
    alignItems: 'center',
    paddingBottom: 40,
  },
  footerText: {
    fontSize: 16,
    color: colors.textSub,
    marginBottom: 8,
  },
  loginLink: {
    fontSize: 16,
    color: colors.accent,
    fontWeight: '600',
  },
});