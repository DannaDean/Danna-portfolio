import { useEffect } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { deleteFact, getFacts } from "../../../store/slices/factsSlice";
import "../../../assets/css/Dashboard.scss";
import TableItem from "../../../components/dashboard/TableItem";

const Facts = () => {
    const dispatch = useDispatch();
    const { facts } = useSelector((state) => state.facts);
    useEffect(() => {
        dispatch(getFacts());
    }, [dispatch]);

    const handleDeleteFact = (id) => {
        if (window.confirm('You really want to delete this fact')) {
            dispatch(deleteFact(id));
        }
    }

    return (
        <>
        <div className="container">
          <h2>All Facts</h2>
          <Link to={`/dashboard/create/fact`}>Create Project</Link>
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
        </div>
      </>
    )
}

export default Facts;