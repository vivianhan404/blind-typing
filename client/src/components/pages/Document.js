import React, { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { DocText } from "../modules/TextInput";

import "./Document.css";
import "../../utilities.css";

const LONG_TEXT =
  "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum eget lectus eu lacus pretium varius convallis sit amet dolor. Suspendisse id mollis lectus. Mauris vehicula ut nibh quis efficitur. Vestibulum quis ex eget augue feugiat placerat quis vel lectus. Nunc congue, mi congue fermentum eleifend, risus enim pulvinar ipsum, ut fermentum purus tellus id nisl. Maecenas condimentum purus ac varius aliquet. Cras accumsan velit odio, id tristique mauris consectetur sit amet. Sed euismod metus erat, vitae ultrices tellus interdum a. Phasellus ultrices, nulla ac mattis auctor, eros ligula aliquet mi, vitae scelerisque nisi erat a enim. Duis ac semper risus. Vestibulum elementum ornare lectus a tincidunt. Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Mauris purus ex, ullamcorper non turpis eget, pulvinar cursus eros. Suspendisse pulvinar, sapien sed porta volutpat, lacus erat posuere ante, sit amet vulputate tortor massa quis arcu. Mauris rutrum odio vel purus vulputate congue a non ipsum. Praesent posuere, risus in lacinia bibendum, lectus dolor fermentum velit, a faucibus eros arcu vulputate mauris. Nam vitae ligula elementum, tempus ante sed, congue purus. Suspendisse sed eleifend magna. Cras egestas convallis felis ut condimentum. Cras libero massa, accumsan vel nibh in, pharetra sagittis urna. Donec feugiat quam rutrum, mattis ante nec, mollis velit. Vestibulum eros enim, euismod at mauris id, placerat malesuada orci. In hac habitasse platea dictumst. Phasellus vel cursus nisi, at imperdiet est. Cras mi sem, ornare nec turpis non, ornare venenatis nisi. Nullam mollis tortor sodales, iaculis ante vel, efficitur leo. Aenean vulputate tincidunt ligula, non porttitor magna varius eget. Praesent lobortis tincidunt elementum. Sed semper enim mauris, accumsan mollis quam aliquam et. Suspendisse quis lorem eget leo efficitur eleifend eget eget lorem.";

const Document = () => {
  const navigate = useNavigate();
  const dataObj = useLocation().state;
  const [content, setContent] = useState("");

  useEffect(() => {
    setContent(dataObj.content);
  }, []);

  const makeHandleClick = (to) => {
    return () => {
      navigate(to);
    };
  };

  return (
    <div className="Doc-background">
      <div className="Doc-headerContainer">
        <div className="Doc-backButtonContainter">
          <button className="Doc-backButton" onClick={makeHandleClick("/journal")}>
            back to journal
          </button>
        </div>
        <div className="Doc-promptContainer">
          <div className="Doc-promptText">{dataObj.prompt}</div>
        </div>
        <div className="Doc-backButtonContainter" />
      </div>

      <div className="Doc-bodyContainer">
        <div className="Doc-sidebarContainer" />
        <div className="Doc-textContainer">
          <DocText content={content} setContent={setContent} />
        </div>
        <div className="Doc-sidebarContainer Doc-sidebarRightContainer">
          <button className="Doc-pageButton" onClick={makeHandleClick("/prompt")}>
            new page
          </button>
        </div>
      </div>
    </div>
  );
};

export default Document;
