import { Text, View, StyleSheet } from 'react-native';
import React, { useContext } from 'react';
import { Button, Card, Icon } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';
import { estadoGlobal } from '../../context/contextData';
import { estadoLoginGlobal } from '../../context/contextData';

export default function ScreenHome() {
  
  const rutas = useNavigation();
  const { sumar, restar, contador } = useContext(estadoGlobal);
  const { outLogin } = useContext(estadoLoginGlobal);

  return (
    <View style={styles.container}>

      <Card style={styles.card}>
        <Icon source="lightbulb" color="#3DA35D" size={70} />
        <Button 
          icon="arrow-right-thin" 
          mode="contained" 
          buttonColor="#3E8914" 
          textColor="#E8FCCF"
          onPress={() => rutas.push('lucescasa')}>
          Ir a Luces
        </Button>
      </Card>

      <Card style={styles.card}>
        <Icon source="door" color="#3DA35D" size={70} />
        <Button 
          icon="door" 
          mode="contained" 
          buttonColor="#3E8914" 
          textColor="#E8FCCF"
          onPress={() => rutas.push('puertacasa')}>
          Ir a Puerta
        </Button>
      </Card>

      <Card style={styles.card}>
        <Icon source="door" color="#3DA35D" size={70} />
        <Button 
          icon="clipboard-text" 
          mode="outlined" 
          textColor="#3E8914"
          onPress={() => rutas.push('detalleshome')}>
          Ver Detalles
        </Button>
      </Card>

      {/* <Card >
        <Text style={styles.counterText}>Suma total: {contador}</Text>
        <Button mode="contained-tonal" buttonColor="#96E072" textColor="#134611" onPress={sumar}>
          Sumar
        </Button>
        <Button mode="contained-tonal" buttonColor="#E8FCCF" textColor="#134611" onPress={restar}>
          Restar
        </Button>
      </Card> */}

      <Button 
        icon="logout" 
        mode="contained" 
        buttonColor="#EF4444" 
        textColor="#FFF"
        style={styles.logoutButton}
        onPress={outLogin}>
        Salir del Home
      </Button>

    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,  //esta estilo es para que el contenedor ocupe todo el espacio disponible 
    backgroundColor: '#134611',
    padding: 16, //espacio entre los bordes del contenedor y los elementos dentro de él
    justifyContent: 'center',
    
  },
  card: {
    backgroundColor: '#E8FCCF',
    marginBottom: 20,
    padding: 16, 
    borderRadius: 12,
    alignItems: 'center',
    
  },
  counterCard: {
    backgroundColor: '#DFFFD0',
  },
  counterText: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#134611',
  },
  logoutButton: {
    marginTop: 20,
    borderRadius: 8,
  }
});
