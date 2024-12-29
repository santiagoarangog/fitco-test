import React, { useState, useEffect } from "react";
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
import useGetAllUsers from "../hooks/useGetAllUsers";
import useDebounce from "../../../core/hooks/useDebounce";
import { DeleteIcon } from "../../../assets/icons";
import Checkbox from "../../../components/Checkbox";
export const AllUsers = ({ isLoading }) => {
  const { t } = useTranslation("users");
  const [openModal, setOpenModal] = useState(false);
  const [usersList, setUsersList] = useState([]);
  const [totalItems, setTotalItems] = useState(10);
  const [filterOpen, setFilterOpen] = useState(false);
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

  const [pages, setPages] = useState({ pageNumber: 0, pageSize: 10 });
  const [searchTerm, setSearchTerm] = useState("");
  const searchValue = useDebounce(searchTerm, 600);
  const [userRoles, setUserRoles] = useState([]);
  const [payloadOptions, setPayloadOptions] = useState({
    limit: pages.pageSize,
    offset: pages.pageNumber,
    name: searchValue,
    userRole: userRoles.length === 0 ? null : userRoles,
  });

  const handleOpenFilter = () => {
    setFilterOpen(!filterOpen);
  };
  useEffect(() => {
    setPayloadOptions({
      limit: pages.pageSize,
      offset: pages.pageNumber,
      name: searchValue,
      userRole: userRoles.length === 0 ? null : userRoles,
    });
  }, [pages, searchValue, userRoles]);

  const getAllUsers = useGetAllUsers(payloadOptions);
  const { data, isSuccess } = getAllUsers;

  useEffect(() => {
    if (isSuccess) {
      setTotalItems(data?.data?.total);
      setUsersList(
        data?.data?.data.map((ele, indx) => ({
          key: indx,
          createdAt: ele.createdAt,
          name: ele.name,
          email: ele.email,
          role: ele.role[0],
          actions: [
            {
              id: ele._id,
              name: ele.name,
              icon: <DeleteIcon fill={theme.colors.green} />,
            },
          ],
        }))
      );
    }
  }, [isSuccess, data]);

  const handleChangeTable = (pagination) => {
    setPages({
      pageNumber: pagination.current - 1,
      pageSize: pagination.pageSize,
    });
  };

  const handleChangeSearch = (event) => {
    const { value } = event.target;
    setSearchTerm(value);
  };

  const handleCheckBox = (event) => {
    const { id, checked } = event.target;
    if (checked) {
      setUserRoles([...userRoles, id]);
    } else {
      setUserRoles((prevRoles) => prevRoles.filter((role) => role !== id));
    }
  };

  const tableColumns = [
    {
      title: t("date"),
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
        <Div justify="center">{actions.map((action) => action.icon)}</Div>
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
          {t("allUsers")}
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
            onChange={handleChangeSearch}
            value={searchTerm}
          />
          {filterOpen && (
            <Div
              direction="column"
              width="255px"
              height="260px"
              background={theme.colors.white}
              gap="16px"
              p="19px 0px 21px 21px"
              style={{
                position: "absolute",
                top: "90px",
                right: "180px",
                zIndex: 1,
              }}
            >
              <Checkbox
                label="Todos"
                id="all"
                onChange={handleCheckBox}
                checked={userRoles.length === 0}
              />
              <Checkbox
                label="Promotor"
                id="Developer"
                onChange={handleCheckBox}
                checked={userRoles.includes("Developer")}
              />
              <Checkbox
                label="Inversor"
                id="Investor"
                onChange={handleCheckBox}
                checked={userRoles.includes("Investor")}
              />
              <Checkbox
                label="Manager"
                id="Manager"
                onChange={handleCheckBox}
                checked={userRoles.includes("Manager")}
              />
              <Checkbox
                label="Proveedor"
                id="Provider"
                onChange={handleCheckBox}
                checked={userRoles.includes("Provider")}
              />
              <Checkbox
                label="Asesor"
                id="Advisor"
                onChange={handleCheckBox}
                checked={userRoles.includes("Advisor")}
              />
            </Div>
          )}
          <Button
            width={"168px"}
            variant={"outlined"}
            onClick={handleOpenFilter}
          >
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
        data={usersList}
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

AllUsers.propTypes = {
  isLoading: PropTypes.bool,
};
