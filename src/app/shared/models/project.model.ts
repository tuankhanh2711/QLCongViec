import { CongViec } from "./task.model";

export class DuAn {
  constructor(
    public tenDuAn: string,
    public congViecs: CongViec[],
    public id?: number,
    public trangThai?: boolean,
  ) {}
}
