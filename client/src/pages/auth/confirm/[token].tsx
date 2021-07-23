import React, { useEffect, useState } from "react";
import {
  MeDocument,
  MeQuery,
  useConfirmEmailMutation,
  useValidTmpTokenMutation,
} from "../../../generated/graphql";
import { setWithExpiry } from "../../../lib/localStorageExpiration";
import { Loading } from "../../../components/Loading";
import { useRouter } from "next/router";

const ConfirmEmail: React.FC = () => {
  const [confirmEmail] = useConfirmEmailMutation();
  const [loading, setLoading] = useState<boolean>(true);
  const [validToken, setValidToken] = useState<boolean>(false);
  const {
    push,
    query: { token },
  } = useRouter();

  const [verifyToken] = useValidTmpTokenMutation();

  useEffect(() => {
    const isTokenValid = async () => {
      setLoading(true);
      const res = await verifyToken({
        variables: { token: token ? (token as string) : "" },
      });

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
                      variables: { token: token as string },
                      update: (store, { data }) => {
                        if (!data) return null;
                        store.writeQuery<MeQuery>({
                          query: MeDocument,
                          data: {
                            __typename: "Query",
                            me: data.confirmUser.user,
                          },
                        });
                        return null;
                      },
                    });
                    if (data && data.confirmUser) {
                      setWithExpiry(
                        window.localStorage,
                        "serverId",
                        data.confirmUser.user.serverId,
                        new Date().valueOf() + 864000000
                      ); // 10 days
                      push("/dashboard");
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

export default ConfirmEmail;
