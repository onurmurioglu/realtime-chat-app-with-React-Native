import React, {useEffect} from 'react';
import {Text} from 'react-native';
import { NavigationContainer, useNavigation } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { ScreenStack } from 'react-native-screens';
import ChatList from './screens/ChatList';
import Chat from './screens/Chat';
import Settings from './screens/Settings';
import SignUp from './screens/SignUp';
import SignIn from './screens/SignIn';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import VectorIcon from 'react-native-vector-icons';
import { Provider } from 'react-native-paper';
import auth from '@react-native-firebase/auth';
import firebase from '@react-native-firebase/app';
import firestore from '@react-native-firebase/firestore';
import { initializeApp } from "firebase/app";


// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "*****",
  authDomain: "******",
  projectId: "******",
  storageBucket: "******",
  messagingSenderId: "*******",
  appId: "******"
};

const app = initializeApp(firebaseConfig);
//firebase.initializeApp(firebaseConfig);

const Stack = createNativeStackNavigator();

const Tabs = createBottomTabNavigator();

const TabsNavigator = () => {

    const navigation = useNavigation();

    useEffect(() => {

      firebase.auth().onAuthStateChanged(user => {
        if(!user){
          navigation.navigate("SignUp");
        }
      })


    }, []);

    return(

      <Tabs.Navigator 
          
      screenOptions = {({route}) => ({
          tabBarIcon: ({ focused, color, size }) => {
          return <MaterialIcons name= {route.name === 'ChatList' ? "chat_bubble" : "settings"} color= {color} size= {size} />;
            
        },
      
      })
    } 
    >

        <Tabs.Screen name= "ChatList" component = {ChatList} />
        <Tabs.Screen name= "Settings" component = {Settings} />

    </Tabs.Navigator>


    )

}

const App = () => {
  
  return(

      <NavigationContainer>
        <Provider>
            <Stack.Navigator>
                <Stack.Screen 
                
                  name= "Main" 
                  component = {TabsNavigator} 
                  options = {{headerShown: false}}
                /> 
              
              <Stack.Screen name= "Chat" component= {Chat}/>
              <Stack.Screen name= "SignUp" component= {SignUp} options = {{presentation: 'fullScreenModal'}}/>
              <Stack.Screen name= "SignIn" component= {SignIn} options = {{presentation: 'fullScreenModal'}}/>

            </Stack.Navigator>
        </Provider>
      </NavigationContainer>

  )
}

export default App;
