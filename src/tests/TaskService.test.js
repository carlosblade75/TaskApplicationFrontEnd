/**
* @jest-environment node
*/

import { TaskService } from '../services/TaskService'

describe( 'Test TaskService', () => {

    test( '' , async() => {

        

        const data = await TaskService.GetAllTask();

        //expect(data).toBe([])

       
    })
})