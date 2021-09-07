import React, { useState, useContext, useEffect } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Image,Dimensions, TouchableHighlight,AsyncStorage,TouchableNativeFeedback, } from 'react-native';
import globalStyle from '../styles/globalStyle'
import SettingModal from './settingModal'
import TimeSettingModal from './timeSettingModal'
import { OpenBoxModal, AlertModal, ResultOpenModal } from './openAndDailyModal'
import AppContext from '../utils/ReducerContext'
import { CoinIcon } from './littleCom'
import { timeParse, checkIfOverADay } from '../utils/utils'
import ChoosePetModal from './choosePetModal';
import imageReq from '../utils/images'
import BleScanModal from './bleScan'
// TODO: add animation of navigation
// https://reactnavigation.org/docs/stack-navigator/

function HomePage({navigation}){

    // modal variable
    const [showSettingModal,setShowSettingModal] = useState(false)
    const [showTimeSettingModal, setShowTimeSettingModal] = useState(false)
    const [showOpenBoxModal, setShowOpenBoxModal] = useState(false)
    const [showResultOpenModal, setShowResultOpenModal] = useState(false)
    const [showAlertModal, setShowAlertModal] = useState(false)
    const [alertMsg, setAlertMsg] = useState("")
    const [showChoosePetModal, setShowChoosePetModal] = useState(false)
    const [showBleScanModal, setShowBleScanModal] = useState(false)
    // image
    const open_off = require('../image/open-off.png')
    const open_on = require('../image/open-on.png')
    const [sethomeImg, newhomeImg] = useState(open_off)
    const spinEgg_off = require('../image/spinEgg-off.png')
    const spinEgg_on = require('../image/spinEgg-on.png')
    const [setEggImg, newEggImg] = useState(spinEgg_off)
    const setting_off = require('../image/setting-off.png')
    const setting_on = require('../image/setting-on.png')
    const [setsettingImg, newsettingImg] = useState(setting_off)
    const fightDragon_off = require('../image/fightDragon-off.png')
    const fightDragon_on = require('../image/fightDragon-on.png')
    const [setDragonImg, newDragonImg] = useState(fightDragon_off)
    const illustrate_off = require('../image/peticon-off.png')
    const illustrate_on = require('../image/peticon-on.png')
    const [setillustrateImg, newillustrateImg] = useState(illustrate_off)
    // countdown
    const [LastTime,setLastTime]  = useState(1);
    // const [dueTime,setDueTime] = useState(0)
    const [startTimer,setStartTimer] = useState(false);
    const [overDueTime, setOverDueTime] = useState(false) // check if successfully pass the challenge
    // render home page // object from local variable
    const [exp, setExp] = useState(50)
    const [selectedPet, setSelectedPet] = useState(null)
    // 
    const userSettings = useContext(AppContext)
    const {dueTime, setDueTime} = userSettings

    useEffect(()=>{
        console.log(LastTime)
        const countDown = setInterval(function t(){
            let time = dueTime - Date.now() + 60000
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
    // TODO:
    useEffect(()=>{
        console.log(userSettings.selectedPet)
        const found = userSettings.petList.find(ele => (ele.id === userSettings.selectedPet.id && ele.attribute === userSettings.selectedPet.attribute))
        console.log(found)
        setSelectedPet(found)
        return
    },[userSettings.selectedPet,selectedPet])

    const clear = async() =>{
        await AsyncStorage.clear()
    }

    const openBoxMessage = () => {
        setShowOpenBoxModal(true)
    }
    // press button effect 
    const home_function = () =>{
        newhomeImg(open_on)
        setShowOpenBoxModal(true)
       }
    const home_function_back = () =>{
         newhomeImg(open_off)
         setShowOpenBoxModal(false)
    }
       
    const spinEgg_function = async() =>{
        newEggImg(spinEgg_on)
        navigation.navigate('SpinEgg')
        setTimeout(() => { newEggImg(spinEgg_off); }, 500);
        
    }
    const setting_function = async() =>{
        newsettingImg(setting_on)
        setShowSettingModal(true)
    }
    const setting_function_back = async() =>{
        newsettingImg(setting_off)
        setShowSettingModal(false)
    }
    
    const fightDragon_function = async() =>{
        newDragonImg(fightDragon_on)
        navigation.navigate('FightDragon')
        setTimeout(() => { newDragonImg(fightDragon_off); }, 500);
    }
    
    const illustrate_function = async() =>{
        newillustrateImg(illustrate_on)
        navigation.navigate('Book')
        setTimeout(() => { newillustrateImg(illustrate_off); }, 500);
    }
    //
    const goDaily = async() =>{
        // DailyDone: string of time when answer the Daily challenge
        let ifDailyDone = await AsyncStorage.getItem('DailyDone')
        if (ifDailyDone === null){
            navigation.navigate('Daily', { pet: selectedPet })
            return 
        }
        else if ( checkIfOverADay(ifDailyDone) ){
            navigation.navigate('Daily', { pet: selectedPet })
            return
        }else{
            // modal? alert?
            setAlertMsg("今日任務已完成!!")
            setShowAlertModal(true)
            return
        }        
    }
    
    const onOpen = async() =>{
        // time logic
        if (Date.now() >= dueTime){
            setOverDueTime(true)
        }
        else setOverDueTime(false)
        setShowOpenBoxModal(false)
        setShowBleScanModal(true)
        // setShowResultOpenModal(true)
    }
    const onOpenedBox = () =>{
        setShowBleScanModal(false)
        setShowResultOpenModal(true)
    }
    const resultOpenBox_resetTime = () =>{
        setShowResultOpenModal(false)
        console.log('hi1')
        let level = selectedPet.level
        let minPeriod =  Math.min((level+4)*3600000,3*24*3600000);
        let time = ((userSettings.period.minute*60)+(userSettings.period.hour*3600)+(userSettings.period.day*86400))*1000;        
        if( time < minPeriod ){
            setDueTime(minPeriod+Date.now())
        } else {
            setDueTime(time+Date.now())
        }
        console.log('hi2')
    }

    return(
        <View style={globalStyle.containerBackground}>
        <View style={globalStyle.container}>
            <SettingModal isVisible={showSettingModal} onBackdropPress={setting_function_back} 
                onBackButtonPress={setting_function_back} resetTime={()=>{setDueTime(Date.now())}}
                addMoney={()=>{userSettings.setMoney(userSettings.money +100000)}}
            />
            <BleScanModal isVisible={showBleScanModal} 
                 onSkipPress={onOpenedBox}
                onOpenedBox={onOpenedBox}
            />
            <TimeSettingModal isVisible={showTimeSettingModal} onBackdropPress={() => {setShowTimeSettingModal(false)}} 
                onBackButtonPress={()=>{setShowTimeSettingModal(false)}} setDueTime={setDueTime} setShowTimeSettingModal={setShowTimeSettingModal}
                pet={selectedPet}
            />
            <OpenBoxModal isVisible={showOpenBoxModal} onBackdropPress={home_function_back} 
                onBackButtonPress={home_function_back} onOpen={()=>{onOpen()}}
                pet={selectedPet} 
            />
            <AlertModal isVisible={showAlertModal} onBackdropPress={() => {setShowAlertModal(false)}} 
                onBackButtonPress={()=>{setShowAlertModal(false)}} content={alertMsg}
            />
            <ResultOpenModal isVisible={showResultOpenModal} onBackdropPress={resultOpenBox_resetTime} 
                onBackButtonPress={resultOpenBox_resetTime} isOverTime={overDueTime}
                pet={selectedPet} onPetListChange={userSettings.setPetList} petList={userSettings.petList} onPetChange={userSettings.setSelectedPet}
            />
            <ChoosePetModal isVisible={showChoosePetModal} onBackdropPress={() => {setShowChoosePetModal(false)}} 
                onBackButtonPress={()=>{setShowChoosePetModal(false)}}  setDueTime={setDueTime}
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
                    <TouchableOpacity style={{flexDirection:'column'}} onPress={()=>goDaily()} activeOpacity={.7}>
                        <>
                        <Image style={{height:'100%',width:'100%'}}source={require('../image/daily.png')}
                        resizeMode='center'
                        />
                        <Text numberOfLines={1} style={style.textSub}>每日任務</Text>
                        </>
                    </TouchableOpacity>
                </View>
            </View>
            <View style={style.body}>
                {/* home main page */}
                <View style={style.showLevel}>
                    {/* show level */}
                    <Text style={style.showLevelText}>Lv.{(selectedPet!==null)?(selectedPet.level.toString()):('0')}</Text>
                    <View style={style.showLevelOutlined}>
                        <View style={[style.showLevelColor,selectedPet!==null && {width:(selectedPet.exp/(Math.floor(selectedPet.level/10+1)*500)*100).toString()+'%'}]}></View>
                    </View>
                </View>
                <View style={style.showPet}>
                    {/* show pet */}
                    <TouchableOpacity style={{flex:1}} onPress={()=>{setShowChoosePetModal(true)}} activeOpacity={0.8}>
                        <Image style={{height:'100%',width:'100%'}} source={(selectedPet!==null)?(imageReq[selectedPet.source]):(imageReq['eq'])}
                            resizeMode='center'/>
                    </TouchableOpacity>
                </View>
                <View style={style.lastTime}>
                    {/* show last time */}
                    <TouchableOpacity style={style.timeBlock} onPress={()=>{setShowTimeSettingModal(true)}} activeOpacity={.7}>
                        <>
                            <Text style={style.timeTitle}>剩餘時間</Text>
                            <Text style={style.time}>{timeParse(LastTime).dd} <Text style={{fontSize:14}}>天</Text> {timeParse(LastTime).hh} <Text style={{fontSize:14}}>時</Text> {timeParse(LastTime).mm} <Text style={{fontSize:14}}>分</Text></Text>
                        </>
                    </TouchableOpacity>
                </View>
            </View>
            <View style={style.root}>
                {/* root */}
                <View style={style.spinEgg}>
                    {/* to spin egg */}
                    <TouchableOpacity style={{flex:1,}} onPress={spinEgg_function} activeOpacity={1}>
                        <View style={{flex:2,paddingHorizontal:2.5}}>
                            <Image style={{height:'100%',width:'100%'}}source={setEggImg}
                            resizeMode='center'
                            />
                        </View>
                        <Text style={{...style.textSub,flex:1}}>轉蛋</Text>
                    </TouchableOpacity>
                </View>
                <View style={style.illustrateBook}>
                    {/* to book */}
                    <TouchableOpacity style={{flex:1}} onPress={illustrate_function} activeOpacity={1}>
                        <View style={{flex:2,paddingHorizontal:2.5}}>
                            <Image style={{height:'100%',width:'100%'}}source={setillustrateImg}
                            resizeMode='center'
                            />
                        </View>
                        <Text style={{...style.textSub,flex:1}}>圖鑑</Text>
                    </TouchableOpacity>
                </View>
                <View style={{...style.openBox}}>
                    {/* open box */}
                    <TouchableOpacity style={{ bottom:Dimensions.get('window').height*(0.8/9)}} onPress={home_function} activeOpacity={1}>
                        <View style={{alignItems:'center'}} >
                            <Image style={{height:'100%',width:'100%',}} source={sethomeImg}
                            resizeMode='center'
                            />
                        </View>
                    </TouchableOpacity>
                </View>
                <View style={style.fightDragon}>
                    {/* fight with dragon */}
                    <TouchableOpacity style={{flex:1}} onPress={fightDragon_function} activeOpacity={1}>
                        <View style={{flex:2,paddingHorizontal:2.5}}>
                            <Image style={{height:'100%',width:'100%'}} source={setDragonImg}
                            resizeMode='center'
                            />
                        </View>
                        <View style={{flex:1}}>
                            <Text adjustsFontSizeToFit style={{...style.textSub}}>勇闖巨龍</Text>
                        </View>
                    </TouchableOpacity>
                </View>
                <View style={style.setting}>
                    {/* setting */}
                    <TouchableOpacity style={{flex:1}} onPress={setting_function} activeOpacity={1}>
                        <View style={{flex:2,paddingHorizontal:2.5}}>
                            <Image style={{height:'100%',width:'100%'}}source={setsettingImg}
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
        width:"30%",
        flexDirection:'row',
        justifyContent:'flex-end',
    },
    showLevel:{
        flex:0.8,
        width:"70%",
        alignItems:'center',

    },
    showLevelOutlined:{
        width:"60%",
        height:20,
        borderWidth:5,
        borderColor:'#716050',
        backgroundColor:'transparent',
        borderRadius:5,
        marginTop:5
    },
    showLevelColor:{
        height:'100%',
        backgroundColor:'#D1C0B0',
    },
    showLevelText:{
        fontSize:32,
        color:'#716050'
    },
    showPet:{
        borderColor:'#FFF',
        flex:2,
        width:"80%",
        justifyContent:'center',
    },
    lastTime:{
        flex:1.2,
        width:"70%",
    },
    spinEgg:{
        flex:1,
        paddingHorizontal:3
    },
    illustrateBook:{
        flex:1,
        paddingHorizontal:3
    },
    openBox:{
        flex:1.8,
        padding:3,
        height:Dimensions.get('window').height*(2.3/9),
        bottom:0
    },
    fightDragon:{
        flex:1,
        paddingHorizontal:3
    },
    setting:{
        flex:1,
        paddingHorizontal:3
    },
    textSub:{
        textAlign:'center',
        fontSize:15,
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