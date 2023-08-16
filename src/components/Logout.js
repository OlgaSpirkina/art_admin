import Cookies from 'js-cookie';
import { useDispatch } from 'react-redux';
export default function Logout (broadcastChannel){
    const dispatch = useDispatch();
    const logout = async (e) => {
        e.preventDefault();
        try {
          const response = await fetch('http://localhost:4000/logout', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            }
          });
          if (response.ok) {
            const data = await response.json();
            console.log(data.success)
            dispatch({ type: 'LOGOUT' });
            broadcastChannel.postMessage('session-expired');
            Cookies.remove('authToken');
            console.log('Logout successful');
          } else {
            console.error('Logout failed');
          }
        } catch (error) {
          console.error('Error during logout:', error);
        }
    };
    return (
        <button onClick={logout}>logout</button>
    )
}