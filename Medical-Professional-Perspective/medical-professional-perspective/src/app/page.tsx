import Image from 'next/image'
import Availability from '@/components/availability/availability'
import { Route } from 'react-router-dom'

//onSubmit={onSubmit}
export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <button>Click to submit availability</button>
      <div>
        <form className="submit-availability-form">Availability form
          <input type="text" name="name" />
          <input type="time" name="startTime"/>
          <input type="time" name="endTime"/>
          <button type="submit">Submit</button>
        </form>
      </div>
      <Route>
        <Route path='/' element={<Availability />} />
      </Route>

    </main>
    
  )
}
