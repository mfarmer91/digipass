import React, { Component } from 'react';
import { createStore, combineReducers } from 'redux';

import './App.css';

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
