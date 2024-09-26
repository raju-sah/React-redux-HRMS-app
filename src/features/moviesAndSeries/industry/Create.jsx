import { useCallback, useMemo } from "react";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { zodResolver } from "@hookform/resolvers/zod";
import Checkbox from "../../../app/components/form/CheckBox";
import FormButton from "../../../app/components/form/FormButton";
import usePostHook from "../../../hooks/usePostHook";
import { closeModal } from "../../modal/modalSlice";
import FormInput from "../../../app/components/form/FormInput";
import FormSelect from "../../../app/components/form/FormSelect";
import FormTextArea from "../../../app/components/form/FormTextArea";
import {
  useGetIndustrysQuery,
  usePostIndustryMutation,
} from "./IndustryApiSlice";
import { IndustrySchema } from "../../../validation/industrySchema";
import { countries } from "../../../enums/Country";
import { movieCities } from "../../../enums/MovieCity";
import { languages } from "../../books/Language";

export const Create = ({ modalId }) => {
  const dispatch = useDispatch();
  const { data: getDatas } = useGetIndustrysQuery();
  const schema = IndustrySchema(getDatas);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    control,
    reset,
    watch,
  } = useForm({
    resolver: zodResolver(schema),
    defaultValues: {
      origin_country: "",
      origin_city: [],
    },
  });

  const postQuery = usePostIndustryMutation;
  const { onSubmit, isLoading } = usePostHook(postQuery);

  const watchCountry = watch("origin_country");

  const filteredCities = useMemo(() => {
    const cities = movieCities.filter((city) => city.country === watchCountry);
    return cities.map((city) => ({
      value: city.value,
      label: city.label,
    }));
  }, [watchCountry]);
  const handleFormSubmit = useCallback(
    (data) => {
      data.popularity = Number(data.popularity);
      data.status = Boolean(data.status);

      onSubmit(data).then(() => {
        reset();
        dispatch(closeModal(modalId));
      });
    },
    [onSubmit, reset, modalId, dispatch]
  );

  return (
    <form
      onSubmit={handleSubmit(handleFormSubmit)}
      className="mx-auto p-2 mt-5 rounded-lg"
    >
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
          className="col-span-2"
          options={countries}
        />
        <FormSelect
          label="Origin Cities"
          name="origin_city"
          control={control}
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
        disabled={isLoading || isSubmitting}
        isLoading={isLoading}
        text="Save"
      />
    </form>
  );
};
