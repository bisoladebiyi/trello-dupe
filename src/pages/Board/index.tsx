import React from "react";
import AddRoundedIcon from "@mui/icons-material/AddRounded";
import BoardList from "../../components/BoardList";
import Button from "../../components/Elements/Button";
import CloseRoundedIcon from "@mui/icons-material/CloseRounded";
import Layout from "../../components/Layout";
import useBoard from "./Board.hook";

const Board: React.FC = () => {
  const {
    showInput,
    listName,
    board,
    lists,
    setListName,
    toggleInput,
    submit,
  } = useBoard();

  return (
    <Layout>
      <main
        className="h-full pt-10"
        style={{
          background: `url(${board?.data().bg}) 0% 0% / cover no-repeat`,
        }}
      >
        <div className="py-4 px-6 bg-white bg-opacity-20 text-dark text-lg font-bold mt-1 capitalize">
          {board?.data().name}
        </div>
        <div className="overflow-x-scroll">
          <div className="px-6 py-4 flex items-start gap-5 overflow-auto whitespace-nowrap list-wrapper">
            {lists
              .sort((a, b) => a.data().order - b.data().order)
              .map((list) => (
                <BoardList list={list} key={list.id} />
              ))}

            {showInput && (
              <form
                action=""
                className="min-w-[300px] bg-[#F1F2F4] rounded-2xl shadow py-4 px-5"
              >
                <input
                  type="text"
                  value={listName}
                  onChange={(e) => setListName(e.target.value)}
                  className="p-3 bg-white rounded-lg shadow text-sm text-dark w-full outline-none"
                  placeholder="Enter list title..."
                />
                <div className="mt-2 flex space-x-2 items-center">
                  <Button
                    text="Add list"
                    className="text-sm"
                    onClick={submit}
                  />
                  <button onClick={toggleInput}>
                    <CloseRoundedIcon className="text-gray-500" />
                  </button>
                </div>
              </form>
            )}
            {!showInput && (
              <button
                className="text-white shadow text-sm flex items-center space-x-1 min-w-[300px] bg-black bg-opacity-10 rounded-xl py-3 px-4"
                onClick={toggleInput}
              >
                <AddRoundedIcon className="text-white" fontSize="small" />{" "}
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
