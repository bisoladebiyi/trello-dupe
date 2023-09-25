import React, { useEffect, useState } from "react";
import CloseRoundedIcon from "@mui/icons-material/CloseRounded";
import { ICard } from "../../utils/interfaces/interfaces";
import Button from "../Elements/Button";
import { editCardName } from "../../utils/requests/requests_firebase";
import { useParams } from "react-router-dom";

const Card: React.FC<ICard> = ({ card, l_id }) => {
  const [cardName, setCardName] = useState<string>("");
  const [showUpdateCardModal, setShowUpdateCardModal] =
    useState<boolean>(false);

  const { w_id, b_id } = useParams();

  useEffect(() => {
    setCardName(card?.data().name);
  }, [card]);

  const toggleUpdateModal = () => {
    setShowUpdateCardModal(!showUpdateCardModal);
  };

  const editCard = async () => {
    toggleUpdateModal();
    if (cardName.trim() === "") return;

    if (w_id && b_id) {
      await editCardName(w_id, b_id, l_id, card.id, cardName);
    }
  };
  return (
    <div>
      <div
        onClick={toggleUpdateModal}
        key={card.id}
        className="p-3 bg-white rounded-lg shadow text-sm text-dark -mx-2 hover:bg-[#F1F2F4] cursor-pointer whitespace-pre-wrap"
      >
        <p>{cardName || card.data().name}</p>
      </div>
      {showUpdateCardModal && (
        <div className="modal fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-[#F1F2F4] w-1/3 p-10 rounded-md">
          <button
            className="absolute right-5 top-3"
            onClick={toggleUpdateModal}
          >
            <CloseRoundedIcon fontSize="small" className="text-gray-500" />
          </button>
          <input
            type="text"
            value={cardName}
            onChange={(e) => setCardName(e.target.value)}
            autoFocus
            className="p-3 bg-white rounded-lg shadow text-sm text-dark w-full outline-none"
            placeholder="Enter a title for this card..."
          />
          <div className="mt-3 flex justify-center space-x-3">
            <Button
              text={"Update"}
              className="uppercase text-xs"
              onClick={editCard}
            />
            <Button text={"Delete"} className="text-xs uppercase" type="dark" />
          </div>
        </div>
      )}
    </div>
  );
};

export default Card;
