export type ExtraInfo = {
  departament: string;
  explanation: string;
};

export type Justification = {
  id: number;
  identificationCard: string;
  names: string;
  lastNames: string;
  applicationDate: string;
  fromDate: string;
  toDate: string;
  exitHour: string;
  returnHour: string;
  affair: string;
  justificationStatusId: number;
  justificationStatus: string;
  type: string;
  extraInfo: ExtraInfo;
};

export type JustificationFile = {
  id: number;
  justificationId: number;
  documentRoute: string;
};

export type JustificationStatus = {
  id: number;
  name: string;
};
