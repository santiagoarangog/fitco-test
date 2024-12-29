import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { Card } from "../../../components/Card";
import { useTranslation } from "react-i18next";
import { Input } from "../../../components/Input";
import { Button } from "../../../components/Button";
import { theme } from "../../../styles/theme";
import { Text, Row, Div, Col } from "../../../styles/Common";
import { WraperImage } from "./styles";
import santander from "../../../assets/images/testImage.png";
import { Link } from "../../../components/Link";
import { Upload } from "antd";
import toast from "react-hot-toast";
import { getUserInfo } from "../../../utilities/helpers";
import { Collapse } from "../../../components/Collapse";
import { SeniorFinancing } from "./SeniorFinancing";
import {
  UploadIcon,
  UserIcon,
  SaleIcon,
  DeleteIcon,
  EyeIcon,
} from "../../../assets/icons";
import useGetSizingParameters from "../hooks/useGetSizingParameters";
import useFinancingSource from "../hooks/useFinancingSource";
import ModalSuccess from "../../NewProject/components/ModalSuccess";
import { useNavigate } from "react-router-dom";
import useUpdateUser from "../hooks/useUpdateUser";
import useUpdateFinancingSource from "../hooks/useUpdateFinancingSource";

export const InvestorCompanyData = ({ userData, handleUpdate, loading }) => {
  const { t } = useTranslation("myAccount");
  const navigate = useNavigate();
  const userInfo = getUserInfo();
  const updateUser = useUpdateUser();
  const financingSource = useFinancingSource();
  const updateFinancingSource = useUpdateFinancingSource();
  const getSizingParameters = useGetSizingParameters(userData?.companyId);
  const { data, isSuccess } = getSizingParameters;
  const [form, setForm] = useState({
    legalTenor: null, //shortTenor
    debtSizing: null, //tenor
    amortizationProfile: null, //debtPayment
    upFrontFee: null, //shortFinancingOpeningFee
    interest: null, //interest
    targetCoupon: null, //shortFinancingSpread
    maxiumLeverageOver: null, //maxLeverageOverCAPEX
    merchant: null, //DSCRForMerchant
    nonCallPeriod: null, //nonCallPeriod
    switchSwap: null, //swapHedge
    swapPercentage: null, // hedge
    productionPriceCurve: null, //priceCurveScenario
    productionScenario: null, // productionScenario
    switchCashSweepActivation: null, //cashSweepActivation
    cashSweep: null, //CSRatioPeriod1
  });
  useEffect(() => {
    if (isSuccess) {
      setForm({
        legalTenor: data?.data?.data?.shortTenor,
        debtSizing: data?.data?.data?.tenor,
        amortizationProfile: data?.data?.data?.debtPayment,
        upFrontFee: data?.data?.data?.shortFinancingOpeningFee,
        interest: data?.data?.data?.interest,
        targetCoupon: data?.data?.data?.shortFinancingSpread,
        maxiumLeverageOver: data?.data?.data?.maxLeverageOverCAPEX,
        merchant: data?.data?.data?.DSCRForMerchant,
        nonCallPeriod: data?.data?.data?.nonCallPeriod,
        switchSwap: data?.data?.data?.swapHedge,
        swapPercentage: data?.data?.data?.hedge,
        productionPriceCurve: data?.data?.data?.priceCurveScenario,
        productionScenario: data?.data?.data?.productionScenario,
        switchCashSweepActivation: data?.data?.data?.cashSweepActivation,
        cashSweep: data?.data?.data?.CSRatioPeriod1,
      });
    }
  }, [data, isSuccess]);

  const [activeKey, setActiveKey] = useState(["0"]);
  const [document, setDocument] = useState(null);

  const [showModal, setShowModal] = useState(false);
  const handleClose = () => {
    setShowModal(false);
    navigate("/projects");
  };

  const maxSize = 500000000;
  const handleUpload = (info) => {
    const { file } = info;
    if (file.type === "application/pdf" && file.size < maxSize) {
      setDocument(file);
    } else {
      toast.dismiss();
      toast.error(t("notPermitted"));
    }
  };

  const handlePanelChange = (key) => {
    setActiveKey(key);
  };

  const handleDelete = () => {
    setDocument(null);
  };

  const items = [
    {
      key: "1",
      header: t("senior"),
      panel: <SeniorFinancing form={form} setForm={setForm} />,
    },
    {
      key: "2",
      header: t("junior"),
      panel: "Panel Junior Financing",
    },
  ];

  const handleSave = async () => {
    toast.remove();
    const formData = {
      type: 1,
      investorId: userInfo.companyId,
      shortTenor: form.legalTenor,
      tenor: form.debtSizing,
      debtPayment: form.amortizationProfile,
      shortFinancingOpeningFee: form.upFrontFee,
      interest: form.interest,
      shortFinancingSpread: form.targetCoupon,
      maxLeverageOverCAPEX: form.maxiumLeverageOver,
      DSCRForMerchant: form.merchant,
      nonCallPeriod: form.nonCallPeriod,
      swapHedge: form.switchSwap,
      hedge: form.swapPercentage,
      productionScenario: form.productionScenario,
      priceCurveScenario: form.productionPriceCurve,
      cashSweepActivation: form.switchCashSweepActivation,
      CSRatioPeriod1: form.cashSweep,
    };

    financingSource.reset();
    updateFinancingSource.reset();
    const updatedUserData = { ...userData };
    delete updatedUserData.createdAt;

    const mutateWithPromise = (mutateFunction, variables) => {
      return new Promise((resolve, reject) => {
        mutateFunction(variables, {
          onSuccess: (result) => resolve(result),
          onError: (err) => reject(err),
        });
      });
    };

    try {
      const financingResult = await mutateWithPromise(
        data?.data?.data?._id
          ? updateFinancingSource.mutate
          : financingSource.mutate,
        data?.data?.data?._id
          ? { id: data?.data?.data?._id, formData }
          : formData
      );

      const userUpdateResult = await mutateWithPromise(updateUser.mutate, {
        ...updatedUserData,
      });

      if (financingResult && userUpdateResult) {
        setShowModal(true);
      } else {
        toast.error(t("unable"));
      }
    } catch (err) {
      toast.error(
        `${
          err.response.data.result.code.message || err.response.data.result.code
        }`
      );
    }
  };

  return (
    <Card
      width="80%"
      height="551px"
      padding="27px 44px 42px 41px"
      margin="0 20px 20px 0"
      style={{ overflow: " auto" }}
    >
      <ModalSuccess
        showModal={showModal}
        page={"myAccount"}
        handleCloseModal={handleClose}
      />
      <Row m="0 0 24px 0" align="center" justify="space-between">
        <Text
          color={theme.colors.blue}
          weight={theme.fonts.weight.medium}
          size={theme.fonts.size.h5}
        >
          {t("companyData")}
        </Text>
        <Div style={{ cursor: "pointer" }} gap="4px">
          <UploadIcon fill={theme.colors.green} width="24px" height="24px" />
          <Text color={theme.colors.green}>{t("download")}</Text>
        </Div>
      </Row>

      <Div m=" 0 0 24px 0">
        <WraperImage background={santander} />
      </Div>

      <Row gap="31px">
        <Input
          label={t("companyName")}
          sizeLabel={theme.fonts.size.default}
          value={userData.company.name}
          width={"100%"}
          disabled
          style={{ marginBottom: "32px" }}
        />
        <Input
          label={t("phoneNumber")}
          sizeLabel={theme.fonts.size.default}
          value={userData?.phone}
          width={"100%"}
          style={{ marginBottom: "32px" }}
        />
      </Row>
      <Row gap="17px" m="0 0 32px 0" justify="space-between">
        <Div
          background={theme.colors.blue}
          width="204px"
          height="85px"
          radius="15px"
          align="center"
          justify="center"
          gap="7px"
        >
          <Col>
            <Div
              width="50px"
              height="50px"
              radius="10px"
              background={theme.colors.white100}
              align="center"
              justify="center"
            >
              <UserIcon width="32px" height="32px" />
            </Div>
          </Col>
          <Col align="left">
            <Text
              color={theme.colors.white}
              weight={theme.fonts.weight.medium}
              size={theme.fonts.size.smi}
            >
              {t("numberUsers")}
            </Text>
            <Text color={theme.colors.green100} size={theme.fonts.size.smi}>
              {userData?.company?.totalUsers} {t("users")}
            </Text>
          </Col>
        </Div>
        <Div
          background={theme.colors.gray200}
          width="204px"
          height="85px"
          radius="15px"
          align="center"
          justify="center"
          gap="7px"
        >
          <Col>
            <Div
              width="50px"
              height="50px"
              radius="10px"
              background={theme.colors.white100}
              align="center"
              justify="center"
            >
            </Div>
          </Col>
          <Col align="left">
            <Text
              color={theme.colors.white}
              weight={theme.fonts.weight.medium}
              size={theme.fonts.size.smi}
            >
              {t("activeProjects")}
            </Text>
            <Text color={theme.colors.green100} size={theme.fonts.size.smi}>
              {userData?.company?.totalProjects} {t("projectsNumber")}
            </Text>
          </Col>
        </Div>
        <Div
          background={theme.colors.green}
          width="204px"
          height="85px"
          radius="15px"
          align="center"
          justify="center"
          gap="7px"
        >
          <Col>
            <Div
              width="50px"
              height="50px"
              radius="10px"
              background={theme.colors.white100}
              align="center"
              justify="center"
            >
              <SaleIcon width="32px" height="32px" />
            </Div>
          </Col>
          <Col align="left">
            <Text
              color={theme.colors.white}
              weight={theme.fonts.weight.medium}
              size={theme.fonts.size.smi}
            >
              {t("investments")}
            </Text>
            <Text color={theme.colors.green100} size={theme.fonts.size.smi}>
              {userData?.company?.totalInvestor} {t("investmentsNumber")}
            </Text>
          </Col>
        </Div>
      </Row>
      {document === null ? (
        <Upload multiple={false} showUploadList={false} onChange={handleUpload}>
          <Div m="0 0 36px 0">
            <Button
              variant={"outlined"}
              width="325px"
            >
              <UploadIcon
                fill={theme.colors.green}
                width="24px"
                height="24px"
              />
              {t("signed")}
            </Button>
          </Div>
        </Upload>
      ) : (
        <Div
          background={theme.colors.green100}
          radius="7px"
          align="center"
          p="10px 18px 10px 12px"
          border="1px solid"
          borderColor={theme.colors.gray100}
          justify="space-between"
          width="425px"
          m="0 0 22px 0"
        >
          <Col align="left" width="100px">
            <Text mb="7px" color={theme.colors.gray300}>
              {document?.name}
            </Text>
            <Text size={theme.fonts.size.sm} color={theme.colors.green}>
              {document?.size
                ? `${(document.size / (1024 * 1024)).toFixed(2)} Mb`
                : "--"}
            </Text>
          </Col>
          <Row gap="13px">
            <Div
              radius="50%"
              width="38px"
              height="38px"
              justify="center"
              align="center"
              m="0 0 8px 0"
            >
              <Link>
                <DeleteIcon
                  fill={theme.colors.gray200}
                  onClick={handleDelete}
                />
              </Link>
            </Div>
            <Div
              radius="50%"
              width="38px"
              height="38px"
              justify="center"
              align="center"
              m="0 0 8px 0"
            >
              <Link>
                <EyeIcon fill={theme.colors.gray200} />
              </Link>
            </Div>
          </Row>
        </Div>
      )}
      {userInfo.investType === "dInv" && (
        <>
          <Text
            size={theme.fonts.size.h5}
            color={theme.colors.blue}
            weight={theme.fonts.weight.medium}
            mb="24px"
          >
            {t("dimensioningParameters")}
          </Text>
          <Collapse
            activeKey={activeKey}
            handlePanelChange={handlePanelChange}
            panels={items}
            marginBottom={"24px"}
          />
        </>
      )}
      <Row>
        {userInfo.investType === "dInv" ? (
          <Button
            onClick={handleSave}
            loading={
              financingSource.isLoading || updateFinancingSource.isLoading
            }
            width="192px"
          >
            {t("updateInformation")}
          </Button>
        ) : (
          <Button
            onClick={handleUpdate}
            loading={loading}
          >
            {t("saveChanges")}
          </Button>
        )}
      </Row>
    </Card>
  );
};

InvestorCompanyData.propTypes = {
  countriesOptions: PropTypes.array,
  userData: PropTypes.object,
  handleSelect: PropTypes.func,
  country: PropTypes.string,
  handleChangeCountry: PropTypes.func,
  handleChangeCompany: PropTypes.func,
  handleDelete: PropTypes.func,
  handleUpdate: PropTypes.func,
  loading: PropTypes.bool,
};
