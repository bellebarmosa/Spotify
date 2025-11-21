import React, { useState, useEffect, useRef, useCallback } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  ScrollView,
  Alert,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import { Image } from 'expo-image';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useNavigation, CommonActions } from '@react-navigation/native';
import { login } from '@/services/auth';
import { Ionicons } from '@expo/vector-icons';

const SPOTIFY_LOGO_URL = 'https://upload.wikimedia.org/wikipedia/commons/thumb/1/19/Spotify_logo_without_text.svg/1024px-Spotify_logo_without_text.svg.png';

export const LoginScreen: React.FC = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const navigation = useNavigation();
  const insets = useSafeAreaInsets();
  const hasAttemptedLogin = useRef(false);

  const handleLogin = useCallback(async () => {
    if (!username || !password) {
      return;
    }

    // Prevent multiple login attempts
    if (isLoading || hasAttemptedLogin.current) {
      return;
    }

    hasAttemptedLogin.current = true;
    setIsLoading(true);
    
    // For demo purposes, we'll use username as email
    const success = await login(username, password);
    setIsLoading(false);

    if (success) {
      // Reset navigation stack and navigate to Main (which shows Home by default)
      navigation.dispatch(
        CommonActions.reset({
          index: 0,
          routes: [{ name: 'Main' }],
        })
      );
    } else {
      hasAttemptedLogin.current = false;
      Alert.alert('Error', 'Invalid username or password. Please try again.');
    }
  }, [username, password, isLoading, navigation]);

  // Auto-login when both fields are filled
  useEffect(() => {
    if (username.trim() && password.trim() && !isLoading && !hasAttemptedLogin.current) {
      // Small delay to ensure both fields are updated
      const timer = setTimeout(() => {
        handleLogin();
      }, 300);
      return () => clearTimeout(timer);
    }
  }, [username, password, isLoading, handleLogin]);

  const handleSignUp = () => {
    // @ts-ignore - navigation type issue
    navigation.navigate('SignUp');
  };

  const handleForgotPassword = () => {
    Alert.alert('Forgot Password', 'Password reset feature coming soon!');
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      keyboardVerticalOffset={Platform.OS === 'ios' ? 0 : 20}
    >
      <ScrollView
        contentContainerStyle={[
          styles.scrollContent,
          { paddingTop: insets.top, paddingBottom: insets.bottom },
        ]}
        keyboardShouldPersistTaps="handled"
        accessibilityLabel="Login screen"
      >
        <View style={styles.content}>
          {/* Spotify Logo */}
          <View style={styles.logoContainer}>
            <Image
              source={{ uri: SPOTIFY_LOGO_URL }}
              style={styles.logoImage}
              contentFit="contain"
              accessibilityLabel="Spotify logo"
            />
          </View>

          {/* Spotify Text */}
          <Text style={styles.spotifyText} accessibilityRole="text">
            Spotify
          </Text>

          {/* Form */}
          <View style={styles.form}>
            <View style={styles.inputGroup}>
              <TextInput
                style={styles.input}
                value={username}
                onChangeText={setUsername}
                placeholder="Username"
                placeholderTextColor="#B3B3B3"
                autoCapitalize="none"
                autoCorrect={false}
                accessibilityLabel="Username input field"
                accessibilityHint="Enter your username"
              />
            </View>

            <View style={styles.inputGroup}>
              <TextInput
                style={styles.input}
                value={password}
                onChangeText={setPassword}
                placeholder="Password"
                placeholderTextColor="#B3B3B3"
                secureTextEntry
                autoCapitalize="none"
                autoCorrect={false}
                accessibilityLabel="Password input field"
                accessibilityHint="Enter your password"
              />
            </View>

            <TouchableOpacity
              onPress={handleForgotPassword}
              style={styles.forgotPasswordContainer}
              accessibilityRole="button"
              accessibilityLabel="Forgot password"
            >
              <Text style={styles.forgotPasswordText}>Forgot password?</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[styles.signInButton, isLoading && styles.buttonDisabled]}
              onPress={handleLogin}
              disabled={isLoading}
              accessibilityRole="button"
              accessibilityLabel="Sign in button"
              accessibilityHint="Signs in with the provided username and password"
              accessibilityState={{ disabled: isLoading }}
            >
              <Text style={styles.signInButtonText}>
                {isLoading ? 'Signing In...' : 'Sign In'}
              </Text>
            </TouchableOpacity>
          </View>

          {/* Social Login Section */}
          <View style={styles.socialSection}>
            <Text style={styles.socialText} accessibilityRole="text">
              Be Correct With
            </Text>
            <View style={styles.socialIcons}>
              <TouchableOpacity
                style={styles.socialButton}
                onPress={() => Alert.alert('Facebook', 'Facebook login coming soon!')}
                accessibilityRole="button"
                accessibilityLabel="Sign in with Facebook"
              >
                <View style={styles.socialIconCircle}>
                  <Text style={styles.facebookIcon}>f</Text>
                </View>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.socialButton}
                onPress={() => Alert.alert('Google', 'Google login coming soon!')}
                accessibilityRole="button"
                accessibilityLabel="Sign in with Google"
              >
                <View style={styles.socialIconCircle}>
                  <Text style={styles.googleIcon}>G</Text>
                </View>
              </TouchableOpacity>
            </View>
          </View>

          {/* Sign Up Link */}
          <View style={styles.signUpContainer}>
            <Text style={styles.signUpText} accessibilityRole="text">
              Don't have an account?{' '}
            </Text>
            <TouchableOpacity
              onPress={handleSignUp}
              accessibilityRole="button"
              accessibilityLabel="Navigate to sign up screen"
            >
              <Text style={styles.signUpLink}>Sign Up</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#121212',
  },
  scrollContent: {
    flexGrow: 1,
  },
  content: {
    flex: 1,
    padding: 24,
    justifyContent: 'center',
    alignItems: 'center',
  },
  logoContainer: {
    marginBottom: 20,
    alignItems: 'center',
  },
  logoImage: {
    width: 80,
    height: 80,
    marginBottom: 16,
  },
  spotifyText: {
    fontSize: 48,
    fontWeight: 'bold',
    color: '#FFFFFF',
    marginBottom: 48,
    letterSpacing: -1,
  },
  form: {
    width: '100%',
    marginBottom: 32,
  },
  inputGroup: {
    marginBottom: 16,
  },
  input: {
    backgroundColor: '#1a1a1a',
    color: '#FFFFFF',
    borderRadius: 8,
    padding: 16,
    fontSize: 16,
    borderWidth: 1,
    borderColor: '#333',
    width: '100%',
  },
  forgotPasswordContainer: {
    alignItems: 'flex-end',
    marginBottom: 24,
    marginTop: 8,
  },
  forgotPasswordText: {
    color: '#FFFFFF',
    fontSize: 14,
  },
  signInButton: {
    backgroundColor: '#1DB954',
    paddingVertical: 16,
    borderRadius: 25,
    alignItems: 'center',
    width: '100%',
  },
  buttonDisabled: {
    opacity: 0.6,
  },
  signInButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
  socialSection: {
    alignItems: 'center',
    marginBottom: 32,
  },
  socialText: {
    color: '#FFFFFF',
    fontSize: 14,
    marginBottom: 16,
  },
  socialIcons: {
    flexDirection: 'row',
    gap: 24,
  },
  socialButton: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  socialIconCircle: {
    width: 50,
    height: 50,
    borderRadius: 25,
    borderWidth: 1,
    borderColor: '#FFFFFF',
    justifyContent: 'center',
    alignItems: 'center',
  },
  facebookIcon: {
    color: '#FFFFFF',
    fontSize: 24,
    fontWeight: 'bold',
    fontFamily: Platform.select({
      ios: 'system-ui',
      default: 'normal',
    }),
  },
  googleIcon: {
    color: '#FFFFFF',
    fontSize: 24,
    fontWeight: 'bold',
    fontFamily: Platform.select({
      ios: 'system-ui',
      default: 'normal',
    }),
  },
  signUpContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  signUpText: {
    color: '#FFFFFF',
    fontSize: 14,
  },
  signUpLink: {
    color: '#1DB954',
    fontSize: 14,
    fontWeight: '600',
  },
});

