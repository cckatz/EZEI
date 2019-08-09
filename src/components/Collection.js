
import React, {Component} from 'react';
import {
    View,
    Text,
    ScrollView,
    StyleSheet
} from 'react-native';

import CollectionItem from './CollectionItem';
import ezeiDefault from '../../assets/EasyEI.jpeg'

export default class Collection extends Component {


    renderItems(navigate) {
        const {circle} = this.props;
        return this.props.items.map((a, i ) => {
            return (
                <CollectionItem circle={circle} source={ezeiDefault} title={a.title} data={a} collection={this.props.id} route={a.route} navigate={navigate} id={i} key={i}/>
            )
        })

    }
    render() {
        const {title} = this.props;
        const navigate = this.props.navigate;

        return (
            <View style={styles.container}>
                <View>
                    <Text style={styles.title}>{title}</Text>
                    <ScrollView horizontal={true}>
                        {this.renderItems(navigate)}
                    </ScrollView>
                </View>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        paddingTop: 10,
        paddingBottom: 10
    },

    title: {
        alignSelf: 'center',
        color: 'white',
        fontSize: 18,
        fontWeight: '700',
        marginBottom: 8,
    }
});