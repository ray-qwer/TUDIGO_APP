import React,{useState} from 'react';
import { StyleSheet, Text, View, TouchableOpacity,Image, TouchableWithoutFeedback } from 'react-native';
import globalStyle from '../styles/globalStyle'
import { Ionicons } from '@expo/vector-icons';


function SpinPage({navigation}){
    
    const goSpinResult = () =>{
        navigation.navigate("SpinResult")
    }

    return(
        <View style={globalStyle.containerBackground}>
            <View style={globalStyle.container}>
                <View style={style.header}>
                    <View style={style.money}>
                        <Text>money</Text>
                    </View>
                    {/* <Text style={style.headerTitle}>SPIN EGG!</Text> */}
                </View>
                <View style={style.body}>
                    <View style={style.eggWindow}>
                        <TouchableWithoutFeedback onPress={()=>{goSpinResult()}}>
                            <Image 
                                source={require('../image/egg_example.png')}
                                style={style.egg}
                                resizeMode='cover'
                                />
                        </TouchableWithoutFeedback>
                    </View>
                    <View style={style.price}>
                        <Text>Price</Text>
                    </View>
                </View>
                <View style={style.root}>
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
        flex:7,
        borderColor:'black',
        borderWidth:1,
        alignItems:'center',
    },
    root:{
        flex:1,
        borderColor:'black',
        borderWidth:1,
    },
    money:{
        borderColor:'#FFF',
        borderWidth:1,
        marginLeft:10,
        padding:10,
        width:"50%",
    },
    price:{
        flex:2,
        width:"70%",
        borderWidth:1,
        borderColor:'white',
    },
    eggWindow:{
        flex:5,
        width:"70%",
        justifyContent:"flex-end",
        borderWidth:1,
        borderColor:'white',
    },
    egg:{
        height:"90%",
        width:"100%",
        // backgroundColor:"coral",
        borderWidth:1,
        borderColor:'white',
    }
})

export default SpinPage;