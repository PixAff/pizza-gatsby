import { FaPepperHot as icon } from "react-icons/fa";

export default {
  name: "topping",
  title: "Topping",
  type: "document",
  icon,
  fields: [
    {
      name: "name",
      title: "Topping Name",
      type: "string",
      description: "Name of the topping",
    },
    {
      name: "vegetarian",
      title: "Vegetarian?",
      type: "boolean",
      options: {
        layout: "switch",
      },
    },
  ],
  preview: {
    select: {
      name: "name",
      vegetarian: "vegetarian",
    },
    prepare: (fields) => ({
      title: `${fields.name}${fields.vegetarian ? " -   🌱" : ""}`,
    }),
  },
};
