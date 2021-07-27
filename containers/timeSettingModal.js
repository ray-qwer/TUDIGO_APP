import React,{ useState, useEffect, useContext } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Dimensions,TextInput, TouchableHighlight, AsyncStorage } from 'react-native';
import globalStyle from '../styles/globalStyle'
import Modal from 'react-native-modal';
import { StringOfLegalInt } from '../utils/utils'
import AppContext from '../utils/ReducerContext'

function TimeSettingModal(props){

    const userSettings = useContext(AppContext)
    const [day,setDay] = useState('0');
    const [hour,setHour] = useState('0');
    const [minute,setMinute] = useState('0');
    const onConfirm = async() =>{
        let period = {day:parseInt(day,10),hour:parseInt(hour,10),minute:parseInt(minute,10)}
        await AsyncStorage.setItem('period',JSON.stringify(period))
        userSettings.setPeriod(period)
        let time = ((period.minute*60)+(period.hour*3600)+(period.day*86400))*1000;
        props.setDueTime(Date.now()+time);
        props.setShowTimeSettingModal(false);
    }
    useEffect(()=>{
      const getPeriod = async() =>{
        setDay(userSettings.period.day.toString()) 
        setHour(userSettings.period.hour.toString())
        setMinute(userSettings.period.minute.toString())
      }
      getPeriod()  
    },[])
    return(
        <Modal isVisible={props.isVisible} onBackdropPress={props.onBackdropPress} onBackButtonPress={props.onBackButtonPress}>
            <View style={{...style.settingModal,paddingTop:0,marginTop:0}}>
                <Text style={{...style.textAbove,color:'white',margin:15,fontWeight:'bold'}}>設定時間</Text>
                <View style={{...globalStyle.containerBackground}}>
                    <View style={globalStyle.container}>
                        <View style={style.timeInputBlock}>
                            <View style={style.timeInput}>
                                <Text style={style.textAbove}>天</Text>
                                <TextInput style={style.textInput} keyboardType='decimal-pad' value={day} onChangeText={(text)=>{setDay(StringOfLegalInt(StringOfLegalInt(text)))}} />
                            </View>
                            <View style={style.timeInput}>
                                <Text style={style.textAbove}>小時</Text>
                                <TextInput style={style.textInput} keyboardType='decimal-pad' value={hour} onChangeText={(text)=>{setHour(StringOfLegalInt(text))}} />
                            </View>
                            <View style={style.timeInput}>
                                <Text style={style.textAbove}>分鐘</Text>    
                                <TextInput style={style.textInput} keyboardType='decimal-pad' value={minute} onChangeText={(text)=>{setMinute(StringOfLegalInt(text))}} />                        
                            </View>
                        </View>
                        <View style={style.btnBlock}>
                            <TouchableHighlight onPress={()=>{onConfirm()}} style={style.btn} underlayColor="#918070">
                                <Text style={style.btnText}>更新</Text>
                            </TouchableHighlight>
                            <TouchableHighlight onPress={()=>{props.setShowTimeSettingModal(false)}} style={style.btn} underlayColor="#918070">
                                <Text style={style.btnText}>取消</Text>
                            </TouchableHighlight>
                        </View>
                    </View>
                </View>
            </View>
        </Modal>
    );
}

const style = StyleSheet.create({
    settingModal:{
        width:Dimensions.get('screen').width*0.9,
        height:Dimensions.get('screen').height*0.6,
        backgroundColor:'white',
        justifyContent:'center',
        backgroundColor: '#D1C0B0',
        borderColor:'#D1C0B0',
        borderWidth:5,
        borderStyle: 'solid',
        borderRadius:16,
        padding:10,
    },
    timeInputBlock:{
        height:"40%",
        width:"100%",
        padding:10,
        flexDirection:'row',
        justifyContent:'space-around',
        alignItems:'center'
    },
    timeInput:{
        flex:1
    },
    btnBlock:{
        justifyContent:'center',
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
    textInput:{
        fontSize:32,
        textAlign:'center',
        backgroundColor:'white',
        borderRadius:6,
        margin:10,
    },
    textAbove:{
        fontSize:24,
        textAlign:'center'
    }
})

export default TimeSettingModal;