import reducer from "../store/slices/ui-slice";

describe("testing the functionality of the ui slicers", () => {
  it("returns the iitial value", () => {
    let state;
    state = reducer(
      { isValid: true, status: 0, rute: "", message: "" },
      {
        type: "ui/test",
        payload: {
          isValid: true,
          status: 0,
          rute: "",
          message: "",
        },
      }
    );
    expect(state).toEqual({
      isValid: true,
      status: 0,
      rute: "",
      message: "",
    });
  });
  it("updates the state to the current one", () => {
    let state;
    state = reducer(
      { isValid: true, status: 0, rute: "", message: "" },
      {
        type: "ui/test",
        payload: {
          isValid: false,
          status: 403,
          rute: "Bad request",
          message: "The username or password you entered is inocrrect!",
        },
      }
    );
    expect(state).toEqual({
      isValid: false,
      status: 403,
      rute: "Bad request",
      message: "The username or password you entered is inocrrect!",
    });
  });
});
