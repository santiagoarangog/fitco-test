import React from "react";
import { Div, Text } from "../../../../styles/Common";
import { theme } from "../../../../styles/theme";
import Drawer from "../../../../components/Drawer";
import Checkbox from "../../../../components/Checkbox";
import { Button } from "../../../../components/Button";
import { Link } from "../../../../components/Link";
import { useTranslation } from "react-i18next";
import PropTypes from 'prop-types';

export const DrawerFilter = ({
    openDrawer,
    handleClose,
    filterValues,
    handleChange,
    handleCleanFilters,
    handleSaveFilters
}) => {
    const { t } = useTranslation("projects");

    return (
        <Drawer
            title={t("filter.title")}
            open={openDrawer}
            onClose={handleClose}
        >
            <Div direction="column" height="100%" justify="space-between">
                <Div height="50%" direction="column">
                    <Div style={{ marginBottom: '0.5rem' }}>
                        <Text
                            size={theme.fonts.size.h5i}
                            color={theme.colors.blue}
                            weight={theme.fonts.weight.medium}
                            mt={"4rem"}
                        >
                            {t("filter.type")}
                        </Text>
                    </Div>
                    <Div style={{ marginBottom: '1rem' }}>
                        <Checkbox.Group style={{ display: 'flex', flexDirection: 'row' }}>
                            <Checkbox
                                label={t("filter.solar")}
                                onChange={handleChange('type', 'solar')}
                                checked={filterValues.type.solar}
                            >
                            </Checkbox>
                            <Checkbox
                                label={t("filter.eolic")}
                                onChange={handleChange('type', 'eolico')}
                                checked={filterValues.type.eolico}
                            >
                            </Checkbox>
                        </Checkbox.Group>
                    </Div>
                    <hr
                        style={{
                            width: "100%",
                            border: `1px solid ${theme.colors.gray100}`,
                            opacity: 1,
                            margin: "20.5px 0 21.5px 0",
                        }}
                    />
                    <Div style={{ marginBottom: '0.5rem' }}>
                        <Text
                            size={theme.fonts.size.h5i}
                            color={theme.colors.blue}
                            weight={theme.fonts.weight.medium}
                        >
                            {t("filter.instance")}
                        </Text>
                    </Div>
                    <Div style={{ marginBottom: '1rem' }}>
                        <Checkbox.Group style={{ display: 'flex', flexDirection: 'row' }}>
                            <Checkbox
                                label={t("filter.sale")}
                                onChange={handleChange('instance', 'sale')}
                                checked={filterValues.instance.sale}
                            >

                            </Checkbox>
                            <Checkbox
                                label={t("filter.financing")}
                                onChange={handleChange('instance', 'financing')}
                                checked={filterValues.instance.financing}
                            >

                            </Checkbox>
                        </Checkbox.Group>
                    </Div>
                    <hr
                        style={{
                            width: "100%",
                            border: `1px solid ${theme.colors.gray100}`,
                            opacity: 1,
                            margin: "20.5px 0 21.5px 0",
                        }}
                    />
                </Div>
                <Div direction="column" align="center" justify="center" gap="24px">
                    <Button
                        width={"169px"}
                        onClick={handleSaveFilters}
                    >
                        {t("filter.save")}
                    </Button>
                    <Link onClick={handleCleanFilters}>{t("filter.clean")}</Link>
                </Div>
            </Div>
        </Drawer>
    );
};

DrawerFilter.propTypes = {
    openDrawer: PropTypes.bool.isRequired,
    handleClose: PropTypes.func.isRequired,
    filterValues: PropTypes.shape({
        type: PropTypes.shape({
            solar: PropTypes.bool.isRequired,
            eolico: PropTypes.bool.isRequired,
        }),
        instance: PropTypes.shape({
            sale: PropTypes.bool.isRequired,
            financing: PropTypes.bool.isRequired,
        })
    }).isRequired,
    handleChange: PropTypes.func.isRequired,
    handleCleanFilters: PropTypes.func.isRequired,
    handleSaveFilters: PropTypes.func.isRequired
};  
