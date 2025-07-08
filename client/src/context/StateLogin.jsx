import { View, Text, Alert } from 'react-native'
import React, { useState } from 'react'

import { estadoLoginGlobal } from './contextData'

import Constants from "expo-constants";


export default function StateLogin({children}) {

   const [perfil, setPerfil] = useState("");

   const [isLogin, setIsLogin] = useState(false);
   const [dataUser, setDataUser] = useState([]);


const API_URL =
  Constants?.expoConfig?.extra?.apiUrl ?? Constants?.manifest?.extra?.apiUrl;

console.log("API_URL desde context:", API_URL);

   
   
   const login = () => {
      setIsLogin(true)
      Alert.alert('USUARIO', 'BIENVENIDO ')
   }

   const outLogin = () => {
      setIsLogin(false)
      Alert.alert('USUARIO', 'SESION CERRADA')
   }


   const obtenerDatosUsuario= async () => {
      const requestOptions = {
            method: "GET",
            redirect: "follow"
            };

            try {
            const response = await fetch(`${API_URL}/api/usuario/`, requestOptions);
            const result = await response.json();
            console.log(result)
            setDataUser(result.body)
            } catch (error) {
            console.error(error);
            };    

   }


   const eliminaruser =async (id) => {
      if (id === '') {
         return(Alert.alert("ID no obtenida"))
      }
      const myHeaders = new Headers();
         myHeaders.append("Content-Type", "application/json");

         const raw = JSON.stringify({
         "id": id
         });

         const requestOptions = {
         method: "POST",
         headers: myHeaders,
         body: raw,
         redirect: "follow"
         };

         try {
         const response = await fetch(`${API_URL}/api/usuario/eliminar`, requestOptions);
         const result = await response.json();
         obtenerDatosUsuario();
         Alert.alert("Usuario eliminado")
         } catch (error) {
            console.error(error);
            Alert.alert('Error', 'No se pudo eliminar el usuario');
         }
   }

   return (
      <estadoLoginGlobal.Provider value={{perfil,isLogin, login, outLogin, obtenerDatosUsuario, eliminaruser, dataUser}}>
         {children}
      </estadoLoginGlobal.Provider>
   )
}