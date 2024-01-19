import env from '@/env'
import './App.css'

function App() {
  return (
    <div style={{ padding: '40px' }}>
      {JSON.stringify(env, null, 2)}
    </div>
  )
}

export default App
