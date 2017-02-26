import Home from './components/Home';
import Login from './components/Login';
import Register from './components/Register';

export default [
    { path: '/', name: 'home', component: Home },
    { path: '/login', name: 'login', component: Login },
    { path: '/register/:registerId', name: 'register', component: Register },
];
