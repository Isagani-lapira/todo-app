import { useEffect, useState } from "react";
import { getAllTask, removeTask } from "../../api/todoapi";
import { Link } from "react-router-dom";

export default function ListComponent({username}) {
    const [tasks, setTasks] = useState([]);

    useEffect(() => {
        async function fetchTasks() {
            try {
                const response = await getAllTask(username);
                setTasks(response);
            } catch (error) {
                console.error("Error fetching tasks:", error);
            }
        }

        fetchTasks();
    },[]); 


    async function deleteTask(id){
        const response = await removeTask(id);
        
        if(response.status == 204)
            setTasks(prevTask=>prevTask.filter(task=>task.id!==id))  
    }

    return (
        <table className="table">
            <thead>
                <tr>
                    <th>Task</th>
                    <th>Deadline</th>
                    <th>Status</th>
                    <th>Action</th>
                </tr>
            </thead>

            <tbody>
                {tasks.map((data) => (
                    <tr key={data.id}>
                        <td>{data.task}</td>
                        <td>{new Date(data.taskDeadline).toDateString()}</td>
                        <td>
                            {
                                data.status ? 
                                <span className="text-success">Completed</span> :
                                <span className="text-primary">In progress</span>
                            }

                        </td>
                        <td>
                            <Link className='btn btn-primary' to={`/update-task/${data.id}`}>Update Task</Link>
                            <button className="btn btn-danger" onClick={()=>deleteTask(data.id)}>Delete</button>
                        </td>
                    </tr>
                ))}
            </tbody>
        </table>
    );
}
