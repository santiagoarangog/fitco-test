/* eslint-disable no-prototype-builtins */
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useQueryClient } from "react-query";
import { useNavigate } from "react-router-dom";
import { useLocation } from "react-router-dom";
import { ModuleContainer } from "../../styles/Common";
import { Row, Col, Text, Div, Container } from "../../styles/Common";
import { Card } from "../../components/Card";
import { theme } from "../../styles/theme";
import BasicData from "../NewProject/components/basicData";
import { Button } from "../../components/Button";
import { Link } from "../../components/Link";
import { useTranslation } from "react-i18next";
import useUpdateProject from "../../core/hooks/useUpdateProject";
import { validateNewProject } from "../../utilities/validations";
import useGetUserInfo from "../MyAccount/hooks/useGetUser";
import {
  dateFormat,
  formatNumberOpex,
  getUserInfo,
  unformatNumber,
  unformatNumberOpex,
} from "../../utilities/helpers";
import useGetCountries from "../../core/hooks/useGetCountries";
import useGetProjectInfo from "../../core/hooks/useGetProject";
import ModalSuccess from "../NewProject/components/ModalSuccess";
import useGoToPhaseTwo from "../Projects/hooks/useGoToPhaseTwo";
import useRequestInfo from "./hooks/useRequestInfo";

