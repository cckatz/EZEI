import React, {Component} from 'react';
import { StyleSheet, Text, Image, View } from 'react-native';
import { Button } from 'react-native-elements';
import { activitiesFetch } from '../actions';
import { connect } from 'react-redux';

class SkillDetail extends Component {

  constructor(props){
    super(props);

    this.state = {
      // activities: props.navigation.getParam("skill").list,
      // skillId: props.navigation.getParam("skill").id,
      activities: props.navigation.getParam("skill").dailyActivities,
      skillTitle: props.navigation.getParam("skill").title
    }
    // console.log(props.navigation.getParam("skill").list)
  }
  componentDidMount(props){
    this._sub = this.props.navigation.addListener(
        'didFocus',
        this._componentFocused);
      }

  componentWillUnmount() {
    this._sub.remove();
  }

  componentDidUpdate(prevProps, prevState){
    // console.log("skill detail updated")
    //  if(prevProps.activityList !== this.props.activityList){
    //   console.log("we really changing")
    //   // console.log(this.props.activityList[0].list);
    //   console.log(this.state.skillId)
    //    var activityList = this.props.activityList.find((skill)=>{
    //       return skill.id == this.state.skillId
    //    })
    //          console.log(activityList.list.length)

    //   this.setState({activities: activityList})
    //   // if(prevState.skills[0]){console.log(this.state.skills[0].list.length)}

    // }

  }

  _componentFocused = () => {
    console.log("we back");
    // should repull data from Firebase
    // console.log(this.props.navigation.getParam("skill").list.length),
    // this.props.activitiesFetch()

  }

  render(){
      const { navigation } = this.props;
      const skill = navigation.getParam("skill")
    return (
      <View style={styles.container}>
        <Text style={styles.headlineText}>{skill.title}</Text>
        <Image />
        <Text style={styles.descriptionText}>
          {skill.definition}
        </Text>
        <View style={{ marginTop: 10, justifyContent: 'center'}}>
          <Button title="Activities" buttonStyle={styles.buttonStyle} titleStyle={{ fontSize: 25}} containerStyle={styles.buttonContainer} onPress={() => this.props.navigation.navigate('Activities', {skill: skill, activities: this.state.activities})}/>
          <Button title="Resources" buttonStyle={styles.buttonStyle} titleStyle={{ fontSize: 25}} containerStyle={styles.buttonContainer} onPress={() => this.props.navigation.navigate('Resources', {skill: skill})}/>
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

const mapStateToProps = (state) => {
  const { activityList } = state.activities;
  return { activityList };
};

export default connect(mapStateToProps, {activitiesFetch})(SkillDetail)
