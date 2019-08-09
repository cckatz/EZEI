import React, { Component } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Button } from 'react-native-elements';
import skills from '../data/Formatted.json';

export default class SkillsPage extends Component {

  static navigationOptions = () => {
  return(
      {title: 'EasyEI' } 
    )
  }


  renderButtons = (title, route)=> {
    return(
      <Button title={title}
      buttonStyle={styles.buttonStyle} 
      titleStyle={{ fontSize: 25}} 
      containerStyle={styles.buttonContainer} 
      onPress={() => this.props.navigation.navigate(route)}
      />
      );
  }
    render(){
    return (
      <View style={styles.container}>
      <Text style={styles.headlineText}> SKILLS </Text>
      <View style={{ height: 600, justifyContent: 'center'}}>
        <Button title="Cognitive" 
        buttonStyle={styles.buttonStyle} 
        titleStyle={{ fontSize: 25}} 
        containerStyle={styles.buttonContainer} 
        onPress={() => this.props.navigation.navigate('Detail', {
          skill: skills[0]
        })}
        />
        <Button title="Social / Emotional" 
        buttonStyle={styles.buttonStyle} 
        titleStyle={{ fontSize: 25}} 
        containerStyle={styles.buttonContainer}
        onPress={() => this.props.navigation.navigate('Detail', {
          skill: skills[1]
        })}
        />
        <Button title="Speech / Language" 
        buttonStyle={styles.buttonStyle} 
        titleStyle={{ fontSize: 25}} 
        containerStyle={styles.buttonContainer}
        onPress={() => this.props.navigation.navigate('Detail', {
          skill: skills[2]
        })}
        />
        <Button 
        title="Fine / Gross Motor" 
        buttonStyle={styles.buttonStyle} 
        titleStyle={{ fontSize: 25}} 
        containerStyle={styles.buttonContainer}
        onPress={() => this.props.navigation.navigate('Detail', {
          skill: skills[3]
        })}
        />
        <Button title="Executive Functioning" 
        buttonStyle={styles.buttonStyle} 
        titleStyle={{ fontSize: 25}} 
        containerStyle={styles.buttonContainer}
        onPress={() => this.props.navigation.navigate('Detail', {
          skill: skills[4]
        })}
        />
        </View>
      </View>
    );
  }
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
    fontSize: 50,
    fontFamily: 'Avenir',
    color: 'white',
    marginBottom: 20,
    textDecorationLine: 'underline'
  }
});
