// import { getAllContacts, getContactById } from '../services/contacts.js';
import * as contactServices from '../services/contacts.js';

import createHttpError from 'http-errors';
import { contactAddSchema } from '../validation/contacts.js';

export const getAllContactsController = async (req, res, next) => {
  try {
    const contacts = await contactServices.getAllContacts();

    res.json({
      status: 200,
      message: 'Successfully found contacts!',
      data: contacts,
    });
  } catch (error) {
    // res.status(500).json({
    //   status: 500,
    //   message: error.message,
    // });
    next(error);
  }
};

export const getContactByIdController = async (req, res, next) => {
  try {
    const { id } = req.params;
    const contact = await contactServices.getContactById(id);

    if (!contact) {
      throw createHttpError(404, 'Contact not found');
    }

    res.json({
      status: 200,
      message: `Successfully found contact with id ${id}!`,
      data: contact,
    });
  } catch (error) {
    // res.status(500).json({
    //   status: 500,
    //   message: error.message,
    // });
    next(error);
  }
};

export const addContactController = async (req, res) => {
  const contact = await contactServices.addContact(req.body);

  res.status(201).json({
    status: 201,
    message: 'Successfully created a contact!',
    data: contact,
  });
};

export const upsertContactController = async (req, res) => {
  const { id: _id } = req.params;
  const result = await contactServices.updateContact({
    _id,
    payload: req.body,
    options: { upsert: true },
  });

  const status = result.isNew ? 201 : 200;

  res.status(status).json({
    status,
    message: 'Contact upserted successfully',
    data: result.data,
  });
};

export const patchContactController = async (req, res) => {
  const { id: _id } = req.params;
  const result = await contactServices.updateContact({
    _id,
    payload: req.body,
  });

  if (!result) {
    throw createHttpError(404, 'Contact not found');
  }

  res.json({
    status: 200,
    message: 'Successfully patched a contact!',
    data: result.data,
  });
};

export const deleteContactController = async (req, res) => {
  const { id: _id } = req.params;
  const data = await contactServices.deleteContact({ _id });

  if (!data) {
    throw createHttpError(404, 'Contact not found');
  }

  res.status(204).send();
};
