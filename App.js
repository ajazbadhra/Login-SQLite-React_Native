import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'
import React from 'react'
import Login from './src/screens/Login'
import Home from './src/screens/Home'


const stack = createStackNavigator()

const App = () => {
  return (
    <NavigationContainer>
      <stack.Navigator>
        <stack.Screen 
          name = 'Login'
          component = {Login}
        />
        <stack.Screen 
          name = 'Home'
          component = {Home}
        />
      </stack.Navigator>
    </NavigationContainer>
  )
}

export default App
