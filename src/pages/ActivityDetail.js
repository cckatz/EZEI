import React, {Component} from 'react';
import { StyleSheet, ScrollView, Button, Text, View, AsyncStorage } from 'react-native';
import AccordionView from '../components/AccordionView';
import Dialog from 'react-native-dialog';
import { FloatingAction } from "react-native-floating-action";
import { connect } from 'react-redux';
import { addGoal, fetchGoals, fetchActivities } from '../actions';

const SECTIONS = [
  {
    title: 'First',
    content: 'Lorem ipsum...',
  },
  {
    title: 'Second',
    content: 'Lorem ipsum...',
  },
];
 
class ActivityDetail extends Component {

  constructor(props){
    super(props)

        const { navigation } = this.props;
        const activity = navigation.getParam("data")

        var ourSections = activity.byAge.map((activityObject)=>{
          return {
            title: activityObject.age,
            content: [...activityObject.data]
          }
        })

        this.state = {sections: ourSections}
        this._retrieveSections()
        // this.props.fetchGoals('8AtFxlEYqVE0mGYcv33T')
  }

     static navigationOptions = ({navigation}) => {
     	// console.log(navigation)
     	return(
        	{
        		title: navigation.getParam("title"),
        	})
    }

      updateSections = (data) => {
          if(this.state.sections.length == 0){
            return [{title: this.state.ageGroup, content: [data]}]
          } else{
             var ourSections = this.state.sections.map((section)=>{
              if(this.state.ageGroup == section.title){
                return {
                  title: section.title,
                  content: [...section.content, data]
                }
              }
                else{
                  return section
                }
            })

            return ourSections
          }
       
  }
      saveNewEIResource = async () => {
        var newSections = this.updateSections({goal: this.state.goalName, instructions: this.state.goalObjective});
        await this.setState({sections:newSections, visible: false})
        // await this.setState({sections: [...this.state.sections, {title: this.state.ageGroup, content:[{goal: this.state.goalName, instructions: this.state.goalObjective}]}], visible: false})
        console.log(this.state.sections)
        await this._storeSections()
        // await this.props.addGoal(skillId, activity.id, {age: this.state.ageGroup, data:[{goal: this.state.goalName, instructions: this.state.goalObjective}]})
        // await this.props.addGoal('8AtFxlEYqVE0mGYcv33T', {title: this.state.ageGroup, content:[{goal: this.state.goalName, instructions: this.state.goalObjective}]})
      }

       _storeSections = async () => {
        try {
          console.log(`trying to save: sections+${this.props.navigation.getParam("title")}`)
          await AsyncStorage.setItem(`sections+${this.props.navigation.getParam("title")}`, JSON.stringify(this.state.sections));
        } catch (error) {
          // Error saving data
          console.log(error)
        }
      }

      _retrieveSections = async () => {
        try {
          console.log(`trying to pull: localactivities+${this.state.itemTitle}`)
          const value = await AsyncStorage.getItem(`sections+${this.props.navigation.getParam("title")}`);
          if (value !== null) {
            // We have data!!
            // let json = await value.json()
            console.log("we have data")
            await this.setState({sections: value})
            return value
          }
        } catch (error) {
          // Error retrieving data
          console.log(error)
        }
    }




	render(){

      const actions = [
      {
        text: "Add a new Goal",
        icon: require("../../assets/maternity.png"),
        name: "Activity",
        color: "#b6c1ff",
        position: 1
      },
    ];

		const { navigation } = this.props;
      	const activity = navigation.getParam("data")

      	// console.log(activity.byAge)

 	 
		const ourSections = activity.byAge.map((activityObject)=>{
		 	return {
		 		title: activityObject.age,
		 		content: [...activityObject.data]
		 	}
		 })
	  return (
      <View>
	  		<ScrollView style={{backgroundColor: '#ffb6c1'}}>
	    	<AccordionView data={this.state.sections}/>
        <Dialog.Container visible={this.state.visible}>
                    <Dialog.Title>{`Add some new goals and objectives by age!`}</Dialog.Title>
                    <Dialog.Description>
                      {`What age group does this goal serve?`}
                    </Dialog.Description>
                    <Dialog.Input label={`Age Group`} onChangeText={(ageGroup) => this.setState({ageGroup})}/>
                    <Dialog.Description>
                      {`What is the goal?`}
                    </Dialog.Description>
                    <Dialog.Input label={`Goal`} onChangeText={(goalName) => this.setState({goalName})}/>
                    <Dialog.Description>
                      {`What are the objectives and directions?`}
                    </Dialog.Description>
                    <Dialog.Input label={`Objective`} onChangeText={(goalObjective) => this.setState({goalObjective})}/>
                    <Dialog.Button label="Save" onPress={()=>{this.saveNewEIResource()}}/>
                    <Dialog.Button label="Cancel" onPress={()=>{this.setState({visible: false, activityName: ''})}}/>
        </Dialog.Container>

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
	  );
	}
}


