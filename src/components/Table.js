import React from "react";

const Table = ({ data }) => {
  return (
    <table>
      <tbody>
        <tr>
          <th> Name </th>
          <th> Email </th>
          <th> Phone </th>
        </tr>

        {data.map((item) => (
          <tr key={item.id}>
            <td>{item.name}</td>
            <td>{item.email}</td>
            <td>{item.phone}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default Table;
