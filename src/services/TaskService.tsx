import {ITask} from '../Interface/ITask'
import configData from '../config.json'

export class TaskService {

    static async GetAllTask () {

      try {

          const url = configData.URLBackend;
      
          const resp = await fetch(url);
      
          const data = await resp.json();
          
          return data;
      }
      catch (error) {
        return error;
      }
    }

    static async UpdateTask (task: ITask) {

      try {

          const url = configData.URLBackend;
    
          const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(task)
          };
    
          const resp = await fetch(url, requestOptions);
      
          const data = await resp.json();
          
          return data;
      }
      catch (error) {
        return error;
      }

    }

  static async AddTask (task: ITask) {

    try {

        const url = configData.URLBackend;

        const requestOptions = {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(task)
        };
    
        const resp = await fetch(url, requestOptions);
    
        const data = await resp.json();
        
        return data;
    }
    catch (error) {
      return error;
    }
  }

}