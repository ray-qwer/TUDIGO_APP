import React, {useState,useEffect,useContext } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, TouchableHighlight, AsyncStorage,Image } from 'react-native';
import globalStyle from '../styles/globalStyle'
import { Ionicons } from '@expo/vector-icons';
import AppContext from '../utils/ReducerContext'
import { CoinIcon } from './littleCom';
import imageReq from '../utils/images'

function Daily({ route, navigation}){
    const { pet } = route.params;
    const [topic,setTopic] = useState("今天有吃蔬菜嗎")
    const [idealAns, setIdealAns] = useState(true)
    const [submit,setSubmit] = useState(false)
    const [suc,setSuc] = useState(false)
    const userSettings = useContext(AppContext)
    // const [petImage,setPetImage] = useState(require('../image/pets/tree/T4.png'))
    const checkSuc = async(ans) =>{
        setSubmit(true)
        if(ans === idealAns){
            setSuc(true)
            // reward
            userSettings.setMoney(userSettings.money+10)
            // set done time
            await AsyncStorage.setItem('DailyDone',Date.now().toString())
        }
        else   setSuc(false)
    }
    return(
        <View style={globalStyle.containerBackground}>
            <View style={globalStyle.container}>
                <View style={style.dailyChallenge}>

                </View>
                <View style={style.header}>
                    <View style={globalStyle.money}>
                        <CoinIcon/>
                        <Text style={globalStyle.moneyText}>{userSettings.money}</Text>
                    </View>
                </View>
                <View style={style.body}>
                    <View style={style.showPet}>
                        <Image style={{height:'100%',width:'100%'}}source={imageReq[pet.source]}
                            resizeMode='center'/>
                    </View>
                </View>
                <View style={style.root}>
                    <View style={style.question}>
                        {submit?(suc?(<Text style={{...style.questionText,top:30}}>挑戰成功</Text>):(
                        <Text style={{...style.questionText,top:30}}>挑戰失敗</Text>)):(
                            <><Text style={style.questionText}>{topic}</Text>
                            <View style={style.btnBlock}>
                                <TouchableHighlight style={style.btn} onPress={()=>{checkSuc(true)}} underlayColor="#918070">
                                    <Text style={style.btnText}>是</Text>
                                </TouchableHighlight>
                                <TouchableHighlight style={style.btn} onPress={()=>{checkSuc(false)}} underlayColor="#918070">
                                    <Text style={style.btnText}>否</Text>
                                </TouchableHighlight>
                            </View>
                            </>
                        )}
                    </View>
                </View>
            </View>
            <Ionicons name="home" size={32} style={globalStyle.HomeIcon} onPress={()=>{navigation.navigate('Home')}}/>

        </View>
    );
}

const style = StyleSheet.create({
    header:{
        flex:1,
        flexDirection:'row',
    },
    body:{
        flex:5,
    },
    root:{
        flex:3,
        alignItems:"center"
    },
    showPet:{
        height:"70%",
        width:"70%",
        left:"15%",
        bottom:"0%",
        position:"absolute",
    },
    dailyChallenge:{
        position:'absolute',
        height:150,
        width:150,
        right:10,
        top:10,
        borderColor:'white',
        borderWidth:10,
    },
    question:{
        flex:1,
        width:"70%",
    },
    questionText:{
        fontSize:32,
        textAlign:'center',
        fontWeight:'bold'
    },
    btnBlock:{
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
})

export default Daily;