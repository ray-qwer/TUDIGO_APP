import React,{ useState } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Dimensions,AsyncStorage } from 'react-native';
import globalStyle from '../styles/globalStyle'
import Modal from 'react-native-modal';

function SettingModal(props){
    
    return(
        <Modal isVisible={props.isVisible} onBackdropPress={props.onBackdropPress} onBackButtonPress={props.onBackButtonPress}>
            <View style={globalStyle.Modal}>
                <View style={globalStyle.containerBackground}>
                    <View style={globalStyle.container}>
                        <Text>Setting</Text>
                        <TouchableOpacity style={{margin:10,borderWidth:1}} onPress={props.resetTime}>
                            <Text style={{fontSize:20}}>時間歸零</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={{margin:10,borderWidth:1}} onPress={props.addMoney}>
                            <Text style={{fontSize:20}}>加1000000元</Text>
                        </TouchableOpacity>
                        {/* <TouchableOpacity style={{margin:10,borderWidth:1}} onPress={props.bleScan}>
                            <Text style={{fontSize:20}}>藍芽搜尋</Text>
                        </TouchableOpacity> */}
                        <TouchableOpacity style={{margin:10,borderWidth:1}} onPress={()=>{AsyncStorage.clear()}}>
                            <Text style={{fontSize:20}}>重設所有東西</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        </Modal>
    );
}

const style = StyleSheet.create({
    
})

export default SettingModal;