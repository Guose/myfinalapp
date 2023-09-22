import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import axios from 'axios';
//import { SchemaTypeOptions } from 'mongoose';

const options = [
    {label: 'Low', value: 'low'},
    {label: 'Medium', value: 'medium'},
    {label: 'High', value: 'high'},
    {label: 'Very High', value: 'very high'}
]

//const herokuServerUrl = 'https://evening-crag-07910.herokuapp.com/'
const localServerUrl = 'http://localhost:3001/'

class Create extends Component {
    constructor(props) {
        super(props);
        this.state = {
            description: '',
            priority: options[1].value,
            createdOn: Date.now(),
            completed: ''
        }
        this.handleDescription = this.handleDescription.bind(this);
        this.handlePriority = this.handlePriority.bind(this);
        this.handleCompleted = this.handleCompleted.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }
    handleDescription(e) {
        this.setState({ description: e.target.value })
    }
    handlePriority(e) {
        this.setState({ priority: e.target.value })
    }
    handleCompleted(e) {
        this.setState({ completed: e.target.value })
    }

    handleSubmit(e) {
        e.preventDefault()        
        let obj = {
            description: this.state.description,
            priority: this.state.priority,
            createdOn: Date.now(),
            completed: this.state.completed,
            done: false
        }
        axios.post(localServerUrl + 'create', obj)
            .then((res) => {
                console.log(res.data);
            }).then(() => {
                console.log('SUBMITTED')
            }).finally(() => {
                this.props.history.push('/list')
            })
    }

    render() {
        return (
        <div id='main'>
            <div id='containerForm'>
                <div id='headerForm'>
                    <h1 className='newTask'>Create NEW Task</h1>
                </div>
                <div id='form'>
                    <form onSubmit={this.handleSubmit} className='forms'>
                        <label>Task Description</label>
                        <input type='text' value={this.state.description} onChange={this.handleDescription} placeholder="Enter Description" /><br></br>
                        <label>Task Priority</label>
                        <select id='priority' value={this.state.priority} onChange={this.handlePriority}>
                            {options.map((option) => (
                                <option value={option.value}>{option.label}</option>
                            ))}
                        </select><br></br>
                        <label>Task Complete By</label>
                        <input type='date' value={this.state.completed} onChange={this.handleCompleted} /><br></br>
                        <input type='submit' id='btnForm'/>
                    </form>
                </div>
            </div>
        </div>

        )
    }
}

export default withRouter(Create)