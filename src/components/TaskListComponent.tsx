import React, {useState, useEffect} from 'react';
import {ITask} from '../Interface/ITask'
import {TaskComponent} from '../components/TaskComponent';

type PropsTaskList = {
    title: string,
    taskList: ITask[]
}

export const TaskListComponent = (props: PropsTaskList) => {

    const {title, taskList } = props;

    return (

        <div>
          <p>{title} - ({taskList.length})</p>
  
          <ul>
            
            {taskList.length > 0 && taskList.map((task, index) => {
              return <TaskComponent key= {task.id} id = {task.id} description = {task.description} isCompleted = {task.isCompleted} />
            })}

          </ul>
  
        </div>
    )
}