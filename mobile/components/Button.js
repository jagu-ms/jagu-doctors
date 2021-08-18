import React from 'react';
import { View, TouchableOpacity, Text, StyleSheet } from 'react-native';

export default ({ onPress, text, buttonStyles, textStyles }) => (
  <View style={styles.container}>
    <TouchableOpacity
      onPress={onPress}

    >
      <View style={[styles.button, buttonStyles]}>
        <Text style={[styles.text, textStyles]}>{text}</Text>
      </View>
    </TouchableOpacity>
  </View>
);

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  button: {
    paddingVertical: 12,
    paddingHorizontal: 40,
    backgroundColor: '#228B22',
    borderRadius: 2,
    alignItems: 'center',
    justifyContent: 'center',
    minWidth: 200,
  },
  text: {
    fontSize: 18,
    color: '#fff',
    textAlign: 'center',
    alignSelf: 'center',
    lineHeight: 20,
  },
});
