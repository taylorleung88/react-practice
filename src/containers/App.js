import React, { Component } from 'react';
import './App.css';
import Radium, {StyleRoot} from 'radium';
import Persons from '../components/Persons/Persons';
import Cockpit from '../components/Cockpit/Cockpit';

class App extends Component {
  constructor(props) {
    super(props);

    //Can also declare as state outside constructor in modern react
    this.state = {
      persons: [
        { id: '2tf6', name: 'Max', age: 28 },
        { id: '23ads', name: 'Manu', age: 29 },
        { id: 'weqw1', name: 'Stephanie', age: 26 }
      ],
      otherState: 'some other value',
      showPersons: false
    }
  }

  //No longer in use
  switchNameHandler = (newName) => {
    // console.log('Was clicked!');
    // DON'T DO THIS: this.state.persons[0].name = 'Maximilian';
    this.setState( {
      persons: [
        { name: newName, age: 28 },
        { name: 'Manu', age: 29 },
        { name: 'Stephanie', age: 27 }
      ]
    } )
  }

  nameChangedHandler = (event, id) => {
    const personIndex = this.state.persons.findIndex(p => {
      return p.id === id;
    });

    const person = {
      ...this.state.persons[personIndex]
    };

    person.name = event.target.value;

    const persons = [...this.state.persons];
    persons[personIndex] = person;

    this.setState( {persons: persons} );
  }

  deletePersonHandler = (personIndex) => {
    //const persons = this.state.persons.slice(); created a new copy of the array
    const persons = [...this.state.persons]; //also creates a new copy of the array
    persons.splice(personIndex, 1);
    this.setState({persons: persons});
  }

    togglePersonsHandler = () => {
      const doesShow = this.state.showPersons;
      this.setState({showPersons: !doesShow});
    }

  render () {
    
    let persons = null;

    if(this.state.showPersons) {
      persons = 
          <Persons persons={this.state.persons} clicked={this.deletePersonHandler} changed={this.nameChangedHandler} />
      }

    return (
      <div className="App">
        <StyleRoot>
          <button onClick={() => this.setState({showPersons: true})} />
          <Cockpit title={this.props.title} showPersons={this.state.showPersons} persons={this.state.persons} clicked={this.togglePersonsHandler}/>
          {persons}
        </StyleRoot>
      </div>
    );
    // return React.createElement('div', {className: 'App'}, React.createElement('h1', null, 'Does this work now?'));
  }
}

export default Radium(App);
