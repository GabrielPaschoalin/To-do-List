import React from "react";

export const Task = ({ task, onCheckboxClick, onDeleteClick }) => {
    return (
        <li>
            <input 
                type="checkbox" 
                checked={!!task.isChecked} //o duplo ! transforma o dado em um booleano correspondente
                onClick={() => onCheckboxClick(task)}
                readOnly
            />
            <span>{task.text}</span>
            <button onClick={() => onDeleteClick(task)}>&times;</button>
        </li>
    );
};