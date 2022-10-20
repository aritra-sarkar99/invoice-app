import React, { useEffect, useState } from "react";
import { v4 as uuidv4 } from "uuid";

export default function TableForm({
  description,
  setDescription,
  quantity,
  setQuantity,
  unit,
  setUnit,
  rate,
  setRate,
  amount,
  setAmount,
  list,
  setList,
  total,
  setTotal,
}) {
  const [isEditing, setIsEditing] = useState(false);
  const handleSubmit = (e) => {
    e.preventDefault();

    const newItem = {
      id: uuidv4(),
      description,
      quantity,
      unit,
      rate,
      amount,
    };

    setDescription("");
    setQuantity("");
    setUnit("");
    setRate("");
    setAmount("");
    setList([...list, newItem]);
    setIsEditing(false);
  };
  useEffect(() => {
    const calculateAmount = (amount) => {
      setAmount((rate * quantity).toFixed(2));
    };

    calculateAmount(amount);
  }, [amount, rate, quantity, setAmount]);

  useEffect(() => {
    let sum = 0;
    list.forEach((item) => {
      sum = sum + parseFloat(item.amount);
      setTotal(sum);
    });
    setTotal(Math.round(sum));
    if (list.length === 0) {
      setTotal(0.0);
    }
  });

  const deleteItem = (id) => {
    setList(list.filter((row) => row.id !== id));
  };

  const editItem = (id) => {
    const selectedRow = list.find((row) => row.id === id);
    setList(list.filter((row) => row.id !== id));
    setIsEditing(true);
    setDescription(selectedRow.description);
    setQuantity(selectedRow.quantity);
    setUnit(selectedRow.unit);
    setRate(selectedRow.rate);
    setAmount(selectedRow.amount);
  };

  return (
    <>
      <form className="row mt-3" onSubmit={handleSubmit}>
        <div className="col-12">
          <input
            type="text"
            className="form-control"
            name="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Item Name"
            aria-label="First name"
          />
        </div>
        <div className="mt-2">
          <div className="row">
            <div className="col-sm-3">
              <input
                type="number"
                className="form-control"
                placeholder="Quanity"
                value={quantity}
                onChange={(e) => setQuantity(e.target.value)}
                aria-label="First name"
              />
            </div>
            <div className="col-sm-3">
              <input
                type="text"
                className="form-control"
                placeholder="Unit (e.g copies)"
                value={unit}
                onChange={(e) => setUnit(e.target.value)}
                aria-label="Last name"
              />
            </div>
            <div className="col-sm-2">
              <input
                type="text"
                className="form-control"
                placeholder="Rate"
                value={rate}
                onChange={(e) => setRate(e.target.value)}
                aria-label="Last name"
              />
            </div>
            <div className="col-sm-2"> {amount} </div>
            <div className="col-sm-2">
              <button
                className="btn btn-outline-primary btn-sm addItem fw-bold"
                type="submit"
              >
                {isEditing ? "Edit item" : "Add item"}
              </button>
            </div>
          </div>
        </div>
      </form>
      <table className="table">
        <thead>
          <tr>
            <th className="col-4">Description</th>
            <th className="col-2">Quantity</th>
            <th className="col-3">Rate</th>
            <th className="col-1">Amount</th>
            <th className="col-2"></th>
            <th className="col-2"></th>
          </tr>
        </thead>
        {/* <!-- Items row --> */}

        <tbody>
          {list.map(({ id, description, quantity, rate, unit, amount }) => (
            <React.Fragment key={id}>
              <tr className="text-centre itemRow">
                <td> {description} </td>
                <td> {quantity} </td>
                <td> {rate} </td>
                <td> {amount} </td>
                <td className="text-center">
                  <i
                    onClick={() => deleteItem(id)}
                    className="bi bi-trash-fill"
                    style={{ cursor: "pointer", color: "red" }}
                  ></i>
                </td>
                <td className="text-center">
                  <i
                    onClick={() => editItem(id)}
                    className="bi bi-pencil-square"
                    style={{ cursor: "pointer", color: "green" }}
                  ></i>
                </td>
              </tr>
            </React.Fragment>
          ))}
          <tr id="itemrow">
            <td className="col-4"></td>
            <td className="col-2"></td>
            <td className="fw-bold col-3 text-end">Total:</td>
            <td className="fw-bold col-1">
              &#8377;
              {total.toLocaleString(undefined, {
                minimumFractionDigits: 2,
                maximumFractionDigits: 2,
              })}
            </td>
            <td className="col-2"></td>
            <td className="col-2"></td>
          </tr>
        </tbody>
      </table>
    </>
  );
}
