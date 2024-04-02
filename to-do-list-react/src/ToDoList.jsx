import { useState } from "react";

function ToDoList() {
    const [tasks, setTasks] = useState([]);
    const [newTask, setNewTask] = useState("");
    const [editedTaskIndex, setEditedTaskIndex] = useState(null);
    const [editedTaskText, setEditedTaskText] = useState("");

    function handleInputChange(event) {
        setNewTask(event.target.value);
    }

    function addTask() {
        if (editedTaskIndex !== null) {
            const updatedTasks = [...tasks];
            updatedTasks[editedTaskIndex] = editedTaskText;
            setTasks(updatedTasks);
            setEditedTaskIndex(null);
            setEditedTaskText("");
        } else if (newTask.trim() !== "") {
            setTasks(t => [...t, newTask]);
            setNewTask("");
        }
    }

    function deleteTask(index) {
        const updatedTasks = tasks.filter((_, i) => i !== index);
        setTasks(updatedTasks);
    }

    function moveTaskUp(index) {
        if (index > 0) {
            const updatedTasks = [...tasks];
            [updatedTasks[index], updatedTasks[index - 1]] = [updatedTasks[index - 1], updatedTasks[index]];
            setTasks(updatedTasks);
        }
    }

    function moveTaskDown(index) {
        if (index < tasks.length - 1) {
            const updatedTasks = [...tasks];
            [updatedTasks[index], updatedTasks[index + 1]] = [updatedTasks[index + 1], updatedTasks[index]];
            setTasks(updatedTasks);
        }
    }

    function editTask(index) {
        setEditedTaskIndex(index);
        setEditedTaskText(tasks[index]);
    }

    return (
        <div className="to-do-list">
            <h1>To Do List</h1>
            <div>
                <input
                    type="text"
                    placeholder="Enter a task..."
                    value={editedTaskIndex !== null ? editedTaskText : newTask}
                    onChange={handleInputChange}
                />
                <button className="add-button" onClick={addTask}>
                    {editedTaskIndex !== null ? "Save Task" : "Add Task"}
                </button>
            </div>
            <ol>
                {tasks.map((task, index) => (
                    <li key={index}>
                        {index === editedTaskIndex ? (
                            <input
                                type="text"
                                value={editedTaskText}
                                onChange={(e) => setEditedTaskText(e.target.value)}
                            />
                        ) : (
                            <span className="text" onClick={() => editTask(index)}>
                                {task}
                            </span>
                        )}
                        <button className="delete-btn" onClick={() => deleteTask(index)}>
                            Delete
                        </button>
                        <button className="move-up-btn" onClick={() => moveTaskUp(index)}>
                            Move up
                        </button>
                        <button className="move-down-btn" onClick={() => moveTaskDown(index)}>
                            Move down
                        </button>
                        
                    </li>
                ))}
            </ol>
        </div>
    );
}

export default ToDoList;
