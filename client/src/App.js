import React, { Component } from 'react';
import './App.css';
import axios from 'axios';

class App extends Component {

  constructor(props){
    super(props);
    this.state = {
      trucks: [],
      newTruck : {
        make: "",
        model: "",
        year: null
      }
    }
  }

  componentDidMount = () => {
    this.getTruckin();
  }

  getTruckin = () => {
    axios.get("http://localhost:8000/trucks")
      .then(res => {
        this.setState({trucks: res.data.trucks});
      }).catch( err => {
        console.log(err);
      });
  }

  changeMake = (e) => {
    let tr = {...this.state.newTruck};
    tr.make = e.target.value;
    this.setState({newTruck: tr});
  }

  changeModel = (e) => {
    let tr = {...this.state.newTruck};
    tr.model = e.target.value;
    this.setState({newTruck: tr});
  }

  changeYear = (e) => {
    let tr = {...this.state.newTruck};
    tr.year = e.target.value;
    this.setState({newTruck: tr});
  }

  newTruck = (e) => {
    e.preventDefault();
    axios.post("http://localhost:8000/trucks", this.state.newTruck)
      .then(res => {
        console.log(res);
        this.getTruckin();
        this.setState({newTruck: { make: "", model: "", year: null}});
      }).catch(err => {
        console.log(err);
      });
  }

  delete = (_id, e) => {
    console.log(_id);
    axios.delete(`http://localhost:8000/trucks/${_id}`)
      .then(res => {
        console.log(res);
        this.getTruckin();
      }).catch(err => {
        console.log(err);
      });
  }

  render() {
    return (
      <div>
        <h1>Hello World</h1>
        <ul>
          {
            this.state.trucks.map( (truck, index) => 
              <li key={index}>
                {truck.make} {truck.model} &nbsp;
                <button onClick={this.delete.bind(this, truck._id)}>&times;</button>
              </li>
            )
          }
        </ul>
        <form onSubmit={this.newTruck}>
          <p>
            Make:&nbsp;
            <input type="text" onChange={this.changeMake} value={this.state.newTruck.make} />
          </p>
          <p>
            Model:&nbsp;
            <input type="text" onChange={this.changeModel} value={this.state.newTruck.model} />
          </p>
          <p>
            Year:&nbsp;
            <input type="number" onChange={this.changeYear} value={this.state.newTruck.year} />
          </p>
          <button type="submit">Get Truckin'</button>
        </form>
      </div>
    );
  }
}

export default App;
