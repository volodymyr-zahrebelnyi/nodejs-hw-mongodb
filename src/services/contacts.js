import { ContactsCollection } from '../db/models/contact.js';
import { calculatePaginationData } from '../utils/calculatePaginationData.js';

export const getAllContacts = async ({
  page = 1,
  perPage = 10,
  sortBy = '_id',
  sortOrder = 'asc',
  filter = {},
}) => {
  const skip = (page - 1) * perPage;
  // const query = await ContactsCollection.find(filter)
  //   .skip(skip)
  //   .limit(perPage)
  //   .sort({ [sortBy]: sortOrder });
  const query = ContactsCollection.find();
  if (filter.type) {
    query.where('contactType').equals(filter.type);
  }
  if (filter.favourite) {
    query.where('isFavourite').equals(filter.favourite);
  }
  // const data = await query;

  // const totalItems = await ContactsCollection.find(filter)
  //   .merge(query)
  //   .countDocuments();
  // const paginationData = calculatePaginationData({ totalItems, page, perPage });

  // return {
  //   data,
  //   ...paginationData,
  // };
  const totalItems = await ContactsCollection.find()
    .merge(query)
    .countDocuments();

  const data = await query
    .skip(skip)
    .limit(perPage)
    .sort({ [sortBy]: sortOrder })
    .exec();

  const paginationData = calculatePaginationData(totalItems, perPage, page);

  return {
    data,
    ...paginationData,
  };
};

export const getContactById = (id) => ContactsCollection.findById(id);

export const addContact = (payload) => ContactsCollection.create(payload);

export const updateContact = async ({ _id, payload, options = {} }) => {
  const rawResult = await ContactsCollection.findOneAndUpdate(
    { _id },
    payload,
    {
      ...options,
      includeResultMetadata: true,
    },
  );

  if (!rawResult || !rawResult.value) return null;

  return {
    data: rawResult.value,
    isNew: Boolean(rawResult.lastErrorObject.upserted),
  };
};

export const deleteContact = async (filter) =>
  ContactsCollection.findOneAndDelete(filter);
