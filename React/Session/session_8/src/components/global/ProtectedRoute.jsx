import {Navigate,Outlet} from 'react-router-dom';
import Header from './Header';

export default function ProtectedRoute(){
    const token = sessionStorage.getItem('token');
    return(
        <>
        {
            token ? (<><Header/><Outlet/></>): <Navigate to='/login'/>
        }
        </>
    )
}