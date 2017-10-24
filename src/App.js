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

function addMessage(text, id) {
    return {
        type: 'ADD_MESSAGE',
        name: name,
        id: id,
        timer: timer,
    };
}

const store = createStore(reducer);

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

    onSubmit = (m) => {
        
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


    
const PassList = (props) => {
    <div className="cards">
        {
            props.passes.map((m, index) => (
                <div 
                    className="ui card">
                    key={index}
                    {/*Add onClick prop here.*/}
                    <div className="content">
                        <div className="header">Hall Pass</div>
                    </div>
                    <div className="content">
                        <h4 className="ui sub header">{m.name}</h4>
                        <div className="item">{m.timer}</div>
                    </div>
                </div>
        
            )) {/*State will need to be mapped in.*/}
            
        }
    </div>
}

function mapStateToPassList(dispatch) {
    
}

const PassDisplay = connect(
    
)(PassList)

export default App;
