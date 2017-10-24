import React, { Component } from 'react';
import { createStore, combineReducers } from 'redux';
import uuid from 'uuid';

import './App.css';

const reducer = combineReducers({
    passes: passReducer,
});

function passReducer (state = [], action) {
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

    handleSubmit = (m) => {
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
                        onSubmit={this.handleSubmit}
                    >
                    Go
                    </button>
                </div>
            </div>
        )
    }
}


    
const PassList = (props) => {
    <div className="ui comments">
         {
          props.passes.map((p, index) => (
            <div
              className='comment'
              key={index}
            >
              <div className='text'>
                'Michael Farmer'
                <span className='metadata'>Timer</span>
              </div>
            </div>
          ))
        }
    </div>
}

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
                            type: 'ADD_MESSAGE',
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
