import React, {useState, useEffect} from 'react';
import { TaskService } from '../services/TaskService'
import { ITask } from '../Interface/ITask'
import { TaskListComponent } from './TaskListComponent';
import { TaskContext } from '../Context/TaskContext'

export const TaskContainerComponent = () => {

  const defaultProps = {
    pendingTaskList : [],
    compelteTaskList : [],
  };

  const [taskList, setTaskList] = useState(defaultProps);
  const [timeToRefresh, setTimeToRefresh] = useState(Date.now());
  const [descriptionTask, setDescriptionTask] = useState('')

  const fetchDataAsync = async () => {
    return  await TaskService.GetAllTask();
  } 

  const handleCheckUpdate = async (task:ITask) => {

    const {success, messageError} = await TaskService.UpdateTask(task);

    if (success) {
      setTimeToRefresh(Date.now());
    }
    else {
      // Just show the message Error in the consolo at the moment
      console.log(messageError);
    }
   
  }

  const handleAddButton = async () => {

    const task:ITask = {isCompleted :false, id : 0, description : descriptionTask};

    await TaskService.AddTask(task);

    setDescriptionTask('');
    
    setTimeToRefresh(Date.now());
  }

  const handleChangeDescription = (e: React.FormEvent<HTMLInputElement>) => {

    setDescriptionTask(e.currentTarget.value)
  }

  useEffect(() => {
    
    fetchDataAsync().then( data => {
      
      const pendingTask = data.filter( (task:ITask) => !task.isCompleted);

      const completedTask = data.filter( (task:ITask) => task.isCompleted);
       
      setTaskList({pendingTaskList: pendingTask, compelteTaskList: completedTask});

    });

  }, [timeToRefresh])

  return (

      <div>

        <TaskContext.Provider value= {{ checkUpdate : handleCheckUpdate }} >

          <TaskListComponent title="Pending Tasks" taskList={taskList.pendingTaskList} />

          <TaskListComponent title="Completed Tasks" taskList={taskList.compelteTaskList} />
          
          <input  type="text" 
                  value={descriptionTask} 
                  onChange = { handleChangeDescription }
                  placeholder="Add new task"/> <button onClick= { handleAddButton }> Add Task</button>

        </TaskContext.Provider>

      </div>
  )
}

