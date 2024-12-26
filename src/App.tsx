import './App.css'
import { Toolbox } from './components/Toolbox'
import { DesignSurface } from './components/DesignSurface'
import { PropertyGrid } from './components/PropertyGrid'

function App() {

  
  return (
    <>
      <div className='flex flex-col h-full'>
        <div className='header block text-center pb-2 bg-blue-700 text-white text-xl'>
          Form Designer
        </div>
        <div className='form-designer flex flex-1'>
          <div className='w-1/5 flex flex-col'>
            <Toolbox />
            <PropertyGrid />
          </div>
          <div className='w-4/5'>
            <DesignSurface  />
          </div>
        </div>
      </div>
    </>
  )
}

export default App