export const EditProject = () => {
  const queryClient = useQueryClient();
  const { t, i18n } = useTranslation(["common", "newProject"]);
  const locale = i18n.language;
  const navigate = useNavigate();
  const { search } = useLocation();
  const selected = new URLSearchParams(search).get("selected");
  const updateProject = useUpdateProject();

  const projectId = new URLSearchParams(search).get("projectId");
  const projectDataInfo = useGetProjectInfo(projectId);
  const { data: dataProject, isSuccess: isSuccessDataProject } =
    projectDataInfo;

  const { data: dataPlants, isSuccess: isSuccessPlants } =
    useGetPlantsList(projectId);
  const [plantsList, setPlantsList] = useState([]);

  const requestInfo = useRequestInfo();
  const goToPhaseTwo = useGoToPhaseTwo();

  const { id: userId, role } = getUserInfo();
  const userInfo = useGetUserInfo(userId);
  const { isSuccess, data: dataUserInfo } = userInfo;

  const [objective, setObjective] = useState("");
  const [projectType, setProjectType] = useState("");
  const [financingType, setFinancingType] = useState("");
  const [additionalInformationRequested, setAdditionalInformationRequested] =
    useState(true);
  const [isDraftDB, setIsDraftDB] = useState();

  const [selectedMenu, setSelectedMenu] = useState({
    position: 0,
    title: "basicData",
  });
  const [showModal, setShowModal] = useState(false);
  const [forceUpdate, setForceUpdate] = useState(false);
  const [createAt, setCreateAt] = useState(null);
  const [status, setStatus] = useState(null);

  const menuOptions = [
    { title: "basicData" },
    { title: "CAPEX" },
    { title: objective === "sale" ? null : "OPEX" },
    { title: "salesScheme" },
    { title: objective === "sale" ? "price" : null },
    { title: "promoterInfo" },
    { title: "plants" },
  ];

  const [basicInfo, setBasicInfo] = useState({
    teaserName: "",
    projectName: "",
    purchase: false,
    dueDiligences: false,
    societyStatus: null,
    numberMG: null,
  });

  const [promoterInfo, setPromoterInfo] = useState({
    company: {
      _id: "",
      name: "",
      domain: "",
      experiencesYears: null,
      completedProjects: null,
      totalMW: null,
      countries: [],
    },
    companyName: "",
    description: "",
    document: { value: null, error: false },
  });

  const [capexInfo, setCapexInfo] = useState({
    totalProjectCost: 0,
    substationReinforcementCost: 0,
    transmissionLineCost: 0,
    totalTransformersCost: 0,
    totalTurbinesCost: 0,
    additionalInvestmentCosts: 0,
    invertersCosts: 0,
    Alter5totalProjectCost: 0,
  });

  const [opexInfo, setOpexInfo] = useState({
    OM: "",
    assetManagement: "",
    insurance: "",
    otherCosts: "",
    marketAgencyCost: "",
    networkAccessCost: "",
    comparableTaxes: "",
    costeRefuerzos: "",
    costeLinea: "",
    costeTotal: "",
    costeTotaltubinas: "",
    otrosCostesMarket: "",
    otrosCostesNetwork: "",
    otrosCostesTaxes: "",
  });
  const [energySalesSchemeInfo, setEnergySalesSchemeInfo] = useState({
    optionsEnergySalesScheme: null,
    agreementPPAElectricitySoldPercentage: null,
    agreementMarketElectricitySoldPercentage: null,
    agreementPPAPrice: null,
    agreementPPATerm: null,
    agreementPPASaleVolumeCommitment: null,
    agreementSalesVolume: null,
  });

  const [priceInfo, setPriceInfo] = useState({
    consideracionesSobrePrecio: "",
    precioOrientativoMW: "",
  });

  const menuOptionsFiltered = menuOptions.filter(
    (option) => option.title !== null
  );

  useEffect(() => {
    if (selected) {
      setSelectedMenu({
        position: 5,
        title: selected,
      });
    }
  }, [selected]);

  const countries = useGetCountries();
  const { data: dataCountries } = countries;
  const [countriesOptions, setCountriesOptions] = useState([]);
  useEffect(() => {
    if (dataCountries) {
      setCountriesOptions(
        dataCountries?.data?.result.data.map((ele) => ({
          label: ele.name,
          value: ele.code,
        }))
      );
    }
  }, [dataCountries]);

  useEffect(() => {
    if (isSuccess && dataUserInfo) {
      const dataUser = dataUserInfo?.data?.result.data.user;
      const countriesNames = dataUser?.company?.countries
        ? dataUser?.company?.countries?.map((ele) => {
            const country = countriesOptions.find((elem) => elem.value === ele);
            return country ? country.label : null;
          })
        : [];

      setPromoterInfo((prevState) => ({
        ...prevState,
        company: {
          ...dataUser.company,
          experiencesYears: dataUser.company.experiencesYears,
          completedProjects: dataUser.company.completedProjects,
          totalMW: dataUser.company.totalMW,
          countries: countriesNames,
        },
      }));
    }
  }, [isSuccess, dataUserInfo, countriesOptions]);

  const langDecimal = locale === "es" ? "," : ".";

  useEffect(() => {
    if (isSuccessDataProject && dataProject) {
      const info = dataProject?.data?.result?.data;

      setCreateAt(info?.createAt);
      setStatus(info?.status);
      setObjective(info?.projectType?.instance.name);
      setProjectType(info?.projectType?.type.name);
      setFinancingType(info?.projectType?.kind.name);
      setAdditionalInformationRequested(info?.additionalInformationRequested);
      setIsDraftDB(info?.isDraft);
      setBasicInfo({
        teaserName: info?.teaserName || null,
        projectName: info?.name || null,
        purchase: info?.acceptBuyOffers,
        dueDiligences: info?.dueDiligence,
        societyStatus: info?.socialStatus || null,
        numberMG: info?.projectTotalMW || null,
      });
      setCapexInfo({
        totalProjectCost: info?.capex || 0,
        substationReinforcementCost: info?.substationCosts || 0,
        solarPanelsCosts: info?.solarPanelsCosts || 0,
        transmissionLineCost: info?.transmissionLineCosts || 0,
        totalTransformersCost: info?.transformersCosts || 0,
        totalTurbinesCost: info?.turbinesCosts || 0,
        invertersCosts: info?.invertersCosts || 0,
        additionalInvestmentCosts: info?.otherCosts || 0,
      });
      setOpexInfo({
        costeRefuerzos: formatNumberOpex(String(info?.omPerMW).replace(".", langDecimal), locale) || "",
        costeLinea: formatNumberOpex(String(info?.assetManagmentPerMW).replace(".", langDecimal), locale) || "",
        costeTotal: formatNumberOpex(String(info?.insurancesPerMW).replace(".", langDecimal), locale) || "",
        costeTotaltubinas: formatNumberOpex(String(info?.otherCostsPerMW).replace(".", langDecimal), locale) || "",
        otrosCostesMarket: formatNumberOpex(String(info?.marketAgencyCostsPerMW).replace(".", langDecimal), locale) || "",
        otrosCostesNetwork: formatNumberOpex(String(info?.networkAccessCostsPerMW).replace(".", langDecimal), locale) || "",
        otrosCostesTaxes: formatNumberOpex(String(info?.localTaxesPerMW).replace(".", langDecimal), locale) || "",
      });
      setEnergySalesSchemeInfo({
        optionsEnergySalesScheme: info?.agreementType || null,
        agreementPPAElectricitySoldPercentage:
          info?.agreementPPAElectricitySoldPercentage || null,
        agreementMarketElectricitySoldPercentage:
          info?.agreementMarketElectricitySoldPercentage || null,
        agreementPPAPrice: info?.agreementPPAPrice || null,
        agreementPPATerm: info?.agreementPPATerm || null,
        agreementPPASaleVolumeCommitment:
          info?.agreementPPASaleVolumeCommitment || null,
        agreementSalesVolume: info?.agreementSalesVolume || null,
      });
      setPromoterInfo((prevState) => ({
        ...prevState,
        companyName: info?.sponsor?.sponsorName || "",
        description: info?.sponsor?.sponsorDescription || "",
      }));
      setPriceInfo({
        consideracionesSobrePrecio: info?.consideracionesSobrePrecio || "",
        precioOrientativoMW: info.precioOrientativoMW || "",
      });
    }
  }, [isSuccessDataProject, dataProject, langDecimal, locale]);

  const { data: dataPromoterDocument, isSuccess: isSuccessPromoterDocument } =
    useGetDocuments(projectId, 2, 1);
  useEffect(() => {
    if (isSuccessPromoterDocument) {
      setPromoterInfo((prevState) => ({
        ...prevState,
        document: {
          ...prevState.document,
          value: dataPromoterDocument?.data?.data[0],
        },
      }));
    }
  }, [dataPromoterDocument, isSuccessPromoterDocument]);

  useEffect(() => {
    if (isSuccessPlants && dataPlants?.data.length > 0) {
      setPlantsList(
        dataPlants.data.filter((objeto) => !objeto.hasOwnProperty("removedBy"))
      );
    }
  }, [isSuccessPlants, dataPlants]);

  const percentageAdvance = () => {
    const totalOptions = menuOptionsFiltered.length;
    const progress = Math.round(
      ((selectedMenu.position + 1) / totalOptions) * 100
    );
    return progress;
  };

  const handleChange = (event, form, setForm) => {
    const { value, id } = event.target;
    const newFormInfo = { ...form };
    if (
      id === "experiencesYears" ||
      id === "completedProjects" ||
      id === "totalMW"
    ) {
      newFormInfo.company[id] = value;
    } else {
      newFormInfo[id] = value;
    }
    setForm(newFormInfo);
  };

  const handleChangeNumber = (event, form, setForm) => {
    const { value, id } = event.target;
    const newFormInfo = { ...form };

    newFormInfo[id] = value.replace(/[^0-9.]/g, "");
    setForm(newFormInfo);
  };

  const handleChangeFormatOpex = (event, form, setForm) => {
    const { id, value } = event.target;
    const newFormInfo = { ...form };

    newFormInfo[id] = unformatNumberOpex(value, locale).replace(/[^\d.,]/g, "");
    setForm(newFormInfo);
    setForceUpdate(!forceUpdate);
  };

  const handleChangeFormat = (event, form, setForm) => {
    const { id, value } = event.target;
    const newFormInfo = { ...form };

    newFormInfo[id] = unformatNumber(value, locale).replace(/[^\d.,]/g, "");
    setForm(newFormInfo);
    setForceUpdate(!forceUpdate);
  };

  const handleChangePercent = (event, form, setForm) => {
    const { id, value } = event.target;
    const newFormInfo = { ...form };

    let numericValue = value.replace(/\D/g, "");
    numericValue = Math.max(0, Math.min(100, Number(numericValue)));

    if (id === "agreementMarketElectricitySoldPercentage") {
      newFormInfo["agreementPPAElectricitySoldPercentage"] = (
        100 - numericValue
      ).toString();
    } else if (id === "agreementPPAElectricitySoldPercentage") {
      newFormInfo["agreementMarketElectricitySoldPercentage"] = (
        100 - numericValue
      ).toString();
    }

    newFormInfo[id] = numericValue.toString();
    setForm(newFormInfo);
    setForceUpdate(!forceUpdate);
  };

  const handleRadio = (event, form, setForm) => {
    const { value, name } = event.target;
    const newFormInfo = { ...form };
    if (name === "agreementPPASaleVolumeCommitment" && !value) {
      newFormInfo["agreementSalesVolume"] = null;
    }
    newFormInfo[name] = value;
    setForm(newFormInfo);
  };

  const handleSelectTag = (value, item, form, setForm) => {
    let newCountries = [...form.company.countries];
    newCountries = [...newCountries, item.label];
    setForm({ ...form, company: { ...form.company, countries: newCountries } });
    setForceUpdate(!forceUpdate);
  };

  const handleSelect = (value, item, id, form, setForm) => {
    const newItemForm = { ...form };
    if (id === "optionsEnergySalesScheme") {
      switch (value) {
        case 1:
          newItemForm["agreementPPAElectricitySoldPercentage"] = "100";
          newItemForm["agreementMarketElectricitySoldPercentage"] = "0";
          break;
        default:
          newItemForm["agreementPPAElectricitySoldPercentage"] = null;
          newItemForm["agreementMarketElectricitySoldPercentage"] = null;
          break;
      }
    }
    newItemForm[id] = item.value;
    setForm(newItemForm);
  };

  const handleGoBack = () => {
    const newTitle = menuOptionsFiltered[selectedMenu.position - 1].title;
    const newPosition = selectedMenu.position - 1;
    setSelectedMenu({ position: newPosition, title: newTitle });
  };

  const handlePhaseTwo = () => {
    goToPhaseTwo.reset();
    goToPhaseTwo.mutate(
      {
        projectId: projectId,
        isActive: true,
      },
      {
        onSuccess: () => {
          navigate("/projects");
        },
        onError: (err) => {
          toast.error(
            t(
              `common:${
                err.response.data.result.code.message ||
                err.response.data.result.code
              }`
            )
          );
        },
      }
    );
  };

  const handleCloseModal = () => {
    setShowModal(false);
    if (role[0] === "Manager") {
      handlePhaseTwo();
    } else {
      navigate("/projects");
    }
  };

  const financingTypeOrder = () => {
    switch (financingType) {
      case "construction":
        return 1;
      case "financed":
        return 2;
      case "RtBCOD":
        return 3;
      case "operation":
        return 4;
    }
  };

  const stringToNumber = (str) => {
    if (str === 0 || !str) {
      return;
    }

    str = String(str);
    let normalizedStr = str?.replace(',', '.');
    return parseFloat(normalizedStr);
  };

  const handleSave = (isDraft, isContinue, source) => {
    toast.remove();
    const formData = {
      id: projectId,
      isDraft: !isDraftDB ? isDraftDB : isDraft,
      isProspect: false,
      projectType: {
        instance: {
          name: objective,
          order: objective === "financing" ? 1 : 2,
        },
        kind: {
          name: financingType,
          order: financingTypeOrder(),
        },
        type: {
          name: projectType,
          order: projectType === "solar" ? 1 : 2,
        },
      },
      teaserName: basicInfo?.teaserName,
      name: basicInfo?.projectName,
      socialStatus: basicInfo?.societyStatus,
      projectTotalMW: Number(basicInfo?.numberMG),
      acceptBuyOffers: basicInfo?.purchase,
      dueDiligence: basicInfo?.dueDiligences,
      projectCostsOption:
        capexInfo?.totalProjectCost > 0 ? "sponsorTotals" : "sponsorDetails",
      capex: Number(capexInfo?.totalProjectCost) || 0,
      substationCosts: Number(capexInfo?.substationReinforcementCost) || 0,
      solarPanelsCosts: Number(capexInfo.solarPanelsCosts),
      transmissionLineCosts: Number(capexInfo?.transmissionLineCost) || 0,
      turbinesCosts: Number(capexInfo?.totalTurbinesCost) || 0,
      transformersCosts: Number(capexInfo?.totalTransformersCost) || 0,
      invertersCosts: Number(capexInfo?.invertersCosts),
      otherCosts: Number(capexInfo?.additionalInvestmentCosts) || 0,
      opexOption: "userInput",
      omPerMW: opexInfo.costeRefuerzos === "" ? 0 : stringToNumber(opexInfo.costeRefuerzos),
      assetManagmentPerMW: opexInfo.costeLinea === "" ? 0 : stringToNumber(opexInfo.costeLinea),
      insurancesPerMW: opexInfo.costeTotal === "" ? 0 : stringToNumber(opexInfo.costeTotal),
      networkAccessCostsPerMW: opexInfo.otrosCostesNetwork === "" ? 0 : stringToNumber(opexInfo.otrosCostesNetwork),
      localTaxesPerMW: opexInfo.otrosCostesTaxes === "" ? 0 : stringToNumber(opexInfo.otrosCostesTaxes),
      otherCostsPerMW: opexInfo.costeTotaltubinas === "" ? 0 : stringToNumber(opexInfo.costeTotaltubinas),
      marketAgencyCostsPerMW: opexInfo.otrosCostesMarket === "" ? 0 : stringToNumber(opexInfo.otrosCostesMarket),
      agreementType: energySalesSchemeInfo?.optionsEnergySalesScheme,
      agreementPPAElectricitySoldPercentage: Number(
        energySalesSchemeInfo?.agreementPPAElectricitySoldPercentage
      ),
      agreementMarketElectricitySoldPercentage: Number(
        energySalesSchemeInfo?.agreementMarketElectricitySoldPercentage
      ),
      agreementPPAPrice: Number(energySalesSchemeInfo?.agreementPPAPrice),
      agreementPPATerm: Number(energySalesSchemeInfo?.agreementPPATerm),
      agreementPPASaleVolumeCommitment:
        energySalesSchemeInfo?.agreementPPASaleVolumeCommitment || false,
      /* agreementSalesVolume: Number(
        energySalesSchemeInfo?.agreementPPASaleVolumeCommitment
      ), TODO add saleVolume*/
      sponsor: {
        sponsorDescription: promoterInfo?.description,
        sponsorName: promoterInfo?.companyName,
      },
      company: {
        _id: promoterInfo?.company._id,
        name: promoterInfo?.company.name,
        domain: promoterInfo?.company.domain,
        experiencesYears: promoterInfo?.company.experiencesYears,
        completedProjects: promoterInfo?.company.completedProjects,
        totalMW: promoterInfo?.company.totalMW,
        countries: promoterInfo.company.countries.map((ele) => {
          const country = countriesOptions.find((elem) => elem.label === ele);
          return country ? country.value : null;
        }),
      },
      plants: plantsList,
      precioOrientativoMW: priceInfo.precioOrientativoMW,
      consideracionesSobrePrecio: priceInfo.consideracionesSobrePrecio,
    };
    const validation = validateNewProject.validate(formData, {
      abortEarly: false,
    });
    if (!isDraftDB && validation.error) {
      toast.error(t("common:emptyFields"));
    } else {
      updateProject.reset();
      updateProject.mutate(formData, {
        onSuccess: () => {
          if (!isDraft) {
            setShowModal(true);
          } else {
            if (source !== "menu") {
              if (isContinue) {
                const newTitle =
                  menuOptionsFiltered[selectedMenu.position + 1].title;
                const newPosition = selectedMenu.position + 1;
                setSelectedMenu({ position: newPosition, title: newTitle });
              } else {
                navigate("/projects");
              }
            }
            {
              source !== "menu" && toast.success(t("common:saveChanges"));
            }
          }
        },
        onError: (err) => {
          toast.error(
            t(
              `common:${
                err.response.data.result.code.message ||
                err.response.data.result.code
              }`
            )
          );
        },
      });
    }
  };

  const handleRequestInfo = () => {
    requestInfo.reset();
    requestInfo.mutate(
      { projectId: projectId },
      {
        onSuccess: () => {
          toast.success(t("newProject:requestSuccess"));
          queryClient.removeQueries(["getProjectInfo", projectId]);
        },
        onError: (err) => {
          toast.error(
            t(
              `common:${
                err.response.data.result.code.message ||
                err.response.data.result.code
              }`
            )
          );
        },
      }
    );
  };

  const handleInformation = () => {
    navigate(
      `/projects/information-declaration?projectName=${
        basicInfo?.projectName
      }&projectDate=${dateFormat(createAt)}&projectId=${projectId}`
    );
  };

  const informationDeclaration =
    (role[0] === "Developer" && status === 2) ||
    (role[0] === "Manager" && status === 8);

  return (
    <ModuleContainer>
      <Container m="-35px 69px 46px 0px">
        <ModalSuccess
          showModal={showModal}
          handleCloseModal={handleCloseModal}
          page="newProject"
        />
        <Row
          width="100%"
          height="28px"
          m="0px 0 24px 0"
          justify="space-between"
          align="center"
        >
          <Div align="center" gap="8px">
            <Text
              weight={theme.fonts.weight.medium}
              size={theme.fonts.size.h5i}
              color={theme.colors.blue}
            >
              {`${t(`newProject:${objective}`)} ${t(
                `newProject:${financingType}`
              )} (${t(`newProject:${projectType}`)})`}
            </Text>
            <Link
              weight={theme.fonts.weight.medium}
              size={theme.fonts.size.default}
              color={theme.colors.green}
            >
              {t("newProject:edit")}
            </Link>
          </Div>
          {role[0] === "Manager" && !additionalInformationRequested && (
            <Div>
              <Button
                width={"260px"}
                onClick={handleRequestInfo}
                loading={requestInfo.isLoading}
              >
                {t("newProject:requestInformation")}
              </Button>
            </Div>
          )}
        </Row>
        <Card
          width="100%"
          height="160px"
          background={theme.colors.blue}
          margin="0 0 32px 0"
          padding="22px 24px 24px 29px"
        >
          <Text
            weight={theme.fonts.weight.medium}
            size={theme.fonts.size.h6}
            color={theme.colors.white}
            mb="16px"
          >
            {t("newProject:caption")}
          </Text>
          <Text color={theme.colors.white} mb="10px">
            {t("newProject:oneCaption")}
          </Text>
          <Text color={theme.colors.white} mb="10px">
            {t("newProject:twoCaption")}
          </Text>
          <Text color={theme.colors.white}>{t("newProject:threeCaption")}</Text>
        </Card>
        <Row width="100%" gap="16px">
          <Div direction="column">
            <Card
              padding="12px 0px 9px 0px"
              style={{ height: "400px", marginBottom: "30px" }}
            >
              {menuOptionsFiltered.map((option, index) => (
                <Div
                  key={index}
                  minheight="53px"
                  p="12px 30px 15px 29px"
                  justify="center"
                  background={
                    selectedMenu.position === index
                      ? theme.colors.green100
                      : theme.colors.white
                  }
                  direction="column"
                  onClick={() => {
                    setSelectedMenu({ position: index, title: option.title });
                    handleSave(true, true, "menu");
                  }}
                  style={{ cursor: "pointer" }}
                >
                  <Text
                    width="164px"
                    weight={theme.fonts.weight.regular}
                    size={theme.fonts.size.default}
                    color={
                      selectedMenu.position === index
                        ? theme.colors.green
                        : theme.colors.gray200
                    }
                    minheight="53px"
                    align="left"
                    mb="9px"
                  >
                    {t(`newProject:${option.title}`)}
                  </Text>
                  {selectedMenu.position === index && (
                    <Div
                      background={theme.colors.green}
                      height="2px"
                      width="65px"
                    />
                  )}
                </Div>
              ))}
            </Card>
            {informationDeclaration && (
              <Link
                size={theme.fonts.size.sm}
                width="100%"
                style={{ justifyContent: "center" }}
                onClick={handleInformation}
              >
                {t("newProject:informationDeclaration")}
              </Link>
            )}
          </Div>
          <Col width="100%">
            <Progress percent={percentageAdvance()} showInfo={false} />
            <Card
              width="100%"
              margin="26px 0 40px 0px"
              padding="28px 29px 26px 29px"
              align="left"
            >
              {selectedMenu.title === "basicData" && (
                <BasicData
                  basicInfo={basicInfo}
                  setBasicInfo={setBasicInfo}
                  handleChange={handleChange}
                  handleRadio={handleRadio}
                  handleSelect={handleSelect}
                  handleChangeNumber={handleChangeNumber}
                />
              )}
              {selectedMenu.title === "CAPEX" && (
                <Capex
                  capexInfo={capexInfo}
                  setCapexInfo={setCapexInfo}
                  projectType={projectType}
                  handleChangeFormat={handleChangeFormat}
                />
              )}
              {selectedMenu.title === "OPEX" && (
                <Opex
                  opexInfo={opexInfo}
                  setOpexInfo={setOpexInfo}
                  handleChangeFormat={handleChangeFormatOpex}
                />
              )}
              {selectedMenu.title === "salesScheme" && (
                <EnergySalesScheme
                  energySalesSchemeInfo={energySalesSchemeInfo}
                  setEnergySalesSchemeInfo={setEnergySalesSchemeInfo}
                  handleSelect={handleSelect}
                  handleChange={handleChange}
                  handleRadio={handleRadio}
                  handleChangeNumber={handleChangeNumber}
                  handleChangeFormat={handleChangeFormat}
                  handleChangePercent={handleChangePercent}
                />
              )}
              {selectedMenu.title === "price" && (
                <Price
                  priceInfo={priceInfo}
                  setPriceInfo={setPriceInfo}
                  handleChange={handleChange}
                  handleChangeFormat={handleChangeFormat}
                />
              )}
              {selectedMenu.title === "promoterInfo" && (
                <PromoterInfo
                  promoterInfo={promoterInfo}
                  setPromoterInfo={setPromoterInfo}
                  handleChange={handleChange}
                  handleSelect={handleSelectTag}
                  countriesOptions={countriesOptions}
                  handleChangeNumber={handleChangeNumber}
                />
              )}
              {selectedMenu.title === "plants" && (
                <Plants
                  objective={objective}
                  projectType={projectType}
                  financingType={financingType}
                  projectId={projectId}
                  plantsList={plantsList}
                  isNew={false}
                  projectName={basicInfo.projectName}
                  additionalInformationRequested={
                    additionalInformationRequested
                  }
                />
              )}
            </Card>
            <Row justify="space-between">
              <Row gap="16px">
                {selectedMenu.position > 0 && (
                  <Button
                    width="118px"
                    variant={"outlined"}
                    onClick={handleGoBack}
                  >
                    {t("newProject:goBack")}
                  </Button>
                )}
                {selectedMenu.position !== menuOptionsFiltered.length - 1 ? (
                  <Button
                    onClick={() => handleSave(true, false)}
                    loading={updateProject.isLoading}
                  >
                    {t("newProject:saveEdit")}
                  </Button>
                ) : (
                  <Button
                    width={"242px"}
                    onClick={() => handleSave(false, false)}
                    loading={updateProject.isLoading}
                  >
                    {role[0] === "Manager"
                      ? t("newProject:goToPhaseII")
                      : t("newProject:sendRequest")}
                  </Button>
                )}
              </Row>
              {selectedMenu.position < menuOptionsFiltered.length - 1 && (
                <Button
                  width="118px"
                  variant={"outlined"}
                  onClick={() => handleSave(true, true)}
                  loading={updateProject.isLoading}
                >
                  {t("newProject:continue")}
                </Button>
              )}
            </Row>
          </Col>
        </Row>
      </Container>
    </ModuleContainer>
  );
};
