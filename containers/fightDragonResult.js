import React,{useEffect,useState} from 'react';
import { StyleSheet, Text, View, TouchableOpacity, BackHandler, TouchableHighlight } from 'react-native';
import globalStyle from '../styles/globalStyle'
import { Ionicons } from '@expo/vector-icons';


function DragonResult({route,navigation}){
    
    const {Result} = route.params

    useEffect(() => {
        const backHandler = BackHandler.addEventListener("hardwareBackPress", ()=>{navigation.navigate('FightDragon');return true});
    
        return () =>backHandler.remove();
    },[]);

    return(
        <View style={globalStyle.containerBackground}>
            <View style={globalStyle.container}>
                <View style={style.header}>
                    <View style={style.money}>
                    
                    </View>
                </View>
                <View style={style.body}>
                    <View style={style.title}>
                        {Result?(<></>):(<></>)}
                    </View>
                    <View style={style.showDragon}>
                        {Result?(<></>):(<></>)}
                    </View>
                </View>
                <View style={style.root}>
                    <View style={style.ifContinueBlock}>
                        <Text style={style.ifContinueText}>是否繼續挑戰</Text>
                        <View style={style.ifContinueBtnBlock}>
                            <TouchableHighlight style={style.btn} onPress={()=>{navigation.navigate("FightDragon")}} underlayColor="#918070">
                                <Text style={style.btnText}>是</Text>
                            </TouchableHighlight>
                            <TouchableHighlight style={style.btn} onPress={()=>{navigation.navigate('Home')}} underlayColor="#918070">
                                <Text style={style.btnText}>否</Text>
                            </TouchableHighlight>
                        </View>
                    </View>
                    <Text style={style.lastTimeText}>本日剩餘次數</Text>
                    <Ionicons name="home" size={32} style={globalStyle.HomeIcon} onPress={()=>{navigation.navigate('Home')}}/>
                </View>
            </View>
        </View>
    );
}

const style = StyleSheet.create({
    header:{
        flex:1,
        borderColor:'black',
        borderWidth:1,
        flexDirection:'row',
    },
    body:{
        flex:5,
        borderColor:'black',
        borderWidth:1,
        alignItems:'center',
    },
    root:{
        flex:3,
        borderColor:'black',
        borderWidth:1,
        alignItems:'center',
    },
    money:{
        borderColor:'#FFF',
        borderWidth:1,
        marginLeft:10,
        padding:10,
        width:"50%",
    },
    ifContinueBlock:{
        flex:1,
        width:"70%",
    },
    ifContinueText:{
        // margin:10,
        fontSize:32,
        textAlign:'center',
        fontWeight:'bold'
    },
    ifContinueBtnBlock:{
        justifyContent:'space-around',
        flexDirection:'row',
    },
    btn:{
        margin:20,
        borderColor:"brown",
        borderWidth:2,
        padding:5,
        borderRadius:10
    },
    btnText:{
        fontSize:32
    },
    lastTimeText:{
        position:'absolute',
        bottom:20,
        right:20,
        textAlign:'right',
        fontSize:20
    },
    title:{
        width:"70%",
        flex:1,
        borderColor:"black",
        borderWidth:1,
    },
    showDragon:{
        width:"70%",
        flex:3,
        borderColor:"black",
        borderWidth:1,
    }
})

export default DragonResult;