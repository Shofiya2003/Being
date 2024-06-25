import logo from './logo.svg';
import './App.css';
import WebComponent from './Pages/ExercisePage';

function App() {
  return (
    <div className="App text-[#343434]">
    
      <div className='mx-4'>
        <div className='flex flex-row items-center'>

          <h1 className='logo text-[70px] text-[#343434] text-left'>BEING</h1>
          <nav className='flex flex-row text items-center flex-1 justify-center'>
          <a href='/login'><div className='h-fit mr-8'>Login</div></a>
            <a href='/poses'><div className='h-fit mr-8'>Exercise</div></a>
            <div className='h-fit mr-8'>Dashboard</div>
          </nav>
          <div className='rounded-2xl text border border-[2px] border-[#343434] px-6 py-2 flex items-center text-[16px]'>Join Us</div>
        </div>
        <p className='text text-[16px] text-[#8E8B82]'>YOUR AI ASSISTANT</p>
        <p className='logo text-[100px] text-[#343434]'>REDIFINING WELLNESS</p>
      </div>
      <div className='hero bg-cover h-[430px] mx-4 rounded-lg bg-center'>
        <p className='logo text-[100px] text-[#F3F3F3]'>ONE BREATH AT A TIME.</p>
      </div>
     
      {/* <WebComponent/> */}
    </div>
  );
}

export default App;
