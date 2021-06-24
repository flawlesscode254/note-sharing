import React, { useState } from 'react'
import { StyleSheet, Text, View, TouchableOpacity, ActivityIndicator, TextInput, Image, KeyboardAvoidingView } from 'react-native'
import { Ionicons } from '@expo/vector-icons'
import firebase from 'firebase';
import * as DocumentPicker from 'expo-document-picker';
import db, { store } from '../firebase' 

const Play = () => {
    const [one, setOne] = useState(null)
    const [loading, setLoading] = useState(false);
    const [caption, setCaption] = useState("")

  const pickFile = async () => {
    await DocumentPicker.getDocumentAsync({ type: "image/*" })
    .then(async (file) => {
        setOne(file.uri)
    })
}

const ShowToast = () => {
    ToastAndroid.show("Your post was successfully uploaded", ToastAndroid.LONG)
}

const upload = async () => {
    

    await setLoading(!loading)
    const uri = one;
    const refPath = `posts/${Math.random().toString(36)}`;

    const response = await fetch(uri);
    const blob = await response.blob();

    try {
        const storeRef = store.ref(refPath)
        await storeRef.put(blob)
        await storeRef.getDownloadURL().then(url => {
            db.collection("posts").add({
                username: "Duncan",
                file: url,
                caption: caption,
                profile: "https://cdn.motor1.com/images/mgl/mrz1e/s1/coolest-cars-feature.jpg",
                likes: 0,
                comments: 0,
                time: firebase.firestore.FieldValue.serverTimestamp()
            })
        })
    } catch (error) {
        console.log(error);
    }
        await setOne(null)
        await setCaption("")
        await setLoading(loading)
        await ShowToast()
}


  return (
      <View style={styles.container}>
        <KeyboardAvoidingView style={{
          display:"flex",
          justifyContent: "center",
          alignItems: "center"
        }} behavior="padding">
          <View style={{
            width: 280,
            height: 280,
            borderRadius: 12,
            backgroundColor: "#FFF"
          }}>
            <Image style={{
              width: 280,
              height: 280,
              borderRadius: 12
            }} source={{ uri: one }} />
          </View>
        
          <TouchableOpacity onPress={pickFile} style={{
              marginBottom: 20,
              marginTop: 20
          }}>
            <Ionicons name="add-circle-outline" size={60} color="#F69237" />
          </TouchableOpacity>
          <TextInput value={caption} onChangeText={(text) => setCaption(text)} style={{
            backgroundColor: "#FFF",
            width: 300,
            borderRadius: 12,
            paddingHorizontal: 20,
            marginBottom: 20
          }} placeholder="Add a caption" multiline={true} numberOfLines={4} />
            {one ? (
                <TouchableOpacity onPress={upload} style={{
                    paddingHorizontal: 50,
                    paddingVertical: 10,
                    backgroundColor: "yellow",
                    marginBottom: 20,
                    borderRadius: 45
                }}>
                    {loading ? <ActivityIndicator color="black" size="small" /> : <Text style={{
                        fontWeight: "bold"
                    }}>Upload 🚀🚀🚀</Text>}
                    
                </TouchableOpacity>
            ) : (
                console.log("Empty")
            )}
            <View height={100} />
            </KeyboardAvoidingView>
    </View>
  )
}

export default Play

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#241332",
    flex: 1,
    display: "flex",
    alignItems: "center",
    justifyContent: "center"
  }
})
