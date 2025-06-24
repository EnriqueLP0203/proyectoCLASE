import { StyleSheet, Text, View, Alert } from "react-native";
import React, { useState, useEffect } from "react";
import { Card, Switch, ActivityIndicator, Button } from "react-native-paper";

export default function LucesCasa() {
  const [luces, setLuces] = useState([]); // Para almacenar las luces obtenidas de la base de datos
  const [loading, setLoading] = useState(true); // Para manejar el estado de carga de las luces
  const [updating, setUpdating] = useState({}); // Para manejar el estado de actualización de cada luz

  // Función para obtener todas las luces de la base de datos
  const obtenerLuces = async () => {
    try {
      const response = await fetch("http://192.168.0.16:4000/api/lucescasa/");
      const result = await response.json();
      
      if (result.error === false) {
        setLuces(result.body);
      } else {
        Alert.alert("Error", "No se pudieron cargar las luces");
      }
    } catch (error) {
      console.error("Error al obtener luces:", error);
      Alert.alert("Error", "Error de conexión al obtener las luces");
    } finally {
      setLoading(false);
    }
  };

  // Función para actualizar el estado de una luz
  const actualizarEstado= async (luz) => {
    const luzId = luz.id;
    setUpdating(prev => ({ ...prev, [luzId]: true }));

    // Cambiar el estado de la luz
    try {
      const nuevoEstado = luz.estado === "encendido" ? "apagado" : "encendido";
      
      const myHeaders = new Headers();
      myHeaders.append("Content-Type", "application/json");
      
      const raw = JSON.stringify({
        id: luz.id,
        nombre: luz.nombre,
        estado: nuevoEstado
      });

      const requestOptions = {
        method: "POST",
        headers: myHeaders,
        body: raw,
        redirect: "follow"
      };

      const response = await fetch("http://192.168.0.16:4000/api/lucescasa/agregar", requestOptions);
      const result = await response.json();

      if (result.error === false) {
        // Actualizar el estado local de las luces, cambiando solo la luz con el ID correspondiente
        setLuces(prevLuces => 
          prevLuces.map(l => 
            l.id === luzId 
              ? { ...l, estado: nuevoEstado }
              : l
          )
        );
        
        // Mostrar mensaje de confirmación
        Alert.alert(
          "Éxito", 
          `${luz.nombre} ${nuevoEstado === "encendido" ? "encendida" : "apagada"}`
        );
      } else {
        Alert.alert("Error", "No se pudo actualizar el estado de la luz");
      }
    } catch (error) {
      console.error("Error al actualizar luz:", error);
      Alert.alert("Error", "Error de conexión al actualizar la luz");
    } finally {
      setUpdating(prev => ({ ...prev, [luzId]: false }));
    }
  };

  // Obtener las luces cuando el componente se monta
  useEffect(() => {
    obtenerLuces();
  }, []);

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#3DA35D" />
        <Text style={styles.loadingText}>Cargando luces...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Luces de la casa</Text>
      
      {luces.length === 0 ? (
        <View style={styles.emptyContainer}>
          <Text style={styles.emptyText}>No hay luces registradas</Text>
        </View>
      ) : (
        luces.map((luz) => (
          <Card style={styles.light_card} key={luz.id}>
            <Card.Title 
              title={luz.nombre} 
              titleStyle={styles.cardTitle}
            />
            <Card.Content style={styles.cardContent}>
              <View style={styles.statusContainer}>
                <Text style={[
                  styles.statusText,
                  luz.estado === "encendido" ? styles.encendida : styles.apagada
                ]}>
                  {luz.estado === "encendido" ? "Encendida" : "Apagada"}
                </Text>
              </View>
              
              <View style={styles.switchContainer}>
                {updating[luz.id] ? (
                  <ActivityIndicator size="small" color="#3DA35D" />
                ) : (
                  <Switch
                    value={luz.estado === "encendido"}
                    onValueChange={() => actualizarEstado(luz)}
                    color="#3DA35D"
                  />
                )}
              </View>
            </Card.Content>
          </Card>
        ))
      )}

      //boton para agregar luces
      <Button 
        mode="contained" 
        buttonColor="#3E8914" 
        textColor="#E8FCCF"
        onPress={() => Alert.alert("Funcionalidad no implementada", "Esta funcionalidad aún no está disponible")}
        style={{ marginTop: 20 }}
      >
        Agregar Luz
      </Button>

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#134611',
    padding: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#E8FCCF',
    textAlign: 'center',
    marginBottom: 20,
  },
  light_card: {
    margin: 10,
    padding: 10,
    backgroundColor: '#E8FCCF',
    borderRadius: 12,
  },
  cardTitle: {
    color: '#134611',
    fontSize: 18,
    fontWeight: 'bold',
  },
  cardContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  statusContainer: {
    flex: 1,
  },
  statusText: {
    fontSize: 16,
    fontWeight: '600',
  },
  encendida: {
    color: '#3DA35D',
  },
  apagada: {
    color: '#666',
  },
  switchContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    minWidth: 50,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#134611',
  },
  loadingText: {
    color: '#E8FCCF',
    fontSize: 16,
    marginTop: 10,
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  emptyText: {
    color: '#E8FCCF',
    fontSize: 16,
    textAlign: 'center',
  },
});