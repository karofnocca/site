import React from 'react'
import Hero from './components/Hero'
import Stats from './components/Stats'
import InfoBlock from './components/InfoBlock'
import UploadForm from './components/UploadForm'
import EventRegister from './components/EventRegister'
import Jury from './components/Jury'
import ResumeForm from './components/ResumeForm'

function App() {
  return (
    <div className="min-h-screen bg-white">
      <Hero />
      <UploadForm />
            <InfoBlock />

      <EventRegister />
      <Jury />
      <ResumeForm />
    </div>
  )
}

export default App