import React from "react";

function PowerBIEmbed() {
  return (
    <div style={{ width: "100%", height: "100vh", backgroundColor: '#0b0b0d' }}>
      <iframe
        title="PROYECTO"
        width="100%"
        height="100%"
        src="https://app.powerbi.com/reportEmbed?reportId=b8554f0b-d606-4905-873e-24008ebd0fbe&autoAuth=true&ctid=8dbd6711-3051-4a69-bb5e-8714606711d6"
        frameBorder="0"
        allowFullScreen={true}
      ></iframe>
    </div>
  );
}

export default PowerBIEmbed;
