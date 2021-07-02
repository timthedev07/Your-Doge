import React from "react";
import { useHistory } from "react-router";
import {
  MeDocument,
  MeQuery,
  useConfirmEmailMutation,
} from "../../generated/graphql";

interface ConfirmEmailProps {
  token: string;
}

export const ConfirmEmail: React.FC<ConfirmEmailProps> = ({ token }) => {
  const [confirmEmail] = useConfirmEmailMutation();
  const history = useHistory();

  return (
    <div className="email-confirmation">
      <div className="email-confirmation-card">
        <div>
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
                  history.push("/dashboard");
                }
              } catch (err) {}
            }}
            style={{ margin: "40px" }}
          >
            Confirm Your Email
          </button>
        </div>
      </div>
    </div>
  );
};
