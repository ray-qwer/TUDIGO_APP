
import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import globalStyle from '../styles/globalStyle'
import { Ionicons } from '@expo/vector-icons';


function SpinResult({navigation}){
    return(
        <View style={globalStyle.containerBackground}>
            <View style={globalStyle.container}>
                <View style={style.header}>
                    <Text style={style.title}>轉蛋結果</Text>                
                </View>
                <View style={style.body}>
                    <View style={style.eggWindow}>
                    
                    </View>
                </View>
                <Ionicons name="home" size={32} style={globalStyle.HomeIcon} onPress={()=>{navigation.navigate('Home')}}/>
            </View>
        </View>
    );
}

const style = StyleSheet.create({
    header:{
        flex:2,
        justifyContent:"center",
        // alignItems:"center",
        padding:10
    },
    body:{
        flex:5,
        alignItems:"center",
        padding:20,
    },
    title:{
        textAlign:"center",
        fontWeight:"bold",
        fontSize:32
    },
    eggWindow:{
        width:"70%",
        height:"70%"
    }
})

export default SpinResult;