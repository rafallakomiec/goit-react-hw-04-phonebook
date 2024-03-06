import PropTypes from 'prop-types';

const ContactList = (props) => {
  return <ul>{props.children}</ul>;
}

ContactList.propTypes = { children: PropTypes.node };

export default ContactList;
