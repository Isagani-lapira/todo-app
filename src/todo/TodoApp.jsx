import Home from "./pages/Home/Home";
import {BrowserRouter,Routes,Route, Navigate} from 'react-router-dom';
import Welcome from "./pages/Welcome/Welcome";
import ErrorComponent from "./component/404-message/ErrorComponent";
import HeaderComponent from "./component/common/common";
import AuthProvider from "./security/AuthContext";
import { useAuth } from "./security/AuthContext";
import TodoField from "./component/todofield/TodoField";

export default function TodoApp(){
    function AuthenticatedRoute({children}){
        const { isAuthenticated } = useAuth();
        if(isAuthenticated)
            return children;
    
        return <Navigate to="/"/>
    }

    return (
        <div className="todoApp">
            <AuthProvider>
                <BrowserRouter>
                    <HeaderComponent/>
                    <Routes>        
                        <Route path="/" element={<Home/>}/>
                        <Route path="*" element={<ErrorComponent/>}/>

                        <Route path="/welcome/:username" element={
                             <AuthenticatedRoute>
                                <Welcome/>
                            </AuthenticatedRoute>
                        }/>

                        <Route path="/add-task" element={
                             <AuthenticatedRoute>
                                <TodoField/>
                            </AuthenticatedRoute>
                        }/>
                        <Route path="/update-task/:id" element={
                             <AuthenticatedRoute>
                                <TodoField/>
                            </AuthenticatedRoute>
                        }/>
                       
                    </Routes>
                    {/* <FooterComponent/> */}
                </BrowserRouter>
            </AuthProvider>
        </div>
    );
}