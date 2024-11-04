export interface Acceptance {
  idVehicleAssignment: number
  comment: string
  tripType: string
  startDate: string
  endDate: string
  brand: string
  plate: string
  idVehicle: number
  idLogReservation: number
  status: boolean
  statusTrip: boolean
  dayQuantity: number
  creationDate: string
  remainingHoursToStart: number
  isWithinThreshold: boolean
}

export interface DataScanner {
  idVehicleAssignment: string;
  activityType: string;
}

export interface ValuesReturn {
  activityType: string
  dateHour: string
  idLogTrip: number
  idTracking: number
  idVehicleAssignment: number
  status: boolean
}

export interface tracking {
  latitude: number
  longitude: number
}
