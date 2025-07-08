import React, {useContext} from "react";

import {estadoLoginGlobal} from './src/context/contextData';

import { FontAwesome } from '@expo/vector-icons'
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createStackNavigator } from "@react-navigation/stack";
import { createDrawerNavigator } from '@react-navigation/drawer';

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();
const Drawer = createDrawerNavigator();

//Lamar componentes de inicio de sesipon y crear cuenta
import login from "./src/screen/login/login";
import signup from "./src/screen/login/signup";

// Llamar los screen principales
import ScreenAcercade from './src/screen/acercade/ScreenAcercade';
import ScreenHome from './src/screen/home/ScreenHome';
import ScreenSetting from './src/screen/setting/ScreenSetting';
import ScreenUser from './src/screen/usuarios/ScreenUser'

// Llamar los Screen hijos home
import LucesCasa from "./src/screen/home/LucesCasa";
import PuertaCasa from "./src/screen/home/PuertaCasa";
import DetallesHome from "./src/screen/home/DetallesHome";

function AccessApp() {
   return(
      <Stack.Navigator>
         <Stack.Screen name="login" component={login} />
         <Stack.Screen name="signup" component={signup} />
         <Stack.Screen name="menu" component={ScreenHome} />

      </Stack.Navigator>
   )
}

function MyStackHome() {
   return(
      <Stack.Navigator>

         <Stack.Screen name="menu" component={ScreenHome} options={{headerShown:false,}}/>
         <Stack.Screen name="lucescasa" component={LucesCasa} />
         <Stack.Screen name="puertacasa" component={PuertaCasa} />
         <Stack.Screen name="detalleshome" component={DetallesHome} />

      </Stack.Navigator>
   )
}


function MyDrawer() {
   return(
      <Drawer.Navigator>
         <Drawer.Screen name="dash" component={MyStackHome} 
            options={{
               title: 'Home',
               drawerIcon: ({color, size}) => <FontAwesome size={28} name='home' color={color}/>
            }}
         />

         <Drawer.Screen name="notificacion" component={MyStackHome} 
            options={{
               title: 'Notificacion',
               drawerIcon: ({color, size}) => <FontAwesome size={28} name='home' color={color}/>
            }}
         />

         <Drawer.Screen name="perfil" component={MyStackHome} 
            options={{
               title: 'Perfil',
               drawerIcon: ({color, size}) => <FontAwesome size={28} name='home' color={color}/>
            }}
         />

         <Drawer.Screen name="settings" component={MyStackHome} 
            options={{
               title: 'Settings',
               drawerIcon: ({color, size}) => <FontAwesome size={28} name='home' color={color}/>
            }}
         />
         <Drawer.Screen name="Profile" component={ScreenUser} 
            options={{
               title: 'Profile',
               drawerIcon: ({color, size}) => <FontAwesome size={28} name='home' color={color}/>
            }}
         />
      </Drawer.Navigator>
   )
}


function MyTabs() {
   return (
      <Tab.Navigator>
         <Tab.Screen
            name="Home" 
            component={MyStackHome} 
            options={{
               title: 'menu',
               headerShown:false,
               tabBarIcon: ({color, size}) => <FontAwesome size={28} name='home' color={color}/>,
               tabBarActiveTintColor: '#D5451B',
               tabBarLabelPosition: 'beside-icon',
               tabBarBadge: '67',
               tabBarBadgeStyle: {
                  color: '#222222',
                  backgroundColor: '#1DCD9F',
               }
            }}
         />

         <Tab.Screen 
            name="About" 
            component={ScreenAcercade}
            options={{
               headerShown: false,
               tabBarIcon: ({color, size}) => <FontAwesome size={28} name='info-circle' color={color}/>,
               tabBarLabelPosition: 'beside-icon',
               tabBarActiveTintColor: '#D5451B',
               tabBarBadge: '1',
               tabBarBadgeStyle: {
                  color: 'white',
                  backgroundColor: '#98ABEE',
               }
            }}
         />

         <Tab.Screen 
            name="Settings" 
            component={ScreenSetting}
            options={{
               headerShown: false,
               tabBarIcon: ({color, size}) => <FontAwesome size={28} name='cog' color={color}/>,
               tabBarLabelPosition: 'beside-icon',
               tabBarActiveTintColor: '#D5451B',
               tabBarBadge: '100',
               tabBarBadgeStyle: {
                  color: 'white',
                  backgroundColor: '#DDA853',
               }
            }}
         />
      </Tab.Navigator>
   )
}

export default function navigation() {

   const {isLogin} = useContext(estadoLoginGlobal);

   console.log("Estado de login: ", isLogin)

   return(

      <>
       {isLogin ? <MyDrawer/> : <AccessApp/>}
      </>
   )
}