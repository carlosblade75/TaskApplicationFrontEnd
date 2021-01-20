import React, { createContext } from 'react';
import { ITask } from '../Interface/ITask';

export type TaskContextType = {
    checkUpdate: (task: ITask) => void
}

const defaultValue : TaskContextType = {
    checkUpdate : (task: ITask) => null
}

export const TaskContext = createContext<TaskContextType>(defaultValue);
