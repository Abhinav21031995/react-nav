import React from "react";

const ExtractorModal = ({ open, onClose }: { open: boolean; onClose: () => void }) => {
  if (!open) return null;
  return (
    <div style={{
      position: "fixed", top: 0, left: 0, width: "100vw", height: "100vh",
      background: "rgba(0,0,0,0.3)", display: "flex", alignItems: "center", justifyContent: "center"
    }}>
      <div style={{
        background: "#fff", padding: 30, borderRadius: 8, boxShadow: "0 2px 12px rgba(0,0,0,0.2)"
      }}>
        <h2>Welcome to Extractor UI</h2>
        <button onClick={onClose} style={{ marginTop: 20 }}>Close</button>
      </div>
    </div>
  );
};

export default ExtractorModal;