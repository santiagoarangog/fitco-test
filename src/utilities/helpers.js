import decode from "jwt-decode";
import { axiosClient } from "../core/services/axiosInstance";
import moment from "moment-timezone";

export const setLocalValue = (name, value) => {
  localStorage.setItem(name, value);
};

export const getToken = () => {
  const user = localStorage.getItem("user");

  return user;
};
export const getUserInfo = () => {
  const user = localStorage.getItem("user")
    ? decode(localStorage.getItem("user"))
    : {
        role: null,
        id: null,
        name: "",
        companyId: null,
      };
  return user;
};

export const uploadFiles = async (file, url) => {
  const formData = new FormData();
  formData.append("File", file);
  return axiosClient.post(url, formData);
};

export const download = async (url, filename, instance, token) =>
  instance
    .post(
      url,
      {},
      {
        responseType: "blob",
        headers: { Authorization: token },
      }
    )
    .then(
      (response) => {
        const pdfUrl = window.URL.createObjectURL(new Blob([response.data]));
        const a = document.createElement("a");
        a.href = pdfUrl;
        a.setAttribute("download", `${filename}`);
        document.body.appendChild(a);
        a.click();
        a.remove();
      },
      (e) => {
        return Promise.reject(e);
      }
    );

export const downloadFile = async (url, filename, instance, token) =>
  instance
    .get(url, {
      responseType: "blob",
      headers: { Authorization: `Bearer ${token}` },
    })
    .then((response) => {
      const contentType = response.headers["content-type"];
      const pdfUrl = window.URL.createObjectURL(
        new Blob([response.data], { type: contentType })
      );
      const a = document.createElement("a");
      a.href = pdfUrl;
      a.setAttribute("download", `${filename}`);
      document.body.appendChild(a);
      a.click();
      a.remove();
    })
    .catch((error) => {
      return Promise.reject(error);
    });

export const downloadAndOpenFile = async (url, filename, instance, token) =>
  instance
    .get(url, {
      responseType: "blob",
      headers: { Authorization: `Bearer ${token}` },
    })
    .then((response) => {
      const contentType = response.headers["content-type"];
      const pdfUrl = window.URL.createObjectURL(
        new Blob([response.data], { type: contentType })
      );
      window.open(pdfUrl, "_blank");
    })
    .catch((error) => {
      return Promise.reject(error);
    });

export const fetchImageUrl = async (url, token) => {
  try {
    const response = await axiosClient.get(url, {
      responseType: "blob",
      headers: { Authorization: `Bearer ${token}` },
    });

    const contentType = response.headers["content-type"];
    const imageUrl = window.URL.createObjectURL(
      new Blob([response.data], { type: contentType })
    );

    return imageUrl;
  } catch (error) {
    return Promise.reject(error);
  }
};

export const dateFormat = (value) => {
  // Crear el momento en la zona horaria de Irlanda
  const date = moment.tz(value, "Europe/Dublin");
  // Convertir a UTC
  const utcDate = date.utc();

  // Obtener el año, mes y día en UTC
  const year = utcDate.year();
  let month = utcDate.month() + 1; // Los meses son de 0 a 11
  let day = utcDate.date();

  // Formatear para asegurarse de que siempre sean dos dígitos
  if (month < 10) month = `0${month}`;
  if (day < 10) day = `0${day}`;

  return `${day}/${month}/${year}`;
};

export const commify = (n) => {
  var parts = n.toString().split(",");
  const numberPart = parts[0];
  const decimalPart = parts[1];
  const thousands = /\B(?=(\d{3})+(?!\d))/g;
  return (
    numberPart.replace(thousands, ",") + (decimalPart ? "." + decimalPart : "")
  );
};

export const nameLength = 100;
export const emailLength = 100;
export const phoneLength = 15;
export const passwordLength = 25;

export const getModule = {
  "/projects": "projects",
  "/my-account": "myAccount",
  "/my-account/change-password": "changePassword",
  "/projects/new-project": "newProject",
  "/projects/new-plant": "newPlant",
  "/projects/project-detail": "projectDetail",
  "/projects/edit-project": "editProject",
  "/projects/info-plants": "infoPlants",
  "/projects/investor-project-detail": "projects",
  "/strategies": "strategies",
  "/strategies/source": "newSource",
  "/users": "users",
  "/users/invite-investor": "inviteInvestor",
  "/scraper": "scraper",
  "/projects/activity-project": "activityProject",
};

export const getInitials = (fullname) => {
  if (fullname === undefined || "") {
    return "";
  } else {
    const names = fullname.split(" ");
    const nameInitial = names[0].charAt(0).toUpperCase();
    let lastnameInitial = "";
    if (names.length > 1) {
      lastnameInitial = names[names.length - 1].charAt(0).toUpperCase();
    }
    return `${nameInitial}${lastnameInitial}`;
  }
};

