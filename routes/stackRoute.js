import React from 'react'
import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'
import HomePage from '../containers/home';
import BookPage from '../containers/bookPage';
import SettingPage from '../containers/examplePage';
import DailyPage from '../containers/daily';
import FightDragonPage from '../containers/fightDragon';
import SpinPage from '../containers/spinPage';
import SpinResult from '../containers/spinResult'
import DragonQuestionPage from '../containers/fightDragonQuestions';
import DragonResultPage from '../containers/fightDragonResult';


const Stack = createStackNavigator()

const HomeStackNav =()=> (
    <NavigationContainer>
        <Stack.Navigator
          screenOptions={{
            headerShown:false,
          }}>
          <Stack.Screen name="Home" component={HomePage} />
          <Stack.Screen name="Book" component={BookPage} />
          <Stack.Screen name="FightDragon" component={FightDragonPage} />
          <Stack.Screen name="Daily" component={DailyPage} />
          <Stack.Screen name="SpinResult" component={SpinResult} />     
          <Stack.Screen name="SpinEgg" component={SpinPage} />               
          <Stack.Screen name="FightDragonQuestion" component={DragonQuestionPage} />   
          <Stack.Screen name="FightDragonResult" component={DragonResultPage} />                             
        </Stack.Navigator>
      </NavigationContainer>
)


export default HomeStackNav;