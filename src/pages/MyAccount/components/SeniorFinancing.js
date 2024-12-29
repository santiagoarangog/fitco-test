import React, { useState } from "react";
import { Row, Div, Text } from "../../../styles/Common";
import { Input } from "../../../components/Input";
import { Select } from "../../../components/Select2";
import { theme } from "../../../styles/theme";
import { Switch } from "../../../components/Switch";
import Tabs from "../../../components/Tabs";
import { useTranslation } from "react-i18next";
import { amortizationProfileOptions } from "../../../utilities/generalOptions";
import { interestOptions } from "../../../utilities/generalOptions";
import { productionPriceCurveOptions } from "../../../utilities/generalOptions";
import { productionScenarioOptions } from "../../../utilities/generalOptions";
import { NonCall } from "../../../utilities/generalOptions";
import PropTypes from "prop-types";

export const SeniorFinancing = ({ form, setForm }) => {
  const { t } = useTranslation("myAccount");

  const [tabActiveKey, setTabActiveKey] = useState("1");

  const handleTabChange = (key) => {
    setTabActiveKey(key);
  };

  const handleChange = (event) => {
    const { value, id } = event.target;
    const newForm = { ...form };
    newForm[id] = Number(value);
    setForm(newForm);
  };

  const handleSelect = (value, id) => {
    const newForm = { ...form };
    newForm[id] = value;
    setForm(newForm);
  };

  const handleSwitch = (checked, id) => {
    const newForm = { ...form };
    newForm[id] = checked;
    setForm(newForm);
  };

  const strategiesTabs = [
    {
      tab: t("seniorFinancing.terms"),
      key: "1",
    },
    {
      tab: t("seniorFinancing.productionParameters"),
      key: "2",
    },
    {
      tab: t("seniorFinancing.cashSweep"),
      key: "3",
    },
  ];

  return (
    <>
      <Row m="24px 0 35.5px 0">
        <Tabs
          defaultActiveKey="1"
          onChange={handleTabChange}
          activeKey={tabActiveKey}
        >
          {strategiesTabs.map((panel) => (
            <Tabs.Panel tab={panel.tab} key={panel.key} />
          ))}
        </Tabs>
      </Row>
      {tabActiveKey === "1" && (
        <>
          <Row gap="22px" m=" 0 0 24px 0">
            <Input
              width="100%"
              label={t("seniorFinancing.legaltenor")}
              suffix={t("seniorFinancing.years")}
              sizeLabel={theme.fonts.size.default}
              value={form.legalTenor}
              id="legalTenor"
              onChange={handleChange}
              type="number"
            />

            <Input
              width="100%"
              label={t("seniorFinancing.sizingTenor")}
              suffix="Años"
              sizeLabel={theme.fonts.size.default}
              value={form.debtSizing}
              type="number"
              id="debtSizing"
              onChange={handleChange}
            />
            <Select
              width="100%"
              style={{ width: "33%" }}
              label={t("seniorFinancing.amortizationProfile")}
              placeholder={t("seniorFinancing.select")}
              sizeLabel={theme.fonts.size.default}
              arrowColor={theme.colors.gray200}
              value={form.amortizationProfile}
              onChange={(value) => handleSelect(value, "amortizationProfile")}
              options={amortizationProfileOptions}
            />
          </Row>
          <Row gap="22px" m=" 0 0 24px 0">
            <Input
              width="100%"
              label={t("seniorFinancing.frontFee")}
              suffix="%"
              sizeLabel={theme.fonts.size.default}
              value={form.upFrontFee}
              type="number"
              id="upFrontFee"
              onChange={handleChange}
            />
            <Select
              width="100%"
              style={{ width: "33%" }}
              label={t("seniorFinancing.interest")}
              placeholder={t("seniorFinancing.select")}
              arrowColor={theme.colors.gray200}
              sizeLabel={theme.fonts.size.default}
              value={form.interest}
              onChange={(value) => handleSelect(value, "interest")}
              options={interestOptions}
            />
            <Input
              width="100%"
              label={t("seniorFinancing.targetCoupon")}
              suffix="%"
              sizeLabel={theme.fonts.size.default}
              value={form.targetCoupon}
              type="number"
              id="targetCoupon"
              onChange={handleChange}
            />
          </Row>
          <Row gap="22px" m="0 0 24px 0">
            <Input
              width="100%"
              label={t("seniorFinancing.leverangeOver")}
              suffix="%"
              helper="CAPEX"
              helperColor={theme.colors.gray200}
              sizeLabel={theme.fonts.size.default}
              value={form.maxiumLeverageOver}
              type="number"
              id="maxiumLeverageOver"
              onChange={handleChange}
            />
            <Input
              width="100%"
              label={t("seniorFinancing.merchant")}
              helper={t("seniorFinancing.serviceCoverage")}
              helperColor={theme.colors.gray200}
              sizeLabel={theme.fonts.size.default}
              value={form.merchant}
              type="number"
              id="merchant"
              onChange={handleChange}
            />
            <Select
              width="100%"
              style={{ width: "33%" }}
              label={t("seniorFinancing.callPeriod")}
              arrowColor={theme.colors.gray200}
              placeholder={t("seniorFinancing.select")}
              helper={t("seniorFinancing.ifAny")}
              helperColor={theme.colors.gray200}
              sizeLabel={theme.fonts.size.default}
              value={form.nonCallPeriod}
              onChange={(value) => handleSelect(value, "nonCallPeriod")}
              options={NonCall}
            />
          </Row>
          <Div
            background={theme.colors.gray100}
            height="1px"
            width="100%"
            m="0 0 29px 0"
          />
          <Row align="center" justify="center" gap="33px">
            <Row m="25px 0 0 0" align="center" justify="center" gap="12px">
              <Switch
                checked={form.switchSwap}
                onChange={(checked) => handleSwitch(checked, "switchSwap")}
              />
              <Text color={theme.colors.gray200}>
                {t("seniorFinancing.swapRequirement")}
              </Text>
            </Row>
            {form.switchSwap && (
              <Input
                label={t("seniorFinancing.swapHedge")}
                suffix="%"
                sizeLabel={theme.fonts.size.default}
                value={form.swapPercentage}
                type="number"
                id="swapPercentage"
                onChange={handleChange}
              />
            )}
          </Row>
        </>
      )}
      {tabActiveKey === "2" && (
        <>
          <Row gap="22px" m=" 0 0 24px 0" width="100%" justify="space-between">
            <Select
              width="100%"
              style={{ width: "33%" }}
              label={t("seniorFinancing.productionPrice")}
              placeholder={t("seniorFinancing.select")}
              sizeLabel={theme.fonts.size.default}
              arrowColor={theme.colors.gray200}
              value={form.productionPriceCurve}
              onChange={(value) => handleSelect(value, "productionPriceCurve")}
              options={productionPriceCurveOptions}
            />
            <Select
              width="100%"
              style={{ width: "33%" }}
              label={t("seniorFinancing.productionScenario")}
              placeholder={t("seniorFinancing.select")}
              sizeLabel={theme.fonts.size.default}
              arrowColor={theme.colors.gray200}
              value={form.productionScenario}
              onChange={(value) => handleSelect(value, "productionScenario")}
              options={productionScenarioOptions}
            />
          </Row>
          <Row>
            <Text color={theme.colors.gray500}>
              {t("seniorFinancing.contact")}
            </Text>
          </Row>
        </>
      )}
      {tabActiveKey === "3" && (
        <>
          <Row align="center" justify="center" gap="33px">
            <Row m="40px 0 0 0" align="center" justify="center" gap="12px">
              <Switch
                checked={form.switchCashSweepActivation}
                onChange={(checked) =>
                  handleSwitch(checked, "switchCashSweepActivation")
                }
              />
              <Text color={theme.colors.gray200}>
                {t("seniorFinancing.cash")}
              </Text>
            </Row>
            {form.switchCashSweepActivation && (
              <Input
                width="40%"
                label={t("seniorFinancing.cashRatio")}
                suffix="%"
                sizeLabel={theme.fonts.size.default}
                value={form.cashSweep}
                type="number"
                id="cashSweep"
                onChange={handleChange}
              />
            )}
          </Row>
        </>
      )}
    </>
  );
};

SeniorFinancing.propTypes = {
  form: PropTypes.object,
  setForm: PropTypes.func,
};
