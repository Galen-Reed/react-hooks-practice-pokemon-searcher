import React, { useState } from "react";
import { Card } from "semantic-ui-react";

function PokemonCard({ hp, name, spriteFront, spriteBack}) {

  const [sprite, setSprite] = useState(spriteFront)

  function handleClick() {
    if (sprite === spriteFront) {
      setSprite(spriteBack);
    } else {
      setSprite(spriteFront);
    }
  }

  return (
    <Card onClick={handleClick}>
      <div>
        <div className="image">
          <img src={sprite}alt="oh no!" />
        </div>
        <div className="content">
          <div className="header">{name}</div>
        </div>
        <div className="extra content">
          <span>
            <i className="icon heartbeat red" />
            {hp} hp
          </span>
        </div>
      </div>
    </Card>
  );
}

export default PokemonCard;
