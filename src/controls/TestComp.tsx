import PropTypes from "prop-types";

interface MyComponentProps {
  title: string;
  count: number;
  isActive?: boolean; // Optional prop
}

function MyComponent ({ title, count, isActive }: MyComponentProps) {
  return (
    <div>
      <h1>{title}</h1>
      <p>Count: {count}</p>
      {isActive && <p>Status: Active</p>}
    </div>
  );
};

// Add PropTypes validation
MyComponent.propTypes = {
  title: PropTypes.string.isRequired,
  count: PropTypes.number.isRequired,
  isActive: PropTypes.bool,
};

export default MyComponent;