import React, { useState, useEffect } from 'react'; // Import useEffect here
import { View, Text, TextInput, TouchableOpacity, ScrollView, StyleSheet } from 'react-native';
import { Feather } from '@expo/vector-icons';
import * as Font from 'expo-font';

const EditAJobScreen = ({ navigation }) => {
  const [jobPosition, setJobPosition] = useState('Administrative Assistant');
  const [workplaceType, setWorkplaceType] = useState('On-site');
  const [jobLocation, setJobLocation] = useState('California, USA');
  const [company, setCompany] = useState('Apple Inc');
  const [employmentType, setEmploymentType] = useState('Full Time');
  const [description, setDescription] = useState('Lorem ipsum dolor sit amet, consectetur adipiscing elit.');

  // State to track which field is being edited
  const [editingField, setEditingField] = useState(null);
  const [fontsLoaded, setFontsLoaded] = useState(false); // State for font loading



  const renderInputField = (label, value, setValue, fieldKey, isRequired = false) => (
    <View style={styles.inputContainer}>
      <Text style={styles.inputLabel}>
        {label}
        {isRequired && <Text style={styles.requiredStar}>*</Text>}
      </Text>
      <View style={styles.inputWrapper}>
        {editingField === fieldKey ? (
          // If this field is being edited, show the TextInput
          <TextInput
            style={styles.input}
            value={value}
            onChangeText={setValue}
            onBlur={() => setEditingField(null)} // Save and exit editing mode when the input loses focus
            autoFocus={true} // Automatically focus when editing starts
          />
        ) : (
          // Otherwise, show the static text
          <Text style={styles.inputText}>{value}</Text>
        )}
        {/* Edit button to switch to edit mode */}
        <TouchableOpacity
          style={styles.editButton}
          onPress={() => setEditingField(fieldKey)} // Set the current field to editable
        >
          <Feather name="edit-2" size={18} color="#4DB15E" />
        </TouchableOpacity>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Feather name="x" size={24} color="#000" />
        </TouchableOpacity>
        <View style={styles.placeholder} />
      </View>

      <View style={styles.body}>
        <Text style={styles.headerTitle}>แก้ไขงาน </Text>
        <ScrollView style={styles.form}>
          {renderInputField('ตำแหน่งงาน', jobPosition, setJobPosition, 'jobPosition')}
          {renderInputField('รูปแบบการทำงาน', workplaceType, setWorkplaceType, 'workplaceType')}
          {renderInputField('สถานที่ปฏิบัติงาน', jobLocation, setJobLocation, 'jobLocation')}
          {renderInputField('บริษัท', company, setCompany, 'company')}
          {renderInputField('ประเภทการจ้างงาน', employmentType, setEmploymentType, 'employmentType')}
          {renderInputField('อธิบาย', description, setDescription, 'description')}
        </ScrollView>

      </View>
      <View style={styles.footer}>
        <TouchableOpacity style={styles.postButton}>
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
  body: {
    flex: 1,
    padding: 16,
    marginBottom: 30,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#E0E0E0',
  },
  headerTitle: {
    fontSize: 18,
    fontFamily: 'Mitr-Bold',
    marginBottom: 10,
  },
  placeholder: {
    width: 24,
  },
  form: {
    flex: 1,
    padding: 16,
  },
  inputContainer: {
    marginBottom: 16,
  },
  inputLabel: {
    fontSize: 16,
    color: '#333',
    marginBottom: 8,
    fontFamily: 'Mitr-Bold',
  },
  requiredStar: {
    color: 'red',
  },
  inputWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: '#E0E0E0',
  },
  input: {
    flex: 1,
    paddingVertical: 8,
    fontSize: 16,
    color: '#333',
  },
  inputText: {
    flex: 1,
    paddingVertical: 8,
    fontSize: 16,
    color: '#333',
    fontFamily: 'Mitr-Regular',
  },
  editButton: {
    padding: 8,
  },
  footer: {
    padding: 16,
    borderTopWidth: 1,
    borderTopColor: '#E0E0E0',
  },
  postButton: {
    backgroundColor: '#4DB15E',
    borderRadius: 8,
    paddingVertical: 12,
    alignItems: 'center',
  },
  postButtonText: {
    color: '#FFFF',
    fontSize: 16,
    fontFamily: 'Mitr-Bold',
  },
});

export default EditAJobScreen;
