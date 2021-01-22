import React from 'react'
import '@testing-library/jest-dom'
import { TaskListComponent } from "../components/TaskListComponent/TaskListComponent"
import { shallow } from 'enzyme'
import { ITask } from '../Interface/ITask'

describe('Testing for <TaskListComponent/>', () => {
    
    const wrapper = shallow( <TaskListComponent /> )

    test('should show <TaskListComponent/> properly', () => {
        
        expect(  wrapper ).toMatchSnapshot()
    })

    test('should show List empty and a default title', () => {

        const titleInComponent = wrapper.find('h3').text()
        const ulInComponent = wrapper.find('ul').text().trim()

        expect( titleInComponent ).toBe('Task List - (0)')
        expect( ulInComponent ).toBe('')
    })

    test('should show a list with a title and a task properly', () => {

        const tasks:ITask[] = [{id:1, description:'First task', isCompleted:false}]

        const title = `Pending tasks`

        const wrapper = shallow( <TaskListComponent taskList={ tasks } title={title} /> )

        const titleInComponent = wrapper.find('h3').text()

        expect (wrapper.find('li').exists() ).toBe(true)

        expect (wrapper.find('TaskComponent').length ).toBe(tasks.length)

        expect( titleInComponent ).toBe( `${title} - (${tasks.length})`)
    })
    
})