export default connect(null, { addGoal,fetchGoals })(ActivityDetail)

/*
import React, {Component} from 'react';
import { StyleSheet, ScrollView, Button, Text, View } from 'react-native';
import AccordionView from '../components/AccordionView';
import Dialog from 'react-native-dialog';
import { FloatingAction } from "react-native-floating-action";
import { connect } from 'react-redux';
import { addGoal, fetchGoals, fetchActivities } from '../actions';

const SECTIONS = [
  {
    title: 'First',
    content: 'Lorem ipsum...',
  },
  {
    title: 'Second',
    content: 'Lorem ipsum...',
  },
];
 
class ActivityDetail extends Component {

  constructor(props){
    super(props)

        const { navigation } = this.props;
        const activity = navigation.getParam("data")
        const skillId = navigation.getParam("skillId")

        const ourSections = activity.byAge.map((activityObject)=>{
          return {
            title: activityObject.age,
            content: [...activityObject.data]
          }
        })

        this.state = {activity: activity, skillId, sections: this.createSections()}
        // this.props.fetchGoals('8AtFxlEYqVE0mGYcv33T')
  }

  createSections = () => {
        var ourSections = this.state.activity.byAge.map((activityObject)=>{
          return {
            title: activityObject.age,
            content: [...activityObject.data]
          }
        })

        return ourSections
  }

 static navigationOptions = ({navigation}) => {
  // console.log(navigation)
  return(
      {
        title: navigation.getParam("title"),
      })
}

      saveNewEIResource = async () => {
        console.log(this.state.goalName)
        await this.setState({sections: [...this.state.sections, {title: this.state.ageGroup, content:[{goal: this.state.goalName, instructions: this.state.goalObjective}]}], visible: false})
        // console.log(this.state.activities)
        console.log(this.props.activityCreate)
        // await this.props.addGoal(this.state.skillId, this.state.activity.id, [...this.state.activity.byAge, {age: this.state.ageGroup, data:[{goal: this.state.goalName, instructions: this.state.goalObjective}]}])
        // await this.props.addGoal('8AtFxlEYqVE0mGYcv33T', {title: this.state.ageGroup, content:[{goal: this.state.goalName, instructions: this.state.goalObjective}]})
      }



  render(){

      const actions = [
      {
        text: "Add a new Goal",
        icon: require("../../assets/maternity.png"),
        name: "Activity",
        color: "#b6c1ff",
        position: 1
      },
    ];

    const { navigation } = this.props;
        const activity = navigation.getParam("data")

        // console.log(activity.byAge)

   
    const ourSections = activity.byAge.map((activityObject)=>{
      return {
        title: activityObject.age,
        content: [...activityObject.data]
      }
     })
    return (
      <View>
        <ScrollView style={{backgroundColor: '#ffb6c1'}}>
        <AccordionView data={this.state.sections}/>
        <Dialog.Container visible={this.state.visible}>
                    <Dialog.Title>{`Add some new goals and objectives by age!`}</Dialog.Title>
                    <Dialog.Description>
                      {`What age group does this goal serve?`}
                    </Dialog.Description>
                    <Dialog.Input label={`Age Group`} onChangeText={(ageGroup) => this.setState({ageGroup})}/>
                    <Dialog.Description>
                      {`What is the goal?`}
                    </Dialog.Description>
                    <Dialog.Input label={`Goal`} onChangeText={(goalName) => this.setState({goalName})}/>
                    <Dialog.Description>
                      {`What are the objectives and directions?`}
                    </Dialog.Description>
                    <Dialog.Input label={`Objective`} onChangeText={(goalObjective) => this.setState({goalObjective})}/>
                    <Dialog.Button label="Save" onPress={()=>{this.saveNewEIResource()}}/>
                    <Dialog.Button label="Cancel" onPress={()=>{this.setState({visible: false, activityName: ''})}}/>
        </Dialog.Container>

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
    );
  }
}


export default connect(null, { addGoal,fetchGoals })(ActivityDetail)

*/
