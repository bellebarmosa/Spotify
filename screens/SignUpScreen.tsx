import React, { useState } from 'react';
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
import { useNavigation } from '@react-navigation/native';
import { signUp } from '@/services/auth';

const SPOTIFY_LOGO_URL = 'https://upload.wikimedia.org/wikipedia/commons/thumb/1/19/Spotify_logo_without_text.svg/1024px-Spotify_logo_without_text.svg.png';

export const SignUpScreen: React.FC = () => {
  const [email, setEmail] = useState('');
  const [fullName, setFullName] = useState('');
  const [password, setPassword] = useState('');
  const [day, setDay] = useState('');
  const [month, setMonth] = useState('');
  const [year, setYear] = useState('');
  const [gender, setGender] = useState<'Male' | 'Female' | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const navigation = useNavigation();
  const insets = useSafeAreaInsets();

  const handleSignUp = async () => {
    if (!email || !password || !fullName) {
      Alert.alert('Error', 'Please fill in all required fields');
      return;
    }

    if (!day || !month || !year) {
      Alert.alert('Error', 'Please enter your date of birth');
      return;
    }

    if (!gender) {
      Alert.alert('Error', 'Please select your gender');
      return;
    }

    if (password.length < 6) {
      Alert.alert('Error', 'Password must be at least 6 characters');
      return;
    }

    setIsLoading(true);
    // Use fullName as username for now
    const success = await signUp(email, password, fullName);
    setIsLoading(false);

    if (success) {
      Alert.alert('Success', 'Account created successfully!', [
        {
          text: 'OK',
          onPress: () => {
            // @ts-ignore - navigation type issue
            navigation.navigate('Login');
          },
        },
      ]);
    } else {
      Alert.alert('Error', 'Failed to create account. Please try again.');
    }
  };

  const handleSignIn = () => {
    // @ts-ignore - navigation type issue
    navigation.navigate('Login');
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
        accessibilityLabel="Sign up screen"
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
                value={email}
                onChangeText={setEmail}
                placeholder="Email Address"
                placeholderTextColor="#B3B3B3"
                keyboardType="email-address"
                autoCapitalize="none"
                autoCorrect={false}
                accessibilityLabel="Email address input field"
                accessibilityHint="Enter your email address"
              />
            </View>

            <View style={styles.inputGroup}>
              <TextInput
                style={styles.input}
                value={fullName}
                onChangeText={setFullName}
                placeholder="Full Name"
                placeholderTextColor="#B3B3B3"
                autoCapitalize="words"
                autoCorrect={false}
                accessibilityLabel="Full name input field"
                accessibilityHint="Enter your full name"
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

            {/* Date of Birth */}
            <View style={styles.inputGroup}>
              <View style={styles.dateOfBirthContainer}>
                <TextInput
                  style={[styles.dateInput, styles.dateInputDO]}
                  value={day}
                  onChangeText={setDay}
                  placeholder="DO"
                  placeholderTextColor="#B3B3B3"
                  keyboardType="numeric"
                  maxLength={2}
                  accessibilityLabel="Day of birth input field"
                  accessibilityHint="Enter day of birth"
                />
                <TextInput
                  style={[styles.dateInput, styles.dateInputMM]}
                  value={month}
                  onChangeText={setMonth}
                  placeholder="MM"
                  placeholderTextColor="#B3B3B3"
                  keyboardType="numeric"
                  maxLength={2}
                  accessibilityLabel="Month of birth input field"
                  accessibilityHint="Enter month of birth"
                />
                <TextInput
                  style={[styles.dateInput, styles.dateInputYY]}
                  value={year}
                  onChangeText={setYear}
                  placeholder="YY"
                  placeholderTextColor="#B3B3B3"
                  keyboardType="numeric"
                  maxLength={2}
                  accessibilityLabel="Year of birth input field"
                  accessibilityHint="Enter year of birth"
                />
              </View>
            </View>

            {/* Gender Selection */}
            <View style={styles.inputGroup}>
              <View style={styles.genderContainer}>
                <TouchableOpacity
                  style={[
                    styles.genderOption,
                    gender === 'Male' && styles.genderOptionSelected,
                  ]}
                  onPress={() => setGender('Male')}
                  accessibilityRole="button"
                  accessibilityLabel="Select Male"
                  accessibilityState={{ selected: gender === 'Male' }}
                >
                  <Text
                    style={[
                      styles.genderText,
                      gender === 'Male' && styles.genderTextSelected,
                    ]}
                  >
                    Male
                  </Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={[
                    styles.genderOption,
                    gender === 'Female' && styles.genderOptionSelected,
                  ]}
                  onPress={() => setGender('Female')}
                  accessibilityRole="button"
                  accessibilityLabel="Select Female"
                  accessibilityState={{ selected: gender === 'Female' }}
                >
                  <Text
                    style={[
                      styles.genderText,
                      gender === 'Female' && styles.genderTextSelected,
                    ]}
                  >
                    Female
                  </Text>
                </TouchableOpacity>
              </View>
            </View>

            <TouchableOpacity
              style={[styles.signUpButton, isLoading && styles.buttonDisabled]}
              onPress={handleSignUp}
              disabled={isLoading}
              accessibilityRole="button"
              accessibilityLabel="Sign up button"
              accessibilityHint="Creates a new account with the provided information"
              accessibilityState={{ disabled: isLoading }}
            >
              <Text style={styles.signUpButtonText}>
                {isLoading ? 'Creating Account...' : 'Sign Up'}
              </Text>
            </TouchableOpacity>
          </View>

          {/* Social Sign Up Section */}
          <View style={styles.socialSection}>
            <Text style={styles.socialText} accessibilityRole="text">
              Sign Up With
            </Text>
            <View style={styles.socialIcons}>
              <TouchableOpacity
                style={styles.socialButton}
                onPress={() => Alert.alert('Facebook', 'Facebook sign up coming soon!')}
                accessibilityRole="button"
                accessibilityLabel="Sign up with Facebook"
              >
                <View style={styles.socialIconCircle}>
                  <Text style={styles.facebookIcon}>f</Text>
                </View>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.socialButton}
                onPress={() => Alert.alert('Google', 'Google sign up coming soon!')}
                accessibilityRole="button"
                accessibilityLabel="Sign up with Google"
              >
                <View style={styles.socialIconCircle}>
                  <Text style={styles.googleIcon}>G</Text>
                </View>
              </TouchableOpacity>
            </View>
          </View>

          {/* Sign In Link */}
          <View style={styles.signInContainer}>
            <Text style={styles.signInText} accessibilityRole="text">
              Already have an account?{' '}
            </Text>
            <TouchableOpacity
              onPress={handleSignIn}
              accessibilityRole="button"
              accessibilityLabel="Navigate to sign in screen"
            >
              <Text style={styles.signInLink}>Sign In</Text>
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
  dateOfBirthContainer: {
    flexDirection: 'row',
    gap: 12,
    width: '100%',
  },
  dateInput: {
    backgroundColor: '#1a1a1a',
    color: '#FFFFFF',
    borderRadius: 8,
    padding: 16,
    fontSize: 16,
    borderWidth: 1,
    borderColor: '#333',
    textAlign: 'center',
    flex: 1,
  },
  dateInputDO: {
    flex: 1,
  },
  dateInputMM: {
    flex: 1,
  },
  dateInputYY: {
    flex: 1,
  },
  genderContainer: {
    flexDirection: 'row',
    gap: 16,
    width: '100%',
  },
  genderOption: {
    flex: 1,
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#333',
    backgroundColor: '#1a1a1a',
    alignItems: 'center',
  },
  genderOptionSelected: {
    borderColor: '#1DB954',
    backgroundColor: '#1a3a2a',
  },
  genderText: {
    fontSize: 16,
    color: '#B3B3B3',
  },
  genderTextSelected: {
    color: '#1DB954',
    fontWeight: '600',
  },
  signUpButton: {
    backgroundColor: '#1DB954',
    paddingVertical: 16,
    borderRadius: 25,
    alignItems: 'center',
    marginTop: 20,
  },
  buttonDisabled: {
    opacity: 0.6,
  },
  signUpButtonText: {
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
  signInContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  signInText: {
    color: '#FFFFFF',
    fontSize: 14,
  },
  signInLink: {
    color: '#1DB954',
    fontSize: 14,
    fontWeight: '600',
  },
});
