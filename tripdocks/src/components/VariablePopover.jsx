 
import { VARIABLES } from "../data/variables";

const VariablePopover = ({ onSelect }) => {
  return (
    <div className="bg-white border rounded-md shadow-md p-2 w-52">
      {VARIABLES.map((variable) => (
        <button
          key={variable.id}
          className="block w-full px-2 py-1 text-left hover:bg-gray-100 rounded-md"
          onClick={() => onSelect(variable)}
        >
          {variable.label}
        </button>
      ))}
    </div>
  );
};

export default VariablePopover;
