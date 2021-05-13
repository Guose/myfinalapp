import React, {Component} from 'react';
import axios from 'axios';

class List extends Component {
    constructor(props) {
        super(props);
        this.state = {
            todos: []
        };
        this.retrieve = this.retrieve.bind(this);
    }

    retrieve() {
        axios.get('https://evening-crag-07910.herokuapp.com/list')
        .then(res => {
            this.setState({todos: res.data});
        })
    }
    getSpecificTask(passId) {
        axios.delete('https://evening-crag-07910.herokuapp.com/delete', {
            data: {
                id: passId
            }
        }).then(res => {
            console.log("response.data: ", res.data);
            this.retrieve();
        })
    }
    componentDidMount()  {
        this.retrieve();
    }

    render() {
        console.log("This.state: ", this.state);
        let todos = this.state.todos.map(el => {
            return (
                <tr id='header'>                    
                    <td>{el.description}</td>
                    <td>{el.priority}</td>
                    <td>{el.completed}</td>
                    <td><input type='checkbox'/></td>
                    <td><button onClick={() => this.getSpecificTask(el._id)}>DELETE</button></td>
                </tr>
            )
        })
        return(
            <div>
                <h1 id='title'>Tasks List</h1>
                <table id='students'>
                    <thead>
                        <th>Description</th>
                        <th>Priority</th>
                        <th>Complete By</th>
                        <th>Done</th>
                        <th>Delete</th>
                    </thead>
                    <tbody>
                        {todos}
                    </tbody>
                </table>
            </div>
        )
    }
}

export default List;