import ReactDOM from 'react-dom';
import { App } from './App';
import dotenv from 'dotenv';
dotenv.config();

const app = document.getElementById('app');
ReactDOM.render(<App />, app);
