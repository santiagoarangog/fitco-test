import React, { useState } from "react";
import PropTypes from "prop-types";
import { useTranslation } from "react-i18next";
import { Div, Text } from "../../../../styles/Common";
import { Center } from "../styles";
import { theme } from "../../../../styles/theme";

export const EmptyProject = ({ height }) => {
    const { t } = useTranslation(["projects", "common"]);
    return (
        <Center height={height}>
            <Div direction="column" height="100%" gap="27px" justify="flex-end" align="center">
                <Text 
                    color={theme.colors.blue} 
                    size={theme.fonts.size.h5}
                    weight={theme.fonts.weight.medium} 
                    style={{ alignSelf: "center" }}
                >
                    {t("empty.emptyText")}
                </Text>
                <Text size={theme.fonts.size.sm} color={theme.colors.gray300}>
                    {t("common:poweredBy")}
                </Text>
            </Div>
        </Center>
    )
};

EmptyProject.propTypes = {
    isCreated: PropTypes.bool,
    height: PropTypes.string
};