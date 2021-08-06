import React, { useState, useEffect, useContext } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Dimensions, AsyncStorage,Image } from 'react-native';
import globalStyle from '../styles/globalStyle'
import Modal from 'react-native-modal';
import { Ionicons } from '@expo/vector-icons';
import imageReq from '../utils/images'

function OpenBoxModal(props){
    
    const [petImage, setPetImage] = useState('')
    
    useEffect(()=>{
        // console.log(props.isVisible)
        if(!props.isVisible) return
        console.log('why1')
        setPetImage(imageReq[props.pet.source])
    },[props.isVisible])
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
                            <TouchableOpacity activeOpacity={0.8} onPress={props.onBackButtonPress}>
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
    const [petImage, setPetImage] = useState(null)
    useEffect(()=>{
        if(props.isVisible) setPetImage(imageReq[props.pet.source])
    },[props.isVisible])
    useEffect(()=>{
        if (!props.isVisible) return
        console.log('why2')
        const setAsyncStoragePetList = async() =>{
            await AsyncStorage.setItem('petList',JSON.stringify(props.petList))
        }
        
        // const setAsyncStorageSelectedPet = async(selectedPet) =>{
        //     await AsyncStorage.setItem('selectedPet',JSON.stringify(selectedPet))
        // } 

        if(props.isOverTime){
            let p = props.pet
            if (p.id === 0){
                let id,src,attribute;
                if(p.attribute !== 0){
                    let randomNum = Math.ceil(Math.random()*4)
                    let attributeLetter =   (p.attribute===1)?'w':
                                            (p.attribute===2)?'f':
                                            't';
                    src = attributeLetter + randomNum.toString()
                    // id calculated equation: (attribute-1)*4+(randomNum-1)
                    setPetImage(imageReq[src])
                    id = (p.attribute-1)*4 + randomNum
                    attribute = p.attribute
                }
                else {
                    // random
                    let randomNum = Math.ceil(Math.random()*12)
                    attribute = Math.ceil(randomNum/4)
                    let attributeLetter =   (attribute===1)?'w':
                                            (attribute===2)?'f':
                                            't';
                    src = attributeLetter + (randomNum%4+1).toString()
                    setPetImage(imageReq[src])
                    id = randomNum
                    
                }
                if(p.amount === 1){
                    p.id = id
                    p.source = src
                    p.level += 1
                    p.attribute = attribute
                    // setAsyncStorageSelectedPet({id:p.id,attribute:p.attribute})
                    props.onPetChange({id:id,attribute:attribute})
                } else {
                    let tmpP = {
                        id: id,
                        source: src,
                        level:1,
                        attribute: p.attribute,
                        identity:{
                            attack: 10,
                            defend: 10,
                            recover: 10,
                        },
                        amount: 1,
                        exp:0,
                    }
                    p.amount -= 1
                    let newPetList;
                    if (p.amount === 0){
                        // pop up 
                        newPetList = props.petList.filter(ele => ele === p)
                    }
                    else newPetList = props.petList
                    props.onPetListChange([...newPetList,tmpP])
                    props.onPetChange({id:tmpP.id,attribute:tmpP.attribute})
                    // setAsyncStorageSelectedPet({id:tmpP.id,attribute:tmpP.attribute})
                }
            } else {
                // exp up
                // check if level up
                // level: 500*Math.ceil(level/10)
                let levelUpgrade = 500*Math.ceil(p.level/10)
                p.exp += 500
                if (p.exp === levelUpgrade){
                    p.level +=1
                    p.exp = 0
                }
                setPetImage(imageReq[p.source])
            }
        }
        setAsyncStoragePetList()


    },[props.isVisible])
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
                            <Image style={{height:'100%',width:'100%'}}source={petImage}
                            resizeMode='center'
                            />
                            <Image style={{position:'absolute',bottom:0,width:'100%',height:'35%',borderWidth:1}} source={(props.isOverTime)?(require("../image/sucLight.png")):(require("../image/loseLight.png"))}
                            resizeMode='center'/>
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
                                    <Text style={style.textBtn}>我會再努力</Text>
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
        flex:4,
        margin:5,
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
        flex:0.5
    },textTitle:{
        fontSize:28,
        textAlign:'center'
    }
})

export { OpenBoxModal, ResultOpenModal,AlertModal };