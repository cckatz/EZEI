import React, {Component} from 'react';
import { StyleSheet, AsyncStorage, ScrollView, Text, Button, View } from 'react-native';
// import { Button } from 'react-native-elements';
import Collection from '../components/Collection';
import Dialog from 'react-native-dialog';
import { FloatingAction } from "react-native-floating-action";
import { Ionicons } from '@expo/vector-icons';
import { connect } from 'react-redux';
import { activityCreate, activitiesFetch } from '../actions/';



class EIResources extends Component {

constructor(props){
  super(props);

  const { navigation } = props;
  const skill = navigation.getParam("skill")

  const resources =  skill.resources;
  const books = resources.books;
  const websites = resources.websites;

  const itemTitle = skill.title

  // let activities = skill.list.map((skill)=>{
  //   return skill 
  // })
  // console.log(activities)
  this.state = {id: skill.id, itemTitle: itemTitle, visible: false, books, websites, resourceName: '', URL: '' }

  // console.log('in constuctor')
  // props.activitiesFetch()
  this._retrieveBookData()
  this._retrieveWebsiteData()

}



 static navigationOptions = ({navigation}) => {
  console.log(navigation.getParam("skill").title)
  return(
      {
        title: `${navigation.getParam("skill").title} Resources`,

      } 
    )
  }
      componentDidUpdate = (prevProps, prevState) => {
        // console.log('ACTIVITIES LIST component did update')
        // // console.log(this.state, this.props)
        // console.log(this.props.activityList[0].list.length)
      }

      _storeData = async () => {
        if(this.state.name == "Website"){
            try {
            console.log(`trying to save: localwebsites+${this.state.itemTitle}`)
            await AsyncStorage.setItem(`localwebsites+${this.state.itemTitle}`, JSON.stringify(this.state.websites));
          } catch (error) {
            // Error saving data
            console.log(error)
          }
        } else {
            try {
            console.log(`trying to save: localbooks+${this.state.itemTitle}`)
            await AsyncStorage.setItem(`localbooks+${this.state.itemTitle}`, JSON.stringify(this.state.books));
          } catch (error) {
            // Error saving data
            console.log(error)
          }
        }
        
      }

      _retrieveBookData = async () => {
        try {
          console.log(`trying to pull: localbooks+${this.state.itemTitle}`)
          const value = await AsyncStorage.getItem(`localbooks+${this.state.itemTitle}`);
          if (value !== null) {
            // We have data!!
            // let json = await value.json()
            console.log("we have data")
            await this.setState({books: value})
            return value
          }
        } catch (error) {
          // Error retrieving data
          console.log(error)
        }
    }

          _retrieveWebsiteData = async () => {
        try {
          console.log(`trying to pull: localwebsites+${this.state.itemTitle}`)
          const value = await AsyncStorage.getItem(`localwebsites+${this.state.itemTitle}`);
          if (value !== null) {
            // We have data!!
            // let json = await value.json()
            console.log("we have data")
            await this.setState({websites: value})
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

        if(this.state.name == "Website"){

        console.log(this.state.activityName)
        var name = this.state.activityName
        await this.setState({websites: [...this.state.websites, {title: this.state.resourceName, URL:this.state.URL}], visible: false})
        await this._storeData()
      }
      else{
        await this.setState({books: [...this.state.books, {title: this.state.resourceName, URL:this.state.URL}], visible: false})
        await this._storeData()
      }
        // this.props.activityCreate(this.state.activityName, "daily activity", this.state.id)
        // console.log(this.state.activities)
      }


     
      renderCollections = () => {
            const { navigation } = this.props;
            const skill = navigation.getParam("skill")

            // const dailyActivities =  skill.dailyActivities;
            // const games = skill.games;
            const itemTitle = skill.title
  
            if(this.state.books.length != 0 || this.state.websites.length != 0 ){
             return (
                <View>
                <Collection title="Popular Websites" items={this.state.websites} itemsTitle={itemTitle} id={this.state.id} key={0} navigate={this.props.navigation.navigate} link={true}/>
                <Collection title="Articles & Books" items={this.state.books} id={this.state.id} key={1} itemsTitle={itemTitle} navigate={this.props.navigation.navigate} link={true}/>
                  <Dialog.Container visible={this.state.visible}>
                    <Dialog.Title>{`Add a new EI Resource!`}</Dialog.Title>
                    <Dialog.Description>
                      {`Do you want to add a new EI ${this.state.name} for the community?`}
                    </Dialog.Description>
                    <Dialog.Input label={`${this.state.name} name`} onChangeText={(resourceName) => this.setState({resourceName})}/>
                    <Dialog.Input label={`${this.state.name} URL`} onChangeText={(URL) => this.setState({URL})}/>
                    <Dialog.Button label="Save" onPress={()=>{this.saveNewEIResource()}}/>
                    <Dialog.Button label="Cancel" onPress={()=>{this.setState({visible: false, resourceName: ''})}}/>
                  </Dialog.Container>

                </View>
            )
           }
      }

    componentDidMount() {
        this._retrieveBookData()
        this._retrieveWebsiteData()
    }
      1
    render(){
      const actions = [
    {
      text: "Add a new Article/Book",
      icon: require("../../assets/puzzle.png"),
      name: "Article",
      color: "#b6c1ff",
      position: 2
    },
    {
      text: "Add a new Website",
      icon: require("../../assets/maternity.png"),
      name: "Website",
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

export default EIResources;
