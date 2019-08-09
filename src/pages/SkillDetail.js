import React from 'react';
import { StyleSheet, Text, Image, View } from 'react-native';
import { Button } from 'react-native-elements';

export default function SkillDetail(props) {
  const { navigation } = props;
  const skill = navigation.getParam("skill")

  console.log(skill)

  return (
    <View style={styles.container}>
      <Text style={styles.headlineText}>{skill.title}</Text>
      <Image />
      <Text style={styles.descriptionText}>
        {skill.definition}
      </Text>
      <View style={{ marginTop: 10, justifyContent: 'center'}}>
        <Button title="Activities" buttonStyle={styles.buttonStyle} titleStyle={{ fontSize: 25}} containerStyle={styles.buttonContainer} onPress={() => props.navigation.navigate('Activities', {skill: skill})}/>
        <Button title="Resources" buttonStyle={styles.buttonStyle} titleStyle={{ fontSize: 25}} containerStyle={styles.buttonContainer}/>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffb6c1',
    alignItems: 'center',
    // justifyContent: 'center',
  },
  buttonStyle: {
    backgroundColor: '#b6c1ff',
    height: 100
  },
  buttonContainer: {
    width: 300,
    marginBottom: 20,
  },
  headlineText: {
    fontSize: 40,
    fontFamily: 'Avenir',
    color: 'white',
    marginBottom: 10,
    textDecorationLine: 'underline'
  },
  descriptionText: {
    marginLeft: 30, 
    marginRight: 30,
    fontSize: 18,
    fontFamily: 'Avenir'

  }
});
