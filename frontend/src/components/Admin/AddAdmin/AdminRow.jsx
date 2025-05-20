import React from "react";
import { FaEdit, FaTrash } from "react-icons/fa";

const AdminRow = ({ index, admin, onEdit, onDelete }) => {
  return (
    <tr className="border-b text-sm">
      <td className="py-2">{index}</td>
      <td>{admin.id}</td>
      <td>{admin.name}</td>
      <td>{admin.email}</td>
      <td>
        <div className="flex gap-2">
          <button className="text-blue-500" onClick={onEdit}>
            <FaEdit />
          </button>
          <button className="text-red-500" onClick={onDelete}>
            <FaTrash />
          </button>
        </div>
      </td>
    </tr>
  );
};

export default AdminRow;
