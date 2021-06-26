import React, { useState, useEffect } from 'react'
import { StyleSheet, ActivityIndicator, Text, View, TextInput, TouchableOpacity, Platform, Image, KeyboardAvoidingView } from 'react-native'
import db, { auth, store } from '../firebase'
import { AntDesign } from '@expo/vector-icons'
import * as ImagePicker from 'expo-image-picker'

const SignupScreen = ({ navigation }) => {

    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [error, setError] = useState(null)
    const [profile, setProfile] = useState(null)
    const [loading, setLoading] = useState(false);

    const handleUpload = async () => {
        const uri = profile;
        const refPath = `profiles/${Math.random().toString(36)}`;

        const response = await fetch(uri);
        const blob = await response.blob();

        try {
            const storeRef = store.ref(refPath)
            await storeRef.put(blob)
            await storeRef.getDownloadURL().then(url => {
                db.collection("users").add({
                    name: name,
                    email: email,
                    image: url
                })
            })
        } catch (error) {
            console.log(error);
        }
        setProfile(null)
    }

    const handleSignUp = async () => {
        await setLoading(!loading);
        await auth.createUserWithEmailAndPassword(email, password)
        .then( async (authUser) => {
          await authUser.user.updateProfile({
            displayName: name
          });
          
          await setName('')
          await setEmail('')
          await setPassword('')
          await setProfile('')
          await handleUpload()
          await setLoading(loading);
          await navigation.navigate("Main")
        })
        .catch(async (error) => {
            await setLoading(loading)
            await setError(error.message)
        }
        );
    }

    const SignIn = () => {
        navigation.navigate("SignIn")
    }

    useEffect(() => {
        (async () => {
          if (Platform.OS !== 'web') {
            const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
            if (status !== 'granted') {
              alert('Sorry, we need camera roll permissions to make this work!');
            }
          }
        })();
      }, []);

    const addProfilePhoto = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.All,
            allowsEditing: true,
            aspect: [4, 3],
            quality: 1,
          });

          if (!result.cancelled) {
            setProfile(result.uri);
          }
    }

    

    return (
        <KeyboardAvoidingView behavior="padding" style={styles.container}>
            <View style={{width: 300}}>
            <Text style={styles.greeting}>
                Sign Up to get started!
            </Text>

            <View style={styles.errorMessage}>
                {error && <Text style={styles.error}>{error}</Text>}
            </View>

            <TouchableOpacity onPress={addProfilePhoto} style={styles.profilePhotoContainer}>
                {profile ? (
                    <Image style={styles.prof} source={{uri: profile}} />
                ) : (
                    <View style={styles.defaultProfilePhoto}>
                        <AntDesign name="camera" size={24} color="black" />
                    </View>
                )}
            </TouchableOpacity>

            <View style={styles.form}>
                <View style={{marginTop: 32}}>
                    <Text style={styles.inputTitle}> 📛  Full Names</Text>
                    <TextInput style={styles.input} autoCapitalize="none" value={name} onChangeText={(text) => setName(text)}></TextInput>
                </View>

                <View style={{marginTop: 32}}>
                    <Text style={styles.inputTitle}> 📧  Email Address</Text>
                    <TextInput style={styles.input} autoCapitalize="none" value={email} onChangeText={(text) => setEmail(text)}></TextInput>
                </View>

                <View style={{marginTop: 32}}>
                    <Text style={styles.inputTitle}> 🔑  Password</Text>
                    <TextInput style={styles.input} secureTextEntry autoCapitalize="none" value={password} onChangeText={(text) => setPassword(text)}></TextInput>
                </View>
            </View>

            <TouchableOpacity onPress={handleSignUp} style={styles.button}>
            {loading ? <ActivityIndicator color="#ffffff" size="small" /> : <Text style={{color: "#FFF", fontWeight: "500"}}>Sign Up 😃</Text> }
            </TouchableOpacity>

            <TouchableOpacity onPress={SignIn} style={{alignSelf: "center", marginTop: 32}}>
                    <Text style={{color: "#414959", fontSize: 13}}>
                        Already have an account? 
                        <Text style={{fontWeight: "500", color: "#E9446A"}}>
                            Sign In
                        </Text> 
                    </Text>
            </TouchableOpacity>
            </View>
        </KeyboardAvoidingView>
    )
}

export default SignupScreen

const styles = StyleSheet.create({
    container: {
        backgroundColor: "#FFFFFF",
        flex: 1,
        display: "flex",
        alignItems: "center",
        justifyContent: "center"
    },
    greeting: {
        marginTop: 40,
        fontSize: 18,
        fontWeight: "400",
        textAlign: "center"
    },
    errorMessage: {
        height: 72,
        alignItems: "center",
        justifyContent: "center",
        marginHorizontal: 30
    },
    form: {
        marginBottom: 48,
        marginHorizontal: 30
    },
    inputTitle: {
        color: "#8A8F9E",
        fontSize: 10,
        textTransform: "uppercase"
    },
    input: {
        borderBottomColor: "#8A8F9E",
        borderBottomWidth: StyleSheet.hairlineWidth,
        height: 40,
        fontSize: 15,
        color: "#161F3D"
    },
    button: {
        marginHorizontal: 30,
        backgroundColor: "#E9446A",
        borderRadius: 4,
        height: 52,
        alignItems: "center",
        justifyContent: "center"
    },
    error: {
        color: "#e9446A",
        fontSize: 13,
        fontWeight: "600",
        textAlign: 'center'
    },
    profilePhotoContainer: {
        backgroundColor: "#e1e2e6",
        width: 80,
        height: 80,
        borderRadius: 40,
        alignSelf: "center",
        marginTop: 16,
        overflow: "hidden"
    },
    defaultProfilePhoto: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center"
    },
    prof: {
        flex: 1
    }
})