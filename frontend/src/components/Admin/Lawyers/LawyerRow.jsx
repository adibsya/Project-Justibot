import React from 'react';
import { FaEdit, FaTrash } from 'react-icons/fa';

const LawyerRow = ({ index, lawyer, onEdit, onDelete }) => {
  return (
    <tr className="border-b text-sm">
      <td className="py-2">{index}</td>
      <td>{lawyer.id}</td>
      <td>{lawyer.name}</td>
      <td>{lawyer.email}</td>
      <td>{lawyer.specialization}</td>
      <td>{lawyer.experience}</td>
      <td>{lawyer.status}</td>
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

export default LawyerRow;
