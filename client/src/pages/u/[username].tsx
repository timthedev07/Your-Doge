import { useRouter } from "next/router";
import React from "react";
import { ReadOnlyProfile } from "../../components/ReadOnlyProfile";
import { Loading } from "../../components/Loading";
import { TabData, TabSwitcher } from "../../components/TabSwitcher";
import { useGetProfileQuery } from "../../generated/graphql";

const OtherUsers: React.FC = () => {
  const {
    query: { username },
  } = useRouter();

  const { data, loading } = useGetProfileQuery({
    variables: { username: username ? (username as string) : "" },
  });

  if (!data || !data.getProfile) {
    if (loading) return <Loading />;
    return <h1>User does not exist</h1>;
  }

  const TABS: Array<TabData> = [
    {
      content: (
        <ReadOnlyProfile
          avatarId={
            `${
              data?.getProfile?.avatarId <= 15 ? data?.getProfile?.avatarId : 0
            }` as any
          }
          bio={data.getProfile.bio}
          email={data.getProfile.email}
          username={data.getProfile.username}
          age={data.getProfile.age}
        />
      ),
      title: "Information",
    },
  ];

  return (
    <div id="account-page">
      <div id="account-page-content-container">
        <TabSwitcher tabs={TABS} />
      </div>
    </div>
  );
};

export default OtherUsers;
