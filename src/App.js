import { useRef, useState } from "react";
import ReactToPrint from "react-to-print";
import ClientDetails from "./components/ClientDetails";
import Footer from "./components/Footer";
import Header from "./components/Header";
import ItemTable from "./components/ItemTable";
import TableForm from "./components/TableForm";
var a = [
  "",
  "one ",
  "two ",
  "three ",
  "four ",
  "five ",
  "six ",
  "seven ",
  "eight ",
  "nine ",
  "ten ",
  "eleven ",
  "twelve ",
  "thirteen ",
  "fourteen ",
  "fifteen ",
  "sixteen ",
  "seventeen ",
  "eighteen ",
  "nineteen ",
];
var b = [
  "",
  "",
  "twenty",
  "thirty",
  "forty",
  "fifty",
  "sixty",
  "seventy",
  "eighty",
  "ninety",
];

function inWords(num) {
  if ((num = num.toString()).length > 9) return "overflow";
  let n = ("000000000" + num)
    .substr(-9)
    .match(/^(\d{2})(\d{2})(\d{2})(\d{1})(\d{2})$/);
  if (!n) return;
  var str = "";
  str +=
    n[1] != 0
      ? (a[Number(n[1])] || b[n[1][0]] + " " + a[n[1][1]]) + "crore "
      : "";
  str +=
    n[2] != 0
      ? (a[Number(n[2])] || b[n[2][0]] + " " + a[n[2][1]]) + "lakh "
      : "";
  str +=
    n[3] != 0
      ? (a[Number(n[3])] || b[n[3][0]] + " " + a[n[3][1]]) + "thousand "
      : "";
  str +=
    n[4] != 0
      ? (a[Number(n[4])] || b[n[4][0]] + " " + a[n[4][1]]) + "hundred "
      : "";
  str +=
    n[5] != 0
      ? (str != "" ? "and " : "") +
        (a[Number(n[5])] || b[n[5][0]] + " " + a[n[5][1]]) +
        "only "
      : "";
  return str;
}
export default function App() {
  const [showInvoice, setShowInvoice] = useState(false);
  const [invoiceName, setInvoiceName] = useState("");
  const [clientName, setClientName] = useState("");
  const [clientAddress, setClientAddress] = useState("");
  const [month, setMonth] = useState("");
  const [date, setDate] = useState("");
  const [description, setDescription] = useState("");
  const [quantity, setQuantity] = useState("");
  const [unit, setUnit] = useState("");
  const [rate, setRate] = useState("");
  const [amount, setAmount] = useState("");
  const [list, setList] = useState([]);
  const [total, setTotal] = useState(0);

  const componentRef = useRef();

  return (
    <div className="container">
      {/* <!-- Proprietor details --> */}
      {showInvoice ? (
        <>
          <div ref={componentRef} className="border mt-3 mx-2 px-5">
            <Header invoiceName={invoiceName} date={date}></Header>

            <ClientDetails
              clientName={clientName}
              clientAddress={clientAddress}
            ></ClientDetails>

            <div className="row">
              <p>
                Bill for the month of <strong>{month}</strong>
              </p>
            </div>

            <ItemTable
              description={description}
              quantity={quantity}
              unit={unit}
              rate={rate}
              amount={amount}
              list={list}
              total={total}
            ></ItemTable>

            <div className="row">
              <p className="col-10 text-start">{"Rupees " + inWords(total)}</p>
              <p className="col-2 text-start">E & O.E.</p>
            </div>

            <Footer></Footer>
          </div>
          <div className="row d-grid gap-2 mb-3 border mt-3">
            <ReactToPrint
              trigger={() => (
                <button
                  className="btn btn-outline-success"
                  type="button"
                  onClick={() => setShowInvoice(false)}
                >
                  Print Invoice
                  <i class="ms-2 bi bi-printer-fill"></i>
                </button>
              )}
              content={() => componentRef.current}
            />
            <button
              className="btn btn-outline-primary"
              type="button"
              onClick={() => setShowInvoice(false)}
            >
              Edit Invoice
              <i class="ms-2 bi bi-pencil-square"></i>
            </button>
          </div>
        </>
      ) : (
        // BILL FORM

        <div className="row mt-3">
          <div className="col-8 card px-3 py-3">
            <div className="row">
              <div className="col-8">
                <input
                  className="form-control form-control-lg"
                  type="text"
                  name="invoiceName"
                  value={invoiceName}
                  onChange={(e) => setInvoiceName(e.target.value)}
                  placeholder="Invoice name"
                  aria-label=".form-control-lg example"
                />
              </div>
              <div className="col-4 d-flex justify-content-end">
                <input
                  type="date"
                  min="01-01-1900"
                  max="31-12-2100"
                  value={date}
                  onChange={(e) => setDate(e.target.value)}
                ></input>
              </div>
            </div>
            <h3 className="mt-3">Xplore</h3>
            <p>
              1187, Chakgaria, Medical Centre Market, Kolkata-700094
              <br />
              Phone: 98316 39663 / 91638 38592
            </p>
            {/* <!-- Client name --> */}
            <div className="row">
              <label
                htmlFor="inputPassword"
                className="col-sm-2 col-form-label"
              >
                Client name
              </label>
              <div className="col-sm-10">
                <input
                  type="text"
                  name="clientName"
                  value={clientName}
                  onChange={(e) => setClientName(e.target.value)}
                  className="form-control"
                  id="inputPassword"
                />
              </div>
            </div>
            {/* <!-- Client address --> */}
            <div className="mt-3 row">
              <label
                htmlFor="inputPassword"
                className="col-sm-2 col-form-label"
              >
                Client address
              </label>
              <div className="col-sm-10">
                <input
                  type="text"
                  name="clientAddress"
                  value={clientAddress}
                  onChange={(e) => setClientAddress(e.target.value)}
                  className="form-control"
                  id="inputPassword"
                />
              </div>
            </div>
            {/* <!-- Bill htmlFor the month of --> */}
            <div className="mt-3 row">
              <label
                htmlFor="inputPassword"
                className="col-sm-3 col-form-label"
              >
                Bill for the month of
              </label>
              <div className="col-sm-3">
                <input
                  type="text"
                  name="month"
                  value={month}
                  onChange={(e) => setMonth(e.target.value)}
                  className="form-control"
                  id="inputPassword"
                />
              </div>
            </div>

            {/* <!-- Items table --> */}
            <TableForm
              description={description}
              setDescription={setDescription}
              quantity={quantity}
              setQuantity={setQuantity}
              unit={unit}
              setUnit={setUnit}
              rate={rate}
              setRate={setRate}
              amount={amount}
              setAmount={setAmount}
              list={list}
              setList={setList}
              total={total}
              setTotal={setTotal}
            ></TableForm>

            <div className="row mt-3">
              <div className="d-flex justify-content-end">
                <button
                  className="btn btn-primary"
                  type="button"
                  onClick={() => setShowInvoice(true)}
                >
                  Preview Invoice
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
