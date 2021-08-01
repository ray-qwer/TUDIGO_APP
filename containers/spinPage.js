import React,{ useState, useContext } from 'react';
import { StyleSheet, Text, View, TouchableOpacity,Image, TouchableWithoutFeedback,Dimensions } from 'react-native';
import Modal from 'react-native-modal'
import globalStyle from '../styles/globalStyle'
import { Ionicons } from '@expo/vector-icons';
import AppContext from '../utils/ReducerContext';
import { CoinIcon } from './littleCom';

function SpinPage({navigation}){
    
    const userSettings = useContext(AppContext);
    const [price, setPrice] = useState(1000);
    const [modalVisible, setModalVisible] = useState(false)
    const [ifSelect, setIfSelect] = useState(false)
    let attri = 0;
    const goSpinResult = () =>{
        if(userSettings.money < price){
            setModalVisible(true);
            return;
        }
        else{
            userSettings.setMoney(userSettings.money - price)
        }
        navigation.navigate("SpinResult",{attribute:attri})
        setIfSelect(false)
    }
    const onSelectAttri= (a) =>{
        attri = a
        setIfSelect(true)
        console.log(attri)
    }

    return(
        <View style={globalStyle.containerBackground}>
            <View style={globalStyle.container}>
                <Modal isVisible={modalVisible} onBackdropPress={()=>{setModalVisible(false)}} onBackButtonPress={()=>setModalVisible(false)}>
                    <View style={style.Modal}>
                        <View style={globalStyle.containerBackground} >
                            <View style={{...globalStyle.container,alignItems:"center"}}>
                                <Text style={style.modalText}>your money is not enough</Text>
                                <TouchableOpacity style={style.modalBtn} onPress={()=>{setModalVisible(false)}}>
                                    <Text style={style.modalBtnText}>OK</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    </View>
                </Modal>
                <View style={style.header}>
                    <View style={globalStyle.money}>
                        <CoinIcon/>
                        <Text style={globalStyle.moneyText}>{userSettings.money}</Text>
                    </View>
                    {/* <Text style={style.headerTitle}>SPIN EGG!</Text> */}
                </View>
                <View style={style.body}>
                    {ifSelect?(
                        <>
                        <View style={style.eggWindow}>
                            <TouchableWithoutFeedback onPress={()=>{goSpinResult()}}>
                                <Image 
                                    source={require('../image/spinEgg/eq.png')}
                                    style={style.egg}
                                    resizeMode='center'
                                    />
                            </TouchableWithoutFeedback>
                        </View>
                        <View style={style.price}>
                            <CoinIcon position="relative"/>
                            <Text style={style.Text}>{price}</Text>
                        </View>
                        </>
                    ):(
                        <View style={style.AttriWindow}>
                            <View style={{flexDirection:'row',}}>
                                <TouchableOpacity style={style.selectAttri} onPress={()=>{onSelectAttri(2)}}>
                                    <Text>Fire</Text>
                                </TouchableOpacity>
                                <TouchableOpacity style={style.selectAttri} onPress={()=>{onSelectAttri(1)}}>
                                    <Text>Water</Text>
                                </TouchableOpacity>
                            </View>
                            <View>
                                <TouchableOpacity style={style.selectAttri} onPress={()=>{onSelectAttri(3)}}>
                                    <Text>Tree</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    )}
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
        flexDirection:'row',
    },
    body:{
        flex:7,
        alignItems:'center',
        justifyContent:'center'
    },
    root:{
        flex:1,
    },
    price:{
        flex:2,
        width:"70%",
        justifyContent:'center',
        alignItems:'center',
        flexDirection:'row'
    },
    eggWindow:{
        flex:5,
        width:"70%",
        justifyContent:"flex-end",
    },
    AttriWindow:{
        justifyContent:'center',
        alignItems:'center'
    },
    selectAttri:{
        borderWidth:1,
        height:110,
        width:110,
        margin:10
    },
    egg:{
        height:"90%",
        width:"100%",
    },
    Modal:{
        width:Dimensions.get('screen').width*0.9,
        height:Dimensions.get('screen').height*0.6,
        backgroundColor:'white',
        justifyContent:'center',
        backgroundColor: '#D1C0B0',
        borderColor:'#D1C0B0',
        borderWidth:5,
        borderStyle: 'solid',
        borderRadius:16,
        padding:20,
    },
    modalBtn:{
        backgroundColor:"#571614",
        margin:10,
        width:"20%",
        borderRadius:10,
        position:'absolute',
        bottom:30
    },
    modalBtnText:{
        textAlign:'center',
        fontSize:20,
        color:'#EFE8CC',
        fontWeight:'bold'
    },
    modalText:{
        fontSize:28,
        fontWeight:'bold',
        textAlign:'center'
    },
    Text:{
        fontSize:50,
        textAlign:'center',
        color:"#a27762",
        margin:10
    }
})

export default SpinPage;