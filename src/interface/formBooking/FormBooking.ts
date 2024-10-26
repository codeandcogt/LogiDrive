export interface Department {
  idDepartment: number;
  name: string;
  status: boolean;
  towns: any[];
}

export interface Town {
  idTown: number;
  name: string;
  idDepartment: number;
  status: boolean;
}

export interface RequestBooking {
  idLogReservation?: number;
  idCollaborator: number;
  comment: string;
  idTown: number;
  numberPeople: number;
  statusReservation: string;
  justify: string;
  addres: string;
  status: boolean;
  creationDate?: string;
  idDepartment?: number
}
