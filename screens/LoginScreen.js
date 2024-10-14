import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ActivityIndicator,
  Alert,
  Image,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import * as Font from "expo-font";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation, useRoute } from "@react-navigation/native"; // Import useRoute

const InputField = ({
  placeholder,
  value,
  onChangeText,
  secureTextEntry,
  showPassword,
  setShowPassword,
}) => (
  <View style={styles.inputContainer}>
    <TextInput
      style={styles.input}
      placeholder={placeholder}
      value={value}
      onChangeText={onChangeText}
      secureTextEntry={secureTextEntry}
      placeholderTextColor="#B0B0B0"
    />
    {setShowPassword !== undefined && (
      <TouchableOpacity
        style={styles.eyeIcon}
        onPress={() => setShowPassword(!showPassword)}
      >
        <Ionicons
          name={showPassword ? "eye-off" : "eye"}
          size={24}
          color="gray"
        />
      </TouchableOpacity>
    )}
  </View>
);

const LoginScreen = () => {
  const navigation = useNavigation();
  const route = useRoute(); // Get route
  const { userType } = route.params || {}; // Extract userType from route.params

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [fontsLoaded, setFontsLoaded] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    const loadFonts = async () => {
      await Font.loadAsync({
        "Mitr-Regular": require("../assets/fonts/Mitr-Regular.ttf"),
        "Mitr-Bold": require("../assets/fonts/Mitr-Bold.ttf"),
        "Mitr-Medium": require("../assets/fonts/Mitr-Medium.ttf"),
        "Mitr-SemiBold": require("../assets/fonts/Mitr-SemiBold.ttf"),
      });
      setFontsLoaded(true);
    };

    loadFonts();
  }, []);

  const handleLogin = async () => {
    setLoading(true);
    setErrorMessage("");
    try {
      const response = await fetch("http://10.0.2.2:3000/api/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username, password }),
      });

      const data = await response.json();
      console.log("Data from server:", data); // ตรวจสอบค่าที่ได้รับจากเซิร์ฟเวอร์

      if (response.ok) {
        await AsyncStorage.setItem("userId", data.userId.toString());
        await AsyncStorage.setItem("token", data.token);

        if (data.userType === "บริษัท") {
          console.log("Company Name:", data.companyName); // ตรวจสอบค่าของ companyName
          if (data.companyName) {
            navigation.navigate("JobManagement", {
              userType: data.userType,
              companyName: data.companyName,
            });
          } else {
            console.log("Data from server:", data); // ตรวจสอบข้อมูลทั้งหมดจาก API
            console.log("Company Name:", data.companyName); // ตรวจสอบ companyName

            Alert.alert("เกิดข้อผิดพลาด", "ไม่พบชื่อบริษัทของคุณ");
          }
        } else {
          navigation.navigate("Dashboard", {
            userId: data.userId,
            userType: data.userType,
          });
        }

        Alert.alert("เข้าสู่ระบบสำเร็จ", "คุณได้เข้าสู่ระบบเรียบร้อยแล้ว!");
      } else {
        const message = data.error || "ชื่อผู้ใช้หรือรหัสผ่านไม่ถูกต้อง";
        setErrorMessage(message);
        Alert.alert("เข้าสู่ระบบล้มเหลว", message);
      }
    } catch (error) {
      console.error("Error saving user ID:", error);
      setErrorMessage("เกิดข้อผิดพลาดในการเชื่อมต่อ");
      Alert.alert("เกิดข้อผิดพลาด", "โปรดลองใหม่อีกครั้ง");
    } finally {
      setLoading(false);
    }
  };

  const renderErrorMessage = () => {
    if (errorMessage !== "") {
      return <Text style={styles.errorText}>{errorMessage}</Text>;
    }
  };

  if (!fontsLoaded || loading) {
    return <ActivityIndicator size="large" color="#0000ff" />;
  }

  return (
    <View style={styles.container}>
      <Text style={styles.subtitle}>เข้าสู่ระบบ {userType}</Text>
      <Text style={styles.description}>
        กรุณาเข้าสู่ระบบบัญชีที่ลงทะเบียนไว้
      </Text>

      <InputField
        placeholder="ชื่อผู้ใช้"
        value={username}
        onChangeText={setUsername}
      />

      <InputField
        placeholder="รหัสผ่าน"
        value={password}
        onChangeText={setPassword}
        secureTextEntry={!showPassword}
        showPassword={showPassword}
        setShowPassword={setShowPassword}
      />

      {renderErrorMessage()}

      <TouchableOpacity style={styles.loginButton} onPress={handleLogin}>
        <Text style={styles.loginButtonText}>เข้าสู่ระบบ</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.forgetpasswordButton}>
        <Text style={styles.forgetpasswordText}>ลืมรหัสผ่าน?</Text>
      </TouchableOpacity>

      <Text style={styles.orText}>Or sign in with</Text>

      <View style={styles.socialButtons}>
        <TouchableOpacity style={styles.socialButton}>
          <Image
            source={require("../assets/iconGoogle.png")}
            style={styles.socialIcon}
          />
        </TouchableOpacity>
        <TouchableOpacity style={styles.socialButton}>
          <Image
            source={require("../assets/iconFacebook.png")}
            style={styles.socialIcon}
          />
        </TouchableOpacity>
      </View>

      <View style={styles.line} />
      <TouchableOpacity
        style={styles.createAccountButton}
        onPress={() => navigation.navigate("Register", { userType })}
      >
        <Text style={styles.createAccountText}>สร้างบัญชี</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F5F5F5",
    padding: 20,
  },
  title: {
    fontSize: 20,
    textAlign: "center",
    marginTop: 60,
    marginBottom: 10,
    fontFamily: "Mitr-Medium",
  },
  subtitle: {
    fontSize: 20,
    marginBottom: 5,
    fontFamily: "Mitr-Medium",
  },
  description: {
    fontSize: 14,
    color: "gray",
    textAlign: "flex-start",
    marginBottom: 30,
    fontFamily: "Mitr-Medium",
  },
  inputContainer: {
    backgroundColor: "white",
    borderRadius: 25,
    marginBottom: 15,
    flexDirection: "row",
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 5,
  },
  input: {
    flex: 1,
    paddingVertical: 15,
    paddingHorizontal: 20,
    fontSize: 16,
  },
  eyeIcon: {
    padding: 10,
    alignContent: "flex-end",
  },
  loginButton: {
    backgroundColor: "#4CAF50",
    borderRadius: 25,
    padding: 15,
    alignItems: "center",
    marginTop: 10,
  },
  loginButtonText: {
    color: "white",
    fontSize: 18,
    fontFamily: "Mitr-Medium",
  },
  orText: {
    textAlign: "center",
    marginTop: 20,
    marginBottom: 20,
    color: "black",
    fontFamily: "Mitr-Medium",
  },
  socialButtons: {
    flexDirection: "row",
    justifyContent: "center",
    marginBottom: 20,
  },
  socialButton: {
    width: 150,
    height: 50,
    borderRadius: 25,
    backgroundColor: "white",
    alignItems: "center",
    justifyContent: "center",
    marginHorizontal: 10,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 5,
  },
  socialIcon: {
    width: 25,
    height: 25,
  },
  forgetpasswordButton: {
    marginTop: 10,
  },
  forgetpasswordText: {
    textAlign: "center",
    color: "gray",
    fontFamily: "Mitr-Medium",
  },
  line: {
    borderBottomColor: "gray",
    borderBottomWidth: 1,
    marginVertical: 10,
  },
  createAccountButton: {
    marginTop: 15,
    alignItems: "center",
  },
  createAccountText: {
    color: "blue",
    fontFamily: "Mitr-Medium",
  },
  errorText: {
    color: "red",
    textAlign: "center",
    marginBottom: 10,
    fontFamily: "Mitr-Medium",
  },
});

export default LoginScreen;
