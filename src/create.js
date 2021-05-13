import React, { Component } from 'react';
import axios from 'axios';
import { SchemaTypeOptions } from 'mongoose';

const options = [
    {
        label: 'Low',
        value: 'low',
    },
    {
        label: 'Medium',
        value: 'medium',
    },
    {
        label: 'High',
        value: 'high',
    },
    {
        label: 'Very High',
        value: 'very high',
    },
]

class Create extends Component {
    constructor(props) {
        super(props);
        this.state = {
            description: '',
            priority: 'Medium',
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
        e.preventDefault();
        console.log('SUBMITTED');
        let obj = {
            description: this.state.description,
            priority: this.state.priority,
            completed: this.state.completed
        }
        axios.post('http://localhost:3001/create', obj)
            .then(res => {
                console.log(res.data);
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
                            {/* <input type='text' value={this.state.priority} onChange={this.handlePriority} placeholder='Enter Priority' /><br></br> */}
                            <label>Task Complete By</label>
                            <input type='date' value={this.state.completed} onChange={this.handleCompleted} placeholder='Enter Completed' /><br></br>
                            <input type='submit' id='btnForm' />
                        </form>
                    </div>


                </div>
            </div>

        )
    }
}

export default Create;