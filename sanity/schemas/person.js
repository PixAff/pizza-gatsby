import { MdPerson as icon } from "react-icons/md";

export default {
  name: "person",
  title: "SliceMasters",
  type: "document",
  icon,
  fields: [
    {
      name: "name",
      title: "Name",
      type: "string",
    },
    {
      name: "description",
      title: "description",
      type: "text",
    },
    {
      name: "slug",
      title: "Slug",
      type: "slug",
      options: {
        source: "name",
        maxLength: 100,
      },
    },
    {
      name: "image",
      title: "Image",
      type: "image",
      otions: {
        hotspot: true,
      },
    },
  ],
};
