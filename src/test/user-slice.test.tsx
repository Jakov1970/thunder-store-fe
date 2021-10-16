import reducer from "../store/slices/user-slice";

describe("testing the functionality of the user slicers", () => {
  it("returns the initial value", () => {
    let state;
    state = reducer(
      { email: "", name: "", surname: "" },
      {
        type: "user/showData",
        payload: {
          email: "",
          name: "",
          surname: "",
        },
      }
    );
    expect(state).toEqual({
      email: "",
      name: "",
      surname: "",
    });
  });
  it("updates the state to the current one", () => {
    let state;
    state = reducer(
      { email: "", name: "", surname: "" },
      {
        type: "user/showData",
        payload: {
          email: "asdf@asdf.asdf",
          name: "asdf",
          surname: "asdf",
        },
      }
    );
    expect(state).toEqual({
      email: "asdf@asdf.asdf",
      name: "asdf",
      surname: "asdf",
    });
  });
});
