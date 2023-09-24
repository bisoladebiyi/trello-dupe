import React, { useState } from "react";
import AddRoundedIcon from "@mui/icons-material/AddRounded";
import BoardList from "../../components/BoardList";
import Button from "../../components/Elements/Button";
import CloseRoundedIcon from "@mui/icons-material/CloseRounded";
import Layout from "../../components/Layout";

const Board: React.FC = () => {
  const [showInput, setShowInput] = useState<boolean>(false);

  const toggleInput = () => {
    setShowInput(!showInput);
  };

  return (
    <Layout>
      <main className="bg-red-200 h-full pt-10">
        <div className="py-4 px-6 bg-white bg-opacity-20 text-dark text-lg font-bold mt-1">
          My board
        </div>
        <div className="overflow-x-scroll">
          <div className="px-6 py-4 flex items-start gap-5 overflow-auto whitespace-nowrap">
            <BoardList />
            {showInput && (
              <form
                action=""
                className="min-w-[300px] bg-[#F1F2F4] rounded-2xl shadow py-4 px-5"
              >
                <input
                  type="text"
                  className="p-3 bg-white rounded-lg shadow text-sm text-dark w-full outline-none"
                  placeholder="Enter list title..."
                />
                <div className="mt-2 flex space-x-2 items-center">
                  <Button text="Add list" className="text-sm" />
                  <button onClick={toggleInput}>
                    <CloseRoundedIcon className="text-gray-500" />
                  </button>
                </div>
              </form>
            )}
            {!showInput && (
              <button
                className="text-dark text-sm flex items-center space-x-1 min-w-[300px] bg-black bg-opacity-10 rounded-xl py-3 px-4"
                onClick={toggleInput}
              >
                <AddRoundedIcon className="text-dark" fontSize="small" />{" "}
                <span>Add another list</span>
              </button>
            )}
          </div>
        </div>
      </main>
    </Layout>
  );
};

export default Board;
