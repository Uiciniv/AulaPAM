import { Camera, CameraType } from 'expo-camera';
import { useState } from 'react';
import { Button, StyleSheet, Text, TouchableOpacity, View, Image } from 'react-native';
import { Entypo } from '@expo/vector-icons';

export default function App(){
  const[type, setType] = useState(CameraType.back);
  const [permission, requestPermission] = Camera.useCameraPermissions();
  const [cameraRef, setCameraRef] = useState(null);
  const [photo, setPhoto] = useState(null);

  if (!permission) {

    return <View/>;
  }

  if (!permission.granted) {

    return(
      <View style={styles.container}>
        <Text style={{ textAlign: 'center' }}>Precisamos da sua permissão para mostrar a câmera</Text>
        <Button onPress={requestPermission} title="grant permission"/>
      </View>
    );
  }

  function toggleCameraType(){
    setType(current => (current === CameraType.back ? CameraType.front : CameraType.back));
  }

  return (
    <View style={styles.container}>
      <Camera style={styles.camera} type={type} ref={ref => {setCameraRef(ref);}}>
        <View style={styles.rodape}>
        <View style={styles.buttonContainer}>
            <TouchableOpacity style={styles.button} onPress={toggleCameraType}>
              <Entypo
              name="cw"
              size={24}
              color="white"/>
              <Text style={styles.text}>
                    Flip Camera
              </Text>
            </TouchableOpacity>
        </View>
        <View style={styles.buttonContainer}>
          <TouchableOpacity
          style={styles.button}
          onPress={async () =>{
            if(cameraRef){
              let photo = await cameraRef.takePicturesAsync();
              console.log('photo',photo);
              setPhoto(photo.uri);
            }}}>
              <Entypo
              name="camera"
              size={24}
              color="white"
              />
            <Text style={styles.text}>Tirar Foto</Text>
          </TouchableOpacity>  
        </View>
        </View>
      </Camera>
      {photo && <image source={{ uri:photo }} style={{ width: 200, height: 200}} />}
    </View>
  );
}