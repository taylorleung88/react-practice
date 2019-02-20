import React from 'react';
import {StyleRoot} from 'radium';
const Cockpit = (props) => {

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

    if(props.showPersons) {
        style.backgroundColor= 'pink';
        style[':hover'] = {
        backgroundColor: 'lightblue',
        color: 'purple'
      };
    }

    const classStyles = [];
    if(props.persons.length <= 2) { //classStyles = ['red']
      classStyles.push('red');
    }
    if(props.persons.length <= 1) { //classStyles = ['red', 'bold']
      classStyles.push('bold');
    }

    return(
        <StyleRoot>
            <div>
                <h1>{props.title}</h1>
                <p className = {classStyles.join(' ')}>This is really working!</p>
                <button 
                style={style}
                onClick={props.clicked}>Toggle Names</button>
            </div>
        </StyleRoot>
    );
};

export default Cockpit;