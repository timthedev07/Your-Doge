import React, { useEffect, useState } from "react";
import { useHistory } from "react-router";
import {
  MeDocument,
  MeQuery,
  useConfirmEmailMutation,
} from "../../generated/graphql";
import { useValidTmpTokenMutation } from "../../generated/graphql";
import { setWithExpiry } from "../../utils/localStorageExpiration";
import { Loading } from "../Loading";

interface ConfirmEmailProps {
  token: string;
}

export const ConfirmEmail: React.FC<ConfirmEmailProps> = ({ token }) => {
  const [confirmEmail] = useConfirmEmailMutation();
  const history = useHistory();
  const [loading, setLoading] = useState<boolean>(true);
  const [validToken, setValidToken] = useState<boolean>(false);

  const [verifyToken] = useValidTmpTokenMutation();

  useEffect(() => {
    const isTokenValid = async () => {
      setLoading(true);
      const res = await verifyToken({ variables: { token } });

      if (res.data && res.data.validTmpToken) {
        setValidToken(true);
        return;
      }
      setValidToken(false);
    };

    isTokenValid();
    setLoading(false);
  }, [token, verifyToken]);

  return !loading ? (
    <div className="email-confirmation">
      <div className="email-confirmation-card">
        <div>
          {validToken ? (
            <>
              <h2 style={{ width: "100%" }}>One Step Away</h2>
              <h4 style={{ width: "100%" }}>From your doge</h4>
              <button
                className="rounded-btn emphasized"
                onClick={async () => {
                  try {
                    const { data } = await confirmEmail({
                      variables: { token },
                      update: (store, { data }) => {
                        if (!data) return null;
                        store.writeQuery<MeQuery>({
                          query: MeDocument,
                          data: {
                            __typename: "Query",
                            me: data.confirmUser.user,
                          },
                        });
                      },
                    });
                    if (data && data.confirmUser) {
                      setWithExpiry(
                        "serverId",
                        data.confirmUser.user.serverId,
                        new Date().valueOf() + 864000000
                      ); // 10 days
                      history.push("/dashboard");
                    }
                  } catch (err) {}
                }}
                style={{ margin: "40px" }}
              >
                Confirm Your Email
              </button>
            </>
          ) : (
            <>
              <h2>Invalid Token</h2>
            </>
          )}
        </div>
      </div>
    </div>
  ) : (
    <Loading />
  );
};
