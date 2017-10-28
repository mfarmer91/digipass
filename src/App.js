import React, { Component } from 'react';
import { createStore, combineReducers } from 'redux';
import uuid from 'uuid';

import './App.css';

const reducer = combineReducers({
    passes: passReducer,
    timer: timerReducer,
});

function passReducer (state = [], action) {
    switch (action.type) {
        case 'ADD_PASS': {
            
            const newPass = {
                name: action.name,
                id: uuid.v4(),
            };

            return state.concat(newPass); 
        }   
        default: {
            return state;
        }
    }
}

function timerReducer (state = 0, action) {
    switch (action.type) {
        case 'START_TIMER': {
            return state + 1;
        }   
        default: {
            return state;
        }
    }
}


const store = createStore(reducer);



const App = () => (
    <div>
        <div id='main-header' className='ui center aligned huge header'>Digipass</div>
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

    handleClick = () => {
        this.props.startTimer();
        this.props.onPassSubmit(this.state.value);
        this.setState({ value: '' });
    }

    
    
    render() {
        return (
            <div id='go-bar' className="ui center aligned segment">
                <div className="ui input">
                    <input 
                        id='go-input'
                        type="text" 
                        placeholder="Name goes here."
                        onChange={this.onChange}
                        value={this.state.value}
                    />
                </div>
                <div id='button-ctn'>
                    <button
                        id='go-button'
                        className="ui bottom attached green button" 
                        type="submit"
                        onClick={this.handleClick}

                    >
                    Go
                    </button>
                </div>
            </div>
        )
    }
}

const PassList = (props) => (
    <div className="ui centered aligned cards">
        {
            props.passes.map((p, index) => (
                <div className="ui raised card"
                    key={index}
                >
                    <div className="content">
                        <div className="ui center aligned large green header">Hall Pass</div>
                    </div>
                    <div className="extra content">
                        <div id='name' className="center aligned meta">
                            {p.name}
                        </div>
                            <div>
                                <Timer />
                            </div>
                    </div>
                </div>
            ))
        }
    </div>
)





class Timer extends React.Component {
    
    componentDidMount() {
        store.subscribe(() => this.forceUpdate());
    }
        
    render() {
        const state = store.getState();
        const timer = state.timer;

        return (
            <div className='center aligned small header'>{timer}</div>
        );
    }
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
                            type: 'ADD_PASS',
                            name: name,
                        })
                    )}
                    
                    startTimer={ () => ( setInterval( function() {
                        store.dispatch({
                            type: 'START_TIMER'
                        })
                    }, 1000 ))}

                />
                <PassList
                    passes={passes}
                />
            </div>
        );
    }
}



export default App;
