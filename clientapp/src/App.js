import { useTranslation } from 'react-i18next';
import './App.css';

function App() {
  const [t] = useTranslation();
  return (
    <div className="app">
      <h1>{t('Welcome')}</h1>
    </div>
  );
}

export default App;
