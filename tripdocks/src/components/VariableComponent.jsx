 

const VariableComponent = ({ node }) => {
  return (
    <span className="px-2 py-1 text-blue-700 bg-blue-100 rounded-md">
      {node.attrs.label}
    </span>
  );
};

export default VariableComponent;
