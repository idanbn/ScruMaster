import React from 'react';
import { View, Text, StyleSheet, Button } from 'react-native';

import Colors from '../constants/Colors';
import Card from '../components/UI/Card';

const SprintItem = props => {
  return (  
    <Card style={styles.container}>
      <View style={styles.details}>
        <Text style={styles.title}>Sprint:{props.number}</Text>
      </View>
      <View style={styles.topActions}>
       <View style={styles.actions}>
        <Button
          color={Colors.primary}
          title="View Details"
          onPress={props.onViewDetail}
        />
        <View style={styles.actions}>
        <Button
          color={Colors.primary}
          title="Delete"
          onPress={props.onDelete}
        />
        </View>
       </View>
      </View>
    </Card>
  );
};

const styles = StyleSheet.create({
  container: {
    height: 140,
    width: 300,
    margin: 20
   },
  details: {
    alignItems: 'center',
    height: '25%',
    padding: 10
  },
  title: {
    fontSize: 10,
  },
  topActions: {
    marginTop: 30,
    justifyContent: 'center',
  },
  actions: {
    justifyContent: 'center',
    paddingHorizontal: 20,
    flexDirection: 'row',

  },
});

export default SprintItem;
