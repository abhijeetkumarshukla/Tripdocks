import React, { useState, useRef } from "react";
import { EditorContent, useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import VariableExtension from "../extensions/VariableExtension";
import VariablePopover from "./VariablePopover";

const Editor = () => {
  const [showPopover, setShowPopover] = useState(false);
  const [popoverPosition, setPopoverPosition] = useState({ top: 0, left: 0 });
  const editorRef = useRef(null);

  const editor = useEditor({
    extensions: [StarterKit, VariableExtension],
    content: "<p>Type {{ to insert a variable</p>",
    onUpdate: ({ editor }) => {
      const text = editor.getText();
      const lastTwoChars = text.slice(-2);
      
      if (lastTwoChars === "{{") {
        const selection = window.getSelection();
        if (selection.rangeCount > 0) {
          const range = selection.getRangeAt(0);
          const rect = range.getBoundingClientRect();
          setPopoverPosition({ top: rect.bottom + window.scrollY, left: rect.left });
        }
        setShowPopover(true);
      } else {
        setShowPopover(false);
      }
    },
  });

  const handleVariableSelect = (variable) => {
    if (editor) {
      editor.chain().focus().insertContent(`<variable data-id="${variable.id}">${variable.label}</variable> `).run();
      setShowPopover(false);
    }
  };

  return (
    <div className="relative w-full max-w-2xl p-4 border rounded-md bg-white">
      <EditorContent editor={editor} ref={editorRef} className="min-h-[150px] border p-2" />
      {showPopover && (
        <div
          className="absolute z-50 bg-white border rounded-md shadow-md p-2 w-52"
          style={{ top: popoverPosition.top, left: popoverPosition.left }}
        >
          <VariablePopover onSelect={handleVariableSelect} />
        </div>
      )}
    </div>
  );
};

export default Editor;
