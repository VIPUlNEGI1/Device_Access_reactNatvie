import React, { useState } from 'react';
import { Button, View, StyleSheet, SafeAreaViewBase, SafeAreaView } from 'react-native';
import PhotoSelectModal from './src/components/PhotoSelectModal/PhotoSetectModal';

const App = () => {
  const [modalVisible, setModalVisible] = useState(false);


  const onPressBtn=()=>{
    setModalVisible(!modalVisible)
  }
  return (

 <View style={{justifyContent:'center',alignItems:'center', marginTop:50}}>
      <Button title="Open Modal" onPress={(onPressBtn)} />
      {/* Modal component */}
      <PhotoSelectModal
        visible={modalVisible}
        onClose={() => setModalVisible(false)}
        />

   </View>
    
  );
};

export default App;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
