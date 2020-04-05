import React from 'react'
import { View } from 'react-native'
import AddEntry from './components/AddEntry'
import {createStore} from 'redux'
import {Provider} from 'react-redux'
import reducer from './reducers'
export default function App() {
  return (
    
    <Provider store={createStore(reducer)}>
      {/* Stylization:
      We want the view component to take up all available space so that the child components can expand the full size of the phone.
      */}
    <View style={{flex:1}}>
     <AddEntry/>
    </View>
    </Provider>
  );
}

