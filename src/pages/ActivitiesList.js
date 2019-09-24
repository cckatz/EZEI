import React, {Component} from 'react';
import { StyleSheet, AsyncStorage, ScrollView, Text, Button, View } from 'react-native';
// import { Button } from 'react-native-elements';
import Collection from '../components/Collection';
import Dialog from 'react-native-dialog';
import { FloatingAction } from "react-native-floating-action";
import { Ionicons } from '@expo/vector-icons';
import { connect } from 'react-redux';
import { activityCreate, activitiesFetch } from '../actions/';



class ActivitiesList extends Component {

constructor(props){
  super(props);

  const { navigation } = props;
  const skill = navigation.getParam("skill")

  const dailyActivities =  skill.dailyActivities;
  const games = skill.games;
  const itemTitle = skill.title

  // let activities = skill.list.map((skill)=>{
  //   return skill 
  // })
  // console.log(activities)
  this.state = {id: skill.id, itemTitle: itemTitle, visible: false, activities:dailyActivities, games: [], activityName: '', gameName: '' }

  console.log('in constuctor')
  props.activitiesFetch()
}

// componentDidMount(){
//     // this._retrieveData()

// }


 static navigationOptions = ({navigation}) => {
  console.log(navigation.getParam("skill").title)
  return(
      {
        title: `${navigation.getParam("skill").title} Skills`,

      } 
    )
  }
      componentDidUpdate = (prevProps, prevState) => {
        console.log('ACTIVITIES LIST component did update')
        // console.log(this.state, this.props)
        console.log(this.props.activityList[0].list.length)
      }

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

        if(this.state.name == "Activity"){

        console.log(this.state.activityName)
        var name = this.state.activityName
        await this.setState({activities: [...this.state.activities, {title: this.state.activityName, byAge:[]}], visible: false})
        await this._storeData()
      }
      else{
        await this.setState({games: [...this.state.games, {title: this.state.activityName, byAge:[]}], visible: false})
        await this._storeData()
      }
        // this.props.activityCreate(this.state.activityName, "daily activity", this.state.id)
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
                <Collection title="Daily Activities" items={this.state.activities} itemsTitle={itemTitle} id={this.state.id} key={0} navigate={this.props.navigation.navigate}/>
                <Collection title="Games" items={this.state.games} id={this.state.id} key={1} itemsTitle={itemTitle} navigate={this.props.navigation.navigate} />
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

const mapStateToProps = (state) => {
  const { activityList } = state.activities;
  return { activityList };
};

export default connect(mapStateToProps, {activityCreate, activitiesFetch})(ActivitiesList);
