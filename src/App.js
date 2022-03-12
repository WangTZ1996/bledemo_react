import { useState } from 'react'
import { Spline } from 'react-spline'
import './App.css';
import DEMO from './assets/demo.spline'
import SCENE from './assets/scene.json'
// import { Application } from './pages/runtime.js';

function App() {
  console.log(SCENE, 'SCENE')

  const [bleServer, setBleServer] = useState();

  const initBluetooth = (namePrefix, uuid) => {
    navigator.bluetooth
      .requestDevice({
        // acceptAllDevices: true,
        filters: [{ namePrefix, }],
        optionalServices: [uuid],
      })
      .then((res) => {
        res.gatt.connect().then((res) => {
          res
            .getPrimaryService(uuid)
            .then((res) => {
              res.getCharacteristics().then((res) => {
                console.log("ble server connect success");
                setBleServer(res[0])
              });
            });
        });
      });
  }

  return (
    <div className="App" id='container'>
      <canvas id="canvas3d"></canvas>
      <div style={{ width: '20px', height: '20px'}} onClick={initBluetooth.bind(this, 'HC-08', '0000ffe0-0000-1000-8000-00805f9b34fb')} />
      <Spline scene={SCENE} />
    </div>
  );
}

export default App;
