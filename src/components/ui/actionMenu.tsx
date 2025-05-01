import { useState } from "react";
import { BookCopy, Pencil, Trash2 } from "lucide-react";

export const ActionMenu = (props: any) => {
  const [options, setOptions] = useState<any>([
    {
      text: "Delete",
      icon: <Trash2 className="w-4 h-4 text-red-500" />,
      onClick: props.handleDelete,
    },
    {
      text: "Edit",
      icon: <Pencil className="w-4 h-4 text-white" />,
      onClick: props.handleEdit,
    },
    {
      text: "Copy",
      icon: <BookCopy className="w-4 h-4 text-white" />,
      onClick: props.handleCopy,
    },
  ]);

  return (
    <div className="w-30 bg-[#1e2025] rounded-lg shadow-lg shadow-black/30 z-50 flex flex-col gap-2 py-2">
      {options &&
        options.map((each: any, index: any) => {
          return (
            <button
              key={index}
              className="w-full px-4 py-2 text-sm text-white hover:bg-[#23262b] text-left hover:rounded-lg hover:border-transparent flex items-center gap-2"
              onClick={() => {
                each.onClick, setOptions(false);
              }}
            >
              {each.icon}
              {each.text}
            </button>
          );
        })}
    </div>
  );
};
