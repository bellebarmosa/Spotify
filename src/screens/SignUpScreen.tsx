import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  TextInput,
  TouchableOpacity,
} from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../navigation/AppNavigator';

type SignUpScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  'SignUp'
>;

type Props = {
  navigation: SignUpScreenNavigationProp;
};

const SignUpScreen: React.FC<Props> = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <Image
        source={require('../assets/spotify-logo.png')}
        style={styles.logo}
      />
      <Text style={styles.spotifyText}>Spotify</Text>

      <TextInput
        style={styles.input}
        placeholder="Email Address"
        placeholderTextColor="#A7A7A7"
      />
      <TextInput
        style={styles.input}
        placeholder="Full Name"
        placeholderTextColor="#A7A7A7"
      />
      <TextInput
        style={styles.input}
        placeholder="Password"
        placeholderTextColor="#A7A7A7"
        secureTextEntry
      />

      <View style={styles.dateOfBirthContainer}>
        <Text style={styles.dateOfBirthLabel}>Date Of Birth:</Text>
        <View style={styles.dateInputsGroup}>
          <TextInput
            style={styles.dateInput}
            placeholder="DD"
            placeholderTextColor="#A7A7A7"
            keyboardType="numeric"
            maxLength={2}
          />
          <TextInput
            style={styles.dateInput}
            placeholder="MM"
            placeholderTextColor="#A7A7A7"
            keyboardType="numeric"
            maxLength={2}
          />
          <TextInput
            style={styles.dateInput}
            placeholder="YY"
            placeholderTextColor="#A7A7A7"
            keyboardType="numeric"
            maxLength={2}
          />
        </View>
      </View>

      <View style={styles.genderContainer}>
        <TouchableOpacity style={styles.genderButton}>
          <Text style={styles.genderButtonText}>Male</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.genderButton}>
          <Text style={styles.genderButtonText}>Female</Text>
        </TouchableOpacity>
      </View>

      <TouchableOpacity style={styles.button}>
        <Text style={styles.buttonText}>Sign Up</Text>
      </TouchableOpacity>

      <Text style={styles.socialPromptText}>Sign Up With</Text>

      <View style={styles.socialIconsContainer}>
        <TouchableOpacity style={styles.socialIcon}>
          <Text style={styles.socialIconText}>f</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.socialIcon}>
          <Text style={styles.socialIconText}>G</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.loginContainer}>
        <Text style={styles.loginText}>Already have an account? </Text>
        <TouchableOpacity onPress={() => navigation.navigate('Login')}>
          <Text style={styles.loginLink}>Sign In</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#121212',
    padding: 20,
  },
  logo: {
    width: 80,
    height: 80,
    marginBottom: 10,
  },
  spotifyText: {
    fontSize: 32,
    fontWeight: 'bold',
    color: 'white',
    marginBottom: 40,
  },
  input: {
    width: '100%',
    backgroundColor: 'transparent',
    color: 'white',
    padding: 15,
    borderRadius: 30,
    borderWidth: 1,
    borderColor: '#A7A7A7',
    marginBottom: 15,
    fontSize: 16,
  },
  dateOfBirthContainer: {
    flexDirection: 'row',
    width: '100%',
    marginBottom: 15,
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  dateOfBirthLabel: {
    color: '#A7A7A7',
    fontSize: 16,
    marginRight: 10,
  },
  dateInputsGroup: {
    flexDirection: 'row',
    flex: 1,
    justifyContent: 'flex-end',
  },
  dateInput: {
    backgroundColor: '#333333',
    color: 'white',
    padding: 15,
    borderRadius: 5,
    marginHorizontal: 5,
    fontSize: 16,
    textAlign: 'center',
    width: 60, // Fixed width for DD, MM, YY
  },
  genderContainer: {
    flexDirection: 'row',
    width: '100%',
    justifyContent: 'space-around',
    marginBottom: 20,
    paddingHorizontal: 20, // Add padding to spread out buttons
  },
  genderButton: {
    backgroundColor: '#333333',
    paddingVertical: 15,
    paddingHorizontal: 40,
    borderRadius: 30,
  },
  genderButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
  button: {
    backgroundColor: '#1DB954',
    paddingVertical: 15,
    width: '100%',
    borderRadius: 30,
    marginBottom: 20,
    alignItems: 'center',
  },
  buttonText: {
    color: 'black',
    fontSize: 18,
    fontWeight: 'bold',
  },
  socialPromptText: {
    color: '#A7A7A7',
    marginBottom: 20,
    fontSize: 16,
  },
  socialIconsContainer: {
    flexDirection: 'row',
    marginBottom: 30,
  },
  socialIcon: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: '#333333',
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: 10,
    borderWidth: 1,
    borderColor: '#A7A7A7',
  },
  socialIconText: {
    color: 'white',
    fontSize: 24,
    fontWeight: 'bold',
  },
  loginContainer: {
    flexDirection: 'row',
    marginTop: 30,
  },
  loginText: {
    color: '#A7A7A7',
    fontSize: 16,
  },
  loginLink: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default SignUpScreen;
