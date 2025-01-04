import './App.css'
import { Route, Routes } from 'react-router-dom';
import HomeworkOverviewPage from './pages/HomeworkOverviewPage';
import HomeworkAddPage from './pages/HomeworkAddPage';

function App() {
  return (
    <div>
      <div className='flex justify-between items-center p-6 bg-sunglow'>
        <div className='text-3xl font-oswald'>HTL Dornbirn</div>
      </div>
      <Routes>
        <Route path="/" element={<HomeworkOverviewPage />} />
        <Route path="/add-homework" element={<HomeworkAddPage />} />
      </Routes>
    </div>
  )
}

export default App