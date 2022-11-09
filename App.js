import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';

import { NoderedUtil, WebSocketClient } from '@openiap/openflow-api';
import { useState, useEffect } from 'react';
import { ActivityIndicator } from 'react-native';
import { Card } from 'react-native-elements';

const useMountEffect = (fun) => useEffect(fun, [])

export default function App() {
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState({});
  useMountEffect(function () {
    var socket = new WebSocketClient(null, "wss://app.openiap.io");
    socket.events.on("onopen", async () => {
      const username = "username"; const password = "secretpassword";
      const result = await NoderedUtil.SigninWithUsername({ username, password, longtoken: true });
      console.log("signed in as " + result.user.name + " with id " + result.user._id, null);
      setLoading(false);
      setUser(result.user);
    });
    socket.Connect();
  });

  if (loading) {
    return (
      <View>
        <ActivityIndicator size="large" loading={loading} />
      </View>
    );
  }
  return (
    <View style={styles.container}>
      <Text>Open up App.js to start working on your app!</Text>
      <StatusBar style="auto" />
      <Card>
        <Card.Title>Hi {user.username}</Card.Title>
        <Text style={{ marginBottom: 10 }}>
          {user.name} {user.email}
        </Text>
      </Card>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
