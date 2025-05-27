import React, { useEffect, useRef, useState } from 'react';

export default function Llmtest() {
  const workerRef = useRef(null);
  const [status, setStatus] = useState('Loading...');

  useEffect(() => {
    workerRef.current = new Worker('tfidfworker.js');;

    const worker = workerRef.current;
    worker.postMessage({ type: 'process', data: [
  {
    "id": "1",
    "position": {
      "x": 50,
      "y": 0
    },
    "data": {
      "label": "title 5",
      "notes": "another one"
    }
  },
  {
    "id": "2",
    "position": {
      "x": -69.05511811023621,
      "y": 164.251968503937
    },
    "data": {
      "notes": "good"
    }
  },
  {
    "id": "3",
    "position": {
      "x": 70.78740157480314,
      "y": 256.6929133858268
    },
    "data": {
      "label": "note test",
      "notes": "some arbitary text google"
    }
  },
  {
    "id": "4",
    "position": {
      "x": 282.4409448818898,
      "y": 61.15377935412076
    },
    "data": {
      "label": "some tiutle",
      "notes": "tetets2424 turtle"
    }
  },
  {
    "id": "5",
    "position": {
      "x": 911,
      "y": 86
    },
    "data": {
      "label": "New Note 5",
      "notes": "note"
    }
  }
]});

    worker.onmessage = (e) => {
      if (e.data.type === 'loaded') {
        setStatus('Model loaded');
        worker.postMessage({ type: 'embed', text: 'Hello world from React' });
      } else if (e.data.type === 'result') {
        console.log('Received result:', e.data);
      } else if (e.data.type === 'error') {
        console.log('Received result:', e.data);
      }
    };

    return () => worker.terminate();
  }, []);


  return (
    <div className="p-4">
      <div>Status: {status}</div>
      
    </div>
  );
}
