import Home from './components/Home';
import Login from './components/Login';
import Register from './components/Register';
import Invite from './components/Invite';

export default [
    { path: '/', name: 'home', component: Home },
    { path: '/login', name: 'login', component: Login },
    { path: '/register/:registerId', name: 'register', component: Register },
    { path: '/invite', name: 'invite', component: Invite },
];
