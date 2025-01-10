import AsyncStorage from '@react-native-async-storage/async-storage'; 

export async function setItem(key:string,value:string){
  try{
    await AsyncStorage.setItem(key, value);
  }
  catch (error){
    console.log("Set Async Storage Fail",error);
  }
}

export async function getItem(key:string){
  try{
    const item = await AsyncStorage.getItem(key);
    return item ? item : undefined;
  }
  catch (error){
    console.log("Get Async Storage Fail",error);
    return undefined;
  }
}