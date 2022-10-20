import React from "react";

export default function Header({ invoiceName, date }) {
  const todayDate = new Date();
  let day = todayDate.getDate();
  let month = todayDate.getMonth() + 1;
  let year = todayDate.getFullYear();

  let currdate = `${day}-${month}-${year}`;
  return (
    <>
      <div className="row">
        <div className="text-center mt-2">
          <h1>{invoiceName ? invoiceName : "Invoice"}</h1>
        </div>
      </div>
      <div className="row">
        <div className="col-8">
          <h2>Xplore</h2>
          <p className="text-wrap text-break">
            1187, Chakgaria, Medical Centre Market, Kolkata-700094, <br />
            <strong>Phone:</strong> 98316 39663/ 91638 38592
          </p>
        </div>

        <div className="col-3 text-end">
          Date: {date ? date.split("-").reverse().join("-") : currdate}
        </div>
      </div>

      <div className="row">
        <h5 className="text-center">Cash Memo</h5>
      </div>
    </>
  );
}
