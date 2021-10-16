import {
  uploadFile,
  getFiles,
  deleteFiles,
  deleteAllFiles,
  startDownloading,
  stopDownloading,
  intervalUpdate,
} from "../store";
import { SingleFileState } from "../utils/types/store";

describe("Testing uploadFile reducer", () => {
  it("updates the state to the current one", () => {
    let state;
    state = uploadFile({
      type: "",
      payload: {
        files: [{ name: "file1.txt", size: "22", file: "test.txt", id: 0 }],
        download: true,
        intervalDownload: 0,
      },
    });
    expect(state).toEqual({
      files: [{ name: "file1.txt", size: "22", file: "test.txt", id: 0 }],
      download: true,
      intervalDownload: 0,
    });
  });
});

describe("Testing getFiles reducer", () => {
  it("Should return list of all files", () => {
    const incomingFiles = [
      { name: "First test file", size: 11, file: "", id: 0 },
      { name: "Second test file", size: 22, file: "", id: 1 },
      { name: "Third test file", size: 33, file: "", id: 2 },
    ];
    expect(getFiles(incomingFiles).payload).toHaveLength(3);
  });
});

describe("Testing deleteFiles reducer", () => {
  it("Should delete the files.", () => {
    const expected: Array<SingleFileState> = [];
    const incomingFiles = [
      { name: "First test file", size: 11, file: "", id: 0 },
      { name: "Third test file", size: 33, file: "", id: 2 },
    ];
    expect(deleteFiles(incomingFiles)).toEqual(expected);
  });
});

describe("Testing deleteAllFiles reducer", () => {
  it("Should delete all files.", () => {
    const test = new Array<SingleFileState>();
    expect(deleteAllFiles()).toEqual(test);
  });
});

describe("Testing startDownloading", () => {
  it("Should set download to true", () => {
    const data = [
      {
        files: new Array<SingleFileState>(),
        download: true,
        intervalDownload: 0,
      },
      {
        files: new Array<SingleFileState>(),
        download: true,
        intervalDownload: 0,
      },
    ];
    expect(startDownloading().payload).toEqual(data[0].download);
  });
});

describe("Testing stopDownloading", () => {
  it("Should set download to false", () => {
    const data = [
      {
        files: new Array<SingleFileState>(),
        download: false,
        intervalDownload: 0,
      },
      {
        files: new Array<SingleFileState>(),
        download: false,
        intervalDownload: 0,
      },
    ];
    expect(stopDownloading().payload).toEqual(data[0].download);
  });
});

describe("Testing intervalUpdate", () => {
  it("Should update interval", () => {
    const data = [
      {
        files: new Array<SingleFileState>(),
        download: false,
        intervalDownload: 0,
      },
      {
        files: new Array<SingleFileState>(),
        download: false,
        intervalDownload: 0,
      },
    ];
    const interval = 0;
    expect(intervalUpdate(interval).payload).toEqual(data[0].intervalDownload);
  });
});
