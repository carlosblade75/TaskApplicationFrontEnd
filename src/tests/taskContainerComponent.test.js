import React from 'react'
import '@testing-library/jest-dom'
import { TaskContainerComponent } from "../components/TaskContainerComponent/TaskContainerComponent"
import { shallow } from 'enzyme'

describe('Testing for <TaskContainerComponent/>', () => {
    
    let wrapper = shallow( <TaskContainerComponent /> )

    beforeEach( () => {

        jest.clearAllMocks()
        wrapper = shallow( <TaskContainerComponent /> )
    })

    test('should show <TaskContainerComponent/> properly', () => {
        expect(  wrapper ).toMatchSnapshot()
    })

    test('should show two TaskListComponents', () => {
        expect (wrapper.find('TaskListComponent').length ).toBe( 2 )
    })

    test('should change the value of the input', () => {
        
        const setDescriptionTask = jest.fn()

        const value= 'Task new'

        const e = { currentTarget : { value: 'Task new' } }

        wrapper.find('input').simulate('change', e)

        expect( wrapper.find('input').prop('value') ).toBe( value )
    })

    test('should not update the description task method', () => {

        const setDescriptionTask = jest.fn()
        const setTimeToRefresh = jest.fn()

        wrapper.find('button').simulate('click')

        expect( wrapper.find('input').prop('value') ).toBe( '' )
        expect( setDescriptionTask ).not.toHaveBeenCalled()
        expect( setTimeToRefresh ).not.toHaveBeenCalled()
    })

    test('should empty the input once the add has been added', () => {

        const handleAddButton = jest.fn()

        const value= 'Task new'

        const e = { currentTarget : { value } }

        wrapper.find('input').simulate('change', e)

        wrapper.find('button').simulate('click')

        expect( wrapper.find('input').prop('value') ).toBe( '' )
    })
  
})
