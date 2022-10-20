import React from "react";

export default function ClientDetails({ clientName, clientAddress }) {
  return (
    <>
      <div className="row mt-2">
        <p>
          <strong>{clientName}</strong>
          <br />
          {clientAddress}
        </p>
      </div>
    </>
  );
}
