import React from 'react';
import { View, Text, TextInput, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';

const SearchScreen = () => {
  return (
    <View style={styles.container}>
      {/* Search Bar */}
      <View style={styles.searchContainer}>
        <TextInput
          style={styles.searchInput}
          placeholder="ออกแบบ"
        />
        <TouchableOpacity style={styles.clearButton}>
          <Text style={styles.clearButtonText}>✖️</Text>
        </TouchableOpacity>
      </View>

      {/* Filter Section */}
      <View style={styles.filterContainer}>
        <TouchableOpacity style={styles.filterButton}>
          <Text style={styles.filterText}>งานประจำ</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.filterButton}>
          <Text style={styles.filterText}>กรุงเทพ</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.filterButton}>
          <Text style={styles.filterText}>ทำงานที่บ้าน</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.filterButton}>
          <Text style={styles.filterText}>รายชั่วโมง</Text>
        </TouchableOpacity>
      </View>

      {/* Job Listings */}
      <ScrollView style={styles.jobList}>
        <View style={styles.jobCard}>
          <View style={styles.icon} />
          <View style={styles.jobInfo}>
            <Text style={styles.companyName}>Darkseer Studios</Text>
            <Text style={styles.jobTitle}>Senior Software Engineer</Text>
            <Text style={styles.salary}>$500 - $1,000</Text>
            <Text style={styles.location}>Medan, Indonesia</Text>
          </View>
        </View>

        <View style={styles.jobCard}>
          <View style={[styles.icon, { backgroundColor: '#8A2BE2' }]} />
          <View style={styles.jobInfo}>
            <Text style={styles.companyName}>Lunar Djaja Corp.</Text>
            <Text style={styles.jobTitle}>Database Engineer</Text>
            <Text style={styles.salary}>$500 - $1,000</Text>
            <Text style={styles.location}>London, United Kingdom</Text>
          </View>
        </View>

        <View style={styles.jobCard}>
          <View style={[styles.icon, { backgroundColor: '#FF6347' }]} />
          <View style={styles.jobInfo}>
            <Text style={styles.companyName}>Highspeed Studios</Text>
            <Text style={styles.jobTitle}>Junior Software Engineer</Text>
            <Text style={styles.salary}>$500 - $1,000</Text>
            <Text style={styles.location}>Jakarta, Indonesia</Text>
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#F5F5F5',
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  searchInput: {
    flex: 1,
    padding: 10,
    borderRadius: 25,
    backgroundColor: 'white',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 5,
  },
  clearButton: {
    marginLeft: 10,
    padding: 10,
    backgroundColor: '#ccc',
    borderRadius: 25,
  },
  clearButtonText: {
    fontSize: 16,
  },
  filterContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginBottom: 20,
  },
  filterButton: {
    backgroundColor: '#72D282',
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderRadius: 25,
    marginRight: 10,
    marginBottom: 10,
  },
  filterText: {
    color: 'white',
    fontSize: 14,
    fontWeight: 'bold',
  },
  jobList: {
    flex: 1,
  },
  jobCard: {
    flexDirection: 'row',
    padding: 15,
    backgroundColor: 'white',
    borderRadius: 15,
    marginBottom: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 5,
  },
  icon: {
    width: 50,
    height: 50,
    borderRadius: 10,
    backgroundColor: '#ccc',
    marginRight: 15,
  },
  jobInfo: {
    flex: 1,
  },
  companyName: {
    fontSize: 12,
    color: '#555',
  },
  jobTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  salary: {
    color: '#72D282',
    fontWeight: 'bold',
  },
  location: {
    color: '#555',
  },
});

export default SearchScreen;
