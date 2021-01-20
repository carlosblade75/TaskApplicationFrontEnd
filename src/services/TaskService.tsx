import {ITask} from '../Interface/ITask'

export class TaskService {

    static async GetAllTask () {

        const url = `http://localhost:50454/api/task`;
    
        const resp = await fetch(url);
    
        const data = await resp.json();
        
        return data;
    
    }

    static async UpdateTask (task: ITask) {

      const url = `http://localhost:50454/api/task`;
  
      const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(task)
    };

      const resp = await fetch(url, requestOptions);
  
      const data = await resp.json();
      
      return data;
  }

  static async AddTask (task: ITask) {

    const url = `http://localhost:50454/api/task`;

    const requestOptions = {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(task)
  };

    const resp = await fetch(url, requestOptions);

    const data = await resp.json();
    
    return data;
}

}

/*
import React from 'react'
import PropTypes from 'prop-types';

const FunctionalComponentName = (props) => {
    return (
      <h1>Hello, {props.name}</h1>
    )
}

FunctionalComponentName.propTypes = {
  name: PropTypes.string
};
*/