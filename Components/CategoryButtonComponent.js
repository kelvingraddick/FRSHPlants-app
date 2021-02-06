import React from "react";
import { StyleSheet, View, Text, TouchableOpacity } from 'react-native';
import Colors from '../Constants/Colors';
import Fonts from '../Constants/Fonts';

const CategoryButtonComponent = (props) => {
  return (
    <TouchableOpacity onPress={props.onPress} underlayColor='#fff'>
      <View style={styles.categoryButton}>
        <Text style={styles.categoryButtonText} numberOfLines={1} ellipsizeMode='tail'>{props.category}</Text>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  categoryButton: {
    height: 35,
    borderRadius: 10,
    paddingLeft: 10,
    paddingRight: 10,
    marginRight: 10,
    backgroundColor: Colors.GRAY,
    justifyContent: 'center',
    alignItems: 'center'
  },
  categoryButtonText: {
    fontSize: 15,
    fontFamily: Fonts.NORMAL,
    color: Colors.WHITE
  },
});

export default CategoryButtonComponent;