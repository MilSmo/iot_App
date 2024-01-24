import React, { useState } from 'react';
import { View, Button, TextInput, StyleSheet } from 'react-native';
import { FIREBASE_AUTH, FIREBASE_DB } from '../../FirebaseConfig';
import { addDoc, collection } from 'firebase/firestore';

const AddDeviceScreen = ({ navigation }:any) => {
  const [deviceName, setDeviceName] = useState('');
  const [deviceType, setDeviceType] = useState('');
  const [deviceId, setDeviceId] = useState('');

  const addDevice = async () => {
    const user = FIREBASE_AUTH.currentUser;
    if (user) {
      await addDoc(collection(FIREBASE_DB, 'devices'), {
        name: deviceName,
        type: deviceType,
        userId: user.uid,
        deviceId: deviceId,
      });
      navigation.goBack();
    }
  };

  return (
    <View style={styles.container}>
      {/* <TextInput
        placeholder="Device Name"
        value={deviceName}
        onChangeText={setDeviceName}
        style={styles.input}
      /> */}
      <TextInput
        placeholder="Device Type"
        value={deviceType}
        onChangeText={setDeviceType}
        style={styles.input}
      />
      <TextInput
        placeholder="Device ID"
        value={deviceId}
        onChangeText={setDeviceId}
        style={styles.input}
        />
      <Button title="Add Device" onPress={addDevice} />
    </View>
  );
};

export default AddDeviceScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  input: {
    height: 40,
    margin: 12,
    borderWidth: 1,
    padding: 10,
    width: '80%',
  },
});
