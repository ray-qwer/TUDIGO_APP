import React,{ useState } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Dimensions } from 'react-native';
import globalStyle from '../styles/globalStyle'
import Modal from 'react-native-modal';

function SettingModal(props){
    
    return(
        <Modal isVisible={props.isVisible} onBackdropPress={props.onBackdropPress} onBackButtonPress={props.onBackButtonPress}>
            <View style={style.settingModal}>
                <View style={globalStyle.containerBackground}>
                    <View style={globalStyle.container}>
                        <Text>Setting</Text>
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
    }
})

export default SettingModal;