import React, { useState } from "react";
import AddRoundedIcon from "@mui/icons-material/AddRounded";
import CloseRoundedIcon from "@mui/icons-material/CloseRounded";
import Button from "../Elements/Button";
import { IBoardList } from "../../utils/interfaces/interfaces";

const BoardList: React.FC<IBoardList> = ({ list }) => {
  const [showInput, setShowInput] = useState<boolean>(false);

  const toggleInput = () => {
    setShowInput(!showInput);
  };

  return (
    <div className="min-w-[300px] bg-[#F1F2F4] rounded-2xl shadow py-4 px-5">
      <h3 className="font-medium text-sm">{list.data().name}</h3>
      <div className="mt-3 space-y-3">
        <div className="p-3 bg-white rounded-lg shadow text-sm text-dark -mx-2 hover:bg-[#F1F2F4] cursor-pointer">
          <p>Create landing page</p>
        </div>
        {showInput && (
          <form action="" className="w-[106%] -mx-2">
            <input
              type="text"
              className="p-3 bg-white rounded-lg shadow text-sm text-dark w-full outline-none"
              placeholder="Enter a title for this card..."
            />
            <div className="mt-2 flex space-x-2 items-center">
              <Button text="Add card" className="text-sm" />
              <button onClick={toggleInput}>
                <CloseRoundedIcon className="text-gray-500" />
              </button>
            </div>
          </form>
        )}
        {!showInput && (
          <button
            className="text-gray-500 text-sm flex items-center space-x-1"
            onClick={toggleInput}
          >
            <AddRoundedIcon className="text-gray-500" fontSize="small" />{" "}
            <span>Add a card</span>
          </button>
        )}
      </div>
    </div>
  );
};

export default BoardList;
