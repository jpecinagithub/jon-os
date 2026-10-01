import { OSProvider, useOS } from './os/store';
import { Boot, Desktop, LockScreen, RecruiterOverlay } from './os/shell';

function Stage() {
  const { phase, recruiterOpen } = useOS();
  return (
    <>
      {phase === 'boot' && <Boot />}
      {phase === 'lock' && <LockScreen />}
      {phase === 'desktop' && <Desktop />}
      {recruiterOpen && <RecruiterOverlay />}
    </>
  );
}

export default function App() {
  return (
    <OSProvider>
      <Stage />
    </OSProvider>
  );
}
