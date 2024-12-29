/* eslint-disable no-prototype-builtins */
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
import { ModuleContainer } from "../../styles/Common";
import { Row, Col, Text, Div, Container } from "../../styles/Common";
import { Card } from "../../components/Card";
import { theme } from "../../styles/theme";
import BasicData from "./components/basicData";
import { Button } from "../../components/Button";
import { Link } from "../../components/Link";
import { useTranslation } from "react-i18next";
import useCreateProject from "./hooks/useCreateProject";
import useUpdateProject from "../../core/hooks/useUpdateProject";
import useGetUserInfo from "../MyAccount/hooks/useGetUser";
import { getUserInfo, unformatNumber, unformatNumberOpex } from "../../utilities/helpers";
import useGetCountries from "../../core/hooks/useGetCountries";
import ModalSuccess from "./components/ModalSuccess";
import { validateNewProject } from "../../utilities/validations";

export const NewProject = () => {
  const { t, i18n } = useTranslation(["common", "newProject"]);
  const locale = i18n.language;
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { search } = useLocation();
  const objective = new URLSearchParams(search).get("objective");
  const projectType = new URLSearchParams(search).get("projectType");
  const financingType = new URLSearchParams(search).get("financingType");
  const selected = new URLSearchParams(search).get("selected");
  const projectIdUrl = new URLSearchParams(search).get("projectId");
  const saveDraft = useCreateProject();
  const updateProject = useUpdateProject();

  const { projectInCreation, ownerInfo } = useSelector(
    (state) => state.projects
  );

  const userId = getUserInfo()?.id;
  const userInfo = useGetUserInfo(userId);
  const { isSuccess, data: dataUserInfo } = userInfo;

  const [projectId, setProjectId] = useState(projectIdUrl);

  const { data: dataPlants, isSuccess: isSuccessPlants } =
    useGetPlantsList(projectId);
  const [plantsList, setPlantsList] = useState([]);

  const [selectedMenu, setSelectedMenu] = useState({
    position: 0,
    title: "basicData",
  });
  const [showModal, setShowModal] = useState(false);
  const [forceUpdate, setForceUpdate] = useState(false);

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
    purchase: null,
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
    solarPanelsCosts: 0,
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
    if (projectInCreation) {
      const info = projectInCreation;

      setProjectId(info?.id || null);
      setBasicInfo({
        teaserName: info.teaserName || null,
        projectName: info?.name || null,
        purchase: info?.acceptBuyOffers || null,
        dueDiligences: info?.dueDiligence,
        societyStatus: info?.socialStatus || null,
        numberMG: info?.projectTotalMW || null,
      });
      setCapexInfo({
        totalProjectCost: info?.capex || 0,
        substationReinforcementCost: info?.substationCosts || 0,
        transmissionLineCost: info?.transmissionLineCosts || 0,
        solarPanelsCosts: info?.solarPanelsCosts || 0,
        totalTransformersCost: info?.transformersCosts || 0,
        totalTurbinesCost: info?.turbinesCosts || 0,
        invertersCosts: info?.invertersCosts || 0,
        additionalInvestmentCosts: info?.otherCosts || 0,
      });
      setOpexInfo({
        costeRefuerzos: info?.omPerMW || "",
        costeLinea: info?.assetManagmentPerMW || "",
        costeTotal: info?.insurancesPerMW || "",
        costeTotaltubinas: info?.otherCostsPerMW || "",
        otrosCostesMarket: info?.marketAgencyCostsPerMW || "",
        otrosCostesNetwork: info?.networkAccessCostsPerMW || "",
        otrosCostesTaxes: info?.localTaxesPerMW || "",
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
        companyName: info?.sponsor?.sponsorName || null,
        description: info?.sponsor?.sponsorDescription || null,
      }));
      setPriceInfo({
        consideracionesSobrePrecio: info?.consideracionesSobrePrecio || "",
        precioOrientativoMW: info.precioOrientativoMW || "",
      });
    }
  }, [projectInCreation]);

  useEffect(() => {
    if (isSuccessPlants && dataPlants?.data.length > 0) {
      setPlantsList(
        dataPlants.data.filter((objeto) => !objeto.hasOwnProperty("removedBy"))
      );
    }
  }, [isSuccessPlants, dataPlants]);

  useEffect(() => {
    if (selected) {
      setSelectedMenu({
        position: 5,
        title: selected,
      });
    }
  }, [selected]);

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

  const handleCloseModal = () => {
    setShowModal(false);
    dispatch(setProjectInCreationInfo({}));
    navigate("/projects");
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
      isDraft: isDraft,
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
      teaserName: basicInfo.teaserName,
      name: basicInfo.projectName,
      socialStatus: basicInfo.societyStatus,
      projectTotalMW: Number(basicInfo.numberMG),
      acceptBuyOffers: basicInfo.purchase,
      dueDiligence: basicInfo.dueDiligences,
      projectCostsOption:
        capexInfo.totalProjectCost > 0 ? "sponsorTotals" : "sponsorDetails",
      capex: Number(capexInfo.totalProjectCost),
      substationCosts: Number(capexInfo.substationReinforcementCost),
      solarPanelsCosts: Number(capexInfo.solarPanelsCosts),
      transmissionLineCosts: Number(capexInfo.transmissionLineCost),
      turbinesCosts: Number(capexInfo.totalTurbinesCost),
      transformersCosts: Number(capexInfo.totalTransformersCost),
      invertersCosts: Number(capexInfo.invertersCosts),
      otherCosts: Number(capexInfo.additionalInvestmentCosts),
      opexOption: "userInput",
      omPerMW: opexInfo.costeRefuerzos === "" ? 0 : stringToNumber(opexInfo.costeRefuerzos),
      assetManagmentPerMW: opexInfo.costeLinea === "" ? 0 : stringToNumber(opexInfo.costeLinea),
      insurancesPerMW: opexInfo.costeTotal === "" ? 0 : stringToNumber(opexInfo.costeTotal),
      networkAccessCostsPerMW: opexInfo.otrosCostesNetwork === "" ? 0 : stringToNumber(opexInfo.otrosCostesNetwork),
      localTaxesPerMW: opexInfo.otrosCostesTaxes === "" ? 0 : stringToNumber(opexInfo.otrosCostesTaxes),
      otherCostsPerMW: opexInfo.costeTotaltubinas === "" ? 0 : stringToNumber(opexInfo.costeTotaltubinas),
      marketAgencyCostsPerMW: opexInfo.otrosCostesMarket === "" ? 0 : stringToNumber(opexInfo.otrosCostesMarket),
      agreementType: energySalesSchemeInfo.optionsEnergySalesScheme,
      agreementPPAElectricitySoldPercentage: Number(
        energySalesSchemeInfo.agreementPPAElectricitySoldPercentage
      ),
      agreementMarketElectricitySoldPercentage: Number(
        energySalesSchemeInfo.agreementMarketElectricitySoldPercentage
      ),
      agreementPPAPrice: Number(energySalesSchemeInfo.agreementPPAPrice),
      agreementPPATerm: Number(energySalesSchemeInfo.agreementPPATerm),
      agreementPPASaleVolumeCommitment:
        energySalesSchemeInfo.agreementPPASaleVolumeCommitment || false,
      /* agreementSalesVolume: Number(
        energySalesSchemeInfo?.agreementPPASaleVolumeCommitment
      ), TODO add saleVolume*/
      sponsor: {
        sponsorDescription: promoterInfo.description,
        sponsorName: promoterInfo.companyName,
      },
      company: {
        _id: promoterInfo.company._id,
        name: promoterInfo.company.name,
        domain: promoterInfo.company.domain,
        experiencesYears: promoterInfo.company.experiencesYears,
        completedProjects: promoterInfo.company.completedProjects,
        totalMW: promoterInfo.company.totalMW,
        countries: promoterInfo?.company?.countries
          ? promoterInfo?.company?.countries?.map((ele) => {
              const country = countriesOptions.find(
                (elem) => elem.label === ele
              );
              return country ? country.value : null;
            })
          : [],
      },
      plants: plantsList,
      owner: ownerInfo.owner,
      ownerId: ownerInfo.ownerId,
      precioOrientativoMW: priceInfo.precioOrientativoMW,
      consideracionesSobrePrecio: priceInfo.consideracionesSobrePrecio,
    };

    const validation = validateNewProject.validate(formData, {
      abortEarly: false,
    });

    if (!isDraft && validation.error) {
      toast.error(t("common:emptyFields"));
    } else {
      const action = projectId !== null ? updateProject : saveDraft;
      action.reset();
      action.mutate(formData, {
        onSuccess: (res) => {
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
                dispatch(setProjectInCreationInfo({}));
                dispatch(
                  setOwnerInfo({
                    owner: "",
                    ownerId: "",
                  })
                );
                navigate("/projects");
              }
            }
            const newProjectId = res.data.result.data.createProjectDto.id;
            const updatedFormData = { ...formData, id: newProjectId };
            setProjectId(newProjectId);
            dispatch(setProjectInCreationInfo(updatedFormData));
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
          gap="8px"
          align="center"
        >
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
          <Card padding="12px 0px 9px 0px" style={{ height: "400px" }}>
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
                style={{
                  cursor: "pointer",
                }}
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
                  handleRadio={handleRadio}
                  handleChangeNumber={handleChangeNumber}
                  handleChangeFormat={handleChangeFormat}
                  handleChangePercent={handleChangePercent}
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
              {selectedMenu.title === "price" && (
                <Price
                  priceInfo={priceInfo}
                  setPriceInfo={setPriceInfo}
                  handleChange={handleChange}
                  handleChangeFormat={handleChangeFormat}
                />
              )}
              {selectedMenu.title === "plants" && (
                <Plants
                  objective={objective}
                  projectType={projectType}
                  financingType={financingType}
                  projectId={projectId}
                  plantsList={plantsList}
                  isNew={true}
                  projectName={basicInfo.projectName}
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
                    loading={saveDraft.isLoading || updateProject.isLoading}
                  >
                    {t("newProject:save")}
                  </Button>
                ) : (
                  <Button
                    width={"242px"}
                    onClick={() => handleSave(false, false)}
                    loading={saveDraft.isLoading || updateProject.isLoading}
                  >
                    {t("newProject:studyRequest")}
                  </Button>
                )}
              </Row>
              {selectedMenu.position < menuOptionsFiltered.length - 1 && (
                <Button
                  width="118px"
                  variant={"outlined"}
                  onClick={() => handleSave(true, true)}
                  loading={saveDraft.isLoading || updateProject.isLoading}
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
