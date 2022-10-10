import React, {useState} from 'react';
import {Text, View} from 'react-native';
import { TextInput, Button, Subheading } from 'react-native-paper';
import firebase from '@react-native-firebase/app';
import { useNavigation } from '@react-navigation/native';

const SignUp = () => {

    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState("");

    const navigation = useNavigation()

    const createAccount = async () => {

        setIsLoading(true);

        try{
            const response = await firebase
            .auth()
            .createUserWithEmailAndPassword(email, password);
    
            await response.user.updateProfile({displayName: name});

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
                label = "Name" 
                value={name}
                onChangeText= {(text) => setName(text)}    
            />

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
            
                <Button mode="outlined" onPress= {() => navigation.navigate("SignIn")}>Sign In</Button>
            
            
                <Button 
                    mode= "contained" 
                    onPress = { () => createAccount() } 
                    loading = { isLoading }
                > 
                    Sıgn Up

                </Button>
            </View>
        </View>

    )
};

export default SignUp;