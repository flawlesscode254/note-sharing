import React, { useState, useEffect } from 'react'
import { StyleSheet, ToastAndroid, Text, View, ScrollView, TouchableOpacity, ImageBackground, Dimensions, Image, SafeAreaView } from 'react-native'
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from "expo-linear-gradient";
import db, { auth } from '../firebase';


const h = Dimensions.get("window").height;

const Profile = ({ navigation }) => {
    
    const [data, setData] = useState([])
    const [userProfile, setUserProfile] = useState()

    useEffect(() => {
        (async () => {
            await db.collection("users").where("email", "==", auth?.currentUser?.email).onSnapshot((snapshot) => {
                snapshot.forEach(doc => {
                    setUserProfile(doc.data().image)
                })
            })
            await db.collection("posts").orderBy("time", 'desc').onSnapshot((snapshot) => {
                setData(snapshot.docs.map( doc => ({
                    id: doc.id,
                    username: doc.data().username,
                    profile: doc.data().profile,
                    time: doc.data().time,
                    caption: doc.data().caption,
                    file: doc.data().file,
                    comments: doc.data().comments
                })))
            })
        })()
    }, [])

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
            source={{ uri: "https://images.unsplash.com/photo-1588345921523-c2dcdb7f1dcd?ixid=MnwxMjA3fDB8MHxzZWFyY2h8MXx8d2hpdGV8ZW58MHx8MHx8&ixlib=rb-1.2.1&w=1000&q=80" }}
            style={{
            height: 0.30 * h,
            }}
        >
        <View
          style={{
            flexDirection: "row",
            justifyContent: "flex-end",
            paddingHorizontal: 20,
            marginTop: 60,
            alignItems: "center",
          }}
        >
            <TouchableOpacity onPress={async () => {
                await auth.signOut()
                await navigation.navigate("SignIn")
            }} style={{
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
        <View style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            marginBottom: -20
        }}>
            <Image style={{
                width: 45,
                height: 45,
                borderRadius: 999
            }} source={{ uri: userProfile }} />
        </View>
        <View style={{
            marginTop: 20
        }}>
            <Text style={{
                color: "black",
                textAlign: "center",
                fontSize: 30
            }}>Your Posts</Text>
        </View>
      </ImageBackground>
      
      </View>
       <ScrollView>
            <View style={styles.songs}>    
                {data.map(({ id, profile, username, time, caption, file, comments }) => (
                    <Songs
                        key={id}
                        identifier={id}
                        profile={profile}
                        username={username}
                        time={time}
                        caption={caption}
                        file={file}
                        comments={comments}
                    />
                ))}
            </View>
      </ScrollView>
      </SafeAreaView>
    )
}

const Songs = ({ identifier, profile, username, time, caption, file, comments }) => {

    const show = () => {
        ToastAndroid.show("Your post was successfully deleted!!", ToastAndroid.LONG)
    }

    const take = async () => {
        await db.collection("posts").doc(identifier).delete()
        await show()
    }

    return (
        <View style={styles.main}>
            <Image source={{ uri: profile }} style={{
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
                    justifyContent: "space-between",
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
                            <View style={{
                                backgroundColor: "#0E2A47",
                                padding: 5,
                                borderRadius: 999
                            }}>
                                <Ionicons name="chatbubble-outline" size={30} color="#FFF" />
                            </View>
                            <Text style={{
                                textAlign: "center",
                                color: "#FFF",
                                marginTop: 4
                            }}>{comments}</Text>
                        </View>

                        <View style={{
                            display: "flex",
                            justifyContent: "center",
                            alignItems: "center"
                        }}>
                            <TouchableOpacity onPress={take} style={{
                                backgroundColor: "#0E2A47",
                                padding: 5,
                                borderRadius: 999
                            }}>
                                <Ionicons name="trash-outline" size={30} color="red" />
                            </TouchableOpacity>
                            <Text style={{
                                textAlign: "center",
                                color: "#FFF",
                                marginTop: 4
                            }}>delete</Text>
                        </View>

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
        marginBottom: 235,
        marginRight: 30,
        marginLeft: 30
    }
})
