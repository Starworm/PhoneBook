export class Contact {

  address: string;
  description: string;
  email: string;
  id: number;
  lastName: string;
  name: string;
  phone: string;

  constructor(address: string,
              description: string,
              email: string,
              lastName: string,
              name: string,
              phone: string) {

    this.address = address;
    this.description = description;
    this.email = email;
    this.id = 0;
    this.lastName = lastName;
    this.name = name;
    this.phone = phone;
  }

  static getEmptyContact() {
    return new Contact('', '', '', '', '', '');
  }
}
