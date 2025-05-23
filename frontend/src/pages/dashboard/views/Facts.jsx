import { useEffect } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { confirmAlert } from "react-confirm-alert";
import { deleteFact, getFacts } from "../../../store/slices/factsSlice";
import "../../../assets/css/Dashboard.scss";
import 'react-confirm-alert/src/react-confirm-alert.css';
import TableItem from "../../../components/dashboard/TableItem";
import { Plus } from "akar-icons";

const Facts = () => {
  const dispatch = useDispatch();
  const { facts } = useSelector((state) => state.facts);
  useEffect(() => {
    dispatch(getFacts());
  }, [dispatch]);

  const handleDeleteFact = (id) => {
    confirmAlert({
      title: 'Confirm to delete',
      message: 'Are you sure you want to delete this fact?',
      buttons: [
        {
          label: 'Yes',
          onClick: () => dispatch(deleteFact(id))
        },
        {
          label: 'No'
        }
      ]
    });
  };

  return (
    <>
      <h2>All Facts</h2>
      <Link to={`/dashboard/create/fact`}  className="btn create-btn">
        Create Fact
        <Plus strokeWidth={2} size={24} />
      </Link>
      <table className="table">
        <thead>
          <tr>
            <th>Nr.</th>
            <th>Title</th>
            <th>Text</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {facts &&
            facts.map((fact, index) => (
              <TableItem
                key={fact._id}
                id={fact._id}
                data={{
                  nr: index + 1,
                  title: fact.title,
                  text: fact.text,
                }}
                type="fact"
                onDeleteClick={handleDeleteFact}
              />
            ))}
        </tbody>
      </table>
    </>
  );
};

export default Facts;
