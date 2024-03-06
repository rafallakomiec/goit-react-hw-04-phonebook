import Proptypes from 'prop-types';

const Filter = (props) => {
  const { changeHandler, filterVal } = props;
  return (
    <label>
      Find contacts by name:
      <input type="text" name="filterInput" onChange={changeHandler} value={filterVal} />
    </label>
  );
}

Filter.propTypes = {
  changeHandler: Proptypes.func.isRequired,
  filterVal: Proptypes.string.isRequired
};

export default Filter;
