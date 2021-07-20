import React,{ useState, useContext, useEffect } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Image,Dimensions, TouchableHighlight,AsyncStorage,TouchableNativeFeedback } from 'react-native';
import globalStyle from '../styles/globalStyle'
import SettingModal from './settingModal'
import TimeSettingModal from './timeSettingModal'
import AppContext from '../utils/ReducerContext'
import { CoinIcon } from './littleCom'
import { timeParse } from '../utils/utils'

// TODO: add animation of navigation
// https://reactnavigation.org/docs/stack-navigator/

function HomePage({navigation}){

    const [showSettingModal,setShowSettingModal] = useState(false)
    const [showTimeSettingModal, setShowTimeSettingModal] = useState(false)
    const [LastTime,setLastTime]  = useState(1);
    const [dueTime,setDueTime] = useState(0)
    const [startTimer,setStartTimer] = useState(false);
    const userSettings = useContext(AppContext)
    useEffect(()=>{
        console.log(LastTime)
        const countDown = setInterval(function t(){
            let time = dueTime - Date.now()
            if ( time < 0) {
                setLastTime(0)
                return t
            }
            else {
                setLastTime(time)
                // console.log('why??last is 1')
            };
            
            console.log('time',time)
            console.log('last',LastTime)
            console.log('refresh')
            return t
        }(),60000)
        
        return () => clearInterval(countDown)
    },[startTimer,dueTime])
    useEffect(()=>{
        setStartTimer(true)
        return ()=> setStartTimer(false)
    },[])
    const clear = async() =>{
        await AsyncStorage.clear()
    }
    return(
        <View style={globalStyle.containerBackground}>
        <View style={globalStyle.container}>
            <SettingModal isVisible={showSettingModal} onBackdropPress={() => {setShowSettingModal(false)}} 
                onBackButtonPress={()=>{setShowSettingModal(false)}}
            />
            <TimeSettingModal isVisible={showTimeSettingModal} onBackdropPress={() => {setShowTimeSettingModal(false)}} 
                onBackButtonPress={()=>{setShowTimeSettingModal(false)}} setDueTime={setDueTime} setShowTimeSettingModal={setShowTimeSettingModal}
            />
            <View style={style.header}>
                {/* header part */}
                <View style={globalStyle.money}>
                    {/* show money */}
                    <CoinIcon/>
                    <Text style={globalStyle.moneyText}>{userSettings.money}</Text>
                </View>
                <View style={style.iconDaily}>
                    {/* go to daily challenge */}
                    <TouchableOpacity onPress={()=>navigation.navigate('Daily')} activeOpacity={.7}>
                        <>
                        <Image style={{height:'90%',width:'100%'}}source={require('../image/daily.png')}
                        resizeMode='cover'
                        />
                        <Text style={style.textSub}>Daily</Text>
                        </>
                    </TouchableOpacity>
                </View>
            </View>
            <View style={style.body}>
                {/* home main page */}
                <View style={style.showLevel}>
                    {/* show level */}
                    <Text>show Text</Text>
                </View>
                <View style={style.showPet}>
                    {/* show pet */}
                    <Text>show Pet</Text>
                </View>
                <View style={style.lastTime}>
                    {/* show last time */}
                    <TouchableOpacity style={style.timeBlock} onPress={()=>{setShowTimeSettingModal(true)}} activeOpacity={.7}>
                        <>
                            <Text style={style.timeTitle}>剩餘時間</Text>
                            <Text style={style.time}>{timeParse(LastTime).dd}  <Text style={{fontSize:14}}>天</Text> {timeParse(LastTime).hh} <Text style={{fontSize:14}}>時</Text> {timeParse(LastTime).mm} <Text style={{fontSize:14}}>分</Text></Text>
                        </>
                    </TouchableOpacity>
                </View>
            </View>
            <View style={style.root}>
                {/* root */}
                <View style={style.spinEgg}>
                    {/* to spin egg */}
                    <TouchableOpacity style={{flex:1}} onPress={()=>navigation.navigate('SpinEgg')} activeOpacity={.7}>
                        <View style={{flex:2}}>
                            <Image style={{height:'100%',width:'100%'}}source={require('../image/spinEgg.png')}
                            resizeMode='center'
                            />
                        </View>
                        <Text style={{...style.textSub,flex:1}}>轉蛋</Text>
                    </TouchableOpacity>
                </View>
                <View style={style.illustrateBook}>
                    {/* to book */}
                    <TouchableOpacity onPress={()=>navigation.navigate('Book')} activeOpacity={.7}>
                        <Text>Book</Text>
                    </TouchableOpacity>
                </View>
                <View style={{...style.openBox}}>
                    {/* open box */}
                    <TouchableOpacity style={{ bottom:Dimensions.get('window').height*(0.8/9)}} onPress={()=>{}} activeOpacity={.7}>
                        <View style={{alignItems:'center'}} >
                            <Image style={{height:'100%',width:'130%',}} source={require('../image/open.png')}
                            resizeMode='center'
                            />
                        </View>
                    </TouchableOpacity>
                </View>
                <View style={style.fightDragon}>
                    {/* fight with dragon */}
                    <TouchableOpacity onPress={()=>navigation.navigate('FightDragon')} activeOpacity={.7}>
                        <Text>fight dragon</Text>
                    </TouchableOpacity>
                </View>
                <View style={style.setting}>
                    {/* setting */}
                    <TouchableOpacity style={{flex:1}} onPress={()=>{setShowSettingModal(true);clear()}} activeOpacity={.7}>
                        <View style={{flex:2}}>
                            <Image style={{height:'100%',width:'100%'}}source={require('../image/setting.png')}
                            resizeMode='center'
                            />
                        </View>
                        <Text style={{...style.textSub,flex:1}}>設定</Text>
                    </TouchableOpacity>
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
        justifyContent:'space-between',
    },
    body:{
        flex:6.5,
        justifyContent: 'center',
        alignItems:'center',
    },
    root:{
        flex:1.5,
        flexDirection:'row',
        justifyContent: 'center',
        backgroundColor:'#CEBBAA',
        borderRadius:0,
        overflow:'visible'
    },
    iconDaily:{
        marginRight:10,
        padding:10,
        width:"20%"
    },
    showLevel:{
        borderColor:'#FFF',
        borderWidth:1,
        flex:0.8,
        width:"70%",
    },
    showPet:{
        borderColor:'#FFF',
        borderWidth:1,
        flex:2,
        width:"70%",
    },
    lastTime:{
        flex:1.2,
        width:"70%",
    },
    spinEgg:{
        flex:1,
        padding:10,
    },
    illustrateBook:{
        flex:1,
        padding:10,
    },
    openBox:{
        flex:1.8,
        padding:10,
        height:Dimensions.get('window').height*(2.3/9),
        bottom:0
    },
    fightDragon:{
        flex:1,
        padding:10,
    },
    setting:{
        flex:1,
        padding:10,
    },
    textSub:{
        textAlign:'center',
        fontSize:16,
        fontStyle:'normal'
    },
    timeBlock:{
        flex:1,
        // flexDirection:'row',
        justifyContent:'center',
        alignItems:'center',
        marginBottom:Dimensions.get('window').height*(0.4/9)
    },
    timeTitle:{
        fontSize:20,
        color:"#918070",
        fontWeight:'bold'

    },
    time:{
        justifyContent:'space-evenly',
        textAlign:'center',
        fontSize:28,
        fontWeight:'bold',
        color:"#918070"
    }
});

export default HomePage;