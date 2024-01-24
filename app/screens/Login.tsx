import {View, Text, Image,StyleSheet, TextInput, ActivityIndicator, Button} from 'react-native';
import React, { useState } from 'react';
import {FIREBASE_AUTH} from '../../FirebaseConfig';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const auth = FIREBASE_AUTH;

    const signIn = async () => {
        setLoading(true);
        try {
            const response = await signInWithEmailAndPassword(auth, email, password);

        } catch (error:any) {
            console.log(error);
            alert("Sign in failed: " + error.message);
        }
        finally {
            setLoading(false);
        }
    }


    const signUp = async () => {
        setLoading(true);
        try {
            const response = await createUserWithEmailAndPassword(auth, email, password);
            console.log(response);
            alert('Check your email for further instructions');
        } catch (error:any) {
            console.log(error);
            alert("Sign in failed: " + error.message);
        }
        finally {
            setLoading(false);
        }
    }



    return (
       
        <View style={styles.container}>
        <Image source={require("../../assets/iot-logo.png")} style={{ width: 100, height: 100, position:'absolute', top:170}} />

        <TextInput value={email} style={styles.input} placeholder="Email" autoCapitalize="none" 
        onChangeText={(text)=>setEmail(text)}></TextInput>
        <TextInput secureTextEntry={true} value={password} style={styles.input} placeholder="Password" autoCapitalize='none' onChangeText={(text)=>setPassword(text)}></TextInput>
        {loading ? <ActivityIndicator size="large" color="#0000ff" /> : <>
        <Button  title="Login" onPress={signIn}></Button>
        <Button title="Sign Up" onPress={signUp}></Button>
        </>}
        </View>
    );
    }
    export default Login;


    const styles = StyleSheet.create({
        container: {
            flex: 1,
            backgroundColor: '#fff',
            alignItems: 'center',
            justifyContent: 'center'
        },
        input: {
            width: 300,
            height: 40,
            borderWidth: 1,
            padding: 10,
            margin: 5,
            borderRadius: 5,
            borderColor: 'gray'
        }


        

    });