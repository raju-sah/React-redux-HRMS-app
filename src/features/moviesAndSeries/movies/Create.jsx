import { useCallback } from "react";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { zodResolver } from "@hookform/resolvers/zod";
import FormInput from "../../../app/components/form/FormInput";
import FormSelect from "../../../app/components/form/FormSelect";
import FormTextArea from "../../../app/components/form/FormTextArea";
import Checkbox from "../../../app/components/form/CheckBox";
import FormButton from "../../../app/components/form/FormButton";
import { closeModal } from "../../modal/modalSlice";
import usePostHook from "../../../hooks/usePostHook";
import { useGetMoviesQuery, usePostMovieMutation } from "./MovieApiSlice";
import { useGetIndustrysQuery } from "../industry/IndustryApiSlice";
import { useGetGenresQuery } from "../genres/GenreApiSlice";
import { MovieSchema } from "../../../validation/movieSchema";
import TagInput from "../../../app/components/form/TagInput";
import { movieRating } from "../../../enums/MovieRating";

export const Create = ({ modalId }) => {
  const { data: bookData } = useGetMoviesQuery();
  const schema = MovieSchema(bookData);

  const dispatch = useDispatch();
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    control,
    reset,
  } = useForm({
    resolver: zodResolver(schema),
  });

  const { data: genreData, isLoading: isGenreLoading } = useGetGenresQuery();
  const { data: industryData, isLoading: isindustryLoading } =
    useGetIndustrysQuery();

  const postQuery = usePostMovieMutation;
  const { onSubmit, isLoading } = usePostHook(postQuery);

  const handleFormSubmit = useCallback(
    (data) => {
console.log(data);
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
          register={register}
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
          register={register}
          errors={errors}
        />
        <TagInput
          label="Producers Name"
          name="producers"
          required={true}
          className="col-span-3"
          placeholder="Enter names and separate by commas.."
          register={register}
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
          isMulti={true}
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
          placeholder="10 digit number only"
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
        disabled={isLoading || isSubmitting}
        isLoading={isLoading}
        text="Save"
      />
    </form>
  );
};
