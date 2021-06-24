import React, { useState } from 'react'
import { StyleSheet, View, ScrollView, TextInput, SafeAreaView, TouchableOpacity, Image, Text, StatusBar } from 'react-native'
import { Ionicons } from '@expo/vector-icons';
import Stories from './Stories'
import { useNavigation } from '@react-navigation/native';

const Music = () => {
    return (
        <SafeAreaView>
            <StatusBar barStyle="light-content" backgroundColor="#0E2A47" />
            <View style={styles.container}>
                <View style={styles.search}>
                    <Ionicons name="musical-notes" color="#46C48A" size={24} />
                    <TextInput style={styles.input} placeholderTextColor = "#FFF" placeholder="Enter to search..." />
                    <Ionicons name="search" color="#F69237" size={24} />
                </View>
                <ScrollView horizontal={true} showsHorizontalScrollIndicator={true}>
                    <View style={styles.stories}>
                        <Stories />
                        <Stories />
                        <Stories />
                        <Stories />
                    </View>
                </ScrollView>
            </View>
                <ScrollView>
                        <View style={styles.songs}>    
                            <Songs />
                            <Songs/>
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


export default Music

const styles = StyleSheet.create({
    container: {
        backgroundColor: "#FFF"
    },
    search: {
        backgroundColor: "#0E2A47",
        marginTop: 10,
        paddingVertical: 5,
        display: "flex",
        justifyContent: 'space-between',
        alignItems: "center",
        borderRadius: 45,
        flexDirection: "row",
        paddingHorizontal: 20,
        color: "white",
        marginLeft: 20,
        marginRight: 20
    },
    input: {
        height: 40,
        flex: 1,
        color: "grey",
        borderRadius: 30,
        paddingLeft: 10,
        color: "white"
    },
    stories: {
        marginTop: 20,
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        flexDirection: "row",
        marginBottom: -20
    },
    songs: {
        marginTop: 20,
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        marginBottom: 280,
        marginRight: 30,
        marginLeft: 30
    },
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
    }
})
