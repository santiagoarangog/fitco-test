import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { ModuleContainer } from "../../styles/Common";
import { BasicData } from "./components/BasicData";
import { CompanyData } from "./components/CompanyData";
import useGetUserInfo from "./hooks/useGetUser";
import { getUserInfo } from "../../utilities/helpers";
import useGetCountries from "../../core/hooks/useGetCountries";
import useUpdateUser from "./hooks/useUpdateUser";
import { useQueryClient } from "react-query";
import { useTranslation } from "react-i18next";
import { InvestorCompanyData } from "./components/InvestorCompanyData";

export const MyAccount = () => {
  const { t } = useTranslation("common");
  const queryClient = useQueryClient();
  const update = useUpdateUser();
  const userId = getUserInfo()?.id;
  const userInfo = useGetUserInfo(userId);
  const { isSuccess, data } = userInfo;
  const [userData, setUserData] = useState({
    _id: null,
    name: "",
    role: [],
    phone: "",
    email: "",
    createdAt: null,
    companyId: "",
    company: {
      _id: "",
      name: "",
      domain: "",
      countries: [],
      experiencesYears: null,
      completedProjects: null,
      totalMW: null,
    },
  });
  const countries = useGetCountries();
  const { isSuccess: isSuccessCountries, data: dataCountries } = countries;
  const [countriesOptions, setCountriesOptions] = useState([]);
  const [country, setCountry] = useState(null);

  useEffect(() => {
    if (isSuccess && data) {
      const dataUser = data?.data?.result.data.user;
      const countriesNames = dataUser?.company?.countries
        ? dataUser?.company?.countries?.map((ele) => {
            const country = countriesOptions.find((elem) => elem.code === ele);
            return country ? country?.value : null;
          })
        : [];
      setUserData({
        ...dataUser,
        company: {
          ...dataUser.company,
          countries: countriesNames,
          experiencesYears: dataUser.company.experiencesYears | null,
          completedProjects: dataUser.company.completedProjects | null,
          totalMW: dataUser.company.totalMW | null,
        },
      });
    }
  }, [isSuccess, data, countriesOptions]);

  useEffect(() => {
    if (isSuccessCountries && dataCountries) {
      setCountriesOptions(
        dataCountries?.data?.result.data.map((ele) => ({
          value: ele.name,
          code: ele.code,
        }))
      );
    }
  }, [isSuccessCountries, dataCountries]);

  const handleChange = (event) => {
    const { id, value } = event.target;
    const newUserData = { ...userData };

    newUserData[id] = value;
    setUserData(newUserData);
  };

  const handleChangeCompany = (event) => {
    const { id, value } = event.target;
    const newCompanyData = { ...userData.company };

    newCompanyData[id] = value.replace(/\D/g, "");
    setUserData({ ...userData, company: { ...newCompanyData } });
  };

  const handleChangeCountry = (value) => {
    setCountry(value);
  };

  const handleSelect = (value) => {
    let newCountries = [...userData.company.countries];
    newCountries = [...newCountries, value];
    setUserData({
      ...userData,
      company: { ...userData.company, countries: newCountries },
    });
    setCountry(null);
  };

  const handleDelete = (indx) => {
    const countries = [...userData.company.countries];
    const newCountries = countries.filter((ele, index) => index !== indx);
    setUserData({
      ...userData,
      company: { ...userData.company, countries: newCountries },
    });
  };

  const handleUpdate = () => {
    const countriesCodes = userData?.company?.countries
      ? userData?.company?.countries?.map((ele) => {
          const country = countriesOptions.find((elem) => elem.value === ele);
          return country ? country.code : null;
        })
      : [];
    const newUserData = {
      ...userData,
      company: { ...userData.company, countries: countriesCodes },
    };
    delete newUserData.createdAt;
    update.reset();
    update.mutate(
      { ...newUserData },
      {
        onSuccess: () => {
          queryClient.invalidateQueries(["getUserInfo", userId]);
        },
        onError: (err) => {
          toast.error(t(`common:${err.response.data.result.code}`));
        },
      }
    );
  };

  return (
    <ModuleContainer direction="row" style={{ gap: "16px" }}>
      <BasicData userData={userData} handleChange={handleChange} />
      {userData.role[0] === "Investor" ? (
        <InvestorCompanyData
          countriesOptions={countriesOptions}
          userData={userData}
          handleSelect={handleSelect}
          country={country}
          handleChangeCountry={handleChangeCountry}
          handleChangeCompany={handleChangeCompany}
          handleDelete={handleDelete}
          handleUpdate={handleUpdate}
          loading={update.isLoading}
        />
      ) : (
        <CompanyData
          countriesOptions={countriesOptions}
          userData={userData}
          handleSelect={handleSelect}
          country={country}
          handleChangeCountry={handleChangeCountry}
          handleChangeCompany={handleChangeCompany}
          handleDelete={handleDelete}
          handleUpdate={handleUpdate}
          loading={update.isLoading}
        />
      )}
    </ModuleContainer>
  );
};
