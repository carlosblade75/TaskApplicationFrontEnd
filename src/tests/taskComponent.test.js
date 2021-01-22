import React from 'react'
import '@testing-library/jest-dom'
import { TaskComponent } from "../components/TaskComponent/TaskComponent"
import { shallow } from 'enzyme'

describe('Testing for <TaskComponent/>', () => {

    test('should show <TaskComponent/> properly', () => {

        const description = 'Task Descrition'

        const wrapper = shallow( <TaskComponent describe = {description} id = {1} isCompleted = {false} /> )

        expect(  wrapper ).toMatchSnapshot()
       
    })
})