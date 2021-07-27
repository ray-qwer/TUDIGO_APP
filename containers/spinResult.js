
import {useEffect, useState, useContext } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, AsyncStorage, Image } from 'react-native';
import globalStyle from '../styles/globalStyle'
import { Ionicons } from '@expo/vector-icons';
import AppContext from '../utils/ReducerContext'
import imageReq from '../utils/images'

function SpinResult({navigation}){
    const [rewardSrc, setRewardSrc ] = useState()
    const totalPet = 12;
    const userSettings = useContext(AppContext)
    useEffect(()=>{
        const saveData = async() =>{
            // random 
            // number(1: water, 2: fire, 3: tree, 0: first egg)
            let attribute = Math.ceil(Math.random()*3)
            let index = userSettings.petList.findIndex(ele => ele.id === 0 && ele.attribute === attribute)
            if (index === -1){
                let src;
                if(attribute === 1) src = 'ew'
                else if (attribute === 2) src = 'ef'
                else src = 'et'
                let p = {
                    id: number,
                    source: src,
                    level:  0,
                    attribute: attribute,
                    identity:{
                        attack:     0,
                        defend:     0,
                        recover:    0,
                    },
                    amount: 0, // only for eggs
                }
                userSettings.petList.push(p)
                setRewardSrc(imageReq[src])
                await AsyncStorage.setItem('petList',JSON.stringify(userSettings.petList))
                return
            }
            else{
                userSettings.petList[index].amount +=1
                setRewardSrc(imageReqp[userSettings.petList[index].source])
                await AsyncStorage.setItem('petList',JSON.stringify(userSettings.petList))
                return
            }

            // let RId = Math.ceil(Math.random()*totalPet)
            // console.log(RId)
            // setReward(RId)
            // let tmpData;
            // try{
            //     tmpData = await (AsyncStorage.getItem('petOwn'))
            //     if (tmpData !== null) 
            //         tmpData = JSON.parse(tmpData)
            //     else tmpData = []
            // } catch(e) {
            //     console.log(e)
            // }
            // // TODO: change the source given by id
            // tmpData.push({id:RId,source:"unlockedPet"})
            // await AsyncStorage.setItem( 'petOwn' , JSON.stringify(tmpData))
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
                        <Image style={{height:'100%',width:'100%'}} source={rewardSrc}
                            resizeMode='center'/>
                    </View>
                </View>
                <Ionicons name="home" size={32} style={globalStyle.HomeIcon} onPress={()=>{navigation.navigate('Home')}}/>
            </View>
        </View>
    );
}

const style = StyleSheet.create({
    header:{
        flex:1,
        justifyContent:'flex-end',
        // alignItems:"center",
        padding:10
    },
    body:{
        flex:5,
        alignItems:'center',
        padding:20,
        justifyContent:'flex-start'
    },
    title:{
        textAlign:"center",
        fontWeight:"bold",
        fontSize:32
    },
    eggWindow:{
        width:"90%",
        height:"80%",
    }
})

export default SpinResult;