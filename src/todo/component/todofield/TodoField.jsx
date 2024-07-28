import { Formik, Form, Field, ErrorMessage} from "formik";
import {useAuth} from '../../security/AuthContext';
import { addNewTask, getTaskById, updateTask } from "../../api/todoapi";
import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
export default function TodoField(){

    const {username} = useAuth();
    const navigate = useNavigate();
    const {id} = useParams();
    const [initialValues, setInitialvalues] = useState({task:'',taskDeadline:''})
    const [forUpdate, setForUpdate] = useState(false);
    
    // for update functionalities
    useEffect(()=>{
        async function loadData(id){
            const data = await getTaskById(id);
            setInitialvalues({
                task: data.task,
                taskDeadline: data.taskDeadline
            })

        }
        if(id!=undefined){
            loadData(id)
        }else setForUpdate(true);
    },[id])

    async function onSubmit(values){
        try{
            let todo = { 
                username: username, 
                task: values.task,
                taskDeadline: values.taskDeadline,
            }

            let response;
            if(forUpdate) response = await addNewTask(todo);
            else{
                todo.id = id;
                response = await updateTask(todo);              
            }

            if(response.status == 201 || response.status == 200)
                navigate(`/welcome/${username}`)
            
            
        }catch(errors){
            console.log(errors)
        } 
        

       
    }

    const validate = (values)=>{
        const errors = {};

        if(values.task.length<5)
            errors.task = 'Description too short. (min. 5)'
        if(values.taskDeadline == '')
            errors.taskDeadline = 'Target date cannot be empty'

        return errors;
    }
    return(
        <div className="container d-flex flex-column justify-content-center align-items-center gap-2">
           <h1>Task Informations</h1>
            <Formik 
            initialValues={initialValues}
            onSubmit={onSubmit}
            validateOnBlur={false}
            validateOnChange={false}
            validate={validate}
            enableReinitialize={true}
            >
                {
                    ()=>(
                        <Form className="w-75">
                            <ErrorMessage name="task" component="div" className="alert alert-warning"/>
                            <ErrorMessage name="taskDeadline" component="div" className="alert alert-warning"/>
                            <fieldset className="d-flex flex-column align-items-start">
                                <label htmlFor="task" className="form-label">Description</label>
                                <Field type="text" id="task" name="task" className="form-control p-3" />
                            </fieldset>
                            <fieldset className="d-flex flex-column align-items-start mt-2">
                                <label htmlFor="taskDeadline" className="form-label">Target Date</label>
                                <Field type="date" id="taskDeadline" name="taskDeadline" className="form-control p-3" />
                            </fieldset>

                            <button type="submit" className="btn btn-primary mt-3 d-block w-100 p-3">Submit</button>
                        </Form>
                    )
                }
            </Formik>
        </div>
    )
}