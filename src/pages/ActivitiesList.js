import React, {Component} from 'react';
import { StyleSheet, ScrollView, Text, Button, View } from 'react-native';
// import { Button } from 'react-native-elements';
import Collection from '../components/Collection';

export default class ActivitiesList extends Component {

 static navigationOptions = ({navigation}) => {
  console.log(navigation.getParam("skill").title)
  return(
      {
        title: `${navigation.getParam("skill").title} Skills`,
        headerRight: <Button onPress={() => alert('This is a button!')} title="+" color="#000"
      />

      } 
    )
  }

     
      renderCollections = () => {
            const { navigation } = this.props;
            const skill = navigation.getParam("skill")

            const dailyActivities =  skill.dailyActivities;
            const games = skill.games;
            const itemTitle = skill.title
  
             return (
                <View>
                <Collection title="Daily Activities" items={dailyActivities} itemsTitle={itemTitle} id={0} key={0} navigate={this.props.navigation.navigate}/>
                <Collection title="Games" items={games} id={1} key={1} itemsTitle={itemTitle} navigate={this.props.navigation.navigate} />
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
    render(){
    return (
               <View style={styles.container}>
                  <ScrollView>
                      {this.renderCollections()}
                  </ScrollView>
               </View>
    )
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
    marginBottom: 30,
    textDecorationLine: 'underline'
  }
});