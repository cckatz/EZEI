
import React, { Component } from 'react';
import { ActivityIndicator, StyleSheet, Text, View } from 'react-native';
import { Button } from 'react-native-elements';
import skills from '../data/Formatted.json';
import {activitiesFetch} from '../actions/';
import { connect } from 'react-redux'

class SkillsPage extends Component {

  static navigationOptions = () => {
  return(
      {title: 'EasyEI'} 
    )
  }

  constructor(props){
    super(props);
    // this.state = {activityList: [], skillsLoaded: false, skills: {}}
    this.state = {skills, skillsLoaded: true}
    this.props.activitiesFetch()
  }

  // componentDidUpdate = (prevProps, prevState) => {

  //   if(prevProps.activityList !== this.props.activityList){
  //     // console.log(this.props.activityList[0].list);
  //      var activityList = this.props.activityList
  //     this.setState({skills: activityList, skillsLoaded: true})
  //     // if(prevState.skills[0]){console.log(this.state.skills[0].list.length)}

  //   }
  // }


  renderButtons = ()=> {
    if(this.state.skillsLoaded == true && this.state.skills){

    return this.state.skills.map((skill, index)=> {
        return(
          <Button
            // key = {skill.id}
            key={index} 
            title={skill.title}
            buttonStyle={styles.buttonStyle} 
            titleStyle={{ fontSize: 25}} 
            containerStyle={styles.buttonContainer} 
            onPress={() => this.props.navigation.navigate('Detail',{
              skill: this.state.skills[index]
            })}
          />
          );
      });
    } 
  }

  renderActivityIndicator = () => {
    <ActivityIndicator size="large" color="#b6c1ff" />

  }

    render(){
    return (
      <View style={styles.container}>
      <Text style={styles.headlineText}> SKILLS </Text>
      <View style={{ height: 600, justifyContent: 'center'}}>
        <ActivityIndicator animating={!this.state.skillsLoaded} size="large" color="#0000ff" />
          {this.renderButtons()}
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

const mapStateToProps = (state) => {
  const { activityList } = state.activities;
  return { activityList };
};
export default connect(mapStateToProps, { activitiesFetch })(SkillsPage)

