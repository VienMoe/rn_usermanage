// AddUser.js
import React, {useState} from 'react';
import {View, TextInput, Button, Text, StyleSheet} from 'react-native';
import firestore from './firebaseConfig';

const AddUser = ({onUserAdded}) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [age, setAge] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const addUser = async () => {
    setLoading(true);
    setError(null);

    try {
      const response = await firestore.collection('users').add({
        name,
        email,
        age: parseInt(age, 10),
      });
      onUserAdded(); // Notify parent component to refresh the user list
      alert('User added successfully!');
      setName('');
      setEmail('');
      setAge('');
    } catch (err) {
      setError('Error adding user');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Name"
        value={name}
        onChangeText={setName}
      />
      <TextInput
        style={styles.input}
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
      />
      <TextInput
        style={styles.input}
        placeholder="Age"
        value={age}
        onChangeText={setAge}
        keyboardType="numeric"
      />
      <Button title="Add User" onPress={addUser} disabled={loading} />
      {loading && <Text>Loading...</Text>}
      {error && <Text>{error}</Text>}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {padding: 20},
  input: {borderWidth: 1, borderColor: '#ccc', marginBottom: 10, padding: 10},
});

export default AddUser;
