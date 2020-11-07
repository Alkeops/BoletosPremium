import React from "react";
import { useHistory } from "react-router-dom";
import { Icon } from "semantic-ui-react";

const GoBack = () => {
  const history = useHistory();
  return (
    <Icon
      className="go-back"
      name="caret left"
      size="huge"
      onClick={() => history.goBack()}
    />
  );
};

export default GoBack;
