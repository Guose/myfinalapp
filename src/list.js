import React, {Component} from 'react'
import axios from 'axios'

const herokuServerUrl = 'https://evening-crag-07910.herokuapp.com/'
const localServerUrl = 'http://localhost:3001/'


class List extends Component {
    constructor(props) {
        super(props)
        this.state = {
            todos: [],
            sortByChecked: false,
        }
        this.retrieve = this.retrieve.bind(this)
    }

    async retrieve() {
        await axios.get(herokuServerUrl + 'list').then((res) => {
            const sortedTodos = [...res.data]

            // Sort the todos based on the 'done' property
            sortedTodos.sort((a, b) => {
                if (a.done && !b.done) return 1
                if (!a.done && b.done) return -1
                return 0
            })

            // Parse 'completed' strings into Date objects
            sortedTodos.forEach((todo) => {
                todo.completed = new Date(todo.completed)
            })

            // Sort by 'completed' property
            sortedTodos.sort((a, b) => {
                if (a.done && b.done) {
                    return a.completed - b.completed
                }
                return 0
            })
            
            this.setState({todos: sortedTodos})
        })
    }

    async updateDatabase(todo) {
        console.log('Id of myTodo: ', todo._id);
        await axios.put(herokuServerUrl + 'update', {
            data: todo
        }).then(res => {
            console.log('response.data: ', res.data);
            this.retrieve();
        }).catch(error => {
            console.error('Error updating the database:', error);
        });
    }
    

    getSpecificTask(passId) {
        axios.delete(herokuServerUrl + 'delete', {
            data: {
                id: passId
            }
        }).then(res => {
            console.log("response.data: ", res.data)
            this.retrieve()
        })
    }
    componentDidMount()  {
        this.retrieve()
    }

    onChange(e, i) {
        const { todos } = this.state
        todos[i].done = e.target.checked
        console.log('todo changed: ', todos[i])
        this.updateDatabase(todos[i])
    }

    render() {
        console.log("This.state: ", this.state)
        const { todos } = this.state
        const todosList = todos.map((el, i) => {
            
            const completedDate = new Date(el.completed).toISOString().split('T')
            console.log('formatted date: ', completedDate)

            return (
                <tr key={i} id='header'>                    
                    <td>{el.description}</td>
                    <td>{el.priority}</td>
                    <td>{completedDate[0]}</td>
                    <td>
                        <input 
                            type='checkbox' 
                            onChange={(e) => this.onChange(e,i)}
                            checked={el.done}
                        />
                    </td>
                    <td key='delete'>
                        <button onClick={() => this.getSpecificTask(el._id)}>DELETE</button>
                    </td>
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
                        {todosList}
                    </tbody>
                </table>
            </div>
        )
    }
}

export default List