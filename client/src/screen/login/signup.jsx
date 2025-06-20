import { StyleSheet, View, Alert } from "react-native";
import React, { useState } from "react";
import { Text, TextInput, Button } from "react-native-paper";
import { useNavigation } from "@react-navigation/native";

export default function Signup() {
  const [nombre, setNombre] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const rutas = useNavigation();

  const handleSignup = async () => {
    if (!nombre || !email || !password || !confirmPassword) {
      Alert.alert("Error", "Por favor, completa todos los campos");
      return;
    }

    if (password !== confirmPassword) {
      Alert.alert("Error", "Las contraseñas no coinciden");
      return;
    }

    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    const raw = JSON.stringify({
      nombre,
      user: email,
      password,
    });

    const requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: raw,
      redirect: "follow",
    };

    try {
      const response = await fetch(
        "http://172.168.14.176:4000/api/usuario/signup",
        requestOptions
      );
      const result = await response.json();
      console.log(result);

      if (result.body.status === true) {
        Alert.alert("Éxito", "Cuenta creada correctamente");
        rutas.push("login");
      } else {
        Alert.alert(
          "Error",
          result.body.mensaje || "No se pudo crear la cuenta"
        );
      }
    } catch (error) {
      console.error(error);
      Alert.alert("Error", "Hubo un problema en el servidor");
    }
  };

  return (
    <View style={styles.container}>
      <Text variant="headlineLarge" style={styles.headline}>
        Crear cuenta
      </Text>

      <TextInput
        label="Nombre"
        style={styles.input}
        placeholder="Ingresa tu nombre"
        value={nombre}
        onChangeText={setNombre}
        mode="outlined"
        outlineColor="#3DA35D"
        activeOutlineColor="#3E8914"
        textColor="#134611"
        placeholderTextColor="#134611"
      />

      <TextInput
        label="Email"
        style={styles.input}
        placeholder="Ingresa tu email"
        value={email}
        onChangeText={setEmail}
        mode="outlined"
        keyboardType="email-address"
        outlineColor="#3DA35D"
        activeOutlineColor="#3E8914"
        textColor="#134611"
        placeholderTextColor="#134611"
      />

      <TextInput
        label="Contraseña"
        secureTextEntry
        style={styles.input}
        placeholder="Ingresa tu contraseña"
        value={password}
        onChangeText={setPassword}
        mode="outlined"
        outlineColor="#3DA35D"
        activeOutlineColor="#3E8914"
        textColor="#134611"
        placeholderTextColor="#134611"
      />

      <TextInput
        label="Confirmar contraseña"
        secureTextEntry
        style={styles.input}
        placeholder="Repite tu contraseña"
        value={confirmPassword}
        onChangeText={setConfirmPassword}
        mode="outlined"
        outlineColor="#3DA35D"
        activeOutlineColor="#3E8914"
        textColor="#134611"
        placeholderTextColor="#134611"
      />

      <Button
        mode="contained-tonal"
        style={styles.signupButton}
        buttonColor="#96E072"
        textColor="#134611"
        onPress={handleSignup}
      >
        Crear cuenta
      </Button>

      <Button
        mode="text"
        onPress={() => rutas.replace("login")} // <- aquí está el cambio
        textColor="#96E072"
        labelStyle={styles.loginText}
      >
        ¿Ya tienes cuenta? Inicia sesión
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
  signupButton: {
    marginBottom: 20,
    borderRadius: 8,
  },
  loginText: {
    fontWeight: "bold",
    fontSize: 14,
  },
});
