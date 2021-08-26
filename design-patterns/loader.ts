import * as fs from "fs";

// RecordHandler<T> is a type that has the function the handle the record
export interface RecordHandler<T> {
  addRecord(record: T): void;
}

// loader<T> function will load the data from a file
export function loader<T>(
  fileName: string,
  RecordHandler: RecordHandler<T>
): void {
  const filePath = fs.realpathSync(fileName);
  const data: T[] = JSON.parse(fs.readFileSync(filePath).toString());
  data.forEach((record) => RecordHandler.addRecord(record));
}
