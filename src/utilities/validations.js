import Joi from "joi";
import tlds from "../../node_modules/@sideway/address/lib/tlds";
import moment from "moment";

const validatePassword = {
  password: Joi.string().required().min(4).max(25),
};

export const validateEmailRequired = {
  email: Joi.string()
    .email({ tlds: { allow: tlds } })
    .required(),
};

export const validateLoginForm = Joi.object({
  ...validateEmailRequired,
  ...validatePassword,
});

export const validateRegisterForm = Joi.object({
  name: Joi.string().required(),
  phone: Joi.number().allow("", null),
  ...validateEmailRequired,
  ...validatePassword,
  repeatPassword: Joi.string().required().valid(Joi.ref("password")).messages({
    "any.only": "Passwords must match",
  }),
});

export const validateResetPassword = Joi.object({
  password: validatePassword.password,
  repeatPassword: Joi.string().required().valid(Joi.ref("password")).messages({
    "any.only": "Passwords must match",
  }),
});

export const validateUserForm = Joi.object({
  Name: Joi.string().min(3).max(100).required(),
  CountryCodePhone: Joi.string().min(1).max(5).required(),
  Email: Joi.string()
    .email({ tlds: { allow: tlds } })
    .required(),
  PhoneNumber: Joi.number().required(),
  Password: Joi.string()
    .required()
    .pattern(
      new RegExp(
        /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-.]).{8,}$/
      )
    ),
  PasswordConfirmation: Joi.string()
    .required()
    .pattern(
      new RegExp(
        /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-.]).{8,}$/
      )
    ),
});

export const validateEditUserForm = Joi.object({
  Id: Joi.string().required(),
  Name: Joi.string().min(3).max(100).required(),
  CountryCodePhone: Joi.string().min(1).max(5).required(),
  Email: Joi.string()
    .email({ tlds: { allow: tlds } })
    .required(),
  PhoneNumber: Joi.number().required(),
});

export const validateNewProject = Joi.object({
  id: Joi.string().allow(null),
  isDraft: Joi.boolean().required(),
  isProspect: Joi.boolean().required(),
  projectType: Joi.object({
    instance: Joi.object({
      name: Joi.string().required(),
      order: Joi.number().required(),
    }).required(),
    kind: Joi.object({
      name: Joi.string().required(),
      order: Joi.number().required(),
    }).required(),
    type: Joi.object({
      name: Joi.string().required(),
      order: Joi.number().required(),
    }).required(),
  }).required(),
  teaserName: Joi.string().allow("", null),
  name: Joi.string().required(),
  socialStatus: Joi.number().required(),
  projectTotalMW: Joi.number().allow(null),
  acceptBuyOffers: Joi.boolean().allow(null),
  dueDiligence: Joi.boolean().allow(null),
  projectCostsOption: Joi.string().required(),
  capex: Joi.number().when("projectCostsOption", {
    is: "sponsorTotals",
    then: Joi.number().required().min(0),
    otherwise: Joi.number().optional(),
  }),
  substationCosts: Joi.number().when("projectCostsOption", {
    is: "sponsorDetails",
    then: Joi.number().required().min(0),
    otherwise: Joi.number().optional(),
  }),
  transmissionLineCosts: Joi.number().when("projectCostsOption", {
    is: "sponsorDetails",
    then: Joi.number().required().min(0),
    otherwise: Joi.number().optional(),
  }),
  turbinesCosts: Joi.number().when("projectCostsOption", {
    is: "sponsorDetails",
    then: Joi.number().required().min(0),
    otherwise: Joi.number().optional(),
  }),
  transformersCosts: Joi.number().when("projectCostsOption", {
    is: "sponsorDetails",
    then: Joi.number().required().min(0),
    otherwise: Joi.number().optional(),
  }),
  invertersCosts: Joi.number().when("projectCostsOption", {
    is: "sponsorDetails",
    then: Joi.number().required().min(0),
    otherwise: Joi.number().optional(),
  }),
  otherCosts: Joi.number().when("projectCostsOption", {
    is: "sponsorDetails",
    then: Joi.number().required().min(0),
    otherwise: Joi.number().optional(),
  }),
  solarPanelsCosts: Joi.number().when("projectCostsOption", {
    is: "sponsorDetails",
    then: Joi.number().required().min(0),
    otherwise: Joi.number().optional(),
  }),
  opexOption: Joi.string().required(),
  omPerMW: Joi.number().required().min(0),
  assetManagmentPerMW: Joi.number().required().min(0),
  insurancesPerMW: Joi.number().required().min(0),
  networkAccessCostsPerMW: Joi.number().required().min(0),
  localTaxesPerMW: Joi.number().required().min(0),
  otherCostsPerMW: Joi.number().required().min(0),
  marketAgencyCostsPerMW: Joi.number().required().min(0),
  agreementType: Joi.number().required(),
  agreementPPAElectricitySoldPercentage: Joi.number().when("agreementType", {
    is: Joi.number().valid(1, 3, 4),
    then: Joi.number().required(),
    otherwise: Joi.number().optional(),
  }),
  agreementMarketElectricitySoldPercentage: Joi.number().when("agreementType", {
    is: Joi.number().valid(1, 3, 4),
    then: Joi.number().required(),
    otherwise: Joi.number().optional(),
  }),
  agreementPPAPrice: Joi.number().when("agreementType", {
    is: Joi.number().valid(1, 3, 4),
    then: Joi.number().required(),
    otherwise: Joi.number().optional(),
  }),
  agreementPPATerm: Joi.number().when("agreementType", {
    is: Joi.number().valid(1, 3, 4),
    then: Joi.number().required(),
    otherwise: Joi.number().optional(),
  }),
  agreementPPASaleVolumeCommitment: Joi.boolean().when("agreementType", {
    is: Joi.number().valid(1, 3, 4),
    then: Joi.boolean().required(),
    otherwise: Joi.boolean().optional(),
  }),
  sponsor: Joi.object({
    sponsorDescription: Joi.string().allow("", null),
    sponsorName: Joi.string().required(),
  }).required(),
  company: Joi.object({
    _id: Joi.string().required(),
    name: Joi.string().required(),
    domain: Joi.string().required(),
    experiencesYears: Joi.number().required(),
    completedProjects: Joi.number().required(),
    totalMW: Joi.number().required(),
    countries: Joi.array().items(Joi.string()).required(),
  }).required(),
  plants: Joi.array(),
  owner: Joi.string().allow("", null),
  ownerId: Joi.string().allow("", null),
  precioOrientativoMW: Joi.string().required().allow(""),
  consideracionesSobrePrecio: Joi.string().required().allow(""),
});

