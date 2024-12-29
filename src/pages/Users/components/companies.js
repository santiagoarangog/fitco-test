import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { Div, Text, Row } from "../../../styles/Common";
import { theme } from "../../../styles/theme";
import { useTranslation } from "react-i18next";
import { Button } from "../../../components/Button";
import { Input } from "../../../components/Input";
import search from "../../../assets/icons/Search.svg";
import { Table } from "../../../components/Table";
import { Skeleton } from "../../../components/Skeleton";
import { dateFormat } from "../../../utilities/helpers";
import { DrawerNewInvestmentGroup } from "./DrawerNewInvestmentGroup";
import ModalSuccess from "../../NewProject/components/ModalSuccess";
import { useNavigate } from "react-router-dom";
import useGetCompanies from "../hooks/useGetCompanies";
import { EditIcon, DeleteIcon, ExternalLinkIcon } from "../../../assets/icons";
import Tabs from "../../../components/Tabs";
import { Card } from "../../../components/Card";
import useDebounce from "../../../core/hooks/useDebounce";
import { ModalLogo } from "./modalLogo";

export const Companies = () => {
  const { t } = useTranslation("users");
  const navigate = useNavigate();
  const [pages, setPages] = useState({ pageNumber: 0, pageSize: 10 });
  const [totalItems, setTotalItems] = useState(10);
  const [openDrawer, setOpenDrawer] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [companiesList, setCompaniesList] = useState([]);
  const [tabActiveKey, setTabActiveKey] = useState("1");
  const [companyType, setCompanyType] = useState("Promoter");
  const [searchTerm, setSearchTerm] = useState("");
  const searchValue = useDebounce(searchTerm, 600);
  const [selectedCompany, setSelectedCompany] = useState(null);
  const [showModalLogo, setShowModalLogo] = useState(false);

  const handleChangeSearch = (event) => {
    const { value } = event.target;
    setSearchTerm(value);
  };

  const initialDrawerValues = {
    nameCompany: "",
    address: "",
    logo: null,
    document: null,
  };
  const [form, setForm] = useState(initialDrawerValues);

  const [payloadOptions, setPayloadOptions] = useState({
    limit: pages.pageSize,
    offset: pages.pageNumber,
    companyType: companyType,
    companyName: searchValue,
  });

  useEffect(() => {
    setPayloadOptions({
      limit: pages.pageSize,
      offset: pages.pageNumber,
      companyType: companyType,
      companyName: searchValue,
    });
  }, [pages, companyType, searchValue]);

  const getCompanies = useGetCompanies(payloadOptions);
  const { data, isSuccess, isLoading } = getCompanies;
  useEffect(() => {
    if (isSuccess) {
      setTotalItems(data?.data?.total || 10);
      setCompaniesList(
        data?.data?.data.map((ele, indx) => ({
          key: indx,
          createdAt: ele.createdAt,
          companyName: ele.name,
          address: ele.address ? `${ele.address}` : "-",
          users: ele.totalUsers,
          logo: {
            logo: ele.logo ? `${ele.logo}` : "-",
            onClick: ele.logo
              ? () => {
                  setSelectedCompany(ele.id);
                  setShowModalLogo(true);
                }
              : null,
          },
          projects: handleProjectsAndTerms(
            tabActiveKey === "1" ? ele.totalProjects : ele.termsAndConditions
          ),
          actions: [
            {
              id: ele._id,
              name: ele.name,
              icon: (
                <EditIcon
                  width="32px"
                  height="32px"
                  fill={theme.colors.green}
                  onClick={() => {
                    setSelectedCompany(ele.id);
                    setOpenDrawer(true);
                  }}
                />
              ),
            },
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
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data, isSuccess, tabActiveKey]);

  const handleProjectsAndTerms = (value) => {
    if (tabActiveKey === "1") {
      return value !== 0 ? `${value} proyectos` : "Sin proyectos";
    } else {
      return value ? "Si" : "No";
    }
  };

  const initialErrorForm = {
    nameCompany: { error: false, message: "" },
    address: { error: false, message: "" },
    logo: { error: false, message: "" },
    document: { error: false, message: "" },
  };
  const [errorForm, setErrorForm] = useState(initialErrorForm);

  const handleChangeTable = (pagination) => {
    const newPayload = { ...payloadOptions };
    newPayload.offset = pagination.current - 1;
    setPayloadOptions(newPayload);
    setPages({
      pageNumber: pagination.current - 1,
      pageSize: pagination.pageSize,
    });
  };

  const handleCloseDrawer = () => {
    setOpenDrawer(false);
    setSelectedCompany(null);
    setForm(initialDrawerValues);
    setErrorForm(initialErrorForm);
  };

  const handleCloseShowModal = () => {
    setShowModal(false);
    navigate("invite-investor");
  };
  const handleCloseLogo = () => {
    setSelectedCompany(null);
    setShowModalLogo(false);
  };
  const handleTabChange = (key) => {
    setTabActiveKey(key);
    if (key === "1") {
      setCompanyType("Promoter");
    } else {
      setCompanyType("Investment");
    }
  };

  const getShortLogoName = (url, charCount, typeDocument) => {
    if (url === "-") {
      return "-";
    }
    const startIndexLogo = url.indexOf("/logo/") + "/logo/".length;
    const startIndexDocument =
      url.indexOf("/termsAndConditions/") + "/termsAndConditions/".length;
    if (startIndexLogo === -1 && startIndexDocument === -1) return "-";
    const logoPart = url.slice(
      typeDocument === "logo" ? startIndexLogo : startIndexDocument
    );
    return logoPart.slice(0, charCount) + "...";
  };

  const groupTabs = [
    {
      tab: "Grupo promotor",
      key: "1",
    },
    {
      tab: "Grupo inversor",
      key: "2",
    },
  ];
  const tableColumns = [
    {
      title: t("companiesComponent.dateCreate"),
      dataIndex: "createdAt",
      key: "createdAt",
      render: (text) => dateFormat(text),
      width: 141,
    },
    {
      title: t("investorComponent.companyName"),
      dataIndex: "companyName",
      key: "companyName",
      width: 175,
    },
    {
      title: t("companiesComponent.direction"),
      dataIndex: "address",
      key: "address",
      width: 214,
    },
    {
      title:
        tabActiveKey === "1"
          ? t("companiesComponent.promoter")
          : t("companiesComponent.investor"),
      dataIndex: "users",
      key: "users",
      width: 107,
      render: (value) => {
        return <Text align="center">{value}</Text>;
      },
    },
    {
      title: t("companiesComponent.logo"),
      dataIndex: "logo",
      key: "logo",
      width: 107,
      render: (value) => {
        return (
          <Row
            align="center"
            justify="center"
            onClick={value?.onClick}
            style={{ cursor: "pointer" }}
          >
            <Text color={theme.colors.green} align="center">
              {getShortLogoName(value?.logo, 5, "logo")}
            </Text>
            {value?.logo !== "-" && (
              <ExternalLinkIcon
                width={"24px"}
                height={"24px"}
                fill={theme.colors.green}
              />
            )}
          </Row>
        );
      },
    },
    {
      title:
        tabActiveKey === "1"
          ? t("companiesComponent.projectCreate")
          : t("companiesComponent.t&c"),
      dataIndex: "projects",
      key: "projects",
      width: 160,
      render: (value) => {
        return <Text align="center">{value}</Text>;
      },
    },
    {
      title: t("actions"),
      dataIndex: "actions",
      key: "actions",
      width: 111,
      render: (actions) => (
        <Div justify="space-between" style={{ cursor: "pointer" }}>
          {actions.map((action) => action.icon)}
        </Div>
      ),
    },
  ];

  const handleNewCompany = () => {
    setOpenDrawer(true);
  };

  return (
    <Div direction="column">
      <ModalSuccess
        showModal={showModal}
        handleCloseModal={handleCloseShowModal}
        page={"users"}
      />
      <ModalLogo
        showModal={showModalLogo}
        handleClose={handleCloseLogo}
        selectedCompany={selectedCompany}
      />
      <DrawerNewInvestmentGroup
        openDrawer={openDrawer}
        handleClose={handleCloseDrawer}
        setShowModal={setShowModal}
        form={form}
        setForm={setForm}
        errorForm={errorForm}
        setErrorForm={setErrorForm}
        selectedCompany={selectedCompany}
        getShortLogoName={getShortLogoName}
        tabActiveKey={tabActiveKey}
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
          {t("companiesComponent.companies")}
        </Text>
        <Div align="center" gap="16px">
          <Input
            sizeLabel={theme.fonts.size.xs}
            onChange={handleChangeSearch}
            value={searchTerm}
            suffix={
              <img alt="search" src={search} style={{ cursor: "pointer" }} />
            }
            width={"332px"}
            placeholder={`${t("search")}...`}
            style={{ borderRadius: "23px", marginTop: "-10px" }}
            mt={"-8px"}
          />

          <Button
            width={"169px"}
            hBackground={theme.colors.green}
            onClick={handleNewCompany}
          >
            {t("companiesComponent.newCompany")}
          </Button>
        </Div>
      </Div>

      <Card padding={"35px 29px"}>
        <Tabs
          defaultActiveKey="1"
          onChange={handleTabChange}
          activeKey={tabActiveKey}
        >
          {groupTabs.map((panel) => (
            <Tabs.Panel tab={panel.tab} key={panel.key} />
          ))}
        </Tabs>
        <Table
          columns={tableColumns}
          data={companiesList}
          shadow={"0 0 0 #00000010"}
          padding={"0"}
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
      </Card>
    </Div>
  );
};

Companies.propTypes = {
  searchTerm: PropTypes.string,
  handleChangeSearch: PropTypes.func,
};
