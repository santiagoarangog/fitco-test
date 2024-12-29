import React, { useState, useEffect } from "react";
import ReactLoading from "react-loading";
import { useQueryClient } from "react-query";
import { theme } from "../../../styles/theme";
import Drawer from "../../../components/Drawer";
import { Text, Row, Div, Col } from "../../../styles/Common";
import PropTypes from "prop-types";
import { Input } from "../../../components/Input";
import { Radio } from "../../../components/Radio";
import { UploadIcon, DeleteIcon } from "../../../assets/icons";
import { Button } from "../../../components/Button";
import { Upload } from "antd";
import { Link } from "../../../components/Link";
import toast from "react-hot-toast";
import { validateNewInvestmentGroupForm } from "../../../utilities/validations";
import { useTranslation } from "react-i18next";
import useCreateInvestmentCompany from "../hooks/useCreateInvestmentCompany";
import useGetCompanyById from "../hooks/useGetCompanyById";

export const DrawerNewInvestmentGroup = ({
  openDrawer,
  handleClose,
  setShowModal,
  form,
  setForm,
  errorForm,
  setErrorForm,
  selectedCompany,
  getShortLogoName,
  tabActiveKey,
}) => {
  const { t } = useTranslation("users");
  const createInvestmentCompany = useCreateInvestmentCompany();
  const queryClient = useQueryClient();

  const [forceUpdate, setForceUpdate] = useState(false);
  const [initialLoad, setInitialLoad] = useState(true);
  const [companyType, setCompanyType] = useState(
    tabActiveKey === "1" ? "Promoter" : "Investment"
  );

  const getCompanyById = useGetCompanyById(selectedCompany);
  const { data, isSuccess, isLoading } = getCompanyById;

  useEffect(() => {
    if (isSuccess && initialLoad) {
      setInitialLoad(false);
      setForm({
        nameCompany: data?.data?.name,
        address: data?.data?.address,
        logo: data?.data?.logo || null,
        document: data?.data?.termsAndConditionsUrl || null,
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data, isSuccess]);

  useEffect(() => {
    setCompanyType(tabActiveKey === "1" ? "Promoter" : "Investment");
  }, [tabActiveKey]);

  const handleRadio = (event) => {
    const { value } = event.target;
    setCompanyType(value);
  };

  const maxSize = 500000000;
  const handleUploadLogo = (info) => {
    const { file } = info;

    if (file?.type && file?.size) {
      if (file.type.startsWith("image/") && file.size < maxSize) {
        setForm({ ...form, logo: file });
        toast.success(t("drawerNewInvestmentGroup.logoSuccess"));
      } else {
        toast.remove();
        toast.error(t("drawerNewInvestmentGroup.notPermited"));
      }
    }
  };

  const handleUploadDocument = (info) => {
    const { file } = info;

    if (file?.type && file?.size) {
      if (file.type.startsWith("application/pdf") && file.size < maxSize) {
        setForm({ ...form, document: file });
        toast.success(t("drawerNewInvestmentGroup.documentSuccess"));
      } else {
        toast.remove();
        toast.error(t("drawerNewInvestmentGroup.notPermited"));
      }
    }
  };

  const handleDeleteLogo = () => {
    toast.remove();
    setForm({ ...form, logo: null });
    toast.success(t("drawerNewInvestmentGroup.logoDelete"));
  };

  const handleDeleteDocument = () => {
    toast.remove();
    setForm({ ...form, document: null });
    toast.success(t("drawerNewInvestmentGroup.documentDelete"));
  };

  const handleChange = (event) => {
    const { value, id } = event.target;

    const newErrorForm = { ...errorForm };
    newErrorForm[id].error = false;
    newErrorForm[id].message = "";
    setErrorForm(newErrorForm);

    const newForm = { ...form };
    newForm[id] = value;
    setForm(newForm);
  };

  const handleSave = () => {
    const { error } = validateNewInvestmentGroupForm(form, companyType);

    if (error) {
      const newErrorForm = errorForm;
      error.details.map((ele) => {
        newErrorForm[ele.context.label].error = true;
        newErrorForm[ele.context.label].message = t(
          "drawerNewInvestmentGroup.requiredField"
        );
      });
      setErrorForm(newErrorForm);
    } else {
      const formData = new FormData();
      formData.append("companyType", companyType);
      formData.append("name", form.nameCompany);
      if (form?.address) {
        formData.append("address", form.address);
      }
      if (form?.logo?.name) {
        formData.append("logo", form.logo?.originFileObj);
      }
      if (form?.document?.name) {
        formData.append("document", form.document?.originFileObj);
      }

      if (selectedCompany) {
        formData.append("id", selectedCompany);
      }

      createInvestmentCompany.reset();
      createInvestmentCompany.mutate(formData, {
        onSuccess: () => {
          queryClient.invalidateQueries(["getCompanyById"]);
          queryClient.invalidateQueries(["getCompanies"]);
          setInitialLoad(true);
          handleClose();
          if (!selectedCompany) {
            setShowModal(true);
          }
        },
        onError: (err) => {
          toast.error(
            `${err?.response?.data?.result?.code?.message}` ||
              `${err?.response?.data?.result?.code}`
          );
        },
      });
    }
    setForceUpdate(!forceUpdate);
  };

  return (
    <Drawer
      open={openDrawer}
      onClose={() => {
        setCompanyType(tabActiveKey === "1" ? "Promoter" : "Investment");
        setInitialLoad(true);
        handleClose();
      }}
      width="430px"
    >
      {selectedCompany && isLoading ? (
        <Div width="100%" height="100%" justify="center" align="center">
          <ReactLoading color={theme.colors.green} />
        </Div>
      ) : (
        <>
          <Text
            size={theme.fonts.size.h5}
            weight={theme.fonts.weight.medium}
            color={theme.colors.blue}
            mb="32px"
          >
            {t("drawerNewInvestmentGroup.newcompany")}
          </Text>
          <Text color={theme.colors.gray200} mb="16px">
            {t("drawerNewInvestmentGroup.typeCompany")}
          </Text>
          <Row m=" 0 0 32px 0" gap="30px">
            <Radio
              label={t("drawerNewInvestmentGroup.groupPromoter")}
              onChange={handleRadio}
              value="Promoter"
              checked={companyType === "Promoter"}
            />
            <Radio
              label={t("drawerNewInvestmentGroup.groupInvestor")}
              onChange={handleRadio}
              value="Investment"
              checked={companyType === "Investment"}
            />
          </Row>
          <Row m=" 0 0 24px 0">
            <Input
              label={t("drawerNewInvestmentGroup.nameCompany")}
              width="100%"
              sizeLabel={theme.fonts.size.default}
              value={form.nameCompany}
              id={"nameCompany"}
              onChange={handleChange}
              helper={errorForm.nameCompany.message}
              error={errorForm.nameCompany.error}
            />
          </Row>

          <Row m=" 0 0 24px 0">
            <Input
              width="100%"
              label={t("drawerNewInvestmentGroup.address")}
              sizeLabel={theme.fonts.size.default}
              value={form.address}
              id={"address"}
              onChange={handleChange}
              helper={errorForm.address.message}
              error={errorForm.address.error}
            />
          </Row>

          {form.document === null && companyType === "Investment" && (
            <Div m=" 0 0 24px 0" direction="column">
              <Upload
                multiple={false}
                showUploadList={false}
                onChange={handleUploadDocument}
              >
                <Button width="325px" variant={"outlined"}>
                  <UploadIcon
                    fill={theme.colors.green}
                    width="24px"
                    height="24px"
                  />
                  {t("drawerNewInvestmentGroup.t&c")}
                </Button>
              </Upload>
              {errorForm.document.error && (
                <Text
                  size={theme.fonts.size.xs}
                  color={theme.colors.red}
                  mt="2px"
                >
                  {errorForm.document.message}
                </Text>
              )}
            </Div>
          )}
          {form.document !== null && companyType === "Investment" && (
            <>
              <Text
                size={theme.fonts.size.h6}
                weight={theme.fonts.weight.medium}
                color={theme.colors.blue}
                mb="11px"
              >
                {t("drawerNewInvestmentGroup.terms")}
              </Text>
              <Div
                background={theme.colors.green100}
                radius="7px"
                justify="space-between"
                align="center"
                p="10px 18px 10px 12px"
                border="1px solid"
                borderColor={theme.colors.gray100}
                gap="55px"
                height="80px"
                m="0 0 41px 0"
              >
                <Col align="left">
                  <Text mb="7px" color={theme.colors.gray300}>
                    {form.document?.name
                      ? form.document?.name
                      : form.document
                      ? getShortLogoName(form.document, 10, "t&c")
                      : null}
                  </Text>
                  {form.document?.name && (
                    <Text size={theme.fonts.size.sm} color={theme.colors.green}>
                      {(form.document?.size / (1024 * 1024)).toFixed(2)} Mb
                    </Text>
                  )}
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
                        onClick={handleDeleteDocument}
                      />
                    </Link>
                  </Div>
                </Row>
              </Div>
            </>
          )}
          <Text
            size={theme.fonts.size.h6}
            weight={theme.fonts.weight.medium}
            color={theme.colors.blue}
            mb="11px"
          >
            Logo
          </Text>
          {form.logo === null ? (
            <>
              <Div
                style={{ cursor: "pointer" }}
                direction="column"
                background={theme.colors.green100}
                width="100%"
                radius="7px"
                justify="center"
                align="center"
                p="22px 0 18px 0"
                border="1px dashed"
                borderColor={theme.colors.gray200}
                height="119px"
                m=" 0 0 2px 0"
              >
                <Upload
                  multiple={false}
                  showUploadList={false}
                  onChange={handleUploadLogo}
                >
                  <Div
                    background={theme.colors.gray100}
                    radius="50%"
                    width="48px"
                    height="48px"
                    justify="center"
                    align="center"
                    m="0 0 8px 0"
                  >
                    <UploadIcon
                      fill={theme.colors.gray200}
                      width="28px"
                      height="28px"
                    />
                  </Div>
                  <Row gap="5px">
                    <Text color={theme.colors.green}>
                      {t("drawerNewInvestmentGroup.clicHere")}
                    </Text>
                    <Text color={theme.colors.gray500}>
                      {t("drawerNewInvestmentGroup.upload")}
                    </Text>
                  </Row>
                </Upload>
              </Div>
              {errorForm.logo.error && (
                <Text size={theme.fonts.size.xs} color={theme.colors.red}>
                  {errorForm.logo.message}
                </Text>
              )}
            </>
          ) : (
            <Div
              background={theme.colors.green100}
              radius="7px"
              justify="space-between"
              align="center"
              p="10px 18px 10px 12px"
              border="1px solid"
              borderColor={theme.colors.gray100}
              gap="55px"
              height="80px"
            >
              <Col align="left">
                <Text mb="7px" color={theme.colors.gray300}>
                  {form.logo?.name
                    ? form.logo?.name
                    : form.logo
                    ? getShortLogoName(form.logo, 10, "logo")
                    : null}
                </Text>
                {form.logo?.name && (
                  <Text size={theme.fonts.size.sm} color={theme.colors.green}>
                    {(form.logo?.size / (1024 * 1024)).toFixed(2)} Mb
                  </Text>
                )}
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
                      onClick={handleDeleteLogo}
                    />
                  </Link>
                </Div>
              </Row>
            </Div>
          )}
          <Col align="center" style={{ gap: "24px" }}>
            <Button
              width="211px"
              onClick={handleSave}
              m="41px 0 0 0"
              loading={createInvestmentCompany.isLoading}
            >
              {selectedCompany
                ? "Editar"
                : t("drawerNewInvestmentGroup.createCompany")}
            </Button>
            <Link
              onClick={() => {
                setInitialLoad(true);
                handleClose();
              }}
            >
              {t("drawerNewInvestmentGroup.cancel")}
            </Link>
          </Col>
        </>
      )}
    </Drawer>
  );
};

DrawerNewInvestmentGroup.propTypes = {
  openDrawer: PropTypes.bool,
  handleClose: PropTypes.func,
  setShowModal: PropTypes.func,
  form: PropTypes.object,
  setForm: PropTypes.func,
  errorForm: PropTypes.object,
  setErrorForm: PropTypes.func,
  selectedCompany: PropTypes.string,
  getShortLogoName: PropTypes.func,
  tabActiveKey: PropTypes.string,
};
