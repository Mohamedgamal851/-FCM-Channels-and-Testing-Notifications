
import './App.css'
import { generateToken, messaging } from './notifications/firebase'
import { useEffect } from 'react'
import { onMessage } from 'firebase/messaging';
import ChannelList from './ChannelList';
function App() {
  useEffect(() => {
    generateToken();
    onMessage((payload) => {
      console.log('Message received. ', payload);
      alert(`Notification: ${payload.notification.title}`);
    });
  }, []);

  return (
    <>
      <div>
      <h1>Firebase Notification App</h1>
      <ChannelList />
    </div>
    </>
  )
}

export default App
