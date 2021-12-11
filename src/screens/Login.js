import React, {useState, useEffect} from 'react'
import { Text, View, Image, Alert,} from 'react-native'
import { TextInput, TouchableOpacity } from 'react-native-gesture-handler'
import Styles from '../styles/Style'
import sqlite from 'react-native-sqlite-storage'

const db = sqlite.openDatabase({
    name : 'mainDB',
    location : 'default'
},
() => {},
(err) => {console.log(err)}
)

const Login = ({navigation}) => {

    const [name, setName] = useState('')
    const [age,setAge] = useState('')

    useEffect(()=>{
        createTable()
        getData()
    },[])

    const createTable = () =>{
        db.transaction((tx) => {
            tx.executeSql(
                'CREATE TABLE IF NOT EXISTS Users '
                +'(ID INTEGER PRIMARY KEY AUTOINCREMENT, Name TEXT, Age INTEGER);'
            )
        })
    }

    const getData = async () =>{
        try{
            await db.transaction((tx) => {
                tx.executeSql(
                    'SELECT Name, Age from Users',
                    [],
                    (tx, results) =>{
                        if (results.rows.length > 0){
                            navigation.navigate('Home')
                        }
                    }
                )
            })
        }catch(err){
            console.log('getItem Error ',err)
        }
    }

    const saveData = async () =>{
        if(name.length == 0 || age.length == 0){
            Alert.alert('Warning!', 'You Must Have to enter UserName')
        }
        else {
            try{
                await db.transaction(async (tx) => {
                    await tx.executeSql(
                        'INSERT INTO Users (Name, Age) VALUES (?,?)',
                        [name, age]
                    )
                })
                navigation.navigate('Home')
            }catch(err){
                console.log(err)
            }
        }
    }

    return (
        <View style = {Styles.container}>
            <Image 
                style= {{height:150, width:300, marginBottom:20}}
                source={require('../../assets/logo.png')}
            />
            <Text style = {Styles.text}>Login</Text>
            <TextInput 
                style = {Styles.textInput}
                autoCapitalize='none'
                placeholder='Enter UserName'
                onChangeText={(value) => { setName(value)}}
            />
             <TextInput 
                style = {Styles.textInput}
                autoCapitalize='none'
                placeholder='Enter Your Age'
                onChangeText={(value) => { setAge(value)}}
            />
            <TouchableOpacity style = {[{backgroundColor : 'green'},Styles.button]}
                onPress={saveData}
            >
                <Text style = {{color : 'white'}}>Login</Text>
            </TouchableOpacity>
        </View>
    )
}

export default Login