export const getLabelFromValue = (value, options) => {
  const option = options.find((option) => option.value === value);
  return option ? option.label : null;
};
export const socialStatusOptions = [
  { value: 1, label: "Todos los proyectos pertenecen a una única sociedad" },
  {
    value: 2,
    label:
      "Los proyectos pertenecen a distintas sociedades que a su vez cuelgan de una única sociedad holding",
  },
  { value: 3, label: "En definición" },
];

export const optionsEnergySalesScheme = [
  {
    label: "100% Contrato de venta de energía (PPA)",
    value: 1,
  },
  {
    label: "100% Venta a mercado (Merchant)",
    value: 2,
  },
  { label: "Híbrido", value: 3 },
  {
    label: "Subasta",
    value: 4,
  },
];

export const landsOptions = [
  {
    value: 1,
    label: "Propiedad",
  },
  {
    value: 2,
    label: "Arrendamiento",
  },
  {
    value: 3,
    label: "Pendiente",
  },
];

export const formatThousandsValue = (value) => {
  if (value > 900000) {
    return value / 1000000 + "M";
  } else if (value > 900) {
    return value / 1000 + "K";
  } else {
    return value?.toString() || 0;
  }
};

export const formatFileSize = (bytes) => {
  return (bytes / (1024 * 1024)).toFixed(2) + " Mb";
};

export const InitInvestorFilters = {
  "filters.type": [
    { label: "filters.solar", value: "solar", checked: false },
    { label: "filters.eolic", value: "eolic", checked: false },
  ],
  "filters.capacity": [
    { label: "- 10MW", value: "-10", checked: false },
    { label: "10MW - 50MW", value: "10-50", checked: false },
    { label: "+ 50MW", value: "+50", checked: false },
  ],
  "filters.countries": [
    { label: "España", value: "es", checked: false },
    { label: "Reino Unido", value: "uk", checked: false },
    { label: "Italia", value: "it", checked: false },
    { label: "USA", value: "us", checked: false },
  ],
  "filters.phase": [
    { label: "Pre-development", value: 1, checked: false },
    { label: "Development", value: 2, checked: false },
    { label: "RtB or Rtf Imminent", value: 3, checked: false },
    { label: "Construction", value: 4, checked: false },
    { label: "Operation", value: 5, checked: false },
  ],
  "filters.strategy": [
    { label: "Minority Equity Shareholding", value: 1, checked: false },
    { label: "Co-develpment", value: 2, checked: false },
    { label: "Assest Acquisition", value: 3, checked: false },
    { label: "Construction Bridge Debt - DI", value: 4, checked: false },
    { label: "Development Bridge Debt - DI", value: 5, checked: false },
  ],
};

export const formatNumberOpex = (value, language) => {
  value = String(value);
  let integerPart, decimalPart
  if (language === "es") {
    [integerPart, decimalPart] = value.split(",")
  } else {
    [integerPart, decimalPart] = value.split(".")
  }
  integerPart = integerPart.slice(0,5)
  if (language === "es") {
    integerPart = integerPart.replace(/\B(?=(\d{3})+(?!\d))/g, ".");
  } else {
    integerPart = integerPart.replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  }

  if (decimalPart){
    decimalPart = decimalPart.slice(0,2)
    if (language === "es")
    {
    return `${integerPart},${decimalPart}`
    } else {
          return `${integerPart}.${decimalPart}`
    }
  } else if (!value.includes(",")){
    if (value.includes("."))
    {
      return value
    }
    return integerPart
  } else {
    return value
  }

};

export const unformatNumberOpex = (value, language) => {
  if (language === "es") {
    return value.replace(".", "")
  } else {
    return value.replace(",", "")
  }
};

export const formatNumber = (value, language) => {
  const formatter = new Intl.NumberFormat(language, {
    minimumFractionDigits: 0,
  });
  return formatter.format(value);
};

export const unformatNumber = (value, language) => {
  if (language === "es") {
    return value.replace(/\./g, "").replace(/,/g, ".");
  } else {
    return value.replace(/,/g, "");
  }
};

export const projectStatusPromoter = {
  1: "phase_I",
  2: "phase_II",
};

export const projectStatusManager = {
  1: "structuring",
  2: "readyToDistribute",
  3: "termsheetSent",
  4: "termsheetRejected",
  5: "termsheetSigned",
  6: "projectClosed",
  7: "dealIntel",
  8: "phaseTwo",
};

export const getLabelAssetType = (value) => {
  switch (value) {
    case 1:
      return "Solar PV Plants";
    case 2:
      return "Onshore Wind Farms";
    case 3:
      return "Rooftop Solar Installations";
    case 4:
      return "Offshore Wind Farms";
    case 5:
      return "BESS";
    default:
      return null;
  }
};

export const getLabelAssetVertical = (value) => {
  switch (value) {
    case "Solar PV Plants":
      return "Solar PV Plants";
    case 'Onshore Wind Farms"':
      return "Onshore Wind Farms";
    default:
      return null;
  }
};
