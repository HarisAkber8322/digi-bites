import React from "react";
import Text from "../UI/Text";
import classNames from "classnames";
const FooterComponent = () => {
  return (
    <Text
      content={"Footer"}
      themeDivClasses={classNames(["text-2xl"])}
    />
  );
};
export default FooterComponent;
