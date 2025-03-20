import { View, Text, StyleSheet, Platform } from 'react-native';
import { ImageClassificationCameraView, useCameraPermissions, ClassificationResult } from '@/modules/image-classification-camera/';
import { useEffect, useState } from 'react';
import Sizes from '@/constants/Sizes';

function IOSCameraScreen(){
  return (
    <View style={[styles.container,{backgroundColor:'#000000'}]}>
      <Text style={[styles.permissionMsg,{color:'#ffffff'}]}>Function is not supported at this moment</Text>
    </View>
  );
}

function AndroidCameraScreen() {

  const [permission, requestPermission] = useCameraPermissions();
  const [result, setResult] = useState<ClassificationResult>({
    label:"--",
    score:"--"
  });
  useEffect(() => {
    if(!permission?.granted){
      requestPermission();
    }
  },[permission])

  if (!permission || !permission.granted) {
    // Camera permissions are not granted yet.
    return (
      <View style={styles.container}>
        <Text style={styles.permissionMsg}>We need your permission to show the camera</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <ImageClassificationCameraView 
        style={{ flex: 1, backgroundColor:'#000000' }} 
        onClassificationResult={(result:ClassificationResult) => setResult(result)}  
      />
      <View style={styles.resultRow}>
        <Text style={styles.resultValue}>{result.label}</Text>
        <Text style={styles.resultValue}>{result.score}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent:'center',
    alignItems:'center',
  },
  resultRow:{
    flexDirection:'row',
    padding:5,
  },
  resultValue: {
    flex:1,
    fontSize: Sizes.fonts.large,
    color:"#000000",
    textAlign:'center'
  },
  permissionMsg:{
    fontSize: Sizes.fonts.medium,
    textAlign:'center'
  }
});

export default function CameraScreen(){
  return Platform.OS == 'android' ? AndroidCameraScreen() : IOSCameraScreen() 
}