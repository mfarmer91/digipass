import React, { Component } from 'react';
import { createStore, combineReducers } from 'redux';
import uuid from 'uuid';

import './App.css';

const reducer = combineReducers({
    passes: passReducer,
});

function passReducer (state = [{name: 'Ricky'},], action) {
    switch (action.type) {
        case 'ADD_PASS': {
            const newPass = {
                name: action.name,
                id: uuid.v4(),
                timer: '0:00',
            };
            return state.passes.concat(newPass); 
        }   
        default: {
            return state;
        }
    }
}

const store = createStore(reducer);

const App = () => (
    <div>
        <PassDisplay />
    </div>
);
    
class TextFieldSubmit extends React.Component {
    
    state = {
        value: '',
    };

    onChange = (e) => {
        this.setState({
          value: e.target.value,
        })
    };

    handleSubmit = () => {
        this.props.onPassSubmit(this.state.value);
        this.setState({ value: '' });
    };
    
    render() {
        return (
            <div className="ui center aligned green segment">
                <div className="ui inverted input">
                    <input 
                        type="text" 
                        placeholder="Name goes here."
                        onChange={this.onChange}
                        value={this.state.value}
                    />
                    <button 
                        className="ui green button" 
                        type="submit"
                        onClick={this.handleSubmit}
                    >
                    Go
                    </button>
                </div>
            </div>
        )
    }
}

const PassList = (props) => (
    <div className="ui cards">
         {
          props.passes.map((p, index) => (
            <div
              className='card'
              key={index}
            >
              <div className='ui header'>
                {p.name}
                <span className='metadata'>Timer</span>
              </div>
            </div>
          ))
        }
    </div>
)

class PassDisplay extends React.Component {
    
    componentDidMount() {
        store.subscribe(() => this.forceUpdate());
    }
    
    render() {
        
            const state = store.getState();
            const passes = state.passes;
            
        return (
            <div>
                <TextFieldSubmit 
                    onPassSubmit={(name) => (
                        store.dispatch({
                            type: 'ADD_PASS',
                            name: name,
                        })
                    )}
                />
                <PassList
                    passes={passes}
                />
            </div>
        );
    }
}



export default App;
