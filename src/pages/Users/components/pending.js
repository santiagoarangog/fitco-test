import React, { useState } from "react";
import PropTypes from "prop-types";
import { Div, Text } from "../../../styles/Common";
import { theme } from "../../../styles/theme";
import { useTranslation } from "react-i18next";
import { Button } from "../../../components/Button";
import { Input } from "../../../components/Input";
import search from "../../../assets/icons/Search.svg";
import filterIcon from "../../../assets/icons/Filtrar.svg";
import { Table } from "../../../components/Table";
import { ModalInviteUser } from "./modalInviteUser";
import { Skeleton } from "../../../components/Skeleton";
import { dateFormat } from "../../../utilities/helpers";

export const Pending = ({ pendingList, isLoading, totalItems }) => {
  const { t } = useTranslation("users");
  const [pages, setPages] = useState({ pageNumber: 1, pageSize: 10 });
  const [openModal, setOpenModal] = useState(false);
  const initForm = {
    name: "",
    email: "",
    role: null,
  };
  const [userForm, setUserForm] = useState(initForm);
  const initErrorForm = {
    name: {
      error: false,
      message: "",
    },
    email: {
      error: false,
      message: "",
    },
    role: {
      error: false,
      message: "",
    },
  };
  const [errorForm, setErrorForm] = useState(initErrorForm);

  const handleChangeTable = (pagination) => {
    setPages({
      pageNumber: pagination.current,
      pageSize: pagination.pageSize,
    });
  };

  const tableColumns = [
    {
      title: t("dateInvitation"),
      dataIndex: "createdAt",
      key: "createdAt",
      render: (text) => dateFormat(text),
    },
    {
      title: t("name"),
      dataIndex: "name",
      key: "name",
    },
    {
      title: t("email"),
      dataIndex: "email",
      key: "email",
    },
    {
      title: t("role"),
      dataIndex: "role",
      key: "role",
    },
    {
      title: t("actions"),
      dataIndex: "actions",
      key: "actions",
      render: (actions) => (
        <Div justify="center" style={{ cursor: "pointer" }}>
          {actions.map((action) => action.icon)}
        </Div>
      ),
    },
  ];

  const handleOpen = () => {
    setOpenModal(true);
  };

  const handleClose = () => {
    setOpenModal(false);
    setUserForm(initForm);
    setErrorForm(initErrorForm);
  };

  const handleChange = (event) => {
    const { id, value } = event.target;
    const newUserForm = { ...userForm };
    const newErrorForm = { ...errorForm };

    newUserForm[id] = value;
    newErrorForm[id].error = false;
    newErrorForm[id].message = "";
    setUserForm(newUserForm);
    setErrorForm(newErrorForm);
  };

  const handleSelect = (value, id) => {
    const newUserForm = { ...userForm };
    const newErrorForm = { ...errorForm };

    newUserForm[id] = value;
    newErrorForm[id].error = false;
    newErrorForm[id].message = "";
    setUserForm(newUserForm);
    setErrorForm(newErrorForm);
  };

  return (
    <Div direction="column">
      <ModalInviteUser
        showModal={openModal}
        handleClose={handleClose}
        userForm={userForm}
        handleChange={handleChange}
        handleSelect={handleSelect}
        errorForm={errorForm}
        setErrorForm={setErrorForm}
      />
      <Div
        width="100%"
        align="center"
        justify="space-between"
        m="34px 0 32px 0"
      >
        <Text
          color={theme.colors.gray500}
          size={theme.fonts.size.h5}
          weight={theme.fonts.weight.semibold}
        >
          {t("invitationPending")}
        </Text>
        <Div align="center" gap="16px">
          <Input
            sizeLabel={theme.fonts.size.xs}
            suffix={
              <img alt="search" src={search} style={{ cursor: "pointer" }} />
            }
            width={"332px"}
            placeholder={`${t("search")}...`}
            style={{ borderRadius: "23px", marginTop: "-10px" }}
            mt={"-8px"}
          />
          <Button width={"168px"} variant={"outlined"}>
            {t("filterByRole")}
            <img alt="icon" src={filterIcon} style={{ marginLeft: "7px" }} />
          </Button>
          <Button width={"169px"} onClick={handleOpen}>
            {t("inviteUsers")}
          </Button>
        </Div>
      </Div>
      <Table
        columns={tableColumns}
        data={pendingList}
        rowClassName={(record, index) =>
          index % 2 === 0 ? "table-row-light" : "table-row-dark"
        }
        pagination={{
          defaultCurrent: 1,
          ...pages,
          total: totalItems,
          position: ["bottomRight"],
          showSizeChanger: false,
        }}
        onChange={handleChangeTable}
        locale={{
          emptyText: isLoading ? (
            <Div justify="center" gap="16px">
              {[...Array(9)].map((item, idx) => (
                <Skeleton
                  key={idx}
                  title={false}
                  paragraph={{
                    rows: 10,
                    width: "100%",
                  }}
                  loading
                />
              ))}
            </Div>
          ) : (
            "No Data"
          ),
        }}
      />
    </Div>
  );
};

Pending.propTypes = {
  pendingList: PropTypes.array,
  isLoading: PropTypes.bool,
  totalItems: PropTypes.number,
};
