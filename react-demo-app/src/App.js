import React, { Component } from 'react';
import './App.css';
import DataTimeCompare from './Components/DataTimeCompare';
class App extends Component {  
  render() {
    
    return (      
      <div className="App">
        <React.Fragment>       
     
          <DataTimeCompare/>             
        </React.Fragment>       
      </div>
    );
  }
}

export default App;
