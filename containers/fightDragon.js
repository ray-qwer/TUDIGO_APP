import React,{ useState, useContext, useEffect } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, AsyncStorage,Image } from 'react-native';
import globalStyle from '../styles/globalStyle'
import { Ionicons } from '@expo/vector-icons';
import AppContext from '../utils/ReducerContext'
import { CoinIcon} from './littleCom'
import { delay, checkIfOverADay } from '../utils/utils'

function FightDragon({navigation}){
    const [chance, setChance] = useState(3);
    const [msg, setMsg] = useState("");
    const [showMsg, setShowMsg] = useState(false)
    const userSettings = useContext(AppContext)
    const goDragonQuestion = async() =>{
        console.log("start");
        // TODO: check if has right
        // Be Careful!!!neeed to put below back
        if(chance === 0){
            setShowMsg(true)
            await delay(2000)
            setShowMsg(false);
            return;
        } 
        navigation.navigate('FightDragonQuestion')
        await AsyncStorage.setItem('@fightDragon/chance',(chance -1).toString())
        await AsyncStorage.setItem('@fightDragon/prevTime',Date.now().toString())
        setChance(chance-1)
        //
    }
    useEffect(()=>{
        const ifOverADay = async() =>{
            let prevTime = await AsyncStorage.getItem('@fightDragon/prevTime');
            if( prevTime === null ){
                // await AsyncStorage.setItem('@fightDragon/prevTime')
                setChance(3)
                return
            }
            if ( checkIfOverADay(prevTime) ){
                setChance(3)
            }
            else {
                let chanceToday = await AsyncStorage.getItem('@fightDragon/chance')
                if ( chanceToday === null ){
                    setChance(3)
                    return
                } else {
                    chanceToday = parseInt( chanceToday, 10 )
                    setChance( chanceToday )
                    return
                }
            }
        }
        ifOverADay()
    },[])

    useEffect(()=>{
        // show 3-second word to alert
        
    },[showMsg])

    return(
        <View style={globalStyle.containerBackground}>
            <View style={globalStyle.container}>
                <View style={style.header}>
                    <View style={globalStyle.money}>
                        <CoinIcon/>
                        <Text style={globalStyle.moneyText}>{userSettings.money}</Text>
                    </View>
                </View>
                <View style={style.body}>
                    <View style={style.fightTitle}>
                        <Text style={style.textFightTitle}>勇闖巨龍</Text>
                    </View>
                    <View style={style.dragonImage}>
                        <Image style={{height:'80%',width:'100%'}}source={require('../image/dragon/d4.png')}
                            resizeMode='center'/>
                    </View>
                    {showMsg && (<View style={style.alert}>
                        <Text style={style.alertText}>今天你玩很多了拉幹</Text>
                    </View>)}
                </View>
                <View style={style.root}>
                    <Ionicons name="home" size={32} style={globalStyle.HomeIcon} onPress={()=>{navigation.navigate('Home')}}/>
                    <View style={style.startButton}>
                        <TouchableOpacity style={style.btnView} activeOpacity={0.8} onPress={()=>{goDragonQuestion()}}>
                            <View >
                                <Text style={style.btnText}>START</Text>
                            </View>
                        </TouchableOpacity>
                    </View>
                    <View >
                        <Text style={style.textBelowBtn}>還剩下 {chance} 次機會</Text>
                    </View>
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
        flex:6,
        alignItems:"center",
    },
    root:{
        flex:2,
        alignItems:"center"
    },
    startButton:{
        height:'50%',
        width:"70%",
        alignItems:'center'
    },
    dragonImage:{
        flex:3,
        width:"70%",
        justifyContent:'flex-start',
    },
    fightTitle:{
        flex:1,
        width:"70%",
        justifyContent:'center',  
        padding:10,
    },btnView:{
        flex:1,
        width:'60%',
        flex:1,
        alignItems:'center',
        justifyContent:'center',
        borderRadius:5,
        backgroundColor:'#D1C0B0',
        borderWidth:5,
        borderColor:'#817060'
    }, btnText:{
        fontSize:32,
        color:'#817060',
        fontWeight:'bold',
        transform: [{scaleY:1.5}]
    },textBelowBtn:{
        margin:10,
        fontSize:16,
    },alert:{
        position:'absolute',
        bottom:0,
        marginBottom:10
    },alertText:{
        color:'red',
        fontSize:20,
        textAlign:'center',
    },textFightTitle:{
        textAlign:'center',
        fontSize:40,
    }
})

export default FightDragon;