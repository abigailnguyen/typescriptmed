export interface Schema {
  fields: { [key: string]: string };
  required?: string[];
};

// check if the required fields are in the object
const required = (obj: any, required: string[]) => {
  for (let key of required) {
    if (obj[key] === undefined) return false;
  }
  return true;
};

export const validate = async (obj: any, model: Schema): boolean => {
  if (model.required) {
    const status = required(obj, model.required);
    if (!status) return false;
  }

  // check if the key of the obj is present, or if the value of the obj[key] is of expected type
  for (let key of Object.keys(obj)) {
    if (model.fields[key] === undefined) return false;
    else if (typeof obj[key] !== model.fields[key]) return false;
  }
};


// Example types
export type User = {
  email: string;
  creationDate: number;
  subscription: string;
  first_name?: string;
  last_name?: string;
  payment_details?: {
    iban: string;
    last_updated: string;
  };

  address?: {
    city: string;
    street: string;
    houseNumber: string;
    postalCode: string;
  };
  categories?: string[];
  products?: {
    ean: number;
    category?: string;
    notes?: string;
  }[];
};
type P = keyof User;

export const UserSchema: Schema = {
  fields: {
    email: "string",
    subscription: "string",
    firstName: "string",
    lastName: "string",
    paymentDetails: "object",
    address: "object",
    categories: "object",
    products: "object",
  },
  required: ["email"],
};

// On the server
let status = await validate(body, UserSchema);
if (!status) return res.status(422).json(Message.error.wrong_request_body);
// else continue