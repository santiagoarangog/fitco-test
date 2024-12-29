import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import ReactLoading from "react-loading";
import { Modal } from "../../../components/Modal";
import { theme } from "../../../styles/theme";
import { Div } from "../../../styles/Common";
import { fetchImageUrl, getToken } from "../../../utilities/helpers";
import toast from "react-hot-toast";

export const ModalLogo = ({ showModal, handleClose, selectedCompany }) => {
  const [imageUrl, setImageUrl] = useState(null);

  useEffect(() => {
    const loadImage = async () => {
      if (selectedCompany) {
        try {
          const url = `documentation/download-by-company?category=9&companyId=${selectedCompany}`;
          const image = await fetchImageUrl(url, getToken());
          setImageUrl(image);
        } catch (error) {
          toast.error("Error fetching the image:", error);
        }
      }
    };

    loadImage();
  }, [selectedCompany]);

  return (
    <Modal
      open={showModal}
      onCancel={() => {
        setImageUrl(null);
        handleClose();
      }}
      width={"478px"}
    >
      <Modal.Body align={"center"} padding="20px ">
        {imageUrl ? (
          <img
            src={imageUrl}
            alt="Logo"
            style={{ maxWidth: "100%", height: "auto" }}
          />
        ) : (
          <Div width="100%" height="100%" justify="center" align="center">
            <ReactLoading color={theme.colors.green} />
          </Div>
        )}
      </Modal.Body>
    </Modal>
  );
};

ModalLogo.propTypes = {
  showModal: PropTypes.bool,
  handleClose: PropTypes.func,
  selectedCompany: PropTypes.string,
};
