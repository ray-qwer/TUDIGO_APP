import { useState, useEffect, useContext } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Dimensions, AsyncStorage,Image } from 'react-native';
import globalStyle from '../styles/globalStyle'
import Modal from 'react-native-modal';
import { Ionicons } from '@expo/vector-icons';
import imageReq from '../utils/images'

function OpenBoxModal(props){
    
    const [petImage, setPetImage] = useState('')
    
    useEffect(()=>{
        setPetImage(imageReq[props.pet.source])
    },[props])
    return(
        <Modal isVisible={props.isVisible} onBackdropPress={props.onBackdropPress} onBackButtonPress={props.onBackButtonPress}>
            <View style={globalStyle.Modal}>
                <View style={style.cancelBlock}>
                    <TouchableOpacity style={{flex:1}} onPress={props.onBackButtonPress} activeOpacity={1}>
                        <View style={style.cancelCircle}>
                            <Text style={style.textCancel}>X</Text>
                        </View>
                    </TouchableOpacity>
                </View>
                <View style={globalStyle.containerBackground}>
                    <View style={{...globalStyle.container,padding:20}}>
                        <View style={style.petShow}>
                            <Image style={{height:'100%',width:'100%'}} source={petImage}
                            resizeMode='center'
                            />
                        </View>
                        <View style={style.textBlockIfOpen}>
                            <Text style={style.textIfOpen}>你確定要打開嗎?</Text>
                        </View>
                        <View style={style.btnBlock}>
                            <TouchableOpacity activeOpacity={0.8} onPress={props.onOpen}>
                                <View style={style.btn}>
                                    <Text style={style.textBtn}>好</Text>
                                </View>
                            </TouchableOpacity>
                            <TouchableOpacity activeOpacity={0.8}>
                                <View style={style.btn}>
                                    <Text style={style.textBtn}>再想想</Text>
                                </View>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            </View>
        </Modal>
    );
}
function ResultOpenModal(props){
    const [petImage, setPetImage] = useState()
    useEffect(()=>{
        if(props.isOverTime){
            if (props.pet.id === 0){
                let randomNum = Math.ceil(Math.random()*4)
                let attributeLetter =   (props.pet.attribute===1)?'w':
                                        (props.pet.attribute===2)?'f':
                                        't';
                let src = random+attributeLetter
                // id calculate
            }
        }
    },[props.pet,props.isOverTime])
    return(
        <Modal isVisible={props.isVisible} onBackdropPress={props.onBackdropPress} onBackButtonPress={props.onBackButtonPress}>
            <View style={globalStyle.Modal}>
                <View style={style.cancelBlock}>
                    <TouchableOpacity style={{flex:1}} onPress={props.onBackButtonPress} activeOpacity={1}>
                        <View style={style.cancelCircle}>
                            <Text style={style.textCancel}>X</Text>
                        </View>
                    </TouchableOpacity>
                </View>
                <View style={globalStyle.containerBackground}>
                    <View style={{...globalStyle.container,padding:20}}>
                        <View style={style.title}>
                            <Text style={style.textTitle}>{props.isOverTime?'飼養成功':'飼養失敗'}</Text>
                        </View>
                        <View style={style.petShow}>
                            <Image
                            />
                        </View>
                        <View style={style.btnBlock}>{props.isOverTime?
                            (<>
                            <TouchableOpacity activeOpacity={0.8} onPress={()=>{}}>
                                <View style={style.btn}>
                                    <Ionicons name="logo-instagram" size={32} style={{color:'white'}}/>
                                </View>
                            </TouchableOpacity>
                            <TouchableOpacity activeOpacity={0.8} onPress={()=>{}}>
                                <View style={style.btn}>
                                    <Ionicons name="logo-facebook" size={32} style={{color:'white'}}/>
                                </View>
                            </TouchableOpacity>
                            <TouchableOpacity activeOpacity={0.8} onPress={()=>{}}>
                                <View style={style.btn}>
                                    <Ionicons name="share-social-outline" size={32} style={{color:'white'}}/>
                                </View>
                            </TouchableOpacity>
                            </>):(<>
                                <TouchableOpacity activeOpacity={0.8} onPress={props.onBackButtonPress}>
                                <View style={style.btn}>
                                    <Text>我會再努力</Text>
                                </View>
                            </TouchableOpacity>
                            </>)}
                        </View>
                    </View>
                </View>
            </View>
        </Modal>
    );
}
function AlertModal(props){
    
    return(
        <Modal isVisible={props.isVisible} onBackdropPress={props.onBackdropPress} onBackButtonPress={props.onBackButtonPress}>
            <View style={{...globalStyle.Modal,height:Dimensions.get('window').height*0.2}}>
                <View style={globalStyle.containerBackground}>
                    <View style={globalStyle.container}>
                        <Text style={style.alertText}>{props.content}</Text>
                    </View>
                </View>
            </View>
        </Modal>
    );
}

const style = StyleSheet.create({
    cancelBlock:{
        position:'absolute',
        top:-10,
        right:-10,
        height:60,
        width:60,
        zIndex:1
    },cancelCircle:{
        flex:1,
        borderRadius:25,
        borderWidth:5,
        borderColor:'black',
        backgroundColor:'red',
        justifyContent:'center',
        alignItems:'center',
    },textCancel:{
        color:'white',
        fontSize:30,
        fontWeight:'bold',
        transform: [{ rotate:"15deg",}]
    },alertText:{
        textAlign:'center',
        fontSize:28
    },petShow:{
        flex:3,
        borderWidth:1
    },textBlockIfOpen:{
        flex:1,
    },textIfOpen:{
        textAlign:'center',
        fontSize:28,
        color:'#581D19'
    },btnBlock:{
        flex:1,
        flexDirection:'row',
        paddingHorizontal:10,
        justifyContent:'center',
        paddingTop:5
    },btn:{
        backgroundColor:'#785531',
        marginHorizontal:10,
        borderRadius:8,
        padding:8
    },textBtn:{
        textAlign:'center',
        fontSize:28,
        color:'#F2D9E8',
    },title:{
        paddingTop:10,
        flex:1
    },textTitle:{
        fontSize:28,
        textAlign:'center'
    }
})

export { OpenBoxModal, ResultOpenModal,AlertModal };