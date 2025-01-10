import { Image, StyleSheet, ScrollView, View, Text } from 'react-native';

export default function HikingScreen() {
  return (
    <ScrollView style={{flex:1}}>
      <View style={styles.titleContainer}>
        <Text>Hiking</Text>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  titleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  stepContainer: {
    gap: 8,
    marginBottom: 8,
  },
  reactLogo: {
    height: 178,
    width: 290,
    bottom: 0,
    left: 0,
    position: 'absolute',
  },
});
