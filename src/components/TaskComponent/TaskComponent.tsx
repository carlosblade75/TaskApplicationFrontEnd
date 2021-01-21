import React, { useContext, useState } from 'react';
import { TaskContext } from '../../Context/TaskContext'
import './TaskComponent.css'

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
        checkUpdate({ id, description, isCompleted: !value});
        setValue(!value)
    }

    return (
        <div className="form-check">
            
            <input  type="hidden" 
                    value={id}
            />

            <input  className="form-check-input CheckBox" 
                    type="checkbox" 
                    checked={value} 
                    onChange= { handleToggleChange }
            />

            <label  className={"form-check-label CheckBoxLabel " + (value ? "isCompleted" : "")}>
                {description}
            </label>
            
        </div>
    )
}