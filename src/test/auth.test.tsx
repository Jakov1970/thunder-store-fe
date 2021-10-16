import reducer, { login, logout } from "../store/slices/auth";

const fakeLocalStorage = (function () {
  let store: any = {};

  return {
    getItem: function (key: string) {
      return store[key] || null;
    },
    setItem: function (key: string, value: string) {
      store[key] = value.toString();
    },
    removeItem: function (key: string) {
      delete store[key];
    },
    clear: function () {
      store = {};
    },
  };
})();

describe("storage", () => {
  beforeAll(() => {
    Object.defineProperty(window, "localStorage", {
      value: fakeLocalStorage,
    });
  });

  it("saves the token to the local-storage", () => {
    const initialState = {
      token: null,
      isLogin: !!localStorage.getItem("token"),
      refreshToken: "asdfasdf",
    };
    reducer(initialState, login("fake-value"));
    expect(window.localStorage.getItem("token")).toEqual("fake-value");
  });

  it("deletes the token from the storage", () => {
    const initialState = {
      token: "this is a token, waaaaaaa!!!!!!",
      isLogin: true,
      refreshToken: "asdfasdf",
    };
    reducer(initialState, logout());
    expect(window.localStorage.getItem("token")).toEqual(null);
  });
});
