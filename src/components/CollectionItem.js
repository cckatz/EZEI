
import React from 'react';
import {
    View,
    Text,
    Image,
    StyleSheet,
    TouchableOpacity,
    Dimensions,
    Linking
} from 'react-native';

function numberWithCommas(x) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

function renderDescriptionLabel(props){
    console.log(props.collection)

    return (
        <Text style={styles.text}>{props.number} found helpful</Text>
    );
}

onItemPressed = (props) => {
    if(props.link){
         return Linking.openURL(props.URL)
    }   
    else{
        const navigate = props.navigate;
        return navigate('ActivityDetail', {title:props.title, data: props.data, skillId: props.collection})
    }
}

export default (props) => {
    const navigate = props.navigate;
    return (
        <View style={styles.container}>
            <TouchableOpacity onPress={() => onItemPressed(props) }>
            <Image source={props.source} style={[styles.album, props.circle ? {borderRadius: (Dimensions.get('window').width * 4.2/10)/2} : {}]} />
            <Text style={styles.text}>{props.title}</Text>
            {/* {renderDescriptionLabel(props)} */}
            </TouchableOpacity>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        margin: 8,
        marginLeft: 12
    },

    album: {
        width: Dimensions.get('window').width * 4.2/10,
        height: Dimensions.get('window').width * 4.2/10,
        backgroundColor: '#b6c1ff',
    },

    img: {
        flex: 1,
        height: null,
        width: null
    },

    text: {
        fontSize: 14,
        color: 'white',
        fontWeight: '600',
        alignSelf: 'center',
        marginTop: 8,
    },

    followers: {
        fontSize: 8,
        color: 'gray',
        alignSelf: 'center',
        fontWeight: '600',
        marginTop: 4
    }

});