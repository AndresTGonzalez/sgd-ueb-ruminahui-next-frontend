// "id": 5,
// "names": "ANDRES PATRICIO",
// "lastNames": "TAPIA GONZALEZ",
// "applicationDate": "2024-05-26",
// "justificationStatusId": 1,
// "justificationStatus": "pendiente"

export type Justification = {
  id: number;
  names: string;
  lastNames: string;
  applicationDate: string;
  justificationStatusId: number;
  justificationStatus: string;
  type: string;
};