export const validatePlantForm = Joi.object({
  name: Joi.string().required(),
  potenciaPico: Joi.number().min(1),
  horasEquivalentes: Joi.number().min(500),
  horasEquivalentes90: Joi.number().min(500),
});

export const validateInviteUserForm = Joi.object({
  name: Joi.string().required(),
  ...validateEmailRequired,
  role: Joi.array().required(),
});

const customDateValidator = (value, helpers) => {
  const date = moment(value);
  if (date.isValid()) {
    return value;
  } else {
    return helpers.error("date.invalid");
  }
};
export const validateDealIntelForm = Joi.object({
  financingTerm: Joi.string().required(),
  ncTarget: Joi.number().min(1).required(),
  priceSensitivity: Joi.string().required(),
  targetDate: Joi.custom(
    customDateValidator,
    "custom date validation"
  ).required(),
  targetLeverage: Joi.number().min(1).required(),
  competitiveProcess: Joi.bool().required(),
  otherAspects: Joi.string().allow(""),
});

export const validateScraperEditInfo = Joi.object({
  name: Joi.string().required(),
  peakPower: Joi.number().required(),
  SPVName: Joi.string().required(),
  motherCompany: Joi.string().required(),
});

export const validateNewInvestmentGroupForm = (data, companyType) => {
  const schema = Joi.object({
    nameCompany: Joi.string().required(),
    address: Joi.string().optional().allow(null, ""),
    document: Joi.any().optional(),
    logo: Joi.any().optional(),
  });

  return schema.validate(data, { context: { companyType } });
};

export const validateInviteInvestor = Joi.object({
  name: Joi.string().required(),
  position: Joi.string().required(),
  ...validateEmailRequired,
});
export const validateArrayInviteInvestor = Joi.array()
  .items(validateInviteInvestor)
  .min(1);

export const validateDiscartProject = Joi.object({
  reason: Joi.string().required(),
  comment: Joi.string().when("reason", {
    is: Joi.string().valid("Lack of information", "Others"),
    then: Joi.required(),
    otherwise: Joi.allow(""),
  }),
});
