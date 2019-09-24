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
 
export default class AccordionView extends Component {
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
    console.log(section)
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