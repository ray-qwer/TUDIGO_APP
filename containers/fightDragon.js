import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Button } from 'react-native';
import globalStyle from '../styles/globalStyle'
import { Ionicons } from '@expo/vector-icons';


function FightDragon({navigation}){

    const goDragonQuestion = () =>{
        console.log("start");
        // TODO: check if has right
        
        //
        navigation.navigate('FightDragonQuestion')
    }

    return(
        <View style={globalStyle.containerBackground}>
            <View style={globalStyle.container}>
                <View style={style.header}>
                    <View style={style.money}>
                        <Text>money</Text>
                    </View>
                </View>
                <View style={style.body}>
                    <View style={style.fightTitle}>
                        <Text>fighting!!</Text>
                    </View>
                    <View style={style.dragonImage}>
                        <Text>dragonImage</Text>
                    </View>
                </View>
                <View style={style.root}>
                    <Ionicons name="home" size={32} style={globalStyle.HomeIcon} onPress={()=>{navigation.navigate('Home')}}/>
                    <View style={style.startButton}>
                        <Button title="start" onPress={()=>{goDragonQuestion()}}/>
                    </View>
                </View>
            </View>
        </View>
    );
}

const style = StyleSheet.create({
    header:{
        flex:1,
        borderColor:'#000',
        borderWidth:1,
        flexDirection:'row',
    },
    body:{
        flex:6,
        borderColor:'#000',
        borderWidth:1,
        alignItems:"center",
    },
    root:{
        flex:2,
        borderColor:'#000',
        borderWidth:1,
        alignItems:"center"
    },
    startButton:{
        flex:1,
        width:"70%"
    },
    dragonImage:{
        flex:3,
        borderColor:'white',
        borderWidth:10,
        width:"70%",
    },
    fightTitle:{
        flex:1,
        borderColor:'white',
        borderWidth:10,
        width:"70%",
    },
    money:{
        borderColor:'#FFF',
        borderWidth:1,
        marginLeft:10,
        padding:10,
        width:"50%",
    },
})

export default FightDragon;