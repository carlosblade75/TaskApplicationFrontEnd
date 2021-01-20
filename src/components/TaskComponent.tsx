import React, { useContext, useState } from 'react';
import { TaskContext } from '../Context/TaskContext'

type PropsTask = {
    id: number,
    description: string,
    isCompleted: boolean
}

export const TaskComponent = (props: PropsTask) => {

    const [value, setValue] = useState(props.isCompleted);

    const {id, description} = props;

    const { checkUpdate } = useContext(TaskContext);

    const handleToggleChange= () => {
        console.log('Cmabiando')
        checkUpdate({ id, description, isCompleted: !value});
        setValue(!value)
    }

    return (
        <div>
            <input type="hidden" value={id}/>
            <input type="checkbox" checked={value} onChange= { handleToggleChange }/>
            <label>{description}</label>
        </div>
    )
}