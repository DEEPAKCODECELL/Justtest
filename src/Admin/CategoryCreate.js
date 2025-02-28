import React, { useState } from "react";
import { ScrollView, Alert } from "react-native";
import { z } from "zod";
import tw from "../../tailwind";
import GlobalForm from "../GlobalForm";

const createCategorySchema = z.object({
  category: z.string().min(2, { message: "Category must be at least 2 characters long" }),
  description: z.string().min(10, { message: "Description must be at least 10 characters long" }),
  images: z.array(z.string().url({ message: "Each image must be a valid URL" })),
});

const CategoryCreate = () => {
  const handleSubmit = (formData) => {
    const parsedData = createCategorySchema.safeParse(formData);
    if (!parsedData.success) {
      Alert.alert("Validation Error", parsedData.error.errors[0].message);
      return;
    }
    Alert.alert("Success", "Category created successfully");
    console.log("Form Data:", formData);
  };

  const fields = [
    {
      name: "category",
      label: "Category",
      type: "text",
      placeholder: "Enter category name",
    },
    {
      name: "description",
      label: "Description",
      type: "text",
      placeholder: "Enter description",
    },
    {
      name: "images",
      label: "Upload Images",
      type: "file",
      placeholder: "Select Images",
    },
  ];

  return (
      <GlobalForm fields={fields} onSubmit={handleSubmit} buttonText="Create Category" />
  );
};

export default CategoryCreate;
