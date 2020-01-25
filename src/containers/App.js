import React, {Component} from 'react';
import {connect} from 'react-redux';
import SearchBox from '../components/SearchBox';
import CardList from '../components/CardList';
import Scroll from '../components/Scroll';
import ErrorBoundry from '../components/ErrorBoundry';
import './App.css';

import {setSearchField} from "../action";

const mapStateToProps = state => {
  return {
    searchField: state.searchField
  }
};

const mapDispatchToProps = (dispatch) => {
  return {
    onSearchChange: (event) => dispatch(setSearchField(event.target.value))
  }
};

class App extends Component {
  constructor() {
    super();
    this.state = {
      robots: []
    }
    // this.onSearchChange = this.onSearchChange.bind(this);
  }

  componentDidMount() {
    fetch('https://jsonplaceholder.typicode.com/users') //window.fetch
        .then(response => response.json())
        .then(users => this.setState({robots: users}));
  }

  /*  onSearchChange = (event) => {
      this.setState({searchfield: event.target.value});
    };*/

  /* onSearchChange(event) {
     this.setState({searchfield: event.target.value});
   };*/

  render() {
    const {searchField, onSearchChange} = this.props;
    const filteredRobots = this.state.robots.filter(robot => {
      return robot.name.toLowerCase().includes(searchField.toLowerCase());
    });

    if (this.state.robots.length === 0) {
      return <h1>Loading</h1>
    } else {
      return (
          <div className='tc'>
            <h1 className='f1'>RoboFriends</h1>
            <SearchBox searchChange={onSearchChange}/>
            <Scroll>
              <ErrorBoundry>
                <CardList robots={filteredRobots}/>
              </ErrorBoundry>
            </Scroll>
          </div>
      );
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(App);