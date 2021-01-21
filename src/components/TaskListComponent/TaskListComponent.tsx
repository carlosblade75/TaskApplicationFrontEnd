import React from 'react';
import { ITask } from '../../Interface/ITask'
import { TaskComponent } from '../TaskComponent/TaskComponent';
import './TaskListComponent.css'

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
  
          <ul>
            
            {taskList.length > 0 && taskList.map((task, index) => {
              return <TaskComponent 
                            key= {task.id} 
                            id = {task.id} 
                            description = {task.description} 
                            isCompleted = {task.isCompleted} 
                      />
            })}

          </ul>

          </div>

      </>

    )
}