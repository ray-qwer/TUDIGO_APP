
import React, {useEffect, useState } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, AsyncStorage } from 'react-native';
import globalStyle from '../styles/globalStyle'
import { Ionicons } from '@expo/vector-icons';

// object:{
//     pet:{
//         id: number,
//         source: string,
//         level:  number,
//         attribute:   number(0: water, 1: fire, 2: gress)
//         identity:{
//             attack:     number,
//             defend:     number,
//             recover:    number,
//         },
//         unlock: bool,
//     }
// }

function SpinResult({navigation}){
    const [rewardId, setRewardId ] = useState(0)
    const totalPet = 12;
    useEffect(()=>{
        const saveData = async() =>{
            let RId = Math.ceil(Math.random()*totalPet)
            console.log(RId)
            setRewardId(RId)
            let tmpData;
            try{
                tmpData = await (AsyncStorage.getItem('petOwn'))
                if (tmpData !== null) 
                    tmpData = JSON.parse(tmpData)
                else tmpData = []
            } catch(e) {
                console.log(e)
            }
            // TODO: change the source given by id
            tmpData.push({id:RId,source:"unlockedPet"})
            await AsyncStorage.setItem( 'petOwn' , JSON.stringify(tmpData))
        }
        saveData()
    },[])

    return(
        <View style={globalStyle.containerBackground}>
            <View style={globalStyle.container}>
                <View style={style.header}>
                    <Text style={style.title}>轉蛋結果</Text>                
                </View>
                <View style={style.body}>
                    <View style={style.eggWindow}>
                        <Text>reward: {rewardId}</Text>
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