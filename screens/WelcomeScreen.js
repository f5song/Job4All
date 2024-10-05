import React from 'react';
import { View, Text, TouchableOpacity, Image, StyleSheet } from 'react-native';

const WelcomeScreen = () => {
  return (
    <View style={styles.container}>
      {/* Job4All logo */}
      <Text style={styles.logoText}>Job4All</Text>
      <Text style={styles.subText}>Job-finding app for people with disabilities</Text>

      {/* Continue as */}
      <Text style={styles.continueText}>Continue as</Text>

      {/* Job Seekers button */}
      <TouchableOpacity style={styles.optionButton}>
        <View style={styles.optionContent}>
          <Image
            style={styles.icon}
            source={require('../assets/hiring.png')}
          />
          <View style={styles.optionTextContainer}>
            <Text style={styles.optionTitle}>JOB SEEKERS</Text>
            <Text style={styles.optionDescription}>Finding a job here has never been easier than before</Text>
          </View>
        </View>
      </TouchableOpacity>

      {/* Company button */}
      <TouchableOpacity style={styles.optionButton}>
        <View style={styles.optionContent}>
          <Image
            style={styles.icon}
            source={require('../assets/company-building.png')}
          />
          <View style={styles.optionTextContainer}>
            <Text style={styles.optionTitle}>COMPANY</Text>
            <Text style={styles.optionDescription}>Let’s recruit your great candidate faster here</Text>
          </View>
        </View>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F8F8F8',
    paddingHorizontal: 20,
  },
  logoText: {
    fontSize: 36,
    fontWeight: 'bold',
    color: '#000',
    marginBottom: 10,
  },
  subText: {
    fontSize: 16,
    color: '#555',
    textAlign: 'center',
    marginBottom: 50,
  },
  continueText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#000',
    marginBottom: 20,
  },
  optionButton: {
    width: '100%',
    backgroundColor: '#FFF',
    borderRadius: 10,
    paddingVertical: 15,
    paddingHorizontal: 20,
    marginBottom: 20,
    elevation: 3, 
    shadowColor: '#000', 
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 5,
  },
  optionContent: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start', 
  },
  icon: {
    width: 50,
    height: 50,
    marginRight: 15,
  },
  optionTextContainer: {
    flex: 1, 
  },
  optionTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#000',
  },
  optionDescription: {
    fontSize: 14,
    color: '#555',
    marginTop: 5,
  },
});

export default WelcomeScreen;
