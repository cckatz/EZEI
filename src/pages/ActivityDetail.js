import React, {Component} from 'react';
import { StyleSheet, ScrollView, Button, Text, View } from 'react-native';
import Accordion from 'react-native-collapsible/Accordion';
 
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
 
class AccordionView extends Component {
  state = {
    activeSections: [],
  };
 
  _renderSectionTitle = section => {
  	// AGE GROUP
    return (
      <View style={styles.content}>
        <Text style={{color: 'black', fontWeight:'bold'}}>{section.title}</Text>
      </View>
    );
  };
 
  _renderHeader = section => {
  	//GOALS
    return (
      <View style={styles.header}>
        <Text style={styles.headerText}>Goals</Text>
      </View>
    );
  };
 
  _renderContent = section => {
    return (
      <View style={styles.content}>
      	{section.content.map((goalData, i)=>{
      		return(
      			<View key={i} style={{marginBottom: 10}}>
      			<Text style={{fontSize: 20, fontWeight: 'bold'}}>{goalData.goal}</Text>
      			<Text>{goalData.instructions}</Text>
      			</View>
      		)
      	})}
      </View>
    );
  };
 
  _updateSections = activeSections => {
    this.setState({ activeSections });
  };
 
  render() {
    return (
      <Accordion
      	containerStyle={{height: 1000, backgroundColor: '#ffb6c1'}}
        sections={this.props.data}
        activeSections={this.state.activeSections}
        renderSectionTitle={this._renderSectionTitle}
        renderHeader={this._renderHeader}
        renderContent={this._renderContent}
        onChange={this._updateSections}
      />
    );
  }
}

const styles = StyleSheet.create({
  container: {
    // backgroundColor: 'black',
    // paddingTop: Constants.statusBarHeight,
  },
  title: {
    textAlign: 'center',
    fontSize: 22,
    fontWeight: '300',
    marginBottom: 20,

  },
  header: {
    backgroundColor: '#b6c1ff',
    padding: 10,
  },
  headerText: {
    textAlign: 'center',
    fontSize: 16,
    fontWeight: '500',
    color: 'white',
    fontWeight: 'bold',

  },
  content: {
    padding: 20,
    // backgroundColor: '#fff',
    backgroundColor: 'transparent',

  },
  active: {
    backgroundColor: 'rgba(255,255,255,1)',
  },
  inactive: {
    backgroundColor: 'rgba(245,252,255,1)',
  },
  selectors: {
    marginBottom: 10,
    flexDirection: 'row',
    justifyContent: 'center',
  },
  selector: {
    backgroundColor: '#F5FCFF',
    padding: 10,
  },
  activeSelector: {
    fontWeight: 'bold',
  },
  selectTitle: {
    fontSize: 14,
    fontWeight: '500',
    padding: 10,
  },
  multipleToggle: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginVertical: 30,
    alignItems: 'center',
  },
  multipleToggle__title: {
    fontSize: 16,
    marginRight: 8,
  },
});

export default class ActivityDetail extends Component {

 static navigationOptions = ({navigation}) => {
 	console.log(navigation)
 	return(
    	{
    		title: navigation.getParam("title"),
    	})
}


	render(){

		const { navigation } = this.props;
      	const activity = navigation.getParam("data")

      	console.log(activity.byAge)

               //       "byAge":[
               //     { "0-8 months" : [{"goal": "Initiating and maintaining eye contact", "instructions": "hold the child closely or place in an infant seat and read short books, pausing now and then to see if the child looks at you."}]},
               //     {"8-14 months": [{"goal" : "Use movements to continue an activity", "instructions":"imitate actions in the book with your body and pause to see of the child takes your hand to do it again. Or, make up your own actions and tell the child 'You do.' If he or she doesn’t imitate you, help him or her."},{"goal": "Object Permanence", "instructions":"Throughout the activity, try using a tissue, bib or cloth to cover the page of the book, saying, 'Where did the ___ go?'"}]},
               //     {"14-24 months":[{"goal": "Following directions", "instructions":"Tell the child, 'Go get a book,' giving cues as needed. Give the child directions related to pictures in the book, providing a model if needed. When finished reading, tell the child to put the book away."}, {"goal": "Demonstrating understanding of words:", "instructions:" : "Have the child find pictures of the objects you read about or talk about. Model how to use objects that are pictured in the book. If possible, provide the actual object."}]},
               //     {"24-30 months": [{"goal": "matching and sorting", "instructions": "Have the child put away the book, placing it in a box or bin with other books to practice matching and sorting."}, {"goal": "concept development", "instructions": "Have the child find named pictures. When finished reading, give directions containing prepositions such as 'Put the book on the table.' At the end of the book, say 'the end!'"}]},
               //     {"30-36 months": [{"goal": "Matching and sorting/concept development", "instructions": "Have the child find pictures of a certain color, shape or function on a page. For example, have him or her find big or little items, things to eat, or all the circles."}]}
               // ]  
	 
		const ourSections = activity.byAge.map((activityObject)=>{
		 	return {
		 		title: activityObject.age,
		 		content: [...activityObject.data]
		 	}
		 })
	  return (
	  		<ScrollView style={{backgroundColor: '#ffb6c1'}}>
	    	<AccordionView data={ourSections}/>
	    	</ScrollView>

	  );
	}
}


// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: '#ffb6c1',
//     alignItems: 'center',
//     // justifyContent: 'center',
//   },
//   buttonStyle: {
//     backgroundColor: '#b6c1ff',
//     height: 100
//   },
//   buttonContainer: {
//     width: 300,
//     marginBottom: 20,
//   },
//   headlineText: {
//     fontSize: 50,
//     fontFamily: 'Avenir',
//     color: 'white',
//     marginBottom: 30,
//     textDecorationLine: 'underline'
//   }
// });


