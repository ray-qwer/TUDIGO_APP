import React,{ useState } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Dimensions } from 'react-native';
import globalStyle from '../styles/globalStyle'
import Modal from 'react-native-modal';

function SettingModal(props){
    
    return(
        <Modal isVisible={props.isVisible} onBackdropPress={props.onBackdropPress} onBackButtonPress={props.onBackButtonPress}>
            <View style={globalStyle.Modal}>
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
    
})

export default SettingModal;