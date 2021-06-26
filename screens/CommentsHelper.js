import React from 'react'
import { StyleSheet, Text, View } from 'react-native'

const CommentsHelper = ({ name, comment, time }) => {
    return (
        <View>
            <View style={styles.reciever}>
                <Text style={{ color: "orange" }}>{name}</Text>
                <Text style={styles.recieverText}>{comment}</Text>
                <Text style={{ color: "#E9446A" }}>{new Date(time?.toDate()).toDateString()} <Text style={{color: "white"}}>{new Date(time?.toDate()).toLocaleTimeString()}</Text></Text>
            </View>
        </View>
    )
}

export default CommentsHelper

const styles = StyleSheet.create({
    reciever: {
        padding: 15,
        backgroundColor: "#2b68e6",
        alignSelf: "flex-start",
        borderRadius: 20,
        margin: 15,
        maxWidth: "80%",
        position: "relative",
      },
      recieverText: {
        color: "white",
        fontWeight: "500",
        marginLeft: 10,
        marginBottom: 15,
      }
})