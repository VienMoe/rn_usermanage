import React, {useState} from 'react';
import {SafeAreaView, StyleSheet} from 'react-native';
import AddUser from './AddUser';
import UserList from './UserList';
import UpdateUser from './UpdateUser';

const App = () => {
  const [refresh, setRefresh] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);

  const handleUserAdded = () => {
    setRefresh(!refresh);
  };

  const handleUserUpdated = () => {
    setRefresh(!refresh);
    setSelectedUser(null); // Reset selected user after update
  };

  const handleCancel = () => {
    setSelectedUser(null); // Reset selected user when user cancels update
  };

  return (
    <SafeAreaView style={styles.container}>
      {selectedUser ? (
        <UpdateUser
          user={selectedUser}
          onUserUpdated={handleUserUpdated}
          onCancel={handleCancel} // Pass cancel handler to UpdateUser
        />
      ) : (
        <>
          <AddUser onUserAdded={handleUserAdded} />
          <UserList
            onUserUpdated={handleUserUpdated}
            setSelectedUser={setSelectedUser}
          />
        </>
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {flex: 1, padding: 20},
});

export default App;
