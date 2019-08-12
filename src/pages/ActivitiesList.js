import React, {Component} from 'react';
import { StyleSheet, AsyncStorage, ScrollView, Text, Button, View } from 'react-native';
// import { Button } from 'react-native-elements';
import Collection from '../components/Collection';
import Dialog from 'react-native-dialog';
import { FloatingAction } from "react-native-floating-action";
import { Ionicons } from '@expo/vector-icons';


export default class ActivitiesList extends Component {

constructor(props){
  super(props);

  const { navigation } = props;
  const skill = navigation.getParam("skill")

  const dailyActivities =  skill.dailyActivities;
  const games = skill.games;
  const itemTitle = skill.title

  this.state = {itemTitle: itemTitle, visible: false, activities: [...dailyActivities], games: [...games], activityName: '', gameName: '' }

  // this._retrieveData()

}



 static navigationOptions = ({navigation}) => {
  console.log(navigation.getParam("skill").title)
  return(
      {
        title: `${navigation.getParam("skill").title} Skills`,

      } 
    )
  }

    // componentWillMount = async () => {
    //   console.log("in cwm")
    //     var savedActivities = [];
    //     savedActivities = await this._retrieveData()      
    // }

      _storeData = async () => {
        try {
          console.log(`trying to save: localactivities+${this.state.itemTitle}`)
          await AsyncStorage.setItem(`localactivities+${this.state.itemTitle}`, JSON.stringify(this.state.activities));
        } catch (error) {
          // Error saving data
          console.log(error)
        }
      }

      _retrieveData = async () => {
        try {
          console.log(`trying to pull: localactivities+${this.state.itemTitle}`)
          const value = await AsyncStorage.getItem(`localactivities+${this.state.itemTitle}`);
          if (value !== null) {
            // We have data!!
            // let json = await value.json()
            console.log("we have data")
            return value
          }
        } catch (error) {
          // Error retrieving data
          console.log(error)
        }
    }

      renderPopUp = () => {
        this.setState({visible: true})
      }

      saveNewEIResource = async () => {
        /* {
        "title": "Reading a book",
        "byAge": [
          { "age":"0-8 months", "data": [{
            "goal": "Initiating and maintaining eye contact",
            "instructions": "Hold the child closely or place in an infant seat and read short books, pausing now and then to see if the child looks at you."
          }]}, */
        console.log(this.state.activityName)
        await this.setState({activities: [...this.state.activities, {title: this.state.activityName, byAge:[]}], visible: false})
        await this._storeData()
        // console.log(this.state.activities)
      }


     
      renderCollections = () => {
            const { navigation } = this.props;
            const skill = navigation.getParam("skill")

            const dailyActivities =  skill.dailyActivities;
            const games = skill.games;
            const itemTitle = skill.title
  
             return (
                <View>
                <Collection title="Daily Activities" items={this.state.activities} itemsTitle={itemTitle} id={0} key={0} navigate={this.props.navigation.navigate}/>
                <Collection title="Games" items={this.state.games} id={1} key={1} itemsTitle={itemTitle} navigate={this.props.navigation.navigate} />
                  <Dialog.Container visible={this.state.visible}>
                    <Dialog.Title>{`Add a new ${this.state.name}!`}</Dialog.Title>
                    <Dialog.Description>
                      {`Do you want to add a new EI ${this.state.name} for the community?`}
                    </Dialog.Description>
                    <Dialog.Input label={`${this.state.name} name`} onChangeText={(activityName) => this.setState({activityName})}/>
                    <Dialog.Button label="Save" onPress={()=>{this.saveNewEIResource()}}/>
                    <Dialog.Button label="Cancel" onPress={()=>{this.setState({visible: false, activityName: ''})}}/>
                  </Dialog.Container>

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
      const actions = [
    {
      text: "Add a new Game",
      icon: require("../../assets/puzzle.png"),
      name: "Game",
      color: "#b6c1ff",
      position: 2
    },
    {
      text: "Add a new Activity",
      icon: require("../../assets/maternity.png"),
      name: "Activity",
      color: "#b6c1ff",
      position: 1
    },
  ];
    return (
               <View style={styles.container}>
                  <ScrollView>
                      {this.renderCollections()}
                  </ScrollView>
                   <FloatingAction
                    color = "#b6c1ff"
                    actions={actions}
                    onPressItem={name => {
                      console.log(`selected button: ${name}`);
                      this.setState({ visible: true, name })
                    }}
                  />
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