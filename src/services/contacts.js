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
  const query = ContactsCollection.find();
  if (filter.type) {
    query.where('contactType').equals(filter.type);
  }
  if (filter.favourite) {
    query.where('isFavourite').equals(filter.favourite);
  }
  if (filter.userId) {
    query.where('userId').equals(filter.userId);
  }

  const totalItems = await ContactsCollection.find()
    .merge(query)
    .countDocuments();

  const data = await query
    .skip(skip)
    .limit(perPage)
    .sort({ [sortBy]: sortOrder })
    .exec();

  const paginationData = calculatePaginationData({ totalItems, perPage, page });

  return {
    data,
    ...paginationData,
  };
};

export const getContactById = (id, userId) =>
  ContactsCollection.findOne({ _id: id, userId });

export const addContact = (payload) => ContactsCollection.create(payload);

export const updateContact = async ({ _id, userId, payload, options = {} }) => {
  const rawResult = await ContactsCollection.findOneAndUpdate(
    { _id, userId },
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

export const deleteContact = async (id, userId) =>
  ContactsCollection.findOneAndDelete({ _id: id, userId });
