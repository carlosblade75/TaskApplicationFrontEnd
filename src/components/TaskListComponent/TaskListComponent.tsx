import React from 'react';
import { ITask } from '../../Interface/ITask'
import { TaskComponent } from '../TaskComponent/TaskComponent';
import './TaskListComponent.css'
import PropTypes from "prop-types";

type PropsTaskList = {
    title: string,
    taskList: ITask[]
}

export const TaskListComponent = (props: PropsTaskList) => {

    const {title, taskList } = props;

    return (

      <>
          <h3 className="title">{title} - ({taskList.length})</h3>

          <div className="containerList">
  
            <ul className = "listTask">
              
              {taskList.length > 0 && taskList.map((task, index) => {
                return  (
                          <li key= {task.id} > 
                            <label>{index + 1}.</label>
                            <TaskComponent 
                                  id = {task.id} 
                                  description = {task.description} 
                                  isCompleted = {task.isCompleted} 
                            />
                          </li>
                        )
              })}

            </ul>

          </div>

      </>

    )
}

TaskListComponent.propTypes = {
  title : PropTypes.string.isRequired,
  taskList: PropTypes.arrayOf(PropTypes.shape({id: PropTypes.number, description: PropTypes.string, isCompleted: PropTypes.bool})).isRequired
}

TaskListComponent.defaultProps = {
  title: 'Task List',
  taskList:[]
}