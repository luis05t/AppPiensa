export interface Diagnosis {
  vitalSignId: string;
  userId: string;
  patientName: string;
  BPM: number;
  temp: number;
  timestamp: Date;
  user: { name: string };
}
