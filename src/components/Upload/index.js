import React from "react";
import PropTypes from "prop-types";
import { Upload as AntdUpload, Row, Col } from "antd";
import { useTranslation } from "react-i18next";
import { Div, Text } from "../../styles/Common";
import { CloseIcon, DeleteIcon, UploadIcon } from "../../assets/icons";
import { WrapperDocIcon, WrapperDocument } from "../../pages/Documents/styles";
import { formatFileSize } from "../../utilities/helpers";
import { theme } from "../../styles/theme";
import documentIcon from "../../assets/icons/Document-gray.svg";

export const Upload = ({ docsList, handleRemoveDocument, handleUploadDocument, documentCode, direction }) => {
  const { t } = useTranslation("documents");
  const rowStyle = direction === "row";

  return (
    <Div direction={direction} gap={rowStyle ? "23px" : "0px"} width="100%">
      <Div
        style={{ cursor: "pointer" }}
        direction="column"
        background={theme.colors.green100}
        minwidth="426px"
        radius="7px"
        justify="center"
        align="center"
        p="16px 0 24px 0"
        border="1px dashed"
        borderColor={theme.colors.gray200}
        height="156px"
      >
        <AntdUpload
          multiple={true}
          showUploadList={false}
          onChange={documentCode ? (file) => handleUploadDocument(file, documentCode) : handleUploadDocument}
        >
          <Div
            background={theme.colors.gray100}
            radius="50%"
            width="38px"
            height="38px"
            justify="center"
            align="center"
            m="0 0 8px 0"
          >
            <UploadIcon fill={theme.colors.gray200} />
          </Div>
          <Div gap="5px" justify="center">
            <Text style={{ color: theme.colors.green }}>{t("uploadMessage1")}</Text>
            <Text mb="7px" color={theme.colors.gray500}>
              {t("uploadMessage2")}
            </Text>
          </Div>
          <Text color={theme.colors.gray300} size={theme.fonts.size.sm}>
            {t("uploadAlert")}
          </Text>
        </AntdUpload>
      </Div>
      {!rowStyle ? (
        <Div
          direction="column"
          m="21px 0 0 0"
          gap="12px"
          style={{
            maxHeight: "260px",
            height: "260px",
            overflowY: "auto",
          }}
        >
          {docsList?.map((ele, index) => (
            <WrapperDocument key={ele.id}>
              <Div gap="14px">
                <WrapperDocIcon>
                  <img alt="doc" src={documentIcon} />
                </WrapperDocIcon>
                <Div direction={"column"} gap={"4px"}>
                  <Text color={theme.colors.gray300}>{ele.name.length > 18 ? `${ele.name.slice(0, 17)}...` : ele.name}</Text>
                  <Text color={theme.colors.green} size={theme.fonts.size.sm}>
                    {formatFileSize(ele.size)}
                  </Text>
                </Div>
              </Div>
              <Div>
                <CloseIcon
                  fill={theme.colors.gray200}
                  style={{ cursor: "pointer" }}
                  onClick={documentCode ? () => handleRemoveDocument(index, documentCode) : () => handleRemoveDocument(index)}
                />
              </Div>
            </WrapperDocument>
          ))}
        </Div>
      ) : (
        <Row gutter={[16, 16]} style={{ width: "100%" }}>
          {docsList?.map((ele, index) => (
            <Col md={12} key={ele.id} style={{ maxWidth: "min-content" }}>
              <WrapperDocument
                style={{
                  width: "277px",
                  background: theme.colors.light,
                  borderColor: theme.colors.gray100,
                }}
              >
                <Div direction={"column"} gap={"4px"}>
                  <Text color={theme.colors.gray300}>{ele.name.length > 18 ? `${ele.name.slice(0, 17)}...` : ele.name}</Text>
                  <Text color={theme.colors.green} size={theme.fonts.size.sm}>
                    {formatFileSize(ele.size)}
                  </Text>
                </Div>
                <Div>
                  <DeleteIcon
                    fill={theme.colors.green}
                    style={{ cursor: "pointer" }}
                    onClick={documentCode ? () => handleRemoveDocument(index, documentCode) : () => handleRemoveDocument(index)}
                  />
                </Div>
              </WrapperDocument>
            </Col>
          ))}
        </Row>
      )}
    </Div>
  );
};

Upload.propTypes = {
  docsList: PropTypes.array,
  handleRemoveDocument: PropTypes.func,
  handleUploadDocument: PropTypes.func,
  documentCode: PropTypes.string,
  direction: PropTypes.string,
};
