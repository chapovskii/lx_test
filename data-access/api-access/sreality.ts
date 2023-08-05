import axios from "axios";

const sourceAPI = 'https://www.sreality.cz/api/cs/v2/estates?category_main_cb=1&category_type_cb=1&page=2&per_page=500&tms=1690834114009';

const fetchSource = async () => {
  const res = await axios.get(sourceAPI);
  const simplifiedData = res.data._embedded.estates.map((flat: { name: any; _links: { images: { href: any; }[]; }; }) => {
    return { title: flat.name, img_url: flat._links.images[0].href, note: 'placeholder' };
  });
  return simplifiedData;
};

const callDBUpdate = async () => {
  return await fetchSource();
};

export { callDBUpdate };
