import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { createStore } from 'redux';

// Component
class App extends Component {
  render() {
    const store = this.props.store;
    const state = store.getState();
    return (
      <div>
        <div>{state.message}</div>
        <button onClick={() => store.dispatch({ type: 'ADD' })}>+</button>
        <button onClick={() => store.dispatch({ type: 'REMOVE' })}>-</button>
      </div>
    );
  }
};

// Reducer
const initialAppState = {
  messageBase: 'Hello React Redux',
  message: 'Hello React Redux!',
  count: 1,
};
function appReducer(state = initialAppState, action) {
  let count = state.count;
  if (action.type === 'ADD') {
    count++;
  } else if(action.type === 'REMOVE') {
    count = --count > 0 ? count : 0;
  }
  return {
    ...state,
    message: state.messageBase + '!'.repeat(count > 0 ? count : 0),
    count: count,
  };
}

// Initialization
const appStore = createStore(appReducer);
const render = () => ReactDOM.render(<App store={appStore} />, document.getElementById('app'));
render();
appStore.subscribe(render);

