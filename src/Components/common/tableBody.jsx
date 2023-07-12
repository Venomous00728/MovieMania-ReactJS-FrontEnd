import React from "react";
import _ from "lodash";
import "../../Style/table.css";
import "../../Style/DarkTheme/tableDark.css";

const TableBody = ({ data, columns, mode }) => {
  const renderCell = (item, column) => {
    if (column.content) return column.content(item);
    return _.get(item, column.path);
  };

  const createKey = (item, column) => {
    return item._id + (column.path || column.key);
  };

  return (
    <tbody>
      {data.map((item) => (
        <tr key={item._id} className={`body${mode}`}>
          {columns.map((column) => (
            <td className="tableData" key={createKey(item, column)}>
              <div className="cellContent">{renderCell(item, column)}</div>
            </td>
          ))}
        </tr>
      ))}
    </tbody>
  );
};

export default TableBody;
