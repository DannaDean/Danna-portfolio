import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { confirmAlert } from "react-confirm-alert";
import { deleteMessage, getMessages } from "../../../store/slices/contactSlice";
import "../../../assets/css/Dashboard.scss";
import 'react-confirm-alert/src/react-confirm-alert.css';
import TableItem from "../../../components/dashboard/TableItem";

const ContactForm = () => {
  const dispatch = useDispatch();
  const { messages } = useSelector((state) => state.contact);
  useEffect(() => {
    dispatch(getMessages());
  }, [dispatch]);

  const handleDeleteContact = (id) => {
    confirmAlert({
      title: 'Confirm to delete',
      message: 'Are you sure you want to delete this message?',
      buttons: [
        {
          label: 'Yes',
          onClick: () => dispatch(deleteMessage(id))
        },
        {
          label: 'No'
        }
      ]
    });
  };

  return (
    <>
      <h2 style={{marginBottom: 25}}>All Messages</h2>
      <table className="table">
        <thead>
          <tr>
            <th>Nr.</th>
            <th>Name</th>
            <th>Email</th>
            <th>Text</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {messages &&
            messages.map((message, index) => (
              <TableItem
                key={message._id}
                id={message._id}
                data={{
                  nr: index + 1,
                  name: message.name,
                  email: message.email,
                  text: message.text,
                }}
                onDeleteClick={handleDeleteContact}
                showEdit={false} 
              />
            ))}
        </tbody>
      </table>
    </>
  );
};

export default ContactForm;
