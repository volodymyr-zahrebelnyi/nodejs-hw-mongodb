import { typeList } from '../constants/contacts.js';

const parseType = (type) => {
  const isString = typeof type === 'string';
  if (!isString) return;
  //   const isType = (type) => {
  //     typeList.includes(type);
  //   };
  //   if (isType(type)) return type;
  return typeList.includes(type) ? type : undefined;
};

const parseIsFavourite = (favourite) => {
  const isString = typeof favourite === 'string';
  if (!isString) return;
  //   const isFavourite = (favourite) => {
  //     ['true', 'false'].includes(favourite);
  //     if (isFavourite(favourite)) return favourite;
  //   };
  return ['true', 'false'].includes(favourite) ? favourite : undefined;
};

export const parseContactFilterParams = (query) => {
  const { type, favourite } = query;

  const parsedType = parseType(type);
  const parsedIsFavourite = parseIsFavourite(favourite);

  return {
    type: parsedType,
    favourite: parsedIsFavourite,
  };
};
