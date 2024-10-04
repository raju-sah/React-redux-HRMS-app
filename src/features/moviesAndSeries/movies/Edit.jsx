import { useCallback, useMemo } from "react";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { zodResolver } from "@hookform/resolvers/zod";
import { useGetMoviesQuery, useUpdateMovieMutation } from "./MovieApiSlice";
import { useGetGenresQuery } from "../genres/GenreApiSlice";
import { useGetIndustrysQuery } from "../industry/IndustryApiSlice";
import { closeModal } from "../../modal/modalSlice";
import useUpdateHook from "../../../hooks/useUpdateHook";
import EditSkeleton from "../../../app/components/skeletons/EditSkeleton";
import FormInput from "../../../app/components/form/FormInput";
import FormSelect from "../../../app/components/form/FormSelect";
import FormTextArea from "../../../app/components/form/FormTextArea";
import Checkbox from "../../../app/components/form/CheckBox";
import FormButton from "../../../app/components/form/FormButton";
import { MovieSchema } from "../../../validation/movieSchema";
import { movieRating } from "../../../enums/MovieRating";
import TagInput from "../../../app/components/form/TagInput";

export const Edit = ({ data, isLoading, modalId }) => {
  console.log(data);
  const { data: bookData } = useGetMoviesQuery();
  const schema = MovieSchema(bookData, data?.name);

  const dispatch = useDispatch();
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    control,
    setValue,
    reset,
  } = useForm({
    resolver: zodResolver(schema),
    defaultValues: {},
  });

  useMemo(() => {
    if (data) {
      Object.entries(data).forEach(([key, value]) => {
        setValue(key, value ?? (Array.isArray(value) ? [] : ''));
      });
    }
  }, [data, setValue]);

  const { data: genreData, isLoading: isGenreLoading } = useGetGenresQuery();
  const { data: industryData, isLoading: isindustryLoading } =
    useGetIndustrysQuery();

  const updateQuery = useUpdateMovieMutation;
  const { onSubmit, isLoading: isUpdating } = useUpdateHook(updateQuery);

  const handleFormSubmit = useCallback(
    (sendDatas) => {
      onSubmit({ id: data._uuid, ...sendDatas }).then(() => {
        reset();
        dispatch(closeModal(modalId));
      });
    },
    [onSubmit, reset, modalId, dispatch]
  );

  return isLoading ? (
    <EditSkeleton />
  ) : (
    <form
      onSubmit={handleSubmit(handleFormSubmit)}
      className="mx-auto p-2 mt-5 rounded-lg"
    >
      <div className="grid grid-cols-1 md:grid-cols-6 gap-4">
        <FormInput
          label="Image URL"
          name="image_url"
          type="url"
          placeholder="Image URL"
          required={true}
          className="col-span-2"
          register={register}
          errors={errors}
          maxLength="100"
        />
        <FormInput
          label="Name"
          name="name"
          placeholder="Name"
          required={true}
          className="col-span-2"
          register={register}
          errors={errors}
          maxLength="100"
        />

        <TagInput
          label="Directors Name"
          name="directors"
          required={true}
          className="col-span-2"
          placeholder="Enter names and separate by commas or enter.."
          control={control}
          errors={errors}
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-6 gap-4">
        <TagInput
          label="Actors Name"
          name="actors"
          required={true}
          className="col-span-3"
          placeholder="Enter names and separate by commas.."
          control={control}
          errors={errors}
        />
        <TagInput
          label="Producers Name"
          name="producers"
          required={true}
          className="col-span-3"
          placeholder="Enter names and separate by commas.."
          control={control}
          errors={errors}
        />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-8 gap-4 mt-4">
        <FormSelect
          label="Movie Rating"
          name="rating"
          control={control}
          required={true}
          className="col-span-2"
          options={movieRating}
        />
        <FormInput
          label="Release Date"
          name="release_date"
          type="date"
          placeholder="Release Date"
          required={true}
          className="col-span-2"
          register={register}
          errors={errors}
        />
        <div className="relative col-span-2">
          <FormInput
            label="Run Time Hour"
            type="number"
            name="run_time_hour"
            placeholder="2 digit number only"
            required={true}
            min={0}
            max={12}
            register={register}
            errors={errors}
            maxDigit={2}
          />
          <div className="absolute top-10 right-0 w-5 h-0.5 bg-gray-800 transform translate-x-full"></div>
        </div>

        <div className="relative col-span-2">
          <FormInput
            label="Run Time Minute"
            type="number"
            name="run_time_minute"
            placeholder="2 digit number only"
            required={true}
            min={0}
            max={59}
            register={register}
            errors={errors}
            maxDigit={2}
          />
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-6 gap-4 ">
        <FormSelect
          label="Genre"
          name="genre"
          control={control}
          required={true}
          isMulti={true}
          className="col-span-2"
          options={
            !isGenreLoading && genreData?.items
              ? genreData.items
                  .filter((item) => item.status === true)
                  .map((item) => ({
                    value: item._uuid,
                    label: item.name,
                  }))
              : []
          }
        />
        <FormSelect
          label="Industry"
          name="industry"
          control={control}
          required={true}
          className="col-span-2"
          options={
            !isindustryLoading && industryData?.items
              ? industryData.items
                  .filter((item) => item.status === true)
                  .map((item) => ({
                    value: item._uuid,
                    label: item.name,
                  }))
              : []
          }
        />
        <FormInput
          label="BO Collection(in USD Million)"
          type="number"
          name="bo_collection"
          placeholder="5 digit number only"
          required={true}
          min={0}
          register={register}
          errors={errors}
          className="col-span-2"
          maxDigit={5}
        />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <FormTextArea
          label="Description"
          name="description"
          className="col-span-3"
          placeholder="Description"
          register={register}
          errors={errors}
          maxLength="300"
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
