import React, { useEffect, useState } from "react";
import _ from "lodash";
import { useLocation } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { ModuleContainer } from "../../styles/Common";
import { Row, Col, Text, Div } from "../../styles/Common";
import { Card } from "../../components/Card";
import { theme } from "../../styles/theme";
import { Button } from "../../components/Button";
import { Link } from "../../components/Link";
import { useTranslation } from "react-i18next";
import {
  ArrowDownIcon,
  EyeIcon,
  FinancingIcon,
  BulbIcon,
  DownloadIcon,
  SunIcon,
} from "../../assets/icons";
import useGetProjectInfo from "../../core/hooks/useGetProject";
import {
  getLabelFromValue,
  socialStatusOptions,
  optionsEnergySalesScheme,
  formatThousandsValue,
  dateFormat,
  landsOptions,
} from "../../utilities/helpers";

export const ProjectDetail = () => {
  const { t } = useTranslation(["projectDetail"]);
  const { search } = useLocation();
  const navigate = useNavigate();

  const projectId = new URLSearchParams(search).get("projectId");
  const [isOpenCapex, setIsOpenCapexl] = useState(false);
  const [isOpenOpex, setIsOpenOpex] = useState(false);

  const projectDataInfo = useGetProjectInfo(projectId);
  const { data: dataProject, isSuccess: isSuccessDataProject } =
    projectDataInfo;
  const [projectInfo, setProjectInfo] = useState({});
  useEffect(() => {
    if (isSuccessDataProject && dataProject) {
      setProjectInfo(dataProject?.data?.result?.data);
    }
  }, [isSuccessDataProject, dataProject]);

  const sumCost = () => {
    let total = 0;
    if (projectInfo?.projectCostsOption === "sponsorTotals") {
      total = projectInfo?.capex;
    } else {
      total =
        projectInfo?.substationCosts +
        projectInfo?.transmissionLineCosts +
        projectInfo?.turbinesCosts +
        projectInfo?.transformersCosts +
        projectInfo?.otherCosts +
        projectInfo?.solarPanelsCosts;
    }

    return total || 0;
  };
  const capexProperties = [
    "substationCosts",
    "transmissionLineCosts",
    "turbinesCosts",
    "transformersCosts",
    "otherCosts",
    "solarPanelsCosts",
  ];
  const costObjects = capexProperties.map((property) => ({
    name: property,
    value: projectInfo[property],
  }));

  const opexProperties = [
    "omPerMW",
    "assetManagmentPerMW",
    "insurancesPerMW",
    "networkAccessCostsPerMW",
    "localTaxesPerMW",
    "marketAgencyCostsPerMW",
    "otherCostsPerMW",
  ];
  const opexObjects = opexProperties.map((property) => ({
    name: property,
    value: projectInfo[property],
  }));

  return (
    <ModuleContainer direction="column" padding="23px 69px 0 32px">
      <Row justify="space-between" width="100%" m="0 0 32px 0">
        <Col>
          <Text
            size={theme.fonts.size.h5}
            weight={theme.fonts.weight.medium}
            color={theme.colors.blue}
          >
            {projectInfo?.name}
          </Text>
          <Row align="center">
            <SunIcon fill={theme.colors.green} width="32px" height="32px" />
            <Text
              size={theme.fonts.size.sm}
              weight={theme.fonts.weight.medium}
              color={theme.colors.green}
            >
              {`${t(projectInfo?.projectType?.type?.name)} - ${t(
                projectInfo?.projectType?.instance?.name
              )}`}
            </Text>
          </Row>
        </Col>
        <Row align="center" gap="24px">
          <Link gap="4px">
            <DownloadIcon
              fill={theme.colors.green}
              width="24px"
              height="24px"
            />
            <Text
              size={theme.fonts.size.sm}
              weight={theme.fonts.weight.medium}
              color={theme.colors.green}
            >
              Teaser
            </Text>
          </Link>
          <Link gap="4px">
            <DownloadIcon
              fill={theme.colors.green}
              width="24px"
              height="24px"
            />
            <Text
              size={theme.fonts.size.sm}
              weight={theme.fonts.weight.medium}
              color={theme.colors.green}
            >
              Termsheet
            </Text>
          </Link>
          <Button width="296px" variant={"outlined"}>
            <Row justify="center" align="center" gap="11px">
              <DownloadIcon
                fill={theme.colors.green}
                width="32px"
                height="32px"
              />
              <Text
                size={theme.fonts.size.sm}
                weight={theme.fonts.weight.medium}
                color={theme.colors.green}
              >
                {" "}
                {t("downloadModel")}{" "}
              </Text>
            </Row>
          </Button>
        </Row>
      </Row>
      <Row>
        <Col>
          <Card
            width="100%"
            padding="31.5px 42px 42px 35px"
            margin="0 0 60px 0"
            style={{ minWidth: "697px" }}
          >
            <Row justify="space-between" m="0 0 8px 0">
              <Text
                size={theme.fonts.size.sm}
                weight={theme.fonts.weight.regular}
                color={theme.colors.green}
              >
                {t("ownerProject")}
              </Text>
              <Text
                size={theme.fonts.size.sm}
                weight={theme.fonts.weight.semibold}
                color={theme.colors.gray300}
              >
                {t("date")}
              </Text>
            </Row>
            <Row justify="space-between" m="0 0 32.5px 0">
              <Text
                size={theme.fonts.size.h6}
                weight={theme.fonts.weight.medium}
                color={theme.colors.blue}
              >
                {projectInfo?.sponsor?.sponsorName || "--"}
              </Text>
              <Row>
                <Text
                  size={theme.fonts.size.sm}
                  weight={theme.fonts.weight.medium}
                  color={theme.colors.gray300}
                >
                  {projectInfo.plants &&
                    projectInfo.plants.length > 0 &&
                    projectInfo.plants.some(
                      (plant) => plant && plant.fechaEstimadaRtBPlanta
                    ) &&
                    dateFormat(
                      _.minBy(
                        projectInfo?.plants.filter(
                          (plant) => plant && plant.fechaEstimadaRtBPlanta
                        ),
                        "fechaEstimadaRtBPlanta"
                      ).fechaEstimadaRtBPlanta
                    )}
                </Text>
              </Row>
            </Row>
            <Text
              size={theme.fonts.size.sm}
              weight={theme.fonts.weight.regular}
              color={theme.colors.green}
              mb="8px"
            >
              {t("statusPromoter")}
            </Text>
            <Text
              size={theme.fonts.size.default}
              weight={theme.fonts.weight.regular}
              color={theme.colors.gray500}
              mb="33px"
            >
              {getLabelFromValue(
                projectInfo?.socialStatus,
                socialStatusOptions
              ) || "--"}
            </Text>
            <Text
              size={theme.fonts.size.sm}
              weight={theme.fonts.weight.regular}
              color={theme.colors.green}
              mb="8px"
            >
              {t("description")}
            </Text>
            <Text
              size={theme.fonts.size.default}
              weight={theme.fonts.weight.regular}
              color={theme.colors.gray500}
              mb="16px"
            >
              {projectInfo?.sponsor?.sponsorDescription || "--"}
            </Text>

            {projectInfo?.document && (
              <Div
                background={theme.colors.green100}
                radius="7px"
                justify="left"
                align="center"
                p="10px 18px 10px 12px"
                border="1px solid"
                borderColor={theme.colors.gray100}
                gap="38px"
                width="258px"
              >
                <Col align="left">
                  <Text mb="7px" color={theme.colors.gray300}>
                    Nombre de archivo
                  </Text>
                  <Text size={theme.fonts.size.sm} color={theme.colors.green}>
                    14.3 Mb
                  </Text>
                </Col>
                <Row gap="13px">
                  <Link>
                    <EyeIcon fill={theme.colors.gray200} />
                  </Link>
                </Row>
              </Div>
            )}
          </Card>
          <Row>
            <Text
              size={theme.fonts.size.h6}
              weight={theme.fonts.weight.medium}
              color={theme.colors.blue}
              mb="16px"
            >
              {t("plants")}
            </Text>
          </Row>
          {projectInfo?.plants &&
            projectInfo?.plants.map((plant, index) => (
              <Card
                key={index}
                width="100%"
                padding="23px 27px 20px 24px"
                margin="0 0 44px 0"
              >
                <Row justify="space-between">
                  <Text
                    size={theme.fonts.size.h6}
                    weight={theme.fonts.weight.medium}
                    color={theme.colors.blue}
                    mb="13.1px"
                  >
                    {plant?.name || "--"}
                  </Text>
                  <Text
                    size={theme.fonts.size.sm}
                    weight={theme.fonts.weight.regular}
                    color={theme.colors.gray300}
                  >
                    {`${t("upDate")} ${dateFormat(
                      plant?.fechaEstimadaRtBPlanta
                    )}`}
                  </Text>
                </Row>
                <Div
                  width="100%"
                  height="1px"
                  background={theme.colors.gray100}
                  m="0 0 16.9px 0px"
                />
                <Row width="100%" justify="space-between">
                  <Col m="0 16px 0 0">
                    <Text
                      size={theme.fonts.size.sm}
                      weight={theme.fonts.weight.regular}
                      color={theme.colors.gray300}
                    >
                      {t("location")}
                    </Text>
                    <Text
                      size={theme.fonts.size.sm}
                      weight={theme.fonts.weight.regular}
                      color={theme.colors.gray300}
                    >
                      {`${plant?.location}, ${plant?.municipio}`}
                    </Text>
                  </Col>
                  <Col m="0 16px 0 0">
                    <Text
                      size={theme.fonts.size.sm}
                      weight={theme.fonts.weight.regular}
                      color={theme.colors.gray300}
                    >
                      {t("peakPower")}
                    </Text>
                    <Text
                      size={theme.fonts.size.sm}
                      weight={theme.fonts.weight.regular}
                      color={theme.colors.gray300}
                    >
                      {`${plant?.potenciaPico} MWp`}
                    </Text>
                  </Col>
                  <Col>
                    <Text
                      size={theme.fonts.size.sm}
                      weight={theme.fonts.weight.regular}
                      color={theme.colors.gray300}
                    >
                      {t("land")}
                    </Text>
                    <Text
                      size={theme.fonts.size.sm}
                      weight={theme.fonts.weight.regular}
                      color={theme.colors.gray300}
                    >
                      {getLabelFromValue(
                        plant?.estadoTerrenoPlanta,
                        landsOptions
                      )}
                    </Text>
                  </Col>
                </Row>
              </Card>
            ))}

          <Row m="0 0 55px 0">
            <Button
              width="175px"
              onClick={() =>
                navigate(
                  `/projects/edit-project?projectId=${projectId}&projectName=${projectInfo?.name}`
                )
              }
            >
              {t("editProject")}
            </Button>
          </Row>
        </Col>

        <Col m="0 0 0 16px">
          <Row gap="16px" m="0 0 32px 0 ">
            <Div
              p="17px 37px 25px 17px"
              direction="column"
              background={theme.colors.blue}
              radius="24px"
              width="170px"
              height="201px"
            >
              <Div
                width="50px"
                height="50px"
                background={theme.colors.white100}
                justify="center"
                align="center"
                radius="10px"
                m="0 0 15px 0"
              >
                <BulbIcon fill={theme.colors.white}></BulbIcon>
              </Div>
              <Text size={theme.fonts.size.h6} color={theme.colors.white}>
                {t("total")}
              </Text>
              <Text
                size={theme.fonts.size.h1i}
                weight={theme.fonts.weight.bold}
                color={theme.colors.white}
              >
                {formatThousandsValue(projectInfo?.projectTotalMW) || "--"}
              </Text>
            </Div>
            <Div
              p="17px 15px 16px 17px"
              direction="column"
              background={theme.colors.green}
              radius="24px"
              width="170px"
              height="201px"
            >
              <Div
                width="50px"
                height="50px"
                background={theme.colors.white100}
                justify="center"
                align="center"
                radius="10px"
                m="0 0 15px 0"
              >
                <FinancingIcon fill={theme.colors.white}></FinancingIcon>
              </Div>
              <Text size={theme.fonts.size.h6} color={theme.colors.white}>
                {t("expenses")}
              </Text>
              <Text
                size={theme.fonts.size.h1i}
                weight={theme.fonts.weight.bold}
                color={theme.colors.white}
              >
                {formatThousandsValue(sumCost())}
              </Text>
              <Text size={theme.fonts.size.xs} color={theme.colors.white}>
                {sumCost() !== 0
                  ? `${sumCost().toLocaleString("es-ES")} €`
                  : "-- €"}
              </Text>
            </Div>
          </Row>
          <Div
            direction="column"
            width="356px"
            height="111px"
            background={theme.colors.white}
            radius="15px"
            p="15px 19px 16px 28px"
            m="0 0 24px 0"
            justify="center"
          >
            <Text
              size={theme.fonts.size.sm}
              weight={theme.fonts.weight.regular}
              color={theme.colors.green}
              mb="12px"
            >
              {t("salesScheme")}
            </Text>
            <Row gap="16px">
              <Div
                width="32px"
                height="32px"
                radius="50px"
                background={`${theme.colors.green}20`}
              >
                <BulbIcon fill={theme.colors.green} />
              </Div>
              <Text
                size={theme.fonts.size.default}
                weight={theme.fonts.weight.regular}
                color={theme.colors.gray500}
              >
                {getLabelFromValue(
                  projectInfo?.agreementType,
                  optionsEnergySalesScheme
                ) || "--"}
              </Text>
            </Row>
          </Div>
          <Card width="356px" padding="23px 11px 17px 17px" margin="0 0 24px 0">
            <Row
              justify="space-between"
              align="center"
              m={!isOpenCapex ? "0" : "0 0 24px 0"}
            >
              <Text
                size={theme.fonts.size.h6}
                weight={theme.fonts.weight.medium}
                color={theme.colors.blue}
              >
                {projectInfo?.projectCostsOption === "sponsorTotals"
                  ? t("expenses")
                  : t("detailedExpenses")}
              </Text>
              <Link onClick={() => setIsOpenCapexl(!isOpenCapex)}>
                <ArrowDownIcon
                  style={{
                    transform: isOpenCapex ? "rotateX(180deg)" : "none",
                  }}
                  width="32px"
                  height="32px"
                />
              </Link>
            </Row>
            {isOpenCapex && (
              <Col>
                {projectInfo?.projectCostsOption === "sponsorTotals" ? (
                  <>
                    <Row width="100%" gap="31px">
                      <Text
                        size={theme.fonts.size.sm}
                        weight={theme.fonts.weight.regular}
                        color={theme.colors.green}
                        style={{ width: "204px" }}
                      >
                        {t("expenses")}
                      </Text>
                      <Text
                        size={theme.fonts.size.sm}
                        weight={theme.fonts.weight.regular}
                        color={theme.colors.gray300}
                      >
                        {projectInfo?.capex !== undefined
                          ? `${projectInfo?.capex.toLocaleString("es-ES")} €`
                          : "--"}
                      </Text>
                    </Row>
                    <Div
                      background={theme.colors.gray100}
                      width="319.17px"
                      height="1px"
                      m="10.65px  0 10.65px 0"
                    />
                  </>
                ) : (
                  costObjects.map((cost) => (
                    <>
                      <Row width="100%" gap="31px">
                        <Text
                          size={theme.fonts.size.sm}
                          weight={theme.fonts.weight.regular}
                          color={theme.colors.green}
                          style={{ width: "204px" }}
                        >
                          {t(cost.name)}
                        </Text>
                        <Text
                          size={theme.fonts.size.sm}
                          weight={theme.fonts.weight.regular}
                          color={theme.colors.gray300}
                        >
                          {cost.value !== undefined
                            ? `${cost.value.toLocaleString("es-ES")} €`
                            : "--"}
                        </Text>
                      </Row>
                      <Div
                        background={theme.colors.gray100}
                        width="319.17px"
                        height="1px"
                        m="10.65px  0 10.65px 0"
                      />
                    </>
                  ))
                )}
              </Col>
            )}
          </Card>
          <Card width="356px" padding="23px 11px 17px 17px" margin="0 0 24px 0">
            <Row
              justify="space-between"
              align="center"
              m={!isOpenOpex ? "0" : "0 0 24px 0"}
            >
              <Text
                align="center"
                size={theme.fonts.size.h6}
                weight={theme.fonts.weight.medium}
                color={theme.colors.blue}
              >
                {t("OpexCosts")}
              </Text>
              <Link onClick={() => setIsOpenOpex(!isOpenOpex)}>
                <ArrowDownIcon
                  style={{
                    transform: isOpenOpex ? "rotateX(180deg)" : "none",
                  }}
                  width="32px"
                  height="32px"
                />
              </Link>
            </Row>
            {isOpenOpex && (
              <Col>
                {opexObjects.map((cost) => (
                  <>
                    <Row width="100%" gap="31px">
                      <Text
                        size={theme.fonts.size.sm}
                        weight={theme.fonts.weight.regular}
                        color={theme.colors.green}
                        style={{ width: "204px" }}
                      >
                        {t(cost.name)}
                      </Text>
                      <Text
                        size={theme.fonts.size.sm}
                        weight={theme.fonts.weight.regular}
                        color={theme.colors.gray300}
                      >
                        {cost.value !== undefined
                          ? `${cost.value.toLocaleString("es-ES")} €`
                          : "--"}
                      </Text>
                    </Row>
                    <Div
                      background={theme.colors.gray100}
                      width="319.17px"
                      height="1px"
                      m="10.65px  0 10.65px 0"
                    />
                  </>
                ))}
              </Col>
            )}
          </Card>
        </Col>
      </Row>
    </ModuleContainer>
  );
};
