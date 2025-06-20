import { View, Text, Alert } from 'react-native'
import React, { useState } from 'react'

import { estadoLoginGlobal } from './contextData'

export default function StateLogin({children}) {

   const [perfil, setPerfil] = useState("");

   const [isLogin, setIsLogin] = useState(false);
   
   
   const login = () => {
      setIsLogin(true)
      Alert.alert('USUARIO', 'BIENVENIDO ')
   }

   const outLogin = () => {
      setIsLogin(false)
      Alert.alert('USUARIO', 'SESION CERRADA')
   }

   return (
      <estadoLoginGlobal.Provider value={{perfil,isLogin, login, outLogin}}>
         {children}
      </estadoLoginGlobal.Provider>
   )
}