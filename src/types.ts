export enum days {
  friday = "friday",
  sunday = "sunday",
  saturday = "saturday",
  tuesday = "tuesday",
  monday = "monday",
  wednesday = "wednesday",
  thursday = "thursday",
}
export type hallType = {
  [day in days]: string;
} & {
  id: number;
  number: number;
  official: string;
  rollNumber: number;
};
export interface courtType {
  id: number;
  name: string;
  Halls: hallType[];
}
export interface markazType {
  id: number;
  name: string;
  Courts: courtType[];
}
export interface StateType {
  id: number;
  name: string;
  Markazs: markazType[];
}

export interface NewsType {
  id: number;
  text: string;
}

export interface UserType {
  id: number;
  name: string;
  facebookId: string;
  isAdmin: boolean;
  isAllowed: boolean;
  allowedTo: string;
  email: string;
  pic: string;
}

export interface ImageType {
  id: number;
  filename: string;
  date: string;
}
export interface SettingsAttributes {
  id: number;
  court_rollNumberSize: number;
  hall_rollNumberSize: number;
  court_paddinTop: number;
  court_titleSize: number;
  hall_titleSize: number;
  court_specialitySize: number;
  hall_specialitySize: number;
  hall_officialNameSize: number;
  court_officailNameSize: number;
  newsBarTime: number;
}
