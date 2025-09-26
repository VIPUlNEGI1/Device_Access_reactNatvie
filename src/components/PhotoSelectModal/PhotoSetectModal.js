import React, { useState } from 'react';
import { Modal, StyleSheet, Text,Image, TouchableOpacity, View } from 'react-native';
import { launchCamera,launchImageLibrary } from 'react-native-image-picker';
import { check, request, PERMISSIONS, RESULTS } from 'react-native-permissions';
 
const PhotoSelectModal = ({ visible, onClose }) => {
const [image , Setimage]= useState(null)
const [clickPhoto, SetclickPhoto] = useState(null)
const verifyPermissions = async () => {
	 const cameraPermission =
      Platform.OS === 'ios'
        ? PERMISSIONS.IOS.CAMERA
        : PERMISSIONS.ANDROID.CAMERA;
    const status = await check(cameraPermission);
    if (status === RESULTS.DENIED) {
      const result = await request(cameraPermission);
      return result === RESULTS.GRANTED;
    }
    return status === RESULTS.GRANTED;
}


const OpenCamera= async () => {
 const hasPermission = await verifyPermissions();
    if (!hasPermission) {
      Alert.alert(
        'Insufficient Permissions!',
        'You need to grant camera permissions to use this app.'
      );
      return;
    }

    try {
      const result = await launchCamera({
        mediaType: 'photo',
        cameraType: 'back',
        saveToPhotos: true,
        quality: 0.5,
      });

      if (result.didCancel) {
        console.log('User cancelled camera');
        return;
      }
      if (result.errorCode) {
        Alert.alert('Error', result.errorMessage || 'Something went wrong');
        return;
      }

      const uri = result.assets?.[0]?.uri;
     SetclickPhoto(uri);
      console.log('Image URI:', uri);
    } catch (err) {
      console.error('Camera error:', err);
      Alert.alert('Error', 'Failed to take image.');
    }

}


const Uploadephoto = async () => {


 const hasPermission = await verifyPermissions();
    if (!hasPermission) {
      Alert.alert(
        'Insufficient Permissions!',
        'You need to grant camera permissions to use this app.'
      );
      return;
    }

    try {
      const result =  launchImageLibrary({
        mediaType: 'photo',
        saveToPhotos: true,
        quality: 0.5,
      });
console.log('uploaderesult', result)
      if (result.didCancel) {
        console.log('User cancelled Image');
        return;
      }
      if (result.errorCode) {
        Alert.alert('Error', result.errorMessage || 'Something went wrong');
        return;
      }

      const uri = result.assets?.[0]?.uri;
      Setimage(uri);
      console.log('Image URI:', uri);
    } catch (err) {
      console.error('uploade ', err);
      Alert.alert('Error', 'Failed to uploade image.');
    }

}
 





const renderPhotoSelectModal = ()=>{
	return(
   <Modal
      animationType="fade"
      transparent={true}
      visible={visible}
      onRequestClose={onClose}
	  
    >
      <View style={styles.centeredView}>

		 <Image
          source={{ uri: clickPhoto }}
          style={{ width: 200, height: 200, marginTop: 10 }}
        />
		 <Image
          source={{ uri:  image}}
          style={{ width: 200, height: 200, marginTop: 10 }}
        />
        <View style={styles.modalView}>
          <TouchableOpacity onPress={OpenCamera}>

		  <Text style={styles.modalText}>Open Camera</Text>
		 </TouchableOpacity>
          <TouchableOpacity style={[styles.button, styles.buttonClose]} onPress={Uploadephoto}>
            <Text style={styles.textStyle}>Uploade photo</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
	)
}


  return (
   <View>
	
	{renderPhotoSelectModal()}

   </View>
  );
};

export default PhotoSelectModal;

const styles = StyleSheet.create({
  centeredView: {
	marginTop:20,
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  modalView: {
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 35,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  button: {
    borderRadius: 5,
    padding: 10,
    elevation: 2,
  },
  buttonClose: {
    backgroundColor: '#2196F3',
    marginTop: 10,
  },
  textStyle: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  modalText: {
    marginBottom: 15,
    textAlign: 'center',
  },
});
