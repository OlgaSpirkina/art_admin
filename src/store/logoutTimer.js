import {store} from './index'
import { logout } from './authSlice';
const broadcastChannel = new BroadcastChannel('session-expiration');
export const logoutTimer = () => {
    setTimeout(() => {
        broadcastChannel.postMessage('session-expired');
        localStorage.removeItem('localst');
        store.dispatch(logout())
    }, 7200000 );
};