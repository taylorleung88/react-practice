import React, { Component } from 'react';
import './App.css';
import Person from './Person/Person';
import Radium, {StyleRoot} from 'radium';

class App extends Component {
  state = {
    persons: [
      { id: '2tf6', name: 'Max', age: 28 },
      { id: '23ads', name: 'Manu', age: 29 },
      { id: 'weqw1', name: 'Stephanie', age: 26 }
    ],
    otherState: 'some other value',
    showPersons: false
  }

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
    //const persons = this.state.persons.slice();
    const persons = [...this.state.persons];
    persons.splice(personIndex, 1);
    this.setState({persons: persons});
  }

    togglePersonsHandler = () => {
      const doesShow = this.state.showPersons;
      this.setState({showPersons: !doesShow});
    }

  render () {
    const style = {
      backgroundColor: 'white',
      color: 'blue',
      font: 'inherit',
      border: '1px solid blue',
      padding: '8px',
      cursor: 'pointer',
      ':hover': {
        backgroundColor: 'lightgreen',
        color: 'orange'
      }
    };

    let persons = null;

    if(this.state.showPersons) {
      persons = (
        <StyleRoot>
          <div>
            {this.state.persons.map((person, index) => {
              return <Person
                click = {() => this.deletePersonHandler(index)}
                name = {person.name}
                age = {person.age} 
                key = {person.id}
                changed = {(event) => this.nameChangedHandler(event, person.id)} />
            })}
          </div>
        </StyleRoot>
        );
       style.backgroundColor= 'pink';
       style[':hover'] = {
        backgroundColor: 'lightblue',
        color: 'purple'
      };
    }

    const classStyles = [];
    if(this.state.persons.length <= 2) {
      classStyles.push('red');
    }
    if(this.state.persons.length <= 1) {
      classStyles.push('bold');
    }

    return (
      <div className="App">
        <h1>Hi, I'm a React App</h1>
        <p className = {classStyles.join(' ')}>This is really working!</p>
        <button 
          style={style}
          onClick={this.togglePersonsHandler}>Toggle Names</button>
          {persons}

      </div>
    );
    // return React.createElement('div', {className: 'App'}, React.createElement('h1', null, 'Does this work now?'));
  }
}

export default Radium(App);
