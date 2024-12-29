import React, { useState } from "react";
import PropTypes from "prop-types";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { Div, Text } from "../../../../styles/Common";
import windy from "../../../../assets/icons/Windy.svg";
import sun from "../../../../assets/icons/Sun-green.svg";
import { theme } from "../../../../styles/theme";
import { Row, Col } from "antd";
import { useTranslation } from "react-i18next";
import { Link } from "../../../../components/Link";
import financingIcon from "../../../../assets/icons/Financing.svg";
import saleIcon from "../../../../assets/icons/sale.svg";
import { ModalSaleOrFinance } from "./modalSaleOrFinance";
import useCreateIdentifyProject from "../../hooks/useCreateIdentifyProject";

export const IdentifyProjectsCards = ({ project, formatName }) => {
  const { t } = useTranslation(["projectTable", "common"]);
  const navigate = useNavigate();
  const createIdentifyProject = useCreateIdentifyProject();
  const [showModal, setShowModal] = useState(false);
  const [objective, setObjective] = useState("");

  const openModal = (obj) => {
    setShowModal(true);
    setObjective(obj);
  };

  const handleClose = () => {
    setShowModal(false);
    setObjective("");
  };

  const handleComplete = () => {
    const payload = {
      projectId: project._id,
      projectType: {
        instance: {
          name: objective,
          order: objective === "financing" ? 1 : 2,
        },
      },
    };

    createIdentifyProject.reset();
    createIdentifyProject.mutate(payload, {
      onSuccess: (res) => {
        const data = res?.data.result.data.createProjectDto;
        navigate(
          `/projects/edit-project?objective=${data?.projectType.instance.name}&projectType=${data?.projectType.type.name}&financingType=${data?.projectType.kind.name}&projectId=${data?.id}&projectName=${data?.name}`
        );
      },
      onError: (err) => {
        toast.error(t(`common:${err.response.data.result.code}`));
      },
    });
  };

  return (
    <Div
      direction="column"
      p={project.status ? "0 20px 12px 20px" : "22px 20px 12px 20px"}
    >
      <ModalSaleOrFinance
        showModal={showModal}
        handleClose={handleClose}
        objective={objective}
        handleComplete={handleComplete}
      />
      <Row>
        <Col md={7}>
          <Text
            color={theme.colors.blue}
            size={theme.fonts.size.h6}
            weight={theme.fonts.weight.medium}
          >
            {formatName(project.nombreProyecto)}
          </Text>
          <Text
            color={theme.colors.green}
            size={theme.fonts.size.sm}
            weight={theme.fonts.weight.medium}
            title={project.name}
          >
            <img
              alt="type"
              src={project.projectType?.type.name === "solar" ? sun : windy}
            />
            {project.projectType?.type.name === "solar" ? "Solar" : "Eólico"}
          </Text>
        </Col>
        <Col md={7}>
          <Text
            color={theme.colors.gray300}
            size={theme.fonts.size.sm}
            weight={theme.fonts.weight.semibold}
          >
            {`${t("location")}:`}
          </Text>
          <Text color={theme.colors.gray300} size={theme.fonts.size.sm}>
            {`${project?.ubicacion?.comunidadAutonoma}, ${project?.ubicacion?.provincia}, ${project.ubicacion.municipio}`}
          </Text>
        </Col>
        <Col md={5}>
          <Text
            color={theme.colors.gray300}
            size={theme.fonts.size.sm}
            weight={theme.fonts.weight.medium}
          >
            {`${t("power")}:`}
          </Text>
          <Text color={theme.colors.gray300} size={theme.fonts.size.sm}>
            {`${project.potenciaPico} Mwp`}
          </Text>
        </Col>
        <Col md={5}>
          <Text
            color={theme.colors.gray300}
            size={theme.fonts.size.sm}
            weight={theme.fonts.weight.medium}
          >
            {`${t("lastLicense")}:`}
          </Text>
          <Text color={theme.colors.green} size={theme.fonts.size.sm}>
            {`${project.permiso}`}
          </Text>
        </Col>
      </Row>
      <hr
        style={{
          width: "100%",
          border: `1px solid ${theme.colors.gray100}`,
          opacity: 0.82,
        }}
      />
      <Row>
        <Col md={7}>
          <Text
            color={theme.colors.gray300}
            size={theme.fonts.size.sm}
            weight={theme.fonts.weight.medium}
          >
            {t("objective")}
          </Text>
        </Col>
        <Col md={7}>
          <Link
            icon={
              <img width={"24px"} height={"24px"} alt="sale" src={saleIcon} />
            }
            onClick={() => openModal("sale")}
          >
            {t("sale")}
          </Link>
        </Col>
        <Col md={5}>
          <Link
            icon={
              <img
                width={"24px"}
                height={"24px"}
                alt="financing"
                src={financingIcon}
              />
            }
            onClick={() => openModal("financing")}
          >
            {t("financing")}
          </Link>
        </Col>
        <Col md={5}></Col>
      </Row>
    </Div>
  );
};

IdentifyProjectsCards.propTypes = {
  project: PropTypes.array,
  formatName: PropTypes.func,
};
