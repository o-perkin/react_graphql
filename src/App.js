import React, { Component } from "react";
import { Query } from 'react-apollo';
import { gql } from 'apollo-boost';
import { Input } from "antd";
import { Button } from "antd";
import "./App.css";

const { Search } = Input;

const getUser = gql`
  query User($login: String!) {
    user(login: $login) { 
      name
        repositories(last:20) {
          edges {
            node {
              name
            }
          }
        }
  }
}`

export default class App extends Component {

  constructor(props) {
    super(props);
    this.state = { value: "", login: "" };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleClear = this.handleClear.bind(this);

  }

  handleChange(event) {
    this.setState({ value: event.target.value });
  }

  handleSubmit(event) {
    if (this.state.value != "") {
      this.setState({ login: this.state.value });
    } else {
      alert("The value cannot be empty");
    }
  }

  handleClear() {
    this.setState({ value: "", login: "" });
  }
  
  render() {

    const login = this.state.login

    return (
      <div className="container">
        <div className="center">
          <Query query={getUser} variables={ {login} } >
            {({ loading, error, data }) => {
              if (loading) return <p>Loading...</p>
              if (error) return (
                <div>
                  <Search
                    onChange={this.handleChange}
                    value={this.state.value}
                    placeholder="Input Github Login"
                    onSearch={this.handleSubmit}
                    enterButton
                    style={{ width: "300px", marginRight: "10px" }}
                  />
                  <Button type="default" onClick={this.handleClear}>
                    Clear
                  </Button>
                </div>
              )
              return (
                <div>
                  <Search
                    onChange={this.handleChange}
                    value={this.state.value}
                    placeholder="Input Github Login"
                    onSearch={this.handleSubmit}
                    enterButton
                    style={{ width: "300px", marginRight: "10px" }}
                  />
                  <Button type="default" onClick={this.handleClear}>
                    Clear
                  </Button>
                  <br />
                  <br />
                  <div className="row">
                    <div className="col-sm">
                      <div>
                        <h3>Name: </h3>
                        {data.user.name}
                      </div>
                      <br />
                      <div>
                        <h3>Repositories: </h3>
                        {data.user.repositories.edges.map(rep => {
                          return <p>{rep.node.name}</p>
                         })}
                      </div>
                    </div>
                  </div>
                </div>
              )
            }}
          </Query>
        </div>
      </div>
    );    
  }
}

