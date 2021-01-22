import React from 'react'
import '@testing-library/jest-dom'
import { TaskComponent } from "../components/TaskComponent/TaskComponent"
import { shallow } from 'enzyme'

describe('Testing for <TaskComponent/>', () => {

    const id = 1
    const description = 'Task Description'
    const wrapper = shallow( <TaskComponent description = {description} id = { id } isCompleted = {false} /> )

    test('should show <TaskComponent/> properly', () => {
        expect(  wrapper ).toMatchSnapshot()
    });

    test('should show the description properly', () => {

        const wrapper = shallow( <TaskComponent description = {description} id = { id }  /> )

        const descriptionInComponent = wrapper.find('label').text()

        expect( descriptionInComponent ).toBe( description )

    });

    test('should show the task as pending', () => {
        
        const className = wrapper.find('label').prop('className')

        expect( className.includes('form-check-label CheckBoxLabel')).toBe( true )
        expect( className.includes('isCompleted')).toBe( false )
    })

    test('should shows the task as line-through when is completed', () => {
        
        const wrapper = shallow( <TaskComponent description = {description} id = { id } isCompleted={true} /> )
        
        const className =  wrapper.find('label').prop('className')

        expect( className.includes('form-check-label CheckBoxLabel')).toBe( true )
        expect( className.includes('isCompleted')).toBe( true )
    })
    
})