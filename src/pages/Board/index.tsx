import React from "react";
import CloseRoundedIcon from "@mui/icons-material/CloseRounded";
import DeleteRoundedIcon from "@mui/icons-material/DeleteRounded";
import AddRoundedIcon from "@mui/icons-material/AddRounded";
import BoardList from "../../components/BoardList";
import Button from "../../components/Elements/Button";
import Layout from "../../components/Layout";
import useBoard from "./Board.hook";

const Board: React.FC = () => {
  const {
    showInput,
    listName,
    board,
    lists,
    showBoardNameInput,
    boardName,
    toggleBoardNameInput,
    handleBoardName,
    handleEditBoardName,
    setListName,
    toggleInput,
    submit,
    handleDeleteBoard,
    handleDragEnd,
    handleDragStart,
    handleDragEnter,
    handleDragOver,
  } = useBoard();

  return (
    <Layout>
      <main
        className="h-full pt-10"
        style={{
          background: `url(${board?.data().bg}) 0% 0% / cover no-repeat`,
        }}
      >
        <div className="py-4 px-6 flex items-center justify-between bg-white bg-opacity-30 shadow text-dark text-lg font-bold mt-2 capitalize">
          {!showBoardNameInput ? (
            <p onClick={toggleBoardNameInput}>{board?.data().name}</p>
          ) : (
            <input
              type="text"
              value={boardName}
              onChange={handleBoardName}
              onBlur={handleEditBoardName}
              autoFocus
              className="p-2 py-1 rounded border-[1.5px] border-[#DFE1E6] focus:border-[#4C9AFF] transition-colors outline-none"
            />
          )}
          {/* delete  */}
          <button
            onClick={handleDeleteBoard}
            className="text-dark hover:bg-gray-200 bg-gray-100 bg-opacity-90 rounded p-2 text-xs flex space-x-1 items-center"
          >
            <DeleteRoundedIcon
              className="text-dark scale-[.9]"
              fontSize="small"
            />{" "}
            <span>Delete</span>
          </button>
        </div>
        <div className="overflow-x-scroll">
          <div className="px-6 py-4 flex items-start gap-5 overflow-auto whitespace-nowrap list-wrapper">
            {lists.map((list, i) => (
              <div
                key={list.id}
                draggable
                onDragStart={(e) => handleDragStart(e, i)}
                onDragEnter={(e) => handleDragEnter(e, i)}
                onDragEnd={(e) => handleDragEnd(e, list.id)}
                onDragOver={handleDragOver}
              >
                <BoardList list={list} />
              </div>
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
