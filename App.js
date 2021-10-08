import { StatusBar } from 'expo-status-bar';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { FontAwesome } from '@expo/vector-icons'; 
import React, { useEffect, useState } from 'react';
import {Text, View, TouchableOpacity, TextInput, ScrollView, Alert } from 'react-native';
import { AntDesign } from '@expo/vector-icons';
import { colors, styles } from './style';

const STORAGE_TODO ="@toDos";
const STORAGE_MENU = "@menu";

export default function App() {
  const [menu, setMenu] = useState();
  const [text, setText] = useState("");
  const [toDos, setToDos] = useState({});
  const [check, setCheck] = useState(false);
  const [deletBtn, setDeletBtn] = useState(false);

  useEffect(() => {
    loadToDos();
  }, []);

  const saveToDos = async (storageKey, toSave) => {
    try{
      await AsyncStorage.setItem(storageKey, JSON.stringify(toSave));
    }catch(e){
      console.log(e);
    }
  };
  const loadToDos = async () => {
    try{
      const list = await AsyncStorage.getItem(STORAGE_TODO);
      const menuState = await AsyncStorage.getItem(STORAGE_MENU);
      if(list === null){
        return;
      }
      if(menu === undefined){
        setMenu(true);
      }
      setToDos(JSON.parse(list));
      setMenu(Boolean(JSON.parse(menuState)));
    }catch(e){
      console.log(e);
    }
  };
  const work = async()=> {
    setMenu(true);
    await saveToDos(STORAGE_MENU, true);
  };
  const travel = async()=> {
    setMenu(false);
    await saveToDos(STORAGE_MENU, false)
  };
  const onChangeText = (typedWord) =>{
    setText(typedWord);
  };
  const inputSubmit = async () => {
    if(text === ""){
      return;
    }
    const newToDos = {...toDos, [Date.now()]: { text, menu, check }};
    setToDos(newToDos);
    await saveToDos(STORAGE_TODO, newToDos);
    setText("");
  };
  const deleteToDo = (key) => {
    Alert.alert("목록 삭제", "목록을 삭제하시겠어요?", [
      { text: "취소" },
      {
        text: "삭제",
        style: "destructive",
        onPress: () => {
          const newToDos = { ...toDos };
          delete newToDos[key];
          setToDos(newToDos);
          saveToDos(STORAGE_TODO, newToDos);
        },
      },
    ]);
  };
  const checkList = (key) => {
    let newToDos = {...toDos};
    if(newToDos[key].check){
      newToDos[key].check=false;
    }else{
      newToDos[key].check=true;
    }
    setToDos(newToDos);
  };
  const enableDeletBtn = () => {
    if(deletBtn){
      setDeletBtn(false);
    }else{
      setDeletBtn(true);
    }
  };

  return (
    <View style={styles.container}>

      <View style={styles.header}>
        <View style={{flexDirection:"row"}}>
          <TouchableOpacity style={{marginRight:25}} onPress={work}>
            <Text style={{...styles.textDeco, color: menu? "white": colors.disable}}>WORK</Text>
          </TouchableOpacity>
          {/* <Text style={{color:"white"}}>{menu? "true" : "false"}</Text> */}
          <TouchableOpacity onPress={travel}>
            <Text style={{...styles.textDeco, color: !menu? "white": colors.disable}}>TRAVEL</Text>
          </TouchableOpacity>
        </View>
        <TouchableOpacity style={{paddingBottom:6}} onPress={()=>enableDeletBtn()}>
          <AntDesign name="delete" size={deletBtn ? 25: 20} color={deletBtn ? "white": colors.disable} />
        </TouchableOpacity>
      </View>

      <View style={styles.inputContainer}>
        <TextInput 
          style={styles.inputBox}
          returnKeyType="done"
          placeholderTextColor="darkgrey" 
          placeholder={menu? "... what to do":"... where you travel"}
          value={text}
          onChangeText={onChangeText}
          onSubmitEditing={inputSubmit}
          />
      </View>

      <View style={{...styles.mainBox, display: menu? "flex":"none"}}>
        <ScrollView 
        style={styles.scrollBox}>
          {Object.keys(toDos).map((key) => (
            toDos[key].menu ? (<View key={key} style={styles.listBox}>
                <Text style={{...styles.listText, textDecorationLine:toDos[key].check ? "line-through":"none"}}>{toDos[key].text}</Text>
              <View style={{flexDirection:"row", alignItems:"center", justifyContent:"space-between"}}>
                <TouchableOpacity style={{display:deletBtn? "flex" : "none" }} onPress={() => deleteToDo(key)}>
                  <AntDesign name="delete" size={20} color="darkgrey" />
                </TouchableOpacity>
                <TouchableOpacity style={{display:deletBtn? "none" : "flex"}} onPress={() => checkList(key)}>
                  <FontAwesome name="check-circle" size={20} color="black" />
                </TouchableOpacity>
              </View>
            </View>):null
          ))}
        </ScrollView>
      </View>

      <View style={{...styles.mainBox, display: !menu? "flex":"none"}}>
      <ScrollView style={styles.scrollBox}>
        {Object.keys(toDos).map((key) => (
          !toDos[key].menu ? 
          (<View key={key} style={styles.listBox}>
              <Text style={{...styles.listText, textDecorationLine:toDos[key].check ? "line-through":"none"}}>{toDos[key].text}</Text>
              <View style={{flexDirection:"row", alignItems:"center", justifyContent:"space-between"}}>
                <TouchableOpacity style={{display:deletBtn? "flex" : "none" }} onPress={() => deleteToDo(key)}>
                  <AntDesign name="delete" size={20} color="darkgrey" />
                </TouchableOpacity>
                <TouchableOpacity style={{display:deletBtn? "none" : "flex"}} onPress={() => checkList(key)}>
                  <FontAwesome name="check-circle" size={20} color="black" />
                </TouchableOpacity>
              </View>
          </View>) : null
          ))}
      </ScrollView>
      </View>

      <StatusBar style="light" />
    </View>
  );
};
