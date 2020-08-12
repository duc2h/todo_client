import React, { Component } from "react";
import axios from "axios";
import { Card, Header, Form, Input, Icon } from "semantic-ui-react";

let endpoint = "http://localhost:8080";

class ToDoList extends Component {
  constructor(props) {
    super(props);

    this.state = {
      task: "",
      items: []
    };
  }

  componentDidMount() {
    this.getTask();
  }

  onChange = event => {
    this.setState({
      [event.target.name]: event.target.value
    });
  };

  onSubmit = () => {
    let { task } = this.state;
    // console.log("pRINTING task", this.state.task);
    if (task) {
        let status = false
      axios
        .post(
          endpoint + "/todo/tasks",
          {
            task,
            status
          },
          {
            headers: {
              "Content-Type": "application/x-www-form-urlencoded"
            }
          }
        )
        .then(res => {
          this.getTask();
          this.setState({
            task: ""
          });
          console.log(res);
        });
    }
  };

  getTask = () => {
    axios.get(endpoint + "/todo/tasks").then(res => {
      console.log(res.data.data);
      if (res.data) {
        this.setState({
          items: res.data.data.map(item => {
            let color = "yellow";

            if (item.status) {
              color = "green";
            }
            return (
              <Card key={item.id} color={color} fluid>
                <Card.Content>
                  <Card.Header textAlign="left">
                    <div style={{ wordWrap: "break-word" }}>{item.taskName}</div>
                  </Card.Header>

                  <Card.Meta textAlign="right">
                    <Icon
                      name="check circle"
                      color="green"
                      onClick={() => this.updateTask(item.taskName, true)}
                    />
                    <span style={{ paddingRight: 10 }}>Done</span>
                    <Icon
                      name="undo"
                      color="yellow"
                      onClick={() => this.updateTask(item.taskName, false)}
                    />
                    <span style={{ paddingRight: 10 }}>Undo</span>
                    <Icon
                      name="delete"
                      color="red"
                      onClick={() => this.deleteTask(item.taskName)}
                    />
                    <span style={{ paddingRight: 10 }}>Delete</span>
                  </Card.Meta>
                </Card.Content>
              </Card>
            );
          })
        });
      } else {
        this.setState({
          items: []
        });
      }
    });
  };

  updateTask = (name, status) => {
    axios
      .put(endpoint + "/todo/tasks/" + name + "/"+status, {
        headers: {
          "Content-Type": "application/x-www-form-urlencoded"
        }
      })
      .then(res => {
        console.log(res);
        this.getTask();
      });
  };

  deleteTask = name => {
    axios
      .delete(endpoint + "/todo/tasks/" + name, {
        headers: {
          "Content-Type": "application/x-www-form-urlencoded"
        }
      })
      .then(res => {
        console.log(res);
        this.getTask();
      });
  };
  render() {
    return (
      <div>
        <div className="row">
          <Header className="header" as="h2">
            TO DO LIST
          </Header>
        </div>
        <div className="row">
          <Form onSubmit={this.onSubmit}>
            <Input
              type="text"
              name="task"
              onChange={this.onChange}
              value={this.state.task}
              fluid
              placeholder="Create Task"
            />
            {/* <Button >Create Task</Button> */}
          </Form>
        </div>
        <div className="row">
          <Card.Group>{this.state.items}</Card.Group>
        </div>
      </div>
    );
  }
}

export default ToDoList;