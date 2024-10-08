import React from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const DashboardScreen = () => {
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerText}>สุขสบาย สำนึกใจ</Text>
        <TextInput
          style={styles.searchInput}
          placeholder="ค้นหางานที่นี่..."
        />
      </View>

      <View style={styles.statsContainer}>
        <View style={styles.statCard}>
          <Text style={styles.statValue}>29</Text>
          <Text style={styles.statLabel}>ตำแหน่งงานที่สมัคร</Text>
        </View>
        <View style={styles.statCard}>
          <Text style={styles.statValue}>3</Text>
          <Text style={styles.statLabel}>สัมมนา</Text>
        </View>
      </View>

      <ScrollView style={styles.recommendations}>
        <Text style={styles.sectionTitle}>งานที่แนะนำ</Text>
        <TouchableOpacity style={styles.jobCard}>
          <Text style={styles.jobTitle}>Software Engineer</Text>
          <Text style={styles.jobLocation}>Jakarta, Indonesia</Text>
          <Text style={styles.jobSalary}>$500 - $1,000</Text>
        </TouchableOpacity>

        <Text style={styles.sectionTitle}>ล่าสุด</Text>
        <TouchableOpacity style={styles.jobCard}>
          <Text style={styles.jobTitle}>Junior Software Engineer</Text>
          <Text style={styles.jobLocation}>Jakarta, Indonesia</Text>
          <Text style={styles.jobSalary}>$500 - $1,000</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.jobCard}>
          <Text style={styles.jobTitle}>Database Engineer</Text>
          <Text style={styles.jobLocation}>London, United Kingdom</Text>
          <Text style={styles.jobSalary}>$500 - $1,000</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.jobCard}>
          <Text style={styles.jobTitle}>Senior Software Engineer</Text>
          <Text style={styles.jobLocation}>Medan, Indonesia</Text>
          <Text style={styles.jobSalary}>$500 - $1,000</Text>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F5F5',
    padding: 20,
  },
  header: {
    marginBottom: 20,
  },
  headerText: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 10,
  },
  searchInput: {
    backgroundColor: 'white',
    borderRadius: 25,
    padding: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 5,
  },
  statsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  statCard: {
    backgroundColor: 'white',
    borderRadius: 25,
    padding: 15,
    flex: 1,
    marginHorizontal: 5,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 5,
  },
  statValue: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  statLabel: {
    fontSize: 14,
    color: 'gray',
  },
  recommendations: {
    flex: 1,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  jobCard: {
    backgroundColor: 'white',
    borderRadius: 15,
    padding: 15,
    marginBottom: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 5,
  },
  jobTitle: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  jobLocation: {
    color: 'gray',
  },
  jobSalary: {
    fontWeight: 'bold',
    color: '#4CAF50',
  },
});

export default DashboardScreen;
