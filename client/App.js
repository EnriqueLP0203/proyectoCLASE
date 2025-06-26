import { StatusBar } from "expo-status-bar";
import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import Navegacion from "./navegation";
import StateGlobal from "./src/context/StateGlobal";
import StateLogin from "./src/context/StateLogin";
import { Provider as PaperProvider } from "react-native-paper";

export default function App() {
  return (
    <PaperProvider>
      <StateLogin>
        <StateGlobal>
          <NavigationContainer>
            <Navegacion />
          </NavigationContainer>
        </StateGlobal>
      </StateLogin>
    </PaperProvider>
  );
}

const styles = StyleSheet.create({});
