import { useEffect, useState } from 'react';
import { FaTrash } from 'react-icons/fa';
import './index.css';

function App() {
const [tasks, setTasks] = useState([]);
const [newTask, setNewTask] = useState('');

useEffect(() => {
    const savedTasks = JSON.parse(localStorage.getItem('tasks') || '[]');
    setTasks(savedTasks);
}, []);


const addTask = (e) => {
    e.preventDefault();
    if (newTask.trim()) {
    const newTaskItem = { 
        text: newTask, 
        completed: false 
    };
    const updatedTasks = [...tasks, newTaskItem];
    setTasks(updatedTasks);
    localStorage.setItem('tasks', JSON.stringify(updatedTasks));

    setNewTask('');
    }
};

const toggleTaskCompletion = (index) => {
    const newTasks = [...tasks];
    newTasks[index].completed = !newTasks[index].completed;
    setTasks(newTasks);

};

const deleteTask = (index) => {
    const newTasks = tasks.filter((_, i) => i !== index);
    setTasks(newTasks);
    localStorage.setItem('tasks', JSON.stringify(newTasks));

};

return (
    <div style={{ maxWidth: '400px', margin: 'auto', padding: '20px',backgroundColor:'lavander' }}>
    <h1 className='text-4xl font-bold text-center py-6'>Todo List</h1>
    <form onSubmit={addTask} className='flex flex-row w-full justify-center flex-wrap gap-4'>
        <input 
        type="text" 
        value={newTask}
        onChange={(e) => setNewTask(e.target.value)}
        placeholder="Enter a task"
        style={{ marginRight: '10px' }}
        className='border rounded-full w-full px-2 py-4'
        />
        <button type="submit" className='bg-pink-500 px-8 py-2 rounded-full text-white '>Add</button>
    </form>
    <ul style={{ listStyleType: 'none', padding: 0 }}>
        {tasks.map((task, index) => (
        <li 
            key={index} 
            style={{ 
            display: 'flex', 
            alignItems: 'center', 
            marginBottom: '10px' 
            }}
        >
            <input 
            type="checkbox"
            checked={task.completed}
            onChange={() => toggleTaskCompletion(index)}
            style={{ marginRight: '10px' }}
            />
            <span 
            style={{ 
                textDecoration: task.completed ? 'line-through' : 'none',
                flexGrow: 1
            }}
            className='text-xl'
            >
            {task.text}
            </span>
            <button 
            onClick={() => deleteTask(index)}
            style={{ 
                background: 'none', 
                border: 'none', 
                cursor: 'pointer' 
            }}
            >
            <FaTrash className='text-pink-500' size={20} />
            </button>
        </li>
        ))}
    </ul>
    </div>
);
}

export default App;