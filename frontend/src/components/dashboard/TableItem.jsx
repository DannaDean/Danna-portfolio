import { Link } from "react-router-dom";
import { Edit, TrashCan } from "akar-icons";

const TableItem = ({ id, data = {}, type = "projects", onDeleteClick }) => {
  return (
    <tr>
      {Object.entries(data).map(([key, value], idx) => (
        <td key={idx}>
          {key === "image" ? (
            <img
              src={value}
              alt="preview"
            />
          ) : Array.isArray(value) ? (
            value.join(", ")
          ) : (
            value
          )}
        </td>
      ))}

      <td>
        <Link to={`/dashboard/edit/${type}/${id}`}>
          <Edit strokeWidth={2} size={24} />
        </Link>
        <button
          onClick={() => onDeleteClick?.(id)}
        >
          <TrashCan strokeWidth={2} size={24} />
        </button>
      </td>
    </tr>
  );
};

export default TableItem;
