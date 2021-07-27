import React,{ useEffect,useState,useContext } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, BackHandler, TouchableHighlight, AsyncStorage, Image } from 'react-native';
import globalStyle from '../styles/globalStyle'
import { Ionicons } from '@expo/vector-icons';
import AppContext from '../utils/ReducerContext'
import { CoinIcon } from './littleCom'

function DragonResult({route,navigation}){
    
    const {Result} = route.params
    const userSettings = useContext(AppContext)
    const [chance, setChance] = useState(0)
    useEffect(() => {
        const backHandler = BackHandler.addEventListener("hardwareBackPress", ()=>{navigation.navigate('FightDragon');return true});
        return () =>backHandler.remove();
    },[]);

    useEffect (()=>{
        const fetchLocalData = async() =>{
            let chanceToday = await AsyncStorage.getItem('@fightDragon/chance')
            if ( chanceToday === null ){
                await AsyncStorage.setItem('@fightDragon/chance',3)
                return
            }
            setChance(chanceToday)
        }
        fetchLocalData()
    },[])

    return(
        <View style={globalStyle.containerBackground}>
            <View style={globalStyle.container}>
                <View style={style.header}>
                    <View style={globalStyle.money}>
                        {/* show money */}
                        <CoinIcon/>
                        <Text style={globalStyle.moneyText}>{userSettings.money}</Text>
                    </View>
                </View>
                <View style={style.body}>
                    <View style={style.title}>
                        <Text style={style.titleText}>{Result?('勇闖成功'):('勇闖失敗')}</Text>
                    </View>
                    <View style={style.showDragon}>
                        {Result?(<Image style={{height:'100%',width:'100%'}}source={require("../image/dragon/d6.png")}
                            resizeMode='center'/>):(<Image style={{height:'100%',width:'100%'}}source={require("../image/dragon/d4.png")}
                        resizeMode='center'/>)}
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
                    <Text style={style.lastTimeText}>本日剩餘次數: {chance}次</Text>
                    <Ionicons name="home" size={32} style={globalStyle.HomeIcon} onPress={()=>{navigation.navigate('Home')}}/>
                </View>
            </View>
        </View>
    );
}

const style = StyleSheet.create({
    header:{
        flex:1,
        flexDirection:'row',
    },
    body:{
        flex:5.5,
        alignItems:'center',
    },
    root:{
        flex:2.5,
        alignItems:'center',
    },
    ifContinueBlock:{
        flex:1,
        width:"70%",
    },
    ifContinueText:{
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
        justifyContent:'center'
    },
    showDragon:{
        width:"80%",
        flex:3,
        borderColor:"black",
    },
    titleText:{
        textAlign:'center',
        fontSize:48,
    }
})

export default DragonResult;