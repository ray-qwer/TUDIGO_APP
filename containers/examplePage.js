import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import globalStyle from '../styles/globalStyle'

function Setting({navigation}){
    return(
        <View style={globalStyle.containerBackground}>
            <View style={globalStyle.container}>
                <Text>Setting</Text>
            </View>
        </View>
    );
}

const style = StyleSheet.create({

})

export default Setting;