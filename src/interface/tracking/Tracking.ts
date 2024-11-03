export interface Acceptance {
  idVehicleAssignment: number;
  comment: string;
  tripType: string;
  startDate: string;
  endDate: string;
  brand: string;
  plate: string;
  idVehicle: number;
  idLogReservation: number;
  status: boolean;
  creationDate: string;
  remainingHoursToStart: number;
  isWithinThreshold: boolean;
}
