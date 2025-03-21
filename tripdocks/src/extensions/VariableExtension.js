import { Node } from "@tiptap/core";
import { ReactNodeViewRenderer } from "@tiptap/react";
import VariableComponent from "../components/VariableComponent";

const VariableExtension = Node.create({
  name: "variable",
  group: "inline",
  inline: true,
  selectable: false,
  atom: true,

  addAttributes() {
    return {
      id: { default: null },
      label: { default: null },
    };
  },

  parseHTML() {
    return [{ tag: "variable[data-id]" }];
  },

  renderHTML({ node }) {
    return ["variable", { "data-id": node.attrs.id }, node.attrs.label];
  },

  addNodeView() {
    return ReactNodeViewRenderer(VariableComponent);
  },
});

export default VariableExtension;
