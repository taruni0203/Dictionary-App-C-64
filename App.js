import * as React from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity } from 'react-native';
import {Header} from 'react-native-elements';
import dictionary from './database';

export default class App extends React.Component {
  constructor(){
    super();
    this.state ={
      text: '',
      isSearchPressed: false,
      word: '',
      lexicalCategory: '',
      examples: [],
      definition: ''
    }
  }

  getWord=(text)=>{
    var text = text.toLowerCase();
    try {
      var word = dictionary[text]['word']
      var lexicalCategory = dictionary[text]['lexicalCategory']
      var definition = dictionary[text]['definition']
      this.setState({
        word: this.state.text,
        lexicalCategory: lexicalCategory,
        definition: definition
      })
    }
    catch(err){
      alert("Sorry, this word is not available for now")
      this.setState({
        text: '',
        isSearchPressed: false
      })
    }
    
  }

  render(){
    return (
      <View>
        <Header
           backgroundColor = {"#8900ff"}
           centerComponent = {{ text: "Dictionary App", style: {color: "#fff", fontSize: 20, fontWeight: 'bold' }}}
        />
        <TextInput
        style = {styles.inputBox}
          onChangeText = {(text)=>{
            this.setState({
              text: text,
              isSearchPressed: false,
              word: 'Loading...',
              lexicalCategory: 'Loading...',
              examples: [],
              definition: 'Loading...'
            })
          }}
          value = {this.state.text}
        />
        <TouchableOpacity
          style = {styles.searchButton}
          onPress = {()=>{
            this.setState({
              isSearchPressed: true,
            })
            this.getWord(this.state.text);
          }}
        >
          <Text style = {styles.buttonText}>Search</Text>
        </TouchableOpacity>

        <View style = {styles.container}>
          <Text style = {styles.mainText}>Word: {''}</Text>
          <Text style = {styles.resultantText}>{this.state.word}</Text>
        </View>

        <View style = {styles.container}>
          <Text style = {styles.mainText}>Type: {''}</Text>
          <Text style = {styles.resultantText}>{this.state.lexicalCategory}</Text>
        </View>

        <View style = {styles.container}>
          <Text style = {styles.mainText}>Definition: {''}</Text>
          <Text style = {styles.resultantText}>{this.state.definition}</Text>
        </View>
      </View>
    )
  }
  
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "row",
    flexWrap: 'wrap',
    backgroundColor: '#fff',
  },
  mainText: {
    marginLeft: 10,
    fontSize: 20,
    color: "orange",
    fontWeight: "bold"
  },
  resultantText: {
    fontSize: 18,
    marginLeft: 10,
    marginTop: 2
  },
  inputBox: {
    width: '80%',
    height: 40,
    alignSelf: "center",
    textAlign: "center",
    borderWidth: 4,
    marginTop: 80,
    outline: "none"
  },
  searchButton: {
    width: '50%',
    height: 55,
    borderRadius: 15,
    marginTop: 40,
    marginBottom: 20,
    borderWidth: 2,
    alignSelf: "center",
    alignItems: "center",
    justifyContent: "center"
  },
  buttonText: {
    textAlign: "center",
    fontSize: 30,
    fontWeight: 'bold',
    alignSelf: "center",
    alignItems: "center",
    justifyContent: "center"
  }
});
