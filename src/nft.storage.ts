import { NFTStorage, Blob } from "nft.storage";
import { CIDString, StatusResult } from "nft.storage/dist/src/lib/interface";
const API_TOKEN =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJkaWQ6ZXRocjoweDI2OWUyNEUwOEQxZTk0YzMzMUU0ZTNCNzYyMjYzNjM3MjNGOTcwZjYiLCJpc3MiOiJuZnQtc3RvcmFnZSIsImlhdCI6MTYyMDIxODI5NjA0NywibmFtZSI6IkxvaW52In0._c2VTV9Sn-BG_6gr-ppqeUSSy86pJMqAr4_3fEVX0_Y";

class NFTStorageExample {
  private client: NFTStorage;
  constructor() {
    this.client = new NFTStorage({ token: API_TOKEN });
  }

  async storeToken(files: any): Promise<CIDString> {
    let cid;

    if (files.length > 1) {
      cid = await this.client.storeDirectory(files);
    } else {
      cid = await this.client.storeBlob(new Blob(files));
    }

    return cid;
  }

  async queryStatus(cid: string): Promise<StatusResult> {
    return await this.client.status(cid);
  }

  async delete(cid: string): Promise<void> {
    return await this.client.delete(cid);
  }
}

export default NFTStorageExample;
