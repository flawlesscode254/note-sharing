import React, { useState, useEffect } from 'react'
import { StyleSheet, Text, View, ScrollView, TouchableOpacity, ImageBackground, Dimensions, Image, SafeAreaView } from 'react-native'
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from "expo-linear-gradient";

import db from '../firebase'


const h = Dimensions.get("window").height;

const Profile = () => {
    
    // const [data, setData] = useState([])

    // useEffect(() => {
    //     db.collection("songs").orderBy("time", 'desc').onSnapshot((snapshot) => {
    //         setData(snapshot.docs.map( doc => ({
    //             id: doc.id,
    //             songName: doc.data().songName,
    //             artistName: doc.data().artistName
    //         })))
    //     })
    // }, [])

    return (
        <SafeAreaView style={{
            backgroundColor: "#FFF"
        }}>
        <View
            style={{
                backgroundColor: "#241332"
            }}
        >
        <ImageBackground
        source={{ uri: "https://images.unsplash.com/photo-1600119692885-8b04faa7f329?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=749&q=80" }}
        style={{
          height: 0.30 * h,
        }}
      >
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            paddingHorizontal: 20,
            marginTop: 60,
            alignItems: "center",
          }}
        >
            <TouchableOpacity style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                backgroundColor: "gray",
                width: 35,
                height: 35,
                borderRadius: 999
            }}>
                <Ionicons name="arrow-back" color="#FFF" size={24} />
            </TouchableOpacity>
            <TouchableOpacity style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                backgroundColor: "gray",
                width: 35,
                height: 35,
                borderRadius: 999
            }}>
            <Ionicons name="log-out-outline" color="#FFF" size={24} />
            </TouchableOpacity>
        </View>
        <LinearGradient
          colors={["rgba(36,19,50,1)", "transparent"]}
          style={{
            transform: [{ rotate: "180deg" }],
            position: "absolute",
            left: 0,
            right: 0,
            bottom: 0,
            zIndex: 1,
            height: 0.16 * h,
          }}
        >
        </LinearGradient>
      </ImageBackground>
      
      </View>
       <ScrollView>
            <View style={styles.songs}>    
                <Songs />
                <Songs />
            </View>
      </ScrollView>
      </SafeAreaView>
    )
}

const Songs = () => {

    return (
        <View style={styles.main}>
            <Image source={require('../assets/photo.png')} style={{
                width: 30,
                height: 30,
                borderRadius: 999,
                marginRight: 20,
                marginLeft: 20
            }} />
            <View style={{
                marginRight: 20
            }}>
                <Text style={{
                    color: "#FFF"
                }}>Duncan Kipkemoi</Text>
                <Text style={{
                    color: "#FFF",
                    marginTop: 10
                }}>Thursday, June 24 9:39:43 PM</Text>
                <Text style={{
                    color: "#FFF",
                    marginTop: 10
                }}>
                    Lorem ipsum dolor sit amet consectetur adipisicing 
                    elit. Rerum, neque necessitatibus. Mollitia expedita 
                    ex nostrum atque iste.
                </Text>
                <Image style={{
                    width: 250,
                    height: 250,
                    marginTop: 10
                }} source={{ uri: "https://cdn.motor1.com/images/mgl/mrz1e/s1/coolest-cars-feature.jpg" }} />
                <View style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    marginTop: 10,
                    flexDirection: "row",
                    paddingHorizontal: 20,
                    backgroundColor: "gray",
                    borderRadius: 15,
                    paddingVertical: 5
                }}>
                    <TouchableOpacity style={{
                        backgroundColor: "#0E2A47",
                        padding: 5,
                        borderRadius: 999
                    }}>
                        <Ionicons name="heart-outline" size={30} color="#FFF" />
                    </TouchableOpacity>
                    <TouchableOpacity style={{
                        backgroundColor: "#0E2A47",
                        padding: 5,
                        borderRadius: 999
                    }}>
                        <Ionicons name="chatbubble-outline" size={30} color="#FFF" />
                    </TouchableOpacity>
                    <TouchableOpacity style={{
                        backgroundColor: "#0E2A47",
                        padding: 5,
                        borderRadius: 999
                    }}>
                        <Ionicons name="download-outline" size={30} color="#FFF" />
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    )
}


export default Profile

const styles = StyleSheet.create({
    main: {
        backgroundColor: "#0E2A47",
        marginTop: 10,
        marginBottom: 10,
        paddingVertical: 5,
        display: "flex",
        justifyContent: 'space-between',
        alignItems: "center",
        borderRadius: 12,
        flexDirection: "row",
        color: "white",
        marginLeft: 20,
        marginRight: 20,
        paddingVertical: 10
    },
    songs: {
        marginTop: 20,
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        marginBottom: 230,
        marginRight: 30,
        marginLeft: 30
    }
})
