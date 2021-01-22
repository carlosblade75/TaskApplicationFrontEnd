import React, {useState, useEffect} from 'react';
import { TaskService } from '../../services/TaskService'
import { ITask } from '../../Interface/ITask'
import { TaskListComponent } from '../../components/TaskListComponent/TaskListComponent'
import { TaskContext } from '../../Context/TaskContext'
import  './TaskContainerComponent.css'

export const TaskContainerComponent = () => {

  const defaultProps = {
    pendingTaskList : [],
    compelteTaskList : [],
  };

  const [taskList, setTaskList] = useState(defaultProps);
  const [timeToRefresh, setTimeToRefresh] = useState(Date.now());
  const [descriptionTask, setDescriptionTask] = useState('')

  const fetchDataAsync = async () => {

    try {
      return  await TaskService.GetAllTask();
    }
    catch(error) {
      console.error(error);
    }

  } 

  const handleCheckUpdate = async (task:ITask) => {

    try {
      
      const {success, messageError} = await TaskService.UpdateTask(task);

      if (success) {
        setTimeToRefresh(Date.now());
      }
      else {
        console.error(messageError);
      }

    }
    catch(error) {
      console.error(error);
    }
   
  }

  const  AddTaskService = async(task) =>  {

    await TaskService.AddTask(task);
  }

  const handleAddButton = async () => {

    try {

      if (descriptionTask.length > 0) {

        const task:ITask = {isCompleted :false, id : 0, description : descriptionTask};
        
        AddTaskService(task)

        setDescriptionTask('');
        
        setTimeToRefresh(Date.now());
      }
    }
    catch(error) {
      console.error(error);
    }

  }

  const handleChangeDescription = (e: React.FormEvent<HTMLInputElement>) => {
    setDescriptionTask(e.currentTarget.value)
  }

  useEffect(() => {
    
    fetchDataAsync().then( data => {
      
      const pendingTask = data.filter( (task:ITask) => !task.isCompleted);

      const completedTask = data.filter( (task:ITask) => task.isCompleted);
       
      setTaskList({pendingTaskList: pendingTask, completedTaskList: completedTask});

    });

  }, [timeToRefresh])

  return (

      <div className="container-fluid containerTask">

        <div className="row">

          <TaskContext.Provider value= {{ checkUpdate : handleCheckUpdate }} >

          <div className="col-6">
            <TaskListComponent title="Pending Tasks" taskList={taskList.pendingTaskList} />
          </div>

          <div className="col-6">
            <TaskListComponent title="Completed Tasks" taskList={taskList.completedTaskList} />
          </div>

          </TaskContext.Provider>

        </div>

        <hr></hr>

        <div className="row containerAdd">
          
          <input  type="text" 
                    value={descriptionTask} 
                    onChange = { handleChangeDescription }
                    placeholder="Add new task"
                    className="form-control inputTask"
          /> 

          <button className="btn btn-success btnAddTask" 
                  onClick= { handleAddButton }> 
                  Add Task
          </button>

        </div>

      </div>
  )
}

