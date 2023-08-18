import { useDispatch } from 'react-redux';
import { logout } from '../store/authSlice';
/********** React Icons **********/
import { AiOutlineLogout } from 'react-icons/ai'
//
export default function Logout ({broadcastChannel}){
  const dispatch = useDispatch();
  const handleLogout = () => {
    fetch('http://localhost:4000/logout', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then((response) => {
        if (response.ok) {
          localStorage.removeItem('localst');
          // Clear the local session and Redux state
          dispatch(logout());
          broadcastChannel.postMessage('session-expired');
          console.log('Logout successful');
        } else {
          console.error('Logout failed');
        }
      })
      .catch((error) => {
        console.error('Error during logout:', error);
      });
  };
    return (
      <div className="p-3 text-bermuda cursor-pointer w-32 hover:scale-115">
        <AiOutlineLogout size={32} onClick={handleLogout}/>
      </div>
    )
}