import React, { useEffect, useState } from "react";
import { Div, ModuleContainer, Text } from "../../styles/Common";
import { useLocation } from "react-router-dom";
import Tabs from "../../components/Tabs";
import { useTranslation } from "react-i18next";
import { AllUsers } from "./components/allUsers";
import useGetUsers from "./hooks/useGetUsers";
import { theme } from "../../styles/theme";
import { DeleteIcon } from "../../assets/icons";
import { Pending } from "./components/pending";

export const Users = () => {
  const { t } = useTranslation(["users", "common"]);
  const { search } = useLocation();
  const key = new URLSearchParams(search).get("key");
  const [activeKey, setActiveKey] = useState(key ? key : "1");
  const { data, isSuccess, isLoading } = useGetUsers();

  const [pendingList, setPendingList] = useState([]);
  const [totalItems, setTotalItems] = useState(10);

  useEffect(() => {
    if (key) {
      setActiveKey(key);
    }
  }, [key]);

  useEffect(() => {
    if (isSuccess) {
      setPendingList(
        data?.data
          .filter((item) => item.role[0] === "Investor") //To-Do update List pending
          .map((ele, indx) => ({
            key: indx,
            createdAt: ele.createdAt,
            name: ele.name,
            email: ele.email,
            role: ele.role[0],
            actions: [
              {
                id: ele._id,
                name: ele.name,
                icon: (
                  <DeleteIcon
                    width="32px"
                    height="32px"
                    fill={theme.colors.green}
                  />
                ),
              },
            ],
          }))
      );

      setTotalItems(data?.data.length);
    }
  }, [isSuccess, data]);

  const onChange = (key) => {
    setActiveKey(key);
  };

  const panels = [
    {
      key: "1",
      tab: t("all"),
      children: <AllUsers isLoading={isLoading} totalItems={totalItems} />,
    },
    {
      key: "2",
      tab: t("promoter"),
      children: "",
    },
    {
      key: "3",
      tab: t("investor"),
      children: <Investor />,
    },
    {
      key: "6",
      tab: t("pending"),
      children: (
        <Pending
          pendingList={pendingList}
          isLoading={isLoading}
          totalItems={totalItems}
        />
      ),
    },
  ];

  return (
    <ModuleContainer direction="column" padding="35px 69px 0 32px">
      <Tabs defaultActiveKey="1" activeKey={activeKey} onChange={onChange}>
        {panels.map((panel) => (
          <Tabs.Panel tab={panel.tab} key={panel.key}>
            {panel.children}
          </Tabs.Panel>
        ))}
      </Tabs>
      <Div width="100%" justify="center" m="54px 0 13px 0">
        <Text size={theme.fonts.size.sm} color={theme.colors.gray300}>
          {t("common:poweredBy")}
        </Text>
      </Div>
    </ModuleContainer>
  );
};
