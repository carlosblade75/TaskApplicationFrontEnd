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
    return  await TaskService.GetAllTask();
  } 

  const handleCheckUpdate = async (task:ITask) => {

    const {success, messageError} = await TaskService.UpdateTask(task);

    if (success) {
      setTimeToRefresh(Date.now());
    }
    else {
      console.error(messageError);
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

      <div className="container-fluid containerTask">

        <div className="row">

          <TaskContext.Provider value= {{ checkUpdate : handleCheckUpdate }} >

          <div className="col-6">
            <TaskListComponent title="Pending Tasks" taskList={taskList.pendingTaskList} />
          </div>

          <div className="col-6">
            <TaskListComponent title="Completed Tasks" taskList={taskList.compelteTaskList} />
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

