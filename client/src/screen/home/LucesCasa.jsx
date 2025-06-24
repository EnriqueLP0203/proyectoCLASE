import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { Card, Switch } from "react-native-paper";

const luces = [
  { nombre: "Luz del salón" },
  { nombre: "Luz del comedor" },
  { nombre: "Luz del pasillo" },
  { nombre: "Luz del dormitorio" },
];

export default function LucesCasa() {
  const [switches, setSwitches] = React.useState([false, false, false, false]);

  const onToggleSwitch = (index) => {
    const newSwitches = [...switches];
    newSwitches[index] = !newSwitches[index];
    setSwitches(newSwitches);
  };

  return (
    <View>
      <Text>Luces de la casa</Text>
      {luces.map((luz, idx) => (
        <Card style={styles.light_card} key={luz.nombre}>
          <Card.Title title={luz.nombre} />
          <Card.Content>
            <Text>{switches[idx] ? "Encendida" : "Apagada"}</Text>
            <Switch
              value={switches[idx]}
              onValueChange={() => onToggleSwitch(idx)}
            />
          </Card.Content>
        </Card>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  light_card: {
    margin: 10,
    padding: 10,
  }
});