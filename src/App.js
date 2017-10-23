import React, { Component } from 'react';
import { createStore, combineReducers } from 'redux';
import uuid from 'uuid';

import './App.css';

const reducer = combineReducers({
    passes: passReducer,
});

function passReducer (state = { passes: [] }, action) {
    switch (action.type) {
        case 'ADD_PASS': {
            const newPass = {
                name: action.name,
                id: uuid.v4(),
                timer: '0:00',
            };
            return state.passes.concat(newPass); 
        }   
        case 'DELETE_PASS': {   
        }
        default: {
            return state;
        }
    }
}

const App = () => (
    <div>
        <TextFieldSubmit />
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
                >
                Go
                </button>
                </div>
            </div>
        )
    }
}
    





export default App;
