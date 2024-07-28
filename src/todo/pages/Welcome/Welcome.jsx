import React, { useEffect, useState } from 'react';
import ListComponent from '../../component/todolist/TodoListComponent';
import { useAuth } from '../../security/AuthContext';
import { useParams } from 'react-router-dom';
import { getAllTask } from '../../api/todoapi';

export default function Welcome() {
    const auth = useAuth();
    const params = useParams();
    
    return (
        <div>
            <h3 className='mb-5'>Welcome home {auth.username}</h3>
            <ListComponent username={params.username}/>
        </div>
    );
}
