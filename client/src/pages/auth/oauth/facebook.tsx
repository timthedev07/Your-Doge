import { useRouter } from "next/router";
import React, { useState } from "react";
import { OAuthWait } from "../../../components/OAuthWait";

const Facebook: React.FC = ({}) => {
  const {} = useRouter();
  const [active, setActive] = useState<boolean>(false);
  const [alertMessage] = useState<string>("");

  return (
    <OAuthWait
      active={active}
      setActive={setActive}
      alertMessage={alertMessage}
    />
  );
};

export default Facebook;
