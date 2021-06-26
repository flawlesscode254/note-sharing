import React, { useState, useEffect } from 'react'
import { StyleSheet, Modal, View, ScrollView, TextInput, SafeAreaView, TouchableOpacity, Image, Text, StatusBar } from 'react-native'
import { Ionicons } from '@expo/vector-icons';
import Stories from './Stories'
import db, { auth } from '../firebase';
import * as FileSystem from 'expo-file-system';
import * as Permissions from 'expo-permissions';
import * as MediaLibrary from 'expo-media-library';

const Music = () => {
    const [data, setData] = useState([])

    useEffect(() => {
        db.collection("posts").orderBy("time", 'desc').onSnapshot((snapshot) => {
            setData(snapshot.docs.map( doc => ({
                id: doc.id,
                username: doc.data().username,
                profile: doc.data().profile,
                time: doc.data().time,
                caption: doc.data().caption,
                file: doc.data().file,
                title: doc.data().title
            })))
        })
    }, [])

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
                            {data.map(({ id, profile, username, time, caption, file, title }) => (
                                <Songs
                                    key={id}
                                    identifier={id}
                                    profile={profile}
                                    username={username}
                                    time={time}
                                    caption={caption}
                                    file={file}
                                    title={title}
                                />
                            ))}
                        </View>
                </ScrollView>
        </SafeAreaView>
    )
}

const Songs = ({ profile, username, time, caption, file, title }) => {
    const [iname, setIname] = useState("download-outline")
    const [col, setCol] = useState("#FFF")
    const [modalVisible, setModalVisible] = useState(false);

    const download = async () => {
        const perm = await Permissions.askAsync(Permissions.MEDIA_LIBRARY);
        if (perm.status != 'granted') {
            return;
        }
        else {
        try {
            await console.log("starting download")
            await setIname("cloud-download-outline")
            await setCol("#46C48A")
            const downloadResumable = FileSystem.createDownloadResumable(
                file,
                FileSystem.documentDirectory + title
            );
            const { uri } = await downloadResumable.downloadAsync();
            const asset = await MediaLibrary.createAssetAsync(uri);
            const album = await MediaLibrary.getAlbumAsync('Images');
            if (album == null) {
                await MediaLibrary.createAlbumAsync('Images', asset, false);
                await setIname("checkmark")
                await setCol("red")             
            } else {
                await MediaLibrary.addAssetsToAlbumAsync([asset], album, false);
                await setIname("checkmark")
                await setCol("red")       
            }
          } catch (e) {
            console.log(e)
          }
        }
    }
    

    return (
        <View style={styles.main}>
             <View style={styles.centeredView}>
                <Modal
                    animationType="slide"
                    transparent={true}
                    visible={modalVisible}
                    onRequestClose={() => {
                    Alert.alert("Modal has been closed.");
                    setModalVisible(!modalVisible);
                    }}
                >
                    <View style={styles.centeredView}>
                    <View style={styles.modalView}>
                            <Image  style={styles.image} source={{ uri: profile }} />
                        <TouchableOpacity style={{
                            backgroundColor: "blue",
                            marginTop: 5,
                            marginBottom: 5,
                            paddingHorizontal: 20,
                            borderRadius: 999
                        }} onPress={() => setModalVisible(!modalVisible)}>
                                <Text style={styles.textStyle}>X</Text>
                        </TouchableOpacity>
                    </View>
                    </View>
                </Modal>
            </View>
            <TouchableOpacity onPress={() => setModalVisible(true)}>
                <Image source={{ uri: profile }} style={{
                    width: 30,
                    height: 30,
                    borderRadius: 999,
                    marginRight: 20,
                    marginLeft: 20
                }} />
            </TouchableOpacity>
            <View style={{
                marginRight: 20
            }}>
                <Text style={{
                    color: "#FFF"
                }}>{username}</Text>
                <Text style={{
                    color: "#FFF",
                    marginTop: 10
                }}>{new Date(time?.toDate()).toDateString() + ' ' + ' '} <Text style={{color: "green"}}>{new Date(time?.toDate()).toLocaleTimeString()}</Text></Text>
                <Text style={{
                    color: "#FFF",
                    marginTop: 10
                }}>
                    {caption}
                </Text>
                <Image style={{
                    width: 250,
                    height: 250,
                    marginTop: 10
                }} source={{ uri: file }} />
                <View style={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    marginTop: 10,
                    flexDirection: "row",
                    paddingHorizontal: 20,
                    backgroundColor: "gray",
                    borderRadius: 15,
                    paddingVertical: 5
                }}>

                        <View style={{
                            display: "flex",
                            justifyContent: "center",
                            alignItems: "center"
                        }}>
                            <TouchableOpacity onPress={download} style={{
                                backgroundColor: "#0E2A47",
                                padding: 5,
                                borderRadius: 999
                            }}>
                                <Ionicons name={iname} size={30} color={col} />
                            </TouchableOpacity>
                            <Text style={{
                                textAlign: "center",
                                color: "#FFF",
                                marginTop: 4
                            }}>download</Text>
                        </View>
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
        marginBottom: 275,
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
    },
    centeredView: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        marginTop: 22
    },
    modalView: {
        margin: 20,
        backgroundColor: "white",
        borderRadius: 20,
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        width: 300,
        alignItems: "center",
        shadowColor: "#000",
        shadowOffset: {
          width: 0,
          height: 2
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5
    },
    modalText: {
        marginBottom: 15,
        textAlign: "center"
    },
    textStyle: {
        color: "white",
        fontWeight: "bold",
        textAlign: "center"
    },
    image: {
        width: 280,
        height: 280,
        borderRadius: 12,
        marginTop: 10
    }
})