

export interface IUser {
    id : string;
  userName: string;
  userId: string;
  userRole: string;
  profileDescription: string;
  profileImage: string;
  skills: string[];
  experienceYears: number;
  isActive: boolean;
  address: IAddress;
  isAddSame : boolean
}

export interface IAddress {
  current: ILocation;
  permanent: ILocation;
}

export interface ILocation {
  city: string;
  state: string;
  country: string;
  zipcode: string;
}
