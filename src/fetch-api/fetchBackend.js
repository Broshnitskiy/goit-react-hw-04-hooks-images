import axios from "axios";

export async function getImages(name, page) {
  const searchParams = {
    params: {
      key: "24331770-d1c322a83c5704f619e69b687",
      q: `${name}`,
      image_type: "photo",
      orientation: "horizontal",
      page,
      per_page: 12,
    },
  };

  const response = await axios.get("https://pixabay.com/api/", searchParams);
  return response.data;
}
