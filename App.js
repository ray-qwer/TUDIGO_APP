import React,{ useState } from 'react';
import { StyleSheet, Text, View,Dimensions } from 'react-native';
import HomeStackNav from './routes/stackRoute'
import AppContext from './utils/ReducerContext'

export default function App() {

  const [money,setMoney] = useState(1000000)
  const userSettings = {
    money:money,
    setMoney:setMoney
  }

  return (
    <AppContext.Provider value={userSettings}>
      <View style={styles.container}>
          <HomeStackNav/>
      </View>
    </AppContext.Provider>
  );
}

const styles = StyleSheet.create({
  container: {
    width:Dimensions.get('window').width,
    height:Dimensions.get('window').height,
    flex: 1,
    backgroundColor: '#D1C0B0',
    borderColor:'#D1C0B0',
    borderWidth:10,
    borderStyle: 'solid',
    paddingTop:10
  },
});
