import { StyleSheet, View, Alert } from "react-native";
import React, { useContext, useState } from "react";
import { Text, TextInput, Button } from "react-native-paper";
import { useNavigation } from "@react-navigation/native";
import { estadoLoginGlobal } from "../../context/contextData";

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const rutas = useNavigation();
  const { login } = useContext(estadoLoginGlobal);

  const handleLogin = async () => {
    console.log("Login presionado"); // ← Añade esto

    if (email == "" || password == "") {
      Alert.alert("Por favor, completa todos los campos");
    } else {
      const myHeaders = new Headers();
      myHeaders.append("Content-Type", "application/json");

      const raw = JSON.stringify({
        user: email,
        password: password,
      });

      const requestOptions = {
        method: "POST",
        headers: myHeaders,
        body: raw,
        redirect: "follow",
      };

      try {
        const response = await fetch(
          "http://172.168.15.213:4000/api/usuario/login",
          requestOptions
        );
        const result = await response.json();
        console.log(result);

        if (result.body.status == true) {
          Alert.alert('Bienvenido', result.body.user.nombre)
          login()
        } else {
          Alert.alert('Mensaje', result.body.mensaje)
        }
        
      } catch (error) {
        console.error(error);
      }
    }
  };

  return (
    <View style={styles.container}>
      <Text variant="headlineLarge" style={styles.headline}>
        Bienvenido
      </Text>

      <TextInput
        label="Email"
        style={styles.input}
        placeholder="Ingresa tu email"
        value={email}
        onChangeText={setEmail}
        mode="outlined"
        outlineColor="#3DA35D"
        activeOutlineColor="#3E8914"
        textColor="#134611"
        placeholderTextColor="#134611"
        keyboardType="email-address"
      />

      <TextInput
        label="Contraseña"
        secureTextEntry
        style={styles.input}
        right={<TextInput.Icon icon="eye" />}
        placeholder="Ingresa tu contraseña"
        value={password}
        onChangeText={setPassword}
        mode="outlined"
        outlineColor="#3DA35D"
        activeOutlineColor="#3E8914"
        textColor="#134611"
        placeholderTextColor="#134611"
      />

      <Button
        mode="contained-tonal"
        style={styles.loginButton}
        buttonColor="#96E072"
        textColor="#134611"
        onPress={() => handleLogin()}
      >
        Login
      </Button>

      {/* <Button
        mode="contained-tonal"
        style={styles.loginButton}
        buttonColor="#96E072"
        textColor="#134611"
        onPress={() => login()}
      >
        Ingresar
      </Button> */}

      <Button
        mode="text"
        onPress={() => rutas.replace("signup")}
        textColor="#96E072"
        labelStyle={styles.signupText}
      >
        ¿No tienes cuenta? Añadela
      </Button>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#134611",
    justifyContent: "center",
    paddingHorizontal: 20,
  },
  headline: {
    textAlign: "center",
    color: "#E8FCCF",
    marginBottom: 30,
    fontWeight: "bold",
  },
  input: {
    marginBottom: 20,
    backgroundColor: "#E8FCCF",
  },
  loginButton: {
    marginBottom: 20,
    borderRadius: 8,
  },
  signupText: {
    fontWeight: "bold",
    fontSize: 14,
  },
});
