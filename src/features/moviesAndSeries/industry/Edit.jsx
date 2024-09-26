import { useCallback, useEffect, useMemo } from "react";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { zodResolver } from "@hookform/resolvers/zod";
import { closeModal } from "../../modal/modalSlice";
import FormInput from "../../../app/components/form/FormInput";
import FormTextArea from "../../../app/components/form/FormTextArea";
import Checkbox from "../../../app/components/form/CheckBox";
import FormButton from "../../../app/components/form/FormButton";
import useUpdateHook from "../../../hooks/useUpdateHook";
import EditSkeleton from "../../../app/components/skeletons/EditSkeleton";
import { countries } from "../../../enums/Country";
import {
  useGetIndustrysQuery,
  useUpdateIndustryMutation,
} from "./IndustryApiSlice";
import { IndustrySchema } from "../../../validation/industrySchema";
import FormSelect from "../../../app/components/form/FormSelect";
import { movieCities } from "../../../enums/MovieCity";
import { languages } from "../../books/Language";

export const Edit = ({ data, isLoading, modalId }) => {
  const dispatch = useDispatch();
  const { data: getDatas } = useGetIndustrysQuery();

  const schema = IndustrySchema(getDatas, data?.name);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    control,
    setValue,
    reset,
    watch,
  } = useForm({
    resolver: zodResolver(schema),
    defaultValues: {
      name: data?.name || "",
      origin_country: data?.origin_country || "",
      origin_city: data?.origin_city || [],
      popularity: data?.popularity || 0,
      language: data?.language || "",
      description: data?.description || "",
      status: data?.status,
    },
  });

  useEffect(() => {
    if (data) {
      setValue("name", data.name || "");
      setValue("origin_country", data.origin_country || "");
      setValue("origin_city", data.origin_city || []);
      setValue("popularity", data.popularity || 0);
      setValue("language", data.language || "");
      setValue("description", data.description || "");
      setValue("status", data.status);
    }
  }, [data, setValue]);

  const watchCountry = watch("origin_country");

  const filteredCities = useMemo(() => {
    const cities = movieCities.filter((city) => city.country === watchCountry);
    return cities.map((city) => ({
      value: city.value,
      label: city.label,
    }));
  }, [watchCountry]);

  const updateQuery = useUpdateIndustryMutation;
  const { onSubmit, isLoading: isUpdating } = useUpdateHook(updateQuery);

  const handleFormSubmit = useCallback(
    (datas) => {
      datas.popularity = Number(datas.popularity);

      onSubmit({ id: data._uuid, ...datas }).then(() => {
        reset();
        dispatch(closeModal(modalId));
      });
    },
    [onSubmit, reset, modalId, dispatch]
  );

  return isLoading ? (
    <EditSkeleton />
  ) : (
    <form onSubmit={handleSubmit(handleFormSubmit)} className="w-full p-4">
      <div className="grid grid-cols-1 md:grid-cols-6 gap-4">
        <FormInput
          label="Name"
          name="name"
          placeholder="Name"
          required={true}
          className="col-span-2"
          register={register}
          errors={errors}
          maxLength={40}
        />
        <FormSelect
          label="Origin Country"
          name="origin_country"
          control={control}
          required={true}
          className="col-span-2"
          options={countries}
        />
        <FormSelect
          label="Origin Cities"
          name="origin_city"
          control={control}
          required={true}
          className="col-span-2"
          options={filteredCities}
          isMulti={true}
          isDisabled={!watchCountry}
        />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-7 gap-4">
        <FormSelect
          label="Languages"
          name="language"
          control={control}
          required={true}
          className="col-span-2"
          options={languages}
        />
        <FormInput
          label="Popularity"
          type="number"
          name="popularity"
          placeholder="0"
          min="0"
          max="100"
          required={true}
          register={register}
          errors={errors}
          className="col-span-2"
          maxDigit={3}
        />
        <FormTextArea
          label="Description"
          name="description"
          className="col-span-3"
          placeholder="Description"
          register={register}
          errors={errors}
          maxLength={300}
        />
      </div>
      <Checkbox
        label="Status"
        name="status"
        className="mt-4"
        register={register}
      />
      <FormButton
        disabled={isUpdating || isSubmitting}
        isLoading={isUpdating || isSubmitting}
        text="Save"
      />
    </form>
  );
};
