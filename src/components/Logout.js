import Cookies from 'js-cookie';
import { useDispatch } from 'react-redux';
/********** React Icons **********/
import { AiOutlineLogout } from 'react-icons/ai'
//
export default function Logout (broadcastChannel){
  console.log("broadcast ch")
  console.log(broadcastChannel)
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
      <div className="p-3 text-bermuda cursor-pointer w-32 hover:scale-115">
        <AiOutlineLogout size={32} onClick={logout}/>
      </div>
    )
}