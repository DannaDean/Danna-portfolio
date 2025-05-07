import { Link } from "react-router-dom";
import { Edit, TrashCan } from "akar-icons";
import defaultImage from "../../assets/images/default.jpg";

const TableItem = ({
  id,
  data = {},
  type = "projects",
  onDeleteClick,
  showEdit = true,
}) => {
  return (
    <tr>
      {Object.entries(data).map(([key, value], idx) => (
        <td key={idx} data-label={key}>
          {key === "image" ? (
            <img
              src={value || defaultImage}
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
        {showEdit && (
          <Link to={`/dashboard/edit/${type}/${id}`}>
            <Edit strokeWidth={2} size={24} />
          </Link>
        )}
        <button onClick={() => onDeleteClick?.(id)}>
          <TrashCan strokeWidth={2} size={24} />
        </button>
      </td>
    </tr>
  );
};

export default TableItem;
