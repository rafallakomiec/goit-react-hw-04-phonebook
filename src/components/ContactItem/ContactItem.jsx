import PropTypes from 'prop-types';

const ContactItem = (props) => {
  const { id, name, number, deleteHandler } = props;

  return (
    <li key={id}>
      {name}: {number}
      <button type="button" id={id} onClick={deleteHandler}>
        Delete
      </button>
    </li>
  );
}

ContactItem.propTypes = {
  id: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  number: PropTypes.string.isRequired,
  deleteHandler: PropTypes.func.isRequired,
};

export default ContactItem;
