import React, {useState} from 'react';
import {Text, View} from 'react-native';
import { TextInput, Button, Subheading } from 'react-native-paper';
import firebase from '@react-native-firebase/app';
import { useNavigation } from '@react-navigation/native';

const SignIn = () => {

  
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState("");

    const navigation = useNavigation()

    const signIn = async () => {

        setIsLoading(true);

        try{
            
            await firebase.auth().signInWithEmailAndPassword(email, password);
            navigation.popToTop();
        
        }
        catch (e) {
            setIsLoading(false);
            setError(e.message);
            //alert(e.message);
        }
    };

    return(

        <View style= {{margin: 24}}>

            { !!error && (<Subheading 
                style= {{color: 'red', textAlign: 'center', marginBottom: 16 }}
            >        
                {error}
            </Subheading> 
            
            )}

           

            <TextInput 
                label= "E-mail" 
                style = {{marginTop: 16}}  
                value={email}
                onChangeText= {(text) => setEmail(text)}  
                keyboardType = "email-address"  
            />

            <TextInput 
                label = "Password" 
                style = {{marginTop: 16}}
                value={password}
                onChangeText= {(text) => setPassword(text)}   
                secureTextEntry 
            />
        
            <View style = {{ flexDirection: 'row', justifyContent: 'space-between', marginTop: 32}}>
            
                <Button mode="outlined" onPress= {() => navigation.navigate("SignUp")}>Sign Up</Button>
            
            
                <Button 
                    mode= "contained" 
                    onPress = { () => signIn() } 
                    loading = { isLoading }
                > 
                    Sıgn In

                </Button>
            </View>
        </View>

    )
};

export default SignIn;