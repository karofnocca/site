import React from 'react'
import Hero from './components/Hero'
import Stats from './components/Stats'
import InfoBlock from './components/InfoBlock'
import PermBlock from './components/PermBlock'
import UploadForm from './components/UploadForm'
import JoinTeamBlock from './components/JoinTeamBlock.jsx'
import EventRegister from './components/EventRegister'
import PixelBlock from './components/PixelBlock'
import Jury from './components/Jury'
import ResumeForm from './components/ResumeForm'
import FutureBanner from './components/FutureBanner.jsx'

function App() {
  return (
    <div className="min-h-screen bg-white">
      <Hero />
      <PermBlock/>
      <UploadForm />
            <PixelBlock />
      <EventRegister />
      <Jury />


      <JoinTeamBlock />
      <ResumeForm />
      <FutureBanner />
    </div>
  )
}

export default App