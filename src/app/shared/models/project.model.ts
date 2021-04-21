import { CongViec } from "./task.model";

export class DuAn {
  constructor(
    public id: number,
    public tenDuAn: string,
    public trangThai: boolean,
    public CongViecs: CongViec[]
  ) {}
}
