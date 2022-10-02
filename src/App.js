import React from 'react';
import Todo from './Todo';
import { Paper, List } from '@mui/material';
import './App.css';
import { Container } from '@mui/system';
import AddTodo from './AddTodo';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      items : []
    };
  }

  componentDidMount() {
    const requestOptions = {
      method : "GET",
      Headers : { "Content-Type" : "application/json"}
    };

    fetch("http://localhost:8080/todo", requestOptions)
      .then((Response) => Response.json())
      .then(
        (response) => {
          this.setState({
              items : response.data
            });
        },
        (error) => {
          this.setState({
            error
          });
        }
      );
  }

  add = (item) => {
    const thisItems = this.state.items;
    item.id = "ID-" + thisItems.length; //key를 위한 id 추가
    item.done = false; // done 초기화
    thisItems.push(item); // 리스트에 아이템 추가
    this.setState({ items: thisItems}); // 리스트 업데이트
    console.log("items : ", this.state.items);
  }

  delete = (item) => {
    const thisItems = this.state.items;
    console.log("Before Update Items : ", this.state.items);
    const newItems = thisItems.filter(e => e.id !== item.id);
    this.setState({items: newItems}, () => {
      // 디버깅 콜백
      console.log("Update Items : ", this.state.items);
    });
    console.log("items : ", this.state.items);
  }

  render(){
    var todoItems = this.state.items.length > 0 && (
      <Paper style={{margin: 16}}>
        <List>
          {this.state.items.map((item, idx) => (
            <Todo item={item} key={item.id} delete = {this.delete} readOnly = {this.readOnly}/>
          ))}
        </List>
      </Paper>
    );  

    return (
      <div className="App">
        <Container maxWidth="md">
          <AddTodo add = {this.add}/>
          <div className='TodoList'>{todoItems}</div>
        </Container>
      </div>
    )
  }
}

export default App;
