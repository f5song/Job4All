import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, ScrollView, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import * as Font from 'expo-font';
import AppLoading from 'expo-app-loading'; // Optional, for showing a loading spinner

const AddAJobScreen = ({ navigation }) => {
  const [isJobPositionVisible, setJobPositionVisible] = useState(false);
  const [isWorkplaceTypeVisible, setWorkplaceTypeVisible] = useState(false);
  const [isJobLocationVisible, setJobLocationVisible] = useState(false);
  const [isCompanyVisible, setCompanyVisible] = useState(false);
  const [isEmploymentTypeVisible, setEmploymentTypeVisible] = useState(false);
  const [isDescriptionVisible, setDescriptionVisible] = useState(false);

  const [jobPosition, setJobPosition] = useState('');
  const [workplaceType, setWorkplaceType] = useState('');
  const [jobLocation, setJobLocation] = useState('');
  const [company, setCompany] = useState('');
  const [employmentType, setEmploymentType] = useState('');
  const [description, setDescription] = useState('');

  const [fontsLoaded, setFontsLoaded] = useState(false);

  // Load custom fonts using expo-font
  useEffect(() => {
    const loadFonts = async () => {
      await Font.loadAsync({
        "Mitr-Regular": require('../assets/fonts/Mitr-Regular.ttf'),
        "Mitr-Bold": require('../assets/fonts/Mitr-Bold.ttf'),
      });
      setFontsLoaded(true);
    };

    loadFonts();
  }, []);

  if (!fontsLoaded) {
    return <AppLoading />; // Show a loading screen while fonts are loading
  }

  const handlePost = () => {
    console.log('Job posted');
    navigation.goBack();
  };

  const renderInputField = (label, value, setValue, isVisible, toggleVisible) => (
    <View style={styles.inputContainer}>
      <TouchableOpacity onPress={toggleVisible} style={styles.inputHeader}>
        <Text style={styles.inputLabel}>{label}</Text>
        <Icon name={isVisible ? 'remove' : 'add'} color="#FF6B6B" size={20} />
      </TouchableOpacity>
      {isVisible && (
        <TextInput
          style={styles.input}
          value={value}
          onChangeText={setValue}
          placeholder={`ใส่${label.toLowerCase()}`}
          placeholderTextColor="#A0A0A0"
        />
      )}
    </View>
  );

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Icon name="close" color="#FF6B6B" size={24} />
        </TouchableOpacity>
      </View>
      <View style={styles.body}>
        <Text style={styles.headerTitle}>เพิ่มงาน</Text>
        <ScrollView style={styles.form}>
          {renderInputField('ตำแหน่งงาน', jobPosition, setJobPosition, isJobPositionVisible, () => setJobPositionVisible(!isJobPositionVisible),)}
          {renderInputField('รูปแบบการทำงาน', workplaceType, setWorkplaceType, isWorkplaceTypeVisible, () => setWorkplaceTypeVisible(!isWorkplaceTypeVisible))}
          {renderInputField('สถานที่ปฏิบัติงาน', jobLocation, setJobLocation, isJobLocationVisible, () => setJobLocationVisible(!isJobLocationVisible))}
          {renderInputField('บริษัท', company, setCompany, isCompanyVisible, () => setCompanyVisible(!isCompanyVisible))}
          {renderInputField('ประเภทการจ้างงาน', employmentType, setEmploymentType, isEmploymentTypeVisible, () => setEmploymentTypeVisible(!isEmploymentTypeVisible))}
          {renderInputField('อธิบาย', description, setDescription, isDescriptionVisible, () => setDescriptionVisible(!isDescriptionVisible))}
        </ScrollView>
      </View>
      {/* Button at the bottom */}
      <View style={styles.footer}>
        <TouchableOpacity onPress={handlePost} style={styles.postButton}>
          <Text style={styles.postButtonText}>เพิ่ม</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
    backgroundColor: '#F5F5F5',
    borderBottomWidth: 1,
    borderBottomColor: '#E0E0E0',
  },
  headerTitle: {
    fontSize: 18,
    color: '#FF6B6B',
    margin: 10,
    fontFamily: 'Mitr-Bold', // Custom font applied
  },
  body: {
    flex: 1,
    padding: 16,
    marginBottom: 20,
  },
  form: {
    flex: 1,
    padding: 16,
    marginBottom: 100,
  },
  inputContainer: {
    marginBottom: 16,
    backgroundColor: '#F9F9F9',
    borderRadius: 10,
    padding: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
  },
  inputHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 8,
  },
  inputLabel: {
    fontSize: 16,
    color: '#333',
    fontFamily: 'Mitr-Bold', // Custom font applied
  },
  input: {
    marginTop: 10,
    borderWidth: 1,
    borderColor: '#E0E0E0',
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 8,
    backgroundColor: '#FFF',
    color: '#333',
    fontFamily: 'Mitr-Regular', // Custom font applied
  },
  footer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: '#FFF',
    padding: 16,
    borderTopWidth: 1,
    borderTopColor: '#E0E0E0',
    alignItems: 'center',
  },
  postButton: {
    backgroundColor: '#FF6B6B',
    borderRadius: 25,
    paddingVertical: 12,
    paddingHorizontal: 50,
  },
  postButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontFamily: 'Mitr-Bold', // Custom font applied
  },
});

export default AddAJobScreen;
