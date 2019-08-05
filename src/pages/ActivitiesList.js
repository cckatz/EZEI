import React from 'react';
import { StyleSheet, ScrollView, Text, View } from 'react-native';
import { Button } from 'react-native-elements';
import Collection from '../components/Collection';

export default function ActivitiesList(props) {

      const { navigation } = props;
      const skill = navigation.getParam("skill")

      const dailyActivities =  skill.dailyActivities;
      const games = skill.games;
  
      renderCollections = () => {
             return (
                <View>
                <Collection title="Daily Activities" items={dailyActivities} id={0} key={0} navigate={props.navigation.navigate}/>
                <Collection title="Games" items={games} id={1} key={1} navigate={props.navigation.navigate} />
                </View>
            )
      }

  // return (
  //   <View style={styles.container}>
  //     <Text style={styles.headlineText}>Activities List</Text>
  //     <View style={{justifyContent: 'center'}}>
  //       <Button title="Daily Routine" 
  //       buttonStyle={styles.buttonStyle} 
  //       titleStyle={{ fontSize: 25}} 
  //       containerStyle={styles.buttonContainer} 
  //       // onPress={() => props.navigation.navigate('')}
  //       />
  //       <Button title="Games" 
  //       buttonStyle={styles.buttonStyle} 
  //       titleStyle={{ fontSize: 25}} 
  //       containerStyle={styles.buttonContainer}
  //       />
  //       </View>


  //   </View>
  // );
  return (
             <View style={styles.container}>
             <Text style={styles.headlineText}>Activities List</Text>
                <ScrollView>
                    {this.renderCollections()}
                </ScrollView>
             </View>
  )
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
    marginBottom: 30,
    textDecorationLine: 'underline'
  }
});