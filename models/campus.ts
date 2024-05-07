export interface Campus {
  id: number;
  name: string;
  secondaryName: string;
  address: string;
}

export interface CreateCampus {
  name: string;
  secondaryName: string;
  address: string;
}

export interface UpdateCampus {
  name: string;
  secondaryName: string;
  address: string;
}
