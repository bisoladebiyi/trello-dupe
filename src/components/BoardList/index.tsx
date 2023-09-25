import React from "react";
import AddRoundedIcon from "@mui/icons-material/AddRounded";
import CloseRoundedIcon from "@mui/icons-material/CloseRounded";
import Button from "../Elements/Button";
import { IBoardList } from "../../utils/interfaces/interfaces";
import useBoardList from "./BoardList.hook";
import Card from "../Card";

const BoardList: React.FC<IBoardList> = ({ list }) => {
  const {
    cards,
    cardName,
    showInput,
    listName,
    showListNameInput,
    toggleListNameInput,
    handleEditListName,
    handleListName,
    setCardName,
    toggleInput,
    addNewCard,
    handleDeleteList,
    handleDragEnd,
    handleDragStart,
    handleDragEnter,
    handleDragOver,
  } = useBoardList(list);

  return (
    <div className="min-w-[300px] bg-[#F1F2F4] rounded-2xl shadow py-4 px-5 relative">
      <button className="absolute right-5 top-3" onClick={handleDeleteList}>
        <CloseRoundedIcon fontSize="small" className="text-gray-500" />
      </button>
      {showListNameInput ? (
        <input
          type="text"
          value={listName}
          onChange={handleListName}
          onBlur={handleEditListName}
          autoFocus
          className="p-2 py-0 font-medium text-sm rounded border-[1.5px] border-[#DFE1E6] focus:border-[#4C9AFF] transition-colors outline-none"
        />
      ) : (
        <h3 onClick={toggleListNameInput} className="font-medium text-sm">
          {listName || list.data().name}
        </h3>
      )}
      <div className="mt-3 space-y-3">
        {cards
          .map((c, i) => (
            <div
              key={c.id}
              draggable
              onDragStart={(e) => handleDragStart(e, i)}
              onDragEnter={(e) => handleDragEnter(e, i)}
              onDragEnd={(e) => handleDragEnd(e, c.id)}
              onDragOver={handleDragOver}
            >
              <Card card={c} l_id={list.id} />
            </div>
          ))}

        {showInput && (
          <form action="" className="w-[106%] -mx-2">
            <input
              type="text"
              value={cardName}
              onChange={(e) => setCardName(e.target.value)}
              className="p-3 bg-white rounded-lg shadow text-sm text-dark w-full outline-none"
              placeholder="Enter a title for this card..."
            />
            <div className="mt-2 flex space-x-2 items-center">
              <Button
                text="Add card"
                className="text-sm"
                onClick={addNewCard}
              />
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
