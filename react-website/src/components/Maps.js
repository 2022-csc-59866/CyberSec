import React from 'react';

const Map = () => {
  return (
    <div>
      <h2>Threat Map</h2>
      <iframe
        title="ThreatMap"
        src="https://threatmap.checkpoint.com/"
        width="100%"
        height="700px"
        
      ></iframe>
    </div>
  );
};

export default Map;
