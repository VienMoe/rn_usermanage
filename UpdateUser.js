import React, {useState} from 'react';
import {View, TextInput, Button, StyleSheet, Text, Alert} from 'react-native';
import firestore from './firebaseConfig';

const UpdateUser = ({user, onUserUpdated, onCancel}) => {
  const [name, setName] = useState(user.name);
  const [email, setEmail] = useState(user.email);
  const [age, setAge] = useState(user.age.toString());
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const updateUser = async () => {
    setLoading(true);
    setError(null);

    try {
      await firestore
        .collection('users')
        .doc(user.id)
        .update({name, email, age: parseInt(age, 10)});
      alert('User updated successfully!');
      onUserUpdated(); // Notify parent to refresh user list
    } catch (err) {
      setError('Error updating user');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const deleteUser = async () => {
    Alert.alert(
      'Delete User',
      'Are you sure you want to delete this user?',
      [
        {text: 'Cancel', style: 'cancel'},
        {
          text: 'Delete',
          style: 'destructive',
          onPress: async () => {
            setLoading(true);
            setError(null);
            try {
              await firestore.collection('users').doc(user.id).delete();
              alert('User deleted successfully!');
              onUserUpdated(); // Notify parent to refresh user list
            } catch (err) {
              setError('Error deleting user');
              console.error(err);
            } finally {
              setLoading(false);
            }
          },
        },
      ],
      {cancelable: true},
    );
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
      <View style={styles.buttonContainer}>
        <Button title="Update User" onPress={updateUser} disabled={loading} />
        <Button title="Cancel" onPress={onCancel} color="red" />
      </View>
      <View style={styles.buttonContainer}>
        <Button
          title="Delete User"
          onPress={deleteUser}
          color="red"
          disabled={loading}
        />
      </View>
      {loading && <Text>Loading...</Text>}
      {error && <Text>{error}</Text>}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {padding: 20},
  input: {borderWidth: 1, borderColor: '#ccc', marginBottom: 10, padding: 10},
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10, // Add space between buttons
  },
});

export default UpdateUser;
