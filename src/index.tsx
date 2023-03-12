import { BrowserRouter as Router } from 'react-router-dom';
import ReactDOM from 'react-dom/client';
import App from './App';
import './index.scss';

import store from './redux/store'
import { Provider } from 'react-redux'
import { AppProvider } from './context/AppContext'

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLDivElement);
root.render(
  <Provider store={store}>
    <AppProvider>
      <Router>
        <App />
      </Router>
    </AppProvider>
  </Provider >
);