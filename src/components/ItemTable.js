import React from "react";

export default function ItemTable({ list, total }) {
  return (
    <div>
      <table className="table">
        <thead>
          <tr className="">
            <th scope="col-5">Description</th>
            <th scope="col-1" className="text-end">
              Quantity
            </th>
            <th scope="col-1"></th>
            <th scope="col-1">Rate</th>
            <th scope="col-4">Amount</th>
          </tr>
        </thead>
        <tbody>
          {list.map(({ id, description, quantity, rate, unit, amount }) => (
            <React.Fragment key={id}>
              <tr scope="row">
                <td> {description} </td>
                <td className="text-end"> {quantity} </td>
                <td className="text-start"> {unit} </td>
                <td> {rate} </td>
                <td> {amount} </td>
              </tr>
            </React.Fragment>
          ))}

          <tr>
            <td scope="row"></td>
            <td></td>
            <td></td>
            <td className="fw-bold">Total:</td>
            <td className="fw-bold">
              &#8377;
              {" " +
                total.toLocaleString(undefined, {
                  minimumFractionDigits: 2,
                  maximumFractionDigits: 2,
                })}
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}
