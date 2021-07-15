import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import globalStyle from '../styles/globalStyle'

function ChooseEgg({navigation}){
    return(
        <View style={globalStyle.containerBackground}>
            <View style={globalStyle.container}>
                <Text>ChooseEgg</Text>
            </View>
        </View>
    );
}

const style = StyleSheet.create({

})

export default ChooseEgg;