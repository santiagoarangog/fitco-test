import React from "react";
import PropTypes from "prop-types";
import { Div, Text } from "../../../../styles/Common";
import { theme } from "../../../../styles/theme";
import { Button } from "../../../../components/Button";
import { DownloadIcon } from "../../../../assets/icons";
import { Link } from "../../../../components/Link";
import { dateFormat } from "../../../../utilities/helpers";
import { useTranslation } from "react-i18next";
import Upload from "../../../../assets/icons/upload-green.svg";
import DownloadWhite from "../../../../assets/icons/Download-white.svg";
import Edit from "../../../../assets/icons/Edit.svg";
import Eye from "../../../../assets/icons/eye-show.svg";
import windy from "../../../../assets/icons/Windy.svg";
import sun from "../../../../assets/icons/Sun-green.svg";
import { IconButton } from "../../../../components/IconButton";
import { Row, Col } from "antd";

export const ProjectsCards = ({
  project,
  formatName,
  typeLabel,
  rtbDateLabel,
  handleProjectEdit,
  handleProjectDetail,
  handleUpload,
  handleDownloadTeaser,
  handleDownloadTermsheet,
  handleGoFinancialModel,
  activeKey,
}) => {
  const { t } = useTranslation("projectTable");

  return (
    <Div
      direction="column"
      p={
        activeKey !== "2" && project.status
          ? "0 20px 12px 20px"
          : "22px 20px 12px 20px"
      }
    >
      <Row>
        <Col md={6}>
          <Text
            color={theme.colors.blue}
            size={theme.fonts.size.h6}
            weight={theme.fonts.weight.medium}
          >
            {formatName(project.name)}
          </Text>
          <Text
            color={theme.colors.green}
            size={theme.fonts.size.sm}
            weight={theme.fonts.weight.medium}
            title={project.name}
          >
            <img
              alt="type"
              src={project.type === "FUERZA" ? sun : windy}
            />
          </Text>
        </Col>
        <Col md={5}>
          <Text
            color={theme.colors.gray300}
            size={theme.fonts.size.sm}
            weight={theme.fonts.weight.semibold}
          >
            {"Ubicación"}
          </Text>
          <Text color={theme.colors.gray300} size={theme.fonts.size.sm}>
            {project.location || "-"}
          </Text>
        </Col>
        <Col md={5}>
          <Text
            color={theme.colors.gray300}
            size={theme.fonts.size.sm}
            weight={theme.fonts.weight.medium}
          >
            {"Tipo de evento"}
          </Text>
          <Text color={theme.colors.gray300} size={theme.fonts.size.sm}>
            {project.type}
          </Text>
        </Col>
        <Col md={6}>
          <Text
            color={theme.colors.gray300}
            size={theme.fonts.size.sm}
            weight={theme.fonts.weight.semibold}
          >
            {"Fecha del evento"}
          </Text>
          <Text color={theme.colors.gray300} size={theme.fonts.size.sm}>
            {dateFormat(project.createdAt)}
          </Text>
        </Col>
        <Col md={2}>
          <Div gap="14px">
            <IconButton
              icon={Edit}
              onClick={() =>
                handleProjectEdit(
                  project._id,
                  project.projectType.instance.name,
                  project.projectType.type.name,
                  project.projectType.kind.name,
                  project.name
                )
              }
              width={"32px"}
              height={"32px"}
            />
            <IconButton
              icon={Eye}
              onClick={() => handleProjectDetail(project._id)}
              width={"32px"}
              height={"32px"}
            />
          </Div>
        </Col>
      </Row>
      <hr
        style={{
          width: "100%",
          border: `1px solid ${theme.colors.gray100}`,
          opacity: 0.82,
        }}
      />
      <Div m="22px 0 16px 0" align="center" justify="space-between">
        {activeKey === "2" ? (
          <Div>
            <Text
              color={theme.colors.green}
              size={theme.fonts.size.sm}
              weight={theme.fonts.weight.medium}
              style={{ marginRight: "0.5rem", cursor: "pointer" }}
              onClick={() =>
                handleProjectEdit(
                  project._id,
                  project.projectType.instance.name,
                  project.projectType.type.name,
                  project.projectType.kind.name,
                  project.name
                )
              }
            >
              {t("pendingInfo")}
            </Text>
          </Div>
        ) : (
          <Div>
            <Text
              color={theme.colors.gray300}
              size={theme.fonts.size.sm}
              weight={theme.fonts.weight.medium}
              style={{ marginRight: "0.5rem" }}
            >
              Un evento auspiciado por
            </Text>
            <Text
              color={theme.colors.green}
              size={theme.fonts.size.sm}
              weight={theme.fonts.weight.medium}
              style={{ marginRight: "6.5rem" }}
            >
                <strong>FitCon Test</strong>
            </Text>
          </Div>
        )}
        {activeKey === "2" ? (
          <Div>
            {project?.projectType?.instance?.name === "financing" && (
              <Button
                width={"205px"}
                height={"30px"}
                disabled
                style={{ marginRight: "1rem" }}
              >
                <Row
                  style={{
                    gap: "5px",
                    alignItems: "center",
                  }}
                >
                  <DownloadIcon
                    width="24px"
                    height="24px"
                    fill={theme.colors.white}
                  />
                  <Text
                    color={theme.colors.white}
                    size={theme.fonts.sm}
                    weight={theme.fonts.weight.medium}
                  >
                    {t("modelFinancing")}
                  </Text>
                </Row>
              </Button>
            )}
          </Div>
        ) : (
          <Div>
            <Button
              width={"205px"}
              height={"30px"}
              variant={"outlined"}
              style={{ marginRight: "1rem" }}
              onClick={() => handleUpload(project.name, project._id)}
              icon={
                <img alt="upload" src={Upload} width={"24px"} height={"24px"} />
              }
            >
              {t("uploadDocumentation")}
            </Button>
            {/* <Button
                  width={"85px"}
                  height={"30px"}
                  variant={"outlined"}
                  style={{ marginRight: '25px' }}
                  icon={<img alt='upload' src={Upload} width={"24px"} height={"24px"} />}
              >
                  {t('KYC')}
              </Button> */}
            {project.teaserId?.isPublish &&
              !project?.teaserId?.strategiesSale[0]?.otherConsiderations
                ?.hideTeaserToSponsor && (
                <Link
                  height={"30px"}
                  size={theme.fonts.size.sm}
                  style={{ marginRight: "1rem" }}
                  onClick={() => handleDownloadTeaser(project.teaserId?._id)}
                >
                  <DownloadIcon
                    fill={theme.colors.green}
                    width={"24px"}
                    height={"24px"}
                  />
                  {t("teaser")}
                </Link>
              )}
            {project.isTermSheet && (
              <Link
                height={"30px"}
                size={theme.fonts.size.sm}
                style={{ marginRight: "12px" }}
                onClick={() => handleDownloadTermsheet(project._id)}
              >
                <DownloadIcon
                  fill={theme.colors.green}
                  width={"24px"}
                  height={"24px"}
                />
                {t("termsheet")}
              </Link>
            )}
            <Button
              width={"189px"}
              height={"30px"}
              icon={
                <img
                  alt="download"
                  src={DownloadWhite}
                  width={"24px"}
                  height={"24px"}
                />
              }
              onClick={() => handleGoFinancialModel(project._id, project.name)}
            >
              {t("financialModel")}
            </Button>
          </Div>
        )}
      </Div>

      {/* <hr
          style={{
              width: "100%",
              border: `1px solid ${theme.colors.gray100}`,
              opacity: 0.82,
              margin: "8.5px 0 20.5px 0"
          }}
      />
      <Div m="19px 0 0 0" justify="space-between" align="center">
          <Div>
              <Button
                  width={"125px"}
                  height={"30px"}
                  variant={"outlined"}
                  icon={<img alt='chat' src={Chat} />}
              >
                  {t('questions')}
              </Button>
          </Div>
          <Div align='center'>
              <Text color={theme.colors.gray300} size={theme.fonts.size.sm} weight={theme.fonts.weight.semibold} style={{ marginRight: '16px' }}>
                  {t('advisoryPanel')}
              </Text>
              {panelInfo.map((ele, indx) => (
                  <>
                      <Div gap="5px" align='center'>
                          <Text color={theme.colors.gray200} size={theme.fonts.size.sm} weight={theme.fonts.weight.medium}>
                              {`${t(ele.label)}`}
                          </Text>
                          {ele.value !== 0 && (
                              <Text color={theme.colors.green} weight={theme.fonts.weight.semibold}>
                                  {`(${ele.value})`}
                              </Text>
                          )}
                      </Div>
                      {indx !== 3 && (
                          <hr style={{ height: '23px', border: `1px solid ${theme.colors.gray100}`, margin: '0 11px 0 9px' }} />
                      )}
                  </>
              ))}
          </Div>
      </Div> */}
    </Div>
  );
};

ProjectsCards.propTypes = {
  project: PropTypes.array,
  formatName: PropTypes.func,
  typeLabel: PropTypes.func,
  rtbDateLabel: PropTypes.func,
  handleProjectEdit: PropTypes.func,
  handleProjectDetail: PropTypes.func,
  handleUpload: PropTypes.func,
  handleDownloadTeaser: PropTypes.func,
  handleDownloadTermsheet: PropTypes.func,
  handleGoFinancialModel: PropTypes.func,
  activeKey: PropTypes.string,
};
