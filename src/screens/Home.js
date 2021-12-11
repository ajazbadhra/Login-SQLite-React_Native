import React,{useState,useEffect} from 'react'
import { Text, View, TouchableOpacity, Alert} from 'react-native'
import Styles from '../styles/Style'
import { TextInput } from 'react-native-gesture-handler';
import sqlite from 'react-native-sqlite-storage';
import { useCardAnimation } from '@react-navigation/stack';

const db = sqlite.openDatabase({
    name : 'mainDB',
    location : 'default'
    },
    ()=>{},
    err => {console.log(err)}
)

const Home = ({navigation}) => {

    useEffect(()=>{
        getData()
    },[])

    const [name, setName] = useState('')
    const [age,setAge] = useState('')

    const getData = async () =>{
        try{
            await db.transaction(async (tx) => {
                await tx.executeSql(
                    'SELECT Name, Age from Users',
                    [],
                    (tx, results) => {
                        if(results.rows.length > 0){
                            var userName = results.rows.item(0).Name;
                            var Age = results.rows.item(0).Age;
                            setName(userName)
                            setAge(Age)
                        }
                    }
                )
            })
        }catch(err){
            console.log('getItem Error ',err)
        }
    }

    const updateData = async () =>{
        if(name.length == 0 ){
            Alert.alert('Warning!', 'You Must Have to enter UserName')
        }
        else {
            try{
                await db.transaction(async (tx)=>{
                    await tx.executeSql(
                        'UPDATE Users SET Name=?',
                        [name],
                        ()=>{Alert.alert('Success','Updated Successfully..')},
                        err => {console.log(err)}
                    )
                })
            }catch(err){
                console.log(err)
            }
        }
    }

    const deleteData = async () =>{
            try{
                await db.transaction(async (tx)=> {
                    await tx.executeSql(
                        'DELETE from Users',
                        [],
                        ()=> {
                            navigation.navigate('Login')
                        },
                        err => {console.log(err)}
                    )
                })
                
            }catch(err){
                console.log(err)
            }
    }


    return (
        <View style = {Styles.container}>
            <Text style = {Styles.text}>You Loged in with {name}</Text>
            <Text style = {Styles.text}>Your Age is {age}</Text>
            <TextInput 
                style = {Styles.textInput}
                value = {name}
                onChangeText={(value)=>{setName(value)}}
            />
            <TouchableOpacity style = {[{backgroundColor : 'blue'} ,Styles.button]}
                onPress={updateData}
            >
                <Text style = {{color : 'white'}}>Update</Text>
            </TouchableOpacity>
            <TouchableOpacity style = {[{backgroundColor : 'red'} ,Styles.button]}
                onPress={deleteData}
            >
                <Text style = {{color : 'white'}}>Delete</Text>
            </TouchableOpacity>
        </View>
    )
}

export default Home