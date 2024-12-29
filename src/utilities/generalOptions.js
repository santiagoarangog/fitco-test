export const PermissionsOptions = [
  { value: "DIA", label: "DIA" },
  { value: "AAP", label: "AAP" },
  { value: "AAC", label: "AAC" },
  { value: "DUP", label: "DUP" },
  { value: "IIA", label: "IIA" },
];

export const ProjectTypeOptions = [
  { value: "solar", label: "Solar" },
  { value: "eolic", label: "Eolic" },
];

export const AutonomousCommunitiesOptions = [
  { value: "Andalucía", label: "Andalucía" },
  { value: "Aragón", label: "Aragón" },
  { value: "Canarias", label: "Canarias" },
  { value: "Cantabria", label: "Cantabria" },
  { value: "Castilla y León", label: "Castilla y León" },
  { value: "Castilla-La Mancha", label: "Castilla-La Mancha" },
  { value: "Cataluña", label: "Cataluña" },
  { value: "Ciudad Autónoma de Ceuta", label: "Ciudad Autónoma de Ceuta" },
  { value: "Ciudad Autónoma de Melilla", label: "Ciudad Autónoma de Melilla" },
  { value: "Comunidad de Madrid", label: "Comunidad de Madrid" },
  { value: "Comunidad Foral de Navarra", label: "Comunidad Foral de Navarra" },
  { value: "Comunitat Valenciana", label: "Comunitat Valenciana" },
  { value: "Extremadura", label: "Extremadura" },
  { value: "Galicia", label: "Galicia" },
  { value: "Illes Balears", label: "Illes Balears" },
  { value: "La Rioja", label: "La Rioja" },
  { value: "País Vasco", label: "País Vasco" },
  { value: "Principado de Asturias", label: "Principado de Asturias" },
  { value: "Región de Murcia", label: "Región de Murcia" },
];

export const amortizationProfileOptions = [
  { value: 1, label: "Bullet" },
  { value: 2, label: "Partially amortizing" },
  { value: 3, label: "Fully amortizing" },
];

export const debtProfileOptions = [
  { value: 1, label: "Bullet" },
  { value: 2, label: "Partially amortizing" },
  { value: 3, label: "Fully amortizing" },
];

export const interestOptions = [
  { value: 2, label: "Variable" },
  { value: 1, label: "Fijo" },
];

export const interestRates = [
  { value: "Variable", label: "Variable" },
  { value: "Fijo", label: "Fijo" },
];

export const NonCall = [
  { value: "1", label: "1" },
  { value: "2", label: "2" },
  { value: "3", label: "3" },
  { value: "4", label: "4" },
  { value: "5", label: "5" },
  { value: "6", label: "6" },
  { value: "7", label: "7" },
  { value: "8", label: "8" },
  { value: "9", label: "9" },
  { value: "10", label: "10" },
  { value: "11", label: "11" },
  { value: "12", label: "12" },
  { value: "13", label: "13" },
  { value: "14", label: "14" },
  { value: "15", label: "15" },
];

export const productionPriceCurveOptionsForAnexOne = [
  { value: "Central curve", label: "Central curve" },
  { value: "Low curve", label: "Low curve" },
  { value: "Avg. central and low", label: "Avg. central and low" },
];

export const productionPriceCurveOptions = [
  { value: "Market 1 - High", label: "Market 1 - High" },
  { value: "Market 1 - Central", label: "Market 1 - Central" },
  { value: "Market 1 - Low", label: "Market 1 - Low" },
  { value: "Market 2 - Central", label: "Market 2 - Central" },
  { value: "Market 2 - Low", label: "Market 2 - Low" },
];

export const productionScenarioOptions = [
  { value: "P90", label: "P90" },
  { value: "P50", label: "P50" },
];

export const developmentRiskOptions = [
  { value: "On the Acquirer", label: "On the Acquirer" },
  {
    value: "On the Seller",
    label: "On the Seller",
  },
];

export const assetTypeOptions = [
  { value: 1, label: "Solar PV Plants" },
  { value: 2, label: "Onshore Wind Farms" },
  { value: 3, label: "Rooftop Solar Installations" },
  { value: 4, label: "Offshore Wind Farms" },
  { value: 5, label: "BESS" },
];

export const assetVerticalptions = [
  { value: 1, label: "Solar PV Plants" },
  { value: 2, label: "Onshore Wind Farms" },
];

export const projectStateOptions = [
  { value: "Pre-development phase", label: "Pre-development phase" },
  { value: "Development", label: "Development" },
  { value: "RtB or RtB imminent", label: "RtB or RtB imminent" },
  { value: "Construction", label: "Construction" },
  { value: "Operation", label: "Operation" },
];

export const countriesOptions = [
  { value: "España", label: "España" },
  { value: "Reino Unido", label: "Reino Unido" },
  { value: "Estados Unidos", label: "Estados Unidos" },
  { value: "Italia", label: "Italia" },
];

export const autonomousOptions = [
  { value: "Aragón", label: "Aragón" },
  { value: "Navarra", label: "Navarra" },
  { value: "Andalucía", label: "Andalucía" },
  { value: "Islas Canarias", label: "Islas Canarias" },
  { value: "La Rioja", label: "La Rioja" },
];

export const currencyOptions = [
  { value: "EUR", label: "EUR" },
  { value: "GBP", label: "GBP" },
  { value: "USD", label: "USD" },
];

export const projectProfileOptions = [
  {
    value: 1,
    label: "100% Contrato de venta de energía (PPA)",
  },
  {
    value: 2,
    label: "100% Venta a mercado (Merchant)",
  },
  {
    value: 3,
    label: "Híbrido",
  },
  { value: 4, label: "Subasta" },
];

export const paymentOptions = [
  { value: "Open for negotiation", label: "Open for negotiation" },
  { value: "Minimum payment at closing", label: "Minimum payment at closing" },
];

export const profileOptions = [
  { value: "Bullet", label: "Bullet" },
  { value: "Balloon at maturity", label: "Balloon at maturity" },
  { value: "Fully amortizing", label: "Fully amortizing" },
];

export const sellOptions = [
  { value: "Full sale", label: "Full sale" },
  { value: "Majority stake", label: "Majority stake" },
  { value: "Minority stake", label: "Minority stake" },
];

export const boolOptions = [
  { value: true, label: "True" },
  { value: false, label: "False" },
];

export const InterestCalculationBase = [
  { value: "360", label: "ICB_360" },
  { value: "365", label: "ICB_365" },
];

export const generateYearsArray = () => {
  const currentYear = new Date().getFullYear();
  const years = [];

  for (let year = 2000; year <= currentYear; year++) {
    years.push({ value: year, label: year });
  }

  return years;
};
