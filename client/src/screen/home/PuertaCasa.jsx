import { StyleSheet, Text, View, Alert, ScrollView } from "react-native";
import React, { useState, useEffect } from "react";
import {
  Card,
  Switch,
  ActivityIndicator,
  Button,
  Modal,
  Portal,
  TextInput,
} from "react-native-paper";
import Constants from "expo-constants";

export default function PuertasCas() {
  const [puertas, setPuertas] = useState([]);
  const [loading, setLoading] = useState(true);
  const [updating, setUpdating] = useState({});

  const [modalVisible, setModalVisible] = useState(false);
  const [nombreNuevaPuerta, setNombreNuevaPuerta] = useState("");
  const [agregandoPuerta, setAgregandoPuerta] = useState(false);

  const API_URL = Constants.expoConfig.extra.apiUrl;

  const obtenerPuertas = async () => {
    try {
      const response = await fetch(`${API_URL}/api/puertascasa/`);
      const result = await response.json();

      if (result.error === false) {
        setPuertas(result.body);
      } else {
        Alert.alert("Error", "No se pudieron cargar las puertas");
      }
    } catch (error) {
      console.error("Error al obtener puertas:", error);
      Alert.alert("Error", "Error de conexión al obtener las puertas");
    } finally {
      setLoading(false);
    }
  };

  const actualizarEstado = async (puerta) => {
    const puertaId = puerta.id;
    setUpdating((prev) => ({ ...prev, [puertaId]: true }));

    try {
      const nuevoEstado = puerta.estado === "abierta" ? "cerrada" : "abierta";

      const response = await fetch(`${API_URL}/api/puertascasa/agregar`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          id: puerta.id,
          nombre: puerta.nombre,
          estado: nuevoEstado,
        }),
      });

      const result = await response.json();

      if (result.error === false) {
        setPuertas((prevPuertas) =>
          prevPuertas.map((p) =>
            p.id === puertaId ? { ...p, estado: nuevoEstado } : p
          )
        );

        Alert.alert(
          "Éxito",
          `${puerta.nombre} ${
            nuevoEstado === "abierta" ? "abierta" : "cerrada"
          }`
        );
      } else {
        Alert.alert("Error", "No se pudo actualizar el estado de la puerta");
      }
    } catch (error) {
      console.error("Error al actualizar puerta:", error);
      Alert.alert("Error", "Error de conexión al actualizar la puerta");
    } finally {
      setUpdating((prev) => ({ ...prev, [puertaId]: false }));
    }
  };

  const agregarNuevaPuerta = async () => {
    if (!nombreNuevaPuerta.trim()) {
      Alert.alert("Error", "Por favor ingresa un nombre para la puerta");
      return;
    }

    setAgregandoPuerta(true);

    try {
      const response = await fetch(`${API_URL}/api/puertascasa/agregar`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          id: 0,
          nombre: nombreNuevaPuerta.trim(),
          estado: "cerrada",
        }),
      });

      const result = await response.json();

      if (result.error === false) {
        Alert.alert(
          "Éxito",
          `Puerta "${nombreNuevaPuerta}" agregada correctamente`
        );
        setNombreNuevaPuerta("");
        setModalVisible(false);
        obtenerPuertas(); // Recargar
      } else {
        Alert.alert("Error", "No se pudo agregar la puerta");
      }
    } catch (error) {
      console.error("Error al agregar puerta:", error);
      Alert.alert("Error", "Error de conexión al agregar la puerta");
    } finally {
      setAgregandoPuerta(false);
    }
  };

  const cancelarAgregar = () => {
    setNombreNuevaPuerta("");
    setModalVisible(false);
  };

  useEffect(() => {
    obtenerPuertas();
  }, []);

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#3DA35D" />
        <Text style={styles.loadingText}>Cargando puertas...</Text>
      </View>
    );
  }

  return (
    <ScrollView style={styles.container}>
      <View style={styles.container}>
        <Text style={styles.title}>Puertas de la casa</Text>

        {puertas.length === 0 ? (
          <View style={styles.emptyContainer}>
            <Text style={styles.emptyText}>No hay puertas registradas</Text>
          </View>
        ) : (
          puertas.map((puerta) => (
            <Card style={styles.light_card} key={puerta.id}>
              <Card.Title title={puerta.nombre} titleStyle={styles.cardTitle} />
              <Card.Content style={styles.cardContent}>
                <View style={styles.statusContainer}>
                  <Text
                    style={[
                      styles.statusText,
                      puerta.estado === "abierta"
                        ? styles.abierta
                        : styles.cerrada,
                    ]}
                  >
                    {puerta.estado === "abierta" ? "Abierta" : "Cerrada"}
                  </Text>
                </View>

                <View style={styles.switchContainer}>
                  {updating[puerta.id] ? (
                    <ActivityIndicator size="small" color="#3DA35D" />
                  ) : (
                    <Switch
                      value={puerta.estado === "abierta"}
                      onValueChange={() => actualizarEstado(puerta)}
                      color="#3DA35D"
                    />
                  )}
                </View>
              </Card.Content>
            </Card>
          ))
        )}

        <Button
          mode="contained"
          buttonColor="#3E8914"
          textColor="#E8FCCF"
          onPress={() => setModalVisible(true)}
          style={styles.addButton}
          icon="plus"
        >
          Agregar Puerta
        </Button>

        <Portal>
          <Modal
            visible={modalVisible}
            onDismiss={cancelarAgregar}
            contentContainerStyle={styles.modalContainer}
          >
            <Card style={styles.modalCard}>
              <Card.Title
                title="Agregar Nueva Puerta"
                titleStyle={styles.modalTitle}
              />
              <Card.Content>
                <TextInput
                  label="Nombre de la puerta"
                  value={nombreNuevaPuerta}
                  onChangeText={setNombreNuevaPuerta}
                  mode="outlined"
                  placeholder="Ej: Puerta principal"
                  style={styles.textInput}
                  outlineColor="#3DA35D"
                  activeOutlineColor="#3E8914"
                  textColor="#134611"
                  disabled={agregandoPuerta}
                />
              </Card.Content>
              <Card.Actions style={styles.modalActions}>
                <Button
                  mode="outlined"
                  onPress={cancelarAgregar}
                  textColor="#666"
                  disabled={agregandoPuerta}
                >
                  Cancelar
                </Button>
                <Button
                  mode="contained"
                  buttonColor="#3E8914"
                  textColor="#E8FCCF"
                  onPress={agregarNuevaPuerta}
                  loading={agregandoPuerta}
                  disabled={agregandoPuerta}
                >
                  {agregandoPuerta ? "Agregando..." : "Agregar"}
                </Button>
              </Card.Actions>
            </Card>
          </Modal>
        </Portal>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#134611",
    padding: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#E8FCCF",
    textAlign: "center",
    marginBottom: 20,
  },
  light_card: {
    margin: 10,
    padding: 10,
    backgroundColor: "#E8FCCF",
    borderRadius: 12,
  },
  cardTitle: {
    color: "#134611",
    fontSize: 18,
    fontWeight: "bold",
  },
  cardContent: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  statusContainer: {
    flex: 1,
  },
  statusText: {
    fontSize: 16,
    fontWeight: "600",
  },
  abierta: {
    color: "#3DA35D",
  },
  cerrada: {
    color: "#666",
  },
  switchContainer: {
    alignItems: "center",
    justifyContent: "center",
    minWidth: 50,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#134611",
  },
  loadingText: {
    color: "#E8FCCF",
    fontSize: 16,
    marginTop: 10,
  },
  emptyContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  emptyText: {
    color: "#E8FCCF",
    fontSize: 16,
    textAlign: "center",
  },
  addButton: {
    marginTop: 20,
    borderRadius: 8,
  },
  modalContainer: {
    padding: 20,
    margin: 20,
    borderRadius: 12,
  },
  modalCard: {
    backgroundColor: "#E8FCCF",
    borderRadius: 12,
  },
  modalTitle: {
    color: "#134611",
    fontSize: 20,
    fontWeight: "bold",
    textAlign: "center",
  },
  textInput: {
    backgroundColor: "#FFFFFF",
    marginBottom: 10,
  },
  modalActions: {
    justifyContent: "space-between",
    paddingHorizontal: 16,
    paddingBottom: 16,
  },
});
