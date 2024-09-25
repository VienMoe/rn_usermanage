import React, {useState} from 'react';
import {View, TextInput, Button, Text, StyleSheet} from 'react-native';
import firestore from './firebaseConfig';

const AddUser = ({onUserAdded}) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [age, setAge] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [inputError, setInputError] = useState({name: '', email: '', age: ''});

  const validateInputs = () => {
    let isValid = true;
    let errors = {name: '', email: '', age: ''};

    // Name validation: Only letters and spaces allowed
    const nameRegex = /^[A-Za-z\s]+$/;
    if (!nameRegex.test(name)) {
      errors.name = 'Name must only contain letters.';
      isValid = false;
    }

    // Email validation: Must be in valid email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      errors.email = 'Please enter a valid email.';
      isValid = false;
    }

    // Age validation: Only numbers allowed
    const ageRegex = /^[0-9]+$/;
    if (!ageRegex.test(age)) {
      errors.age = 'Age must only contain numbers.';
      isValid = false;
    }

    setInputError(errors);
    return isValid;
  };

  const addUser = async () => {
    if (!validateInputs()) {
      return;
    }

    setLoading(true);
    setError(null);

    try {
      await firestore.collection('users').add({
        name,
        email,
        age: parseInt(age, 10),
      });
      onUserAdded(); // Notify parent component to refresh user list
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
      {inputError.name ? (
        <Text style={styles.error}>{inputError.name}</Text>
      ) : null}

      <TextInput
        style={styles.input}
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
      />
      {inputError.email ? (
        <Text style={styles.error}>{inputError.email}</Text>
      ) : null}

      <TextInput
        style={styles.input}
        placeholder="Age"
        value={age}
        onChangeText={setAge}
        keyboardType="numeric"
      />
      {inputError.age ? (
        <Text style={styles.error}>{inputError.age}</Text>
      ) : null}

      <Button title="Add User" onPress={addUser} disabled={loading} />
      {loading && <Text>Loading...</Text>}
      {error && <Text>{error}</Text>}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {padding: 20},
  input: {borderWidth: 1, borderColor: '#ccc', marginBottom: 10, padding: 10},
  error: {
    color: 'red',
    marginBottom: 10,
  },
});

export default AddUser;
