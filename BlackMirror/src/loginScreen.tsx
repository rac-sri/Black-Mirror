import React from 'react';
import {Text, View, TextInput, Button, StyleSheet} from 'react-native';

export default function LoginScreen() {
  const [value, onChangeText] = React.useState('Enter Your Name');

  return (
    <View>
      <TextInput
        style={{height: 40, borderColor: 'black', borderWidth: 1}}
        onChangeText={(text) => onChangeText(text)}
        value={value}
        onFocus={() => onChangeText('')}
      />
      <Text>
        By clicking "join", you have read and agree to the Terms of Service and
        Privacy Policy
      </Text>
      <Button onPress={/*auth*/ () => {}} title="Join" color="transparant" />
    </View>
  );
}

const styles = StyleSheet.create({
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
    color: '#ffffff',
  },
});
