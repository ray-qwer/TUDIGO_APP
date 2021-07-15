import React,{useState,useEffect,useContext } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, TouchableHighlight } from 'react-native';
import globalStyle from '../styles/globalStyle'
import { Ionicons } from '@expo/vector-icons';
import AppContext from '../utils/ReducerContext'

function Daily({navigation}){

    const [topic,setTopic] = useState("今天有吃蔬菜嗎")
    const [idealAns, setIdealAns] = useState(true)
    const [submit,setSubmit] = useState(false)
    const [suc,setSuc] = useState(false)
    const userSettings = useContext(AppContext)

    const checkSuc = (ans) =>{
        setSubmit(true)
        if(ans === idealAns)
            setSuc(true)
        else   setSuc(false)
    }
    return(
        <View style={globalStyle.containerBackground}>
            <View style={globalStyle.container}>
                <View style={style.dailyChallenge}>

                </View>
                <View style={style.header}>
                    <View style={style.money}>
                        <Text style={style.moneyText}>{userSettings.money}</Text>
                    </View>
                </View>
                <View style={style.body}>
                    <View style={style.showPet}>
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
        borderColor:'#000',
        borderWidth:1,
        flexDirection:'row',
    },
    body:{
        flex:5,
        borderColor:'#000',
        borderWidth:1,
    },
    root:{
        flex:3,
        borderColor:'#000',
        borderWidth:1,
        alignItems:"center"
    },
    money:{
        marginLeft:10,
        padding:10,
        width:"50%",
    },
    moneyText:{
        fontSize:30,
        fontWeight:'bold',
        textAlign:'center',
        color:"#918070"
    },
    showPet:{
        height:"70%",
        width:"70%",
        left:"15%",
        bottom:"0%",
        position:"absolute",
        borderColor:'white',
        borderWidth:10,
